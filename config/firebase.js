// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {collection, getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAm2nms-7UBB5DkZILV9V2Q9BMlBnvJqTg',
  authDomain: 'note-2414d.firebaseapp.com',
  projectId: 'note-2414d',
  storageBucket: 'note-2414d.appspot.com',
  messagingSenderId: '359768933403',
  appId: '1:359768933403:web:ece28ec9c1c7606e8e24be',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const tripsRef = collection(db, 'note');
export const expenseRef = collection(db, 'expense');

export default app;
