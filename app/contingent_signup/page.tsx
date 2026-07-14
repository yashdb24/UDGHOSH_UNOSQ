"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import toast, { Toaster } from "react-hot-toast";
import { Mail, Lock, UserPlus, Users, Phone, MapPin, School } from "lucide-react";
import { TextReveal } from "@/components/animations/TextReveal";

export default function ContingentSignupPage() {
  const [formData, setFormData] = useState({
    schoolName: "",
    email: "",
    password: "",
    confirmPassword: "",
    pocName: "",
    pocEmail: "",
    pocPhone: "",
    principalName: "",
    city: "",
    state: "",
    schoolAddress: "",
    username: "",
  });
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateUid = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let uid = 'CON-';
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
      
      await setDoc(doc(db, "Contingent Users'26", user.uid), {
        ...formData,
        uid: customUid,
        createdAt: new Date().toISOString(),
        paymentSuccessful: false,
      });

      toast.success("School account created successfully!");
      router.push(`/contingent_profile`);
    } catch (err: any) {
      toast.error(err.message || "Failed to create account");
    } finally {
      setLoading(false);
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
            text="Contingent Registration"
            className="font-space-grotesk text-4xl font-extrabold text-text-primary mb-3"
          />
          <p className="text-text-secondary font-inter">Register your school for UNOSQ '26</p>
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-[#ECEAF5] p-8 md:p-10 shadow-xl shadow-brand-purple/5">
          <form onSubmit={handleSignup}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-text-primary border-b border-gray-100 pb-2 mb-4">Account Details</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">School Email Address *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail size={16} className="text-gray-400" />
                    </div>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all" placeholder="school@example.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">Password *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required minLength={6} className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all" placeholder="Min 6 characters" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">Confirm Password *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required minLength={6} className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all" placeholder="Re-type password" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">School Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <School size={16} className="text-gray-400" />
                    </div>
                    <input type="text" name="schoolName" value={formData.schoolName} onChange={handleInputChange} required className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all" placeholder="ABC High School" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">School Username *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Users size={16} className="text-gray-400" />
                    </div>
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} required className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all" placeholder="abcschool123" />
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <h3 className="text-lg font-bold text-text-primary border-b border-gray-100 pb-2 mb-4">Contact Details</h3>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">POC Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Users size={16} className="text-gray-400" />
                    </div>
                    <input type="text" name="pocName" value={formData.pocName} onChange={handleInputChange} required className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all" placeholder="Teacher / Coordinator Name" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">POC Phone *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone size={16} className="text-gray-400" />
                    </div>
                    <input type="tel" name="pocPhone" value={formData.pocPhone} onChange={handleInputChange} required className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all" placeholder="Your Phone Number" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">City *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPin size={16} className="text-gray-400" />
                    </div>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all" placeholder="Kolkata" />
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 max-w-md mx-auto">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-brand-purple text-white py-3.5 rounded-xl font-inter font-semibold shadow-sm hover:brightness-110 active:translate-y-[2px] transition-all disabled:opacity-70"
              >
                {loading ? (
                  <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <UserPlus size={18} />
                    Register School
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-text-secondary font-inter">
            Already have an account?{" "}
            <Link href="/contingent_login" className="text-brand-purple font-semibold hover:underline">
              Sign In here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
