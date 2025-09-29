const CACHE_NAME = 'pxmarket-v1.0.0'
const STATIC_CACHE_NAME = 'pxmarket-static-v1.0.0'
const DYNAMIC_CACHE_NAME = 'pxmarket-dynamic-v1.0.0'

// Assets to cache on install
const STATIC_ASSETS = [
  '/market-alphatest/',
  '/market-alphatest/index.html',
  '/market-alphatest/manifest.json',
  '/market-alphatest/favicon.svg',
  // Add other critical static assets
]

// API endpoints that should be cached
const API_CACHE_PATTERNS = [
  /\/api\//,
  /atomicassets\.io/,
  /wax\.api/
]

// Assets that should never be cached
const NEVER_CACHE_PATTERNS = [
  /\/sw\.js$/,
  /\/manifest\.json$/,
  /chrome-extension:/,
  /moz-extension:/
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('[SW] Service worker activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip requests that should never be cached
  if (NEVER_CACHE_PATTERNS.some(pattern => pattern.test(request.url))) {
    return
  }
  
  // Handle different types of requests with appropriate strategies
  if (request.destination === 'document') {
    // HTML documents - Network first, fallback to cache
    event.respondWith(networkFirstStrategy(request))
  } else if (request.destination === 'image') {
    // Images - Cache first, fallback to network
    event.respondWith(cacheFirstStrategy(request))
  } else if (API_CACHE_PATTERNS.some(pattern => pattern.test(request.url))) {
    // API requests - Network first with short cache
    event.respondWith(networkFirstWithTimeout(request, 3000))
  } else if (request.destination === 'script' || 
             request.destination === 'style' || 
             request.destination === 'font') {
    // Static assets - Cache first
    event.respondWith(cacheFirstStrategy(request))
  } else {
    // Default - Network first
    event.respondWith(networkFirstStrategy(request))
  }
})

// Network first strategy - try network, fallback to cache
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok && networkResponse.status < 300 && networkResponse.status !== 206) {
      // Cache successful responses (but not partial responses or redirects)
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url)
    const cachedResponse = await caches.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline page for navigation requests
      if (request.destination === 'document') {
        return caches.match('/market-alphatest/offline.html') || new Response(
          '<h1>Offline</h1><p>You are currently offline. Please check your internet connection.</p>',
          { headers: { 'Content-Type': 'text/html' } }
        )
      }
    
    throw error
  }
}

// Cache first strategy - try cache, fallback to network
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok && networkResponse.status < 300 && networkResponse.status !== 206) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.error('[SW] Failed to fetch:', request.url, error)
    throw error
  }
}

// Network first with timeout
async function networkFirstWithTimeout(request, timeout = 3000) {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    
    const networkResponse = await fetch(request, {
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (networkResponse.ok && networkResponse.status < 300 && networkResponse.status !== 206) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Network timeout or failed, trying cache:', request.url)
    const cachedResponse = await caches.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    throw error
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag)
  
  if (event.tag === 'background-sync-cart') {
    event.waitUntil(syncCartData())
  } else if (event.tag === 'background-sync-watchlist') {
    event.waitUntil(syncWatchlistData())
  }
})

// Sync cart data when back online
async function syncCartData() {
  try {
    const pendingActions = await getPendingCartActions()
    console.log(`[SW] Syncing ${pendingActions.length} pending cart actions`)
    
    for (const action of pendingActions) {
      try {
        // Use localStorage-based cart service instead of API endpoint
        // since this is a client-side only application
        const message = {
          type: 'SYNC_CART_ACTION',
          action: action
        }
        
        // Send message to all clients to handle the sync
        const clients = await self.clients.matchAll()
        clients.forEach(client => {
          client.postMessage(message)
        })
        
        // Remove from pending actions after successful sync
        await removePendingCartAction(action.id)
        console.log(`[SW] Successfully synced cart action: ${action.type}`)
      } catch (error) {
        console.error('[SW] Failed to sync cart action:', error)
        // Keep the action for retry later
      }
    }
  } catch (error) {
    console.error('[SW] Failed to sync cart data:', error)
  }
}

// Sync watchlist data when back online
async function syncWatchlistData() {
  try {
    const pendingActions = await getPendingWatchlistActions()
    console.log(`[SW] Syncing ${pendingActions.length} pending watchlist actions`)
    
    for (const action of pendingActions) {
      try {
        // Use localStorage-based watchlist service instead of API endpoint
        const message = {
          type: 'SYNC_WATCHLIST_ACTION',
          action: action
        }
        
        // Send message to all clients to handle the sync
        const clients = await self.clients.matchAll()
        clients.forEach(client => {
          client.postMessage(message)
        })
        
        // Remove from pending actions after successful sync
        await removePendingWatchlistAction(action.id)
        console.log(`[SW] Successfully synced watchlist action: ${action.type}`)
      } catch (error) {
        console.error('[SW] Failed to sync watchlist action:', error)
        // Keep the action for retry later
      }
    }
  } catch (error) {
    console.error('[SW] Failed to sync watchlist data:', error)
  }
}

// IndexedDB operations for offline sync
const DB_NAME = 'PxMarketOfflineDB'
const DB_VERSION = 1
const CART_STORE = 'pendingCartActions'
const WATCHLIST_STORE = 'pendingWatchlistActions'

// Initialize IndexedDB
async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      
      // Create cart actions store
      if (!db.objectStoreNames.contains(CART_STORE)) {
        const cartStore = db.createObjectStore(CART_STORE, { keyPath: 'id' })
        cartStore.createIndex('timestamp', 'timestamp', { unique: false })
      }
      
      // Create watchlist actions store
      if (!db.objectStoreNames.contains(WATCHLIST_STORE)) {
        const watchlistStore = db.createObjectStore(WATCHLIST_STORE, { keyPath: 'id' })
        watchlistStore.createIndex('timestamp', 'timestamp', { unique: false })
      }
    }
  })
}

// Get pending cart actions from IndexedDB
async function getPendingCartActions() {
  try {
    const db = await initDB()
    const transaction = db.transaction([CART_STORE], 'readonly')
    const store = transaction.objectStore(CART_STORE)
    
    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result || [])
    })
  } catch (error) {
    console.error('[SW] Failed to get pending cart actions:', error)
    return []
  }
}

// Remove cart action from IndexedDB
async function removePendingCartAction(id) {
  try {
    const db = await initDB()
    const transaction = db.transaction([CART_STORE], 'readwrite')
    const store = transaction.objectStore(CART_STORE)
    
    return new Promise((resolve, reject) => {
      const request = store.delete(id)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  } catch (error) {
    console.error('[SW] Failed to remove cart action:', error)
  }
}

// Add cart action to IndexedDB
async function addPendingCartAction(action) {
  try {
    const db = await initDB()
    const transaction = db.transaction([CART_STORE], 'readwrite')
    const store = transaction.objectStore(CART_STORE)
    
    const actionWithId = {
      ...action,
      id: action.id || `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    }
    
    return new Promise((resolve, reject) => {
      const request = store.add(actionWithId)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(actionWithId.id)
    })
  } catch (error) {
    console.error('[SW] Failed to add cart action:', error)
  }
}

// Get pending watchlist actions from IndexedDB
async function getPendingWatchlistActions() {
  try {
    const db = await initDB()
    const transaction = db.transaction([WATCHLIST_STORE], 'readonly')
    const store = transaction.objectStore(WATCHLIST_STORE)
    
    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result || [])
    })
  } catch (error) {
    console.error('[SW] Failed to get pending watchlist actions:', error)
    return []
  }
}

// Remove watchlist action from IndexedDB
async function removePendingWatchlistAction(id) {
  try {
    const db = await initDB()
    const transaction = db.transaction([WATCHLIST_STORE], 'readwrite')
    const store = transaction.objectStore(WATCHLIST_STORE)
    
    return new Promise((resolve, reject) => {
      const request = store.delete(id)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  } catch (error) {
    console.error('[SW] Failed to remove watchlist action:', error)
  }
}

// Add watchlist action to IndexedDB
async function addPendingWatchlistAction(action) {
  try {
    const db = await initDB()
    const transaction = db.transaction([WATCHLIST_STORE], 'readwrite')
    const store = transaction.objectStore(WATCHLIST_STORE)
    
    const actionWithId = {
      ...action,
      id: action.id || `watchlist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    }
    
    return new Promise((resolve, reject) => {
      const request = store.add(actionWithId)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(actionWithId.id)
    })
  } catch (error) {
    console.error('[SW] Failed to add watchlist action:', error)
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received')
  
  if (!event.data) {
    return
  }
  
  const data = event.data.json()
  const options = {
    body: data.body,
    icon: '/market-alphatest/favicon.svg',
    badge: '/market-alphatest/favicon.svg',
    tag: data.tag || 'default',
    data: data.data || {},
    actions: data.actions || [],
    requireInteraction: data.requireInteraction || false
  }
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.notification.tag)
  
  event.notification.close()
  
  const data = event.notification.data
  let url = '/market-alphatest/'
  
  if (data && data.url) {
    url = data.url
  }
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then((clientList) => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url.includes(url) && 'focus' in client) {
            return client.focus()
          }
        }
        
        // Open new window if app is not open
        if (clients.openWindow) {
          return clients.openWindow(url)
        }
      })
  )
})

// Message handling from main thread
self.addEventListener('message', async (event) => {
  console.log('[SW] Message received:', event.data)
  
  const { type, data } = event.data || {}
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting()
      break
      
    case 'QUEUE_CART_ACTION':
      // Queue cart action for offline sync
      try {
        const actionId = await addPendingCartAction(data)
        event.ports[0]?.postMessage({ success: true, actionId })
        console.log('[SW] Queued cart action for offline sync:', data.type)
      } catch (error) {
        console.error('[SW] Failed to queue cart action:', error)
        event.ports[0]?.postMessage({ success: false, error: error.message })
      }
      break
      
    case 'QUEUE_WATCHLIST_ACTION':
      // Queue watchlist action for offline sync
      try {
        const actionId = await addPendingWatchlistAction(data)
        event.ports[0]?.postMessage({ success: true, actionId })
        console.log('[SW] Queued watchlist action for offline sync:', data.type)
      } catch (error) {
        console.error('[SW] Failed to queue watchlist action:', error)
        event.ports[0]?.postMessage({ success: false, error: error.message })
      }
      break
      
    case 'GET_PENDING_ACTIONS':
      // Get all pending actions for status check
      try {
        const cartActions = await getPendingCartActions()
        const watchlistActions = await getPendingWatchlistActions()
        event.ports[0]?.postMessage({
          success: true,
          data: {
            cart: cartActions,
            watchlist: watchlistActions,
            total: cartActions.length + watchlistActions.length
          }
        })
      } catch (error) {
        console.error('[SW] Failed to get pending actions:', error)
        event.ports[0]?.postMessage({ success: false, error: error.message })
      }
      break
      
    case 'FORCE_SYNC':
      // Manually trigger sync
      try {
        await Promise.all([syncCartData(), syncWatchlistData()])
        event.ports[0]?.postMessage({ success: true })
        console.log('[SW] Manual sync completed')
      } catch (error) {
        console.error('[SW] Manual sync failed:', error)
        event.ports[0]?.postMessage({ success: false, error: error.message })
      }
      break
      
    default:
      console.log('[SW] Unknown message type:', type)
  }
})