
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4CRzI39qB95rS1UX7cTh6PuNP1IHsldU",
  authDomain: "projetoaulaautenticacao.firebaseapp.com",
  projectId: "projetoaulaautenticacao",
  storageBucket: "projetoaulaautenticacao.firebasestorage.app",
  messagingSenderId: "530213090198",
  appId: "1:530213090198:web:0995d800497d02161823b7"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);