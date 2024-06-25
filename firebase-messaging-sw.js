importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "__VITE_API__",
  authDomain: "__VITE_AUTH_DOMAIN__",
  projectId: "__VITE_PROJECT_ID__",
  storageBucket: "__VITE_STORAGE_BUCKET__",
  messagingSenderId: "__VITE_MESSAGING_SENDER_ID__",
  appId: "__VITE_APP_ID__",
  measurementId: "__VITE_MEASUREMENT_ID__"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      title:payload.notification.title,
      icon: payload.notification.image,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });