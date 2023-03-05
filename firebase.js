import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: "fileuploadexpress.firebaseapp.com",
    projectId: "fileuploadexpress",
    storageBucket: "fileuploadexpress.appspot.com",
    messagingSenderId: "482268021606",
    appId: "1:482268021606:web:cf72ebacd89fc469b13ea7",
    measurementId: "G-8TWFD4DCE8"
  };
  
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);