"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebaseConfig";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('🔥 Firebase Auth State Changed:', JSON.stringify({ 
        user: firebaseUser ? { 
          uid: firebaseUser.uid, 
          email: firebaseUser.email, 
          displayName: firebaseUser.displayName 
        } : null,
        loading: false 
      }, null, 2));
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, loading };
}
