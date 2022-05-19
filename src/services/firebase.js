import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAca3UGkrmvasX36sLtN0cXCviCW0k4XCI',
  authDomain: 'fortune-pi.firebaseapp.com',
  projectId: 'fortune-pi',
  storageBucket: 'fortune-pi.appspot.com',
  messagingSenderId: '942027858998',
  appId: '1:942027858998:web:a06063a9908fbc60c92497',
  measurementId: 'G-BDYGJX3WY0',
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };
