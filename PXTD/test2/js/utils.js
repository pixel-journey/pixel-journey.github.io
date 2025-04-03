// utils.js
function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function generateGrid() {
  const gridElement = document.getElementById("grid");
  if (!gridElement) {
    console.error("Grid element not found!");
    return;
  }

  gridElement.innerHTML = "";
  for (let y = 0; y < 500; y += 50) {
    for (let x = 0; x < 500; x += 50) {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", x);
      rect.setAttribute("y", y);
      rect.setAttribute("width", 50);
      rect.setAttribute("height", 50);
      rect.setAttribute("fill", "none");
      rect.setAttribute("stroke", "#2a4a5a");
      rect.setAttribute("stroke-width", "1");
      rect.setAttribute("rx", "3");
      rect.setAttribute("ry", "3");
      rect.classList.add("grid-cell");
      gridElement.appendChild(rect);
    }
  }
  console.log("Grid generated with 10x10 cells aligned to 50x50");
}

let eventLogEntries = [];
function logEvent(message) {
  const timestamp = new Date().toLocaleTimeString();
  eventLogEntries.push(`[${timestamp}] ${message}`);
  const maxEntries = 6;
  if (eventLogEntries.length > maxEntries) {
    eventLogEntries = eventLogEntries.slice(eventLogEntries.length - maxEntries);
  }

  const eventLog = document.getElementById("event-log");
  const mobileEventLog = document.getElementById("mobile-event-log");
  if (eventLog) eventLog.textContent = eventLogEntries.join("\n");
  if (mobileEventLog) mobileEventLog.textContent = eventLogEntries.join("\n");
  if (eventLog) eventLog.scrollTop = eventLog.scrollHeight;
  if (mobileEventLog) mobileEventLog.scrollTop = mobileEventLog.scrollHeight;
}

let notificationEntries = [];
function showNotification(message) {
  const timestamp = new Date().toLocaleTimeString();
  notificationEntries.push(`[${timestamp}] ${message}`);
  const maxEntries = 4;
  if (notificationEntries.length > maxEntries) {
    notificationEntries = notificationEntries.slice(notificationEntries.length - maxEntries);
  }

  const notifications = document.getElementById("notifications");
  const mobileNotifications = document.getElementById("mobile-notifications");
  if (notifications) notifications.textContent = notificationEntries.join("\n");
  if (mobileNotifications) mobileNotifications.textContent = notificationEntries.join("\n");
  if (notifications) notifications.scrollTop = notifications.scrollHeight;
  if (mobileNotifications) mobileNotifications.scrollTop = mobileNotifications.scrollHeight;
}

function isOnPath(x, y, pathPoints, tolerance = 25) {
  for (let i = 0; i < pathPoints.length - 1; i++) {
    const p1 = pathPoints[i];
    const p2 = pathPoints[i + 1];
    const minX = Math.min(p1.x, p2.x);
    const maxX = Math.max(p1.x, p2.x);
    const minY = Math.min(p1.y, p2.y);
    const maxY = Math.max(p1.y, p2.y);
    if (x >= minX - tolerance && x <= maxX + tolerance && y >= minY - tolerance && y <= maxY + tolerance) {
      return true;
    }
  }
  return false;
}

// New utility for finding the nearest enemy (for chaining effects)
function findNearestEnemy(currentEnemy, enemies, maxDistance) {
  return enemies
    .filter(enemy => enemy !== currentEnemy && enemy.isAlive) // Exclude the current enemy and dead enemies
    .map(enemy => ({
      enemy,
      distance: calculateDistance(currentEnemy.x, currentEnemy.y, enemy.x, enemy.y)
    }))
    .filter(e => e.distance <= maxDistance) // Only include enemies within maxDistance
    .sort((a, b) => a.distance - b.distance)[0]?.enemy; // Return the closest enemy, or undefined if none found
}

// Enhanced tooltip creation with multiline support
function createTooltip(text) {
  const tooltip = document.createElement("div");
  tooltip.className = "tower-tooltip";
  tooltip.innerHTML = text.replace(/\n/g, "<br>"); // Convert newlines to <br> for formatting
  document.body.appendChild(tooltip);
  return tooltip;
}

function positionTooltip(tooltip, x, y) {
  tooltip.style.left = `${x + 10}px`;
  tooltip.style.top = `${y + 10}px`;
}

function removeTooltip(tooltip) {
  if (tooltip && tooltip.parentNode) {
    tooltip.parentNode.removeChild(tooltip);
  }
}

function formatCurrency(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
