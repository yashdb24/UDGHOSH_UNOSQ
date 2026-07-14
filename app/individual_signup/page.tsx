"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import toast, { Toaster } from "react-hot-toast";
import { Mail, Lock, UserPlus, Globe, User, Phone, MapPin, Calendar, Users, Briefcase } from "lucide-react";
import { TextReveal } from "@/components/animations/TextReveal";

const POOLS = ["Little Champs 5-6", "Super Nova 7-8", "The Titans 9-10", "Elite Explorers 11-12"];

export default function IndividualSignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    whatsapp: "",
    age: "",
    class: "",
    school: "",
    city: "",
    state: "",
    dob: "",
    parentsName: "",
    address: "",
    pool: "",
    gender: "",
    username: "",
  });
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateUid = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let uid = 'IND-';
    for (let i = 0; i < 6; i++) {
      uid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uid;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      const customUid = generateUid();
      
      await setDoc(doc(db, "Individual Users'26", user.uid), {
        ...formData,
        uid: customUid,
        createdAt: new Date().toISOString(),
        paymentSuccessful: false,
      });

      toast.success("Account created successfully!");
      router.push(`/individual_profile`);
    } catch (err: any) {
      toast.error(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const customUid = generateUid();

      await setDoc(doc(db, "Individual Users'26", user.uid), {
        name: user.displayName || "",
        email: user.email || "",
        uid: customUid,
        createdAt: new Date().toISOString(),
        paymentSuccessful: false,
      }, { merge: true });

      toast.success("Signed up with Google!");
      router.push(`/individual_profile`);
    } catch (err: any) {
      toast.error(err.message || "Google sign-up failed");
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-24 relative overflow-hidden flex items-center justify-center">
      <Toaster position="top-center" />
      
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-orange/5 to-transparent pointer-events-none" />
      <div className="absolute top-40 -right-40 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-4xl px-6">
        <div className="mb-10 text-center">
          <TextReveal
            as="h1"
            text="Individual Registration"
            className="font-space-grotesk text-4xl font-extrabold text-text-primary mb-3"
          />
          <p className="text-text-secondary font-inter">Create your UNOSQ '26 portal account</p>
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-[#ECEAF5] p-8 md:p-10 shadow-xl shadow-brand-purple/5">
          <form onSubmit={handleSignup}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-text-primary border-b border-gray-100 pb-2 mb-4">Account Details</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">Email Address *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail size={16} className="text-gray-400" />
                    </div>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all" placeholder="your@email.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">Password *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required minLength={6} className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all" placeholder="Min 6 characters" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">Confirm Password *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required minLength={6} className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all" placeholder="Re-type password" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">Full Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User size={16} className="text-gray-400" />
                    </div>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all" placeholder="Your name" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">Username *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User size={16} className="text-gray-400" />
                    </div>
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} required className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all" placeholder="Username" />
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <h3 className="text-lg font-bold text-text-primary border-b border-gray-100 pb-2 mb-4">Personal Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">Age *</label>
                    <input type="number" name="age" value={formData.age} onChange={handleInputChange} required className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all" placeholder="E.g. 15" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">Gender *</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} required className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">Phone Number *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone size={16} className="text-gray-400" />
                    </div>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all" placeholder="Your Phone Number" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">School Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Briefcase size={16} className="text-gray-400" />
                    </div>
                    <input type="text" name="school" value={formData.school} onChange={handleInputChange} required className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all" placeholder="School name" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">Pool Selection *</label>
                  <select name="pool" value={formData.pool} onChange={handleInputChange} required className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all">
                    <option value="">Select your Pool</option>
                    {POOLS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 max-w-md mx-auto">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-brand-orange text-white py-3.5 rounded-xl font-inter font-semibold shadow-[0_3px_0_#C25200] hover:brightness-110 active:translate-y-[2px] active:shadow-[0_1px_0_#C25200] transition-all disabled:opacity-70"
              >
                {loading ? (
                  <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <UserPlus size={18} />
                    Create Account
                  </>
                )}
              </button>
              
              <div className="mt-6 mb-6 flex items-center justify-center gap-4">
                <div className="h-px bg-gray-200 flex-1" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Or</span>
                <div className="h-px bg-gray-200 flex-1" />
              </div>

              <button
                onClick={handleGoogleSignup}
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-text-primary py-3 rounded-xl font-inter font-medium hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Globe size={18} className="text-gray-600" />
                Sign Up with Google
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-text-secondary font-inter">
            Already have an account?{" "}
            <Link href="/individual_login" className="text-brand-orange font-semibold hover:underline">
              Sign In here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
