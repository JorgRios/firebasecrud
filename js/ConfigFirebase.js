import { initializeApp } 
from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
  getFirestore,
  collection,  
  onSnapshot, 
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} 
from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js"; 

const firebaseConfig = {
    apiKey: "AIzaSyAR1Y_emsHfAq-6Vrp331R3V2PTw5DEInA",
    authDomain: "protecto-taller.firebaseapp.com",
    projectId: "protecto-taller",
    storageBucket: "protecto-taller.appspot.com",
    messagingSenderId: "857885916576",
    appId: "1:857885916576:web:52ff015868bff8f07138c5"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const guardarEstudiante = (nombre, ci, carrera) => addDoc(collection(db, "Estudiante"), { nombre, ci, carrera});
export const obtenerEstudiante = (callback) =>  onSnapshot(collection(db, "Estudiante"), callback);
export const eliminaEstudiante = (id) => deleteDoc(doc(db, "Estudiante", id));
export const obtenerIdEstudiante = (id) => getDoc(doc(db, "Estudiante", id));
export const actualizarEstudiante = (id, objEstudiante) => updateDoc(doc(db, "Estudiante", id), objEstudiante);

