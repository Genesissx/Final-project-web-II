import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey) {
  throw new Error('Firebase config requise. Ajoutez les variables VITE_FIREBASE_* dans .env.local');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export async function signUpWithEmail(email, password, metadata = {}) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await addDoc(collection(db, 'profiles'), {
      uid: user.uid,
      email: user.email,
      firstName: metadata.firstName || '',
      lastName: metadata.lastName || '',
      nifcin: metadata.nifcin || '',
      phone: metadata.phone || '',
      createdAt: new Date(),
    });

    return { data: { user }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function signInWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { data: { user: userCredential.user, session: {} }, error: null };
  } catch (error) {
    console.error('Erreur signInWithEmail:', error);
    return { data: null, error };
  }
}

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const profilesRef = collection(db, 'profiles');
    const q = query(profilesRef, where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(profilesRef, {
        uid: user.uid,
        email: user.email,
        firstName: user.displayName || '',
        lastName: '',
        nifcin: '',
        phone: '',
        createdAt: new Date(),
      });
    }

    return { data: { user }, error: null };
  } catch (error) {
    console.error('Erreur signInWithGoogle:', error);
    return { data: null, error };
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
    return { data: {}, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getAllServices() {
  try {
    const servicesRef = collection(db, 'services');
    const querySnapshot = await getDocs(servicesRef);
    const services = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return services;
  } catch (error) {
    console.error('Erreur getAllServices:', error.message);
    return [];
  }
}

export async function findServiceById(id) {
  try {
    const serviceRef = doc(db, 'services', id);
    const serviceSnap = await getDoc(serviceRef);
    if (serviceSnap.exists()) {
      return { id: serviceSnap.id, ...serviceSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Erreur findServiceById:', error.message);
    return null;
  }
}

export async function addService(service) {
  try {
    const normalized = {
      ...service,
      id: service.id || `${Date.now()}`,
      rating: service.rating ?? 8.0,
      status: service.status ?? 'Disponible',
      createdAt: new Date(),
    };

    const docRef = await addDoc(collection(db, 'services'), normalized);
    return { id: docRef.id, ...normalized };
  } catch (error) {
    console.error('Erreur addService:', error.message);
    throw error;
  }
}
