import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGJOBJFb5uZYWsvG7aSRG3yH5bghBtRfY",
  authDomain: "yvid-5c52e.firebaseapp.com",
  projectId: "yvid-5c52e",
  storageBucket: "yvid-5c52e.appspot.com",
  messagingSenderId: "514923606456",
  appId: "1:514923606456:web:c2fe2bd9a350f2d6d71f4d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
