import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzIim-hR0F3crw6p1RYS0m4jxROIG5_IM",
  authDomain: "quanlycongviec-ea32b.firebaseapp.com",
  projectId: "quanlycongviec-ea32b",
  storageBucket: "quanlycongviec-ea32b.firebasestorage.app",
  messagingSenderId: "455182042374",
  appId: "1:455182042374:web:c10208ac19c8687bd90a87",
  measurementId: "G-52BJEJ0D0L"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
