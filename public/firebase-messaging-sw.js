importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: '__REACT_APP_API_KEY__',
  authDomain: '__REACT_APP_AUTH_DOMAIN__',
  databaseURL: '__REACT_APP_DATABASE_URL__',
  projectId: '__REACT_APP_PROJECT_ID__',
  storageBucket: '__REACT_APP_STORAGE_BUCKET__',
  messagingSenderId: '__REACT_APP_MESSAGING_SENDER_ID__',
  appId: '__REACT_APP_ID__',
  measurementId: '__REACT_APP_MEASUREMENT_ID__'
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}

const messaging = firebase.messaging();

var extraDetails;

messaging.onBackgroundMessage(function (payload) {
  console.log('Message Received. 2', payload);

  extraDetails = JSON.parse(payload?.data?.extra);

  const notificationOptions = {
    body: payload.data?.description,
    tag: payload.data?.title,
    icon: 'https://mythrill-public.s3.amazonaws.com/Mask+group.svg',
    data: payload
  };

  // const cacheName = 'my-cache';

  // const notificationKey = 'notification';
  // const notificationValue = true;

  // caches
  //   .open(cacheName)
  //   .then((cache) => {
  //     const response = new Response(JSON.stringify(notificationValue), {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     cache
  //       .put(notificationKey, response)
  //       .then(() => {
  //         console.log(
  //           'Added key:',
  //           notificationKey,
  //           'with value:',
  //           notificationValue,
  //           'to the cache.'
  //         );
  //       })
  //       .catch((error) => {
  //         console.error('Error adding key-value pair to cache:', error);
  //       });
  //   })
  //   .catch((error) => {
  //     console.error('Error opening cache:', error);
  //   });

  self.registration.showNotification(
    payload?.data?.title || payload?.notification?.body,
    notificationOptions
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('On notification click:2', event);

  if (extraDetails.type == 'stock') {
    url = `/stock/${extraDetails.name_id}`;
  } else {
    url = `/setting`;
  }

  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({
        type: 'window'
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(url);
      })
  );
});
