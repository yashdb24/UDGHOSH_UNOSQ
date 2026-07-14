"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import toast, { Toaster } from "react-hot-toast";
import { Mail, Lock, LogIn, Globe } from "lucide-react";
import { TextReveal } from "@/components/animations/TextReveal";

export default function IndividualLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back!");
      router.push(`/individual_profile`);
    } catch (err: any) {
      toast.error(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      toast.success("Signed in with Google!");
      router.push(`/individual_profile`);
    } catch (err: any) {
      toast.error(err.message || "Google sign-in failed");
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-24 relative overflow-hidden flex items-center justify-center">
      <Toaster position="top-center" />
      
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-orange/5 to-transparent pointer-events-none" />
      <div className="absolute top-40 -right-40 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="mb-10 text-center">
          <TextReveal
            as="h1"
            text="Individual Login"
            className="font-space-grotesk text-4xl font-extrabold text-text-primary mb-3"
          />
          <p className="text-text-secondary font-inter">Log in to your UNOSQ '26 portal</p>
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-[#ECEAF5] p-8 shadow-xl shadow-brand-purple/5">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-text-primary font-inter focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-text-primary font-inter focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-brand-orange text-white py-3.5 rounded-xl font-inter font-semibold shadow-[0_3px_0_#C25200] hover:brightness-110 active:translate-y-[2px] active:shadow-[0_1px_0_#C25200] transition-all disabled:opacity-70"
            >
              {loading ? (
                <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-8 mb-6 flex items-center justify-center gap-4">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Or</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-text-primary py-3 rounded-xl font-inter font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Globe size={18} className="text-gray-600" />
            Continue with Google
          </button>

          <div className="mt-8 text-center text-sm text-text-secondary font-inter">
            Don't have an account?{" "}
            <Link href="/individual_signup" className="text-brand-orange font-semibold hover:underline">
              Register here
            </Link>
          </div>
          <div className="mt-4 text-center text-sm text-text-secondary font-inter">
            Are you a school?{" "}
            <Link href="/contingent_login" className="text-brand-purple font-semibold hover:underline">
              Contingent Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
