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
  // const notification = JSON.parse(payload.data?.result);
  console.log('message-received', payload);
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
