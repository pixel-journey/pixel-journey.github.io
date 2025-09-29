// Development Service Worker - Minimal interference with HMR
const CACHE_NAME = 'pxmarket-dev-v1.0.0'

// Only cache essential static assets in development
const DEV_STATIC_ASSETS = [
  '/manifest.json',
  '/favicon.svg'
]

// Patterns to never cache in development (especially Vite HMR)
const DEV_NEVER_CACHE_PATTERNS = [
  /\/sw\.js$/,
  /\/sw-dev\.js$/,
  /@vite\/client/,
  /@react-refresh/,
  /\/node_modules\//,
  /\/__vite_ping$/,
  /\/src\//,  // Don't cache source files
  /hot-update/,
  /\.map$/,
  /localhost:5173/,
  /ws:\/\//,  // WebSocket connections
  /chrome-extension:/,
  /moz-extension:/
]

// Install event - minimal caching
self.addEventListener('install', (event) => {
  console.log('[SW-DEV] Installing development service worker...')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW-DEV] Caching minimal assets')
        return cache.addAll(DEV_STATIC_ASSETS)
      })
      .then(() => {
        console.log('[SW-DEV] Development SW installed')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('[SW-DEV] Failed to install:', error)
      })
  )
})

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[SW-DEV] Activating development service worker...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW-DEV] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('[SW-DEV] Development SW activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - pass through most requests to avoid HMR conflicts
self.addEventListener('fetch', (event) => {
  const { request } = event
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip requests that should never be cached (especially Vite HMR)
  if (DEV_NEVER_CACHE_PATTERNS.some(pattern => pattern.test(request.url))) {
    return
  }
  
  // Only handle manifest and favicon in development
  if (request.url.includes('/manifest.json') || request.url.includes('/favicon.svg')) {
    event.respondWith(cacheFirstStrategy(request))
  }
  // Let everything else pass through normally
})

// Simple cache-first strategy for minimal assets
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.error('[SW-DEV] Failed to fetch:', request.url, error)
    throw error
  }
}

// Message handling
self.addEventListener('message', (event) => {
  console.log('[SW-DEV] Message received:', event.data)
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})