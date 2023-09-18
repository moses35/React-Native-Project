// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDBdoU_6ZOWQS5DZ7FhRSmUxQiOJbUUUac",
  authDomain: "react-native-ebf8d.firebaseapp.com",
  projectId: "react-native-ebf8d",
  storageBucket: "react-native-ebf8d.appspot.com",
  messagingSenderId: "269914990961",
  appId: "1:269914990961:web:820f8d1f2e02e49d95aed0",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
