import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import {
  getFirestore,
  addDoc,
  collection,
  setDoc,
  onSnapshot,
  serverTimestamp,
  doc,
  query,
  orderBy,
  where,
  getDocs,
  updateDoc,
  limit
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import DataHandler from './services/DataHandler';
import { deviceNotificationTokenSuccess } from './redux/slicers/user';
import { getlatestNotification } from './redux/slicers/stocks';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getFirestore(app);

const fetchToken = () => {
  getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY
  })
    .then((currentToken) => {
      if (currentToken) {
        DataHandler.getStore().dispatch(
          deviceNotificationTokenSuccess(currentToken)
        );
      }
    })
    .catch((err) => {
      console.log('errtoken', err);
    });
};

onMessage(messaging, (payload) => {
  const notification = payload?.data;
  const { title, description } = notification;

  console.log('Message Received. 1 ', payload);

  DataHandler.getStore().dispatch(getlatestNotification(payload?.data));

  const notif = new Notification(title, { body: description });

  // notif.addEventListener('click', (event) => {
  //   console.log('On notification click: ', event);
  //   let data = event?.currentTarget?.data?.data;
  //   let activityLogs = '/member/inventory/activity-logs';
  //   let url = '';
  //   let baseurl = data?.url;
  //   if (baseurl.includes('dashboard')) {
  //     baseurl = baseurl.split('/').slice(0, -1).join('/');
  //   }
  //   url = baseurl + activityLogs;
  //   notif.close();
  //   window.open(url);
  // });
});

async function requestPermission() {
  console.log('Requesting permission...');
  const res = await Notification.requestPermission();
  console.log('ssss', res);
  if (res === 'granted') {
    return true;
  } else {
    return false;
  }
}

export {
  db,
  addDoc,
  collection,
  setDoc,
  onSnapshot,
  serverTimestamp,
  doc,
  query,
  orderBy,
  where,
  getDocs,
  updateDoc,
  fetchToken,
  requestPermission,
  limit
};
