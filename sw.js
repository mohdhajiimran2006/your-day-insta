// Service Worker for Your Day (PWA / Mobile APK)
const CACHE_NAME = 'ydd-cache-v10';
const ASSETS = [
  './',
  './index.html',
  './firebase-config.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './logo.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(() => {}))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // Never intercept cross-origin Firebase/Firestore/Google API streams
  if (!event.request.url.startsWith(self.location.origin)) return;
  // Network first with cache: 'no-store' so updated HTML/JS is always loaded fresh
  event.respondWith(
    fetch(event.request, { cache: 'no-store' }).catch(async () => {
      const cached = await caches.match(event.request);
      return cached || caches.match('./index.html');
    })
  );
});

// WhatsApp-style Notification Interaction
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const notifData = event.notification.data || {};
  const urlToOpen = notifData.url || './index.html';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          if (notifData.chatWith) {
            client.postMessage({ type: 'OPEN_CHAT', user: notifData.chatWith });
          }
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen);
      }
    })
  );
});

// Background Push Notification handler (if server/FCM triggers push)
self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: 'Your Day Diary', body: event.data ? event.data.text() : 'New message received' };
  }

  const title = data.title || 'Your Day Diary';
  const options = {
    body: data.body || 'You have a new message',
    icon: data.icon || './icon-192.png',
    badge: data.badge || './icon-192.png',
    vibrate: data.vibrate || [200, 100, 200],
    data: data.data || {},
    requireInteraction: data.requireInteraction || false
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
