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

// self.addEventListener("notificationclick", (event) => {
//   console.log("On notification click: ", event);
//   let data = event?.notification?.data?.data;
//   let activityLogs = "/member/inventory/activity-logs";
//   let url = "";
//   let baseurl = data?.url;
//   if (baseurl.includes("dashboard")) {
//     baseurl = baseurl.split("/").slice(0, -1).join("/");
//   }
//   url = baseurl + activityLogs;
//   event.notification.close();

//   // This looks to see if the current is already open and
//   // focuses if it is
//   event.waitUntil(
//     clients
//       .matchAll({
//         type: "window",
//       })
//       .then((clientList) => {
//         for (const client of clientList) {
//           if (client.url === "/" && "focus" in client) return client.focus();
//         }
//         if (clients.openWindow) return clients.openWindow(url);
//       })
//   );
// });

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background notification ', messaging, payload);

  const notificationOptions = {
    body: payload.data?.body || payload.notification?.body,
    tag: payload.data?.title || payload.notification?.body,
    data: payload
  };

  self.registration.showNotification(
    payload?.data?.title || payload?.notification?.body,
    notificationOptions
  );
});
