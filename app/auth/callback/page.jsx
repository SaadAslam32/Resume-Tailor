
'use client'
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from 'react-toastify';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        toast.error("Login failed. Please try again.");
        router.push("/auth/login");
      } else if (session) {
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        router.push("/auth/login");
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50/50 to-purple-100/50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="mb-4">
          <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h2 className="text-xl font-medium text-[var(--text-primary)]">Verifying your session...</h2>
        <p className="mt-2 text-[var(--text-secondary)]">You'll be redirected shortly</p>
      </div>
    </div>
  );
}