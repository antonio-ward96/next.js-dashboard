'use client'
import { useFormState } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./loginForm.module.css";

export default function LoginForm() {
  const [state, formAction] = useFormState(authenticate, {});
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.replace('/dashboard');
    }
  }, [state, router]);

  return (
    <form action={formAction} className={styles.form}>
      <h1>Login</h1>
      
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />

      <button>Login</button>

      {state?.error && (
        <p className={styles.error}>{state.error}</p>
      )}
    </form>
  );
}