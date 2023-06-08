import { getMessaging, getToken, onMessage } from "firebase/messaging";

import { initializeApp } from "firebase/app";
import axios from "axios";
import DataHandler from "./services/DataHandler";
import { deviceNotificationTokenSuccess } from "./redux/slicers/user";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
console.log({ app, messaging });

export const fetchToken = () => {
  getToken(messaging, {
    vapidKey:
      "BExYE8r-7LeqDLmhR0YbM0PWmR3F6o0OCBmnpz9mX2vW5k89wIXmWtko_jud2wZiHA245GbAXOBkqTOeLWKHy5M",
  })
    .then((currentToken) => {
      console.log("currentToken", currentToken);
      if (currentToken) {
        console.log(currentToken);
        // axios({
        //   method: "post",
        //   url: "https://7219-110-39-172-42.ngrok-free.app",
        //   data: {
        //     email: "test@viabletree.com",
        //     password: "test12345",
        //     platform: "android",
        //     token: currentToken,
        //   },
        // }).then((response) => {
        //   console.log(response);
        // });

        DataHandler.getStore().dispatch(
          deviceNotificationTokenSuccess(currentToken)
        );
      }
    })
    .catch((err) => {
      console.log("errtoken", err);
    });
};

onMessage(messaging, (payload) => {
  // const notification = JSON.parse(payload.data?.result);
  console.log("message-received", payload);
});

export async function requestPermission() {
  console.log("Requesting permission...");
  const res = await Notification.requestPermission();
  console.log("ssss", res);
  if (res === "granted") {
    return true;
  } else {
    return false;
  }
}
