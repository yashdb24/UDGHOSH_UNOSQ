"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { Navigation } from "@/components/Navigation";
import { TextReveal } from "@/components/animations/TextReveal";
import { Send, Building2 } from "lucide-react";

const INITIAL_STATE = {
  schoolName: "",
  username: "",
  principalName: "",
  pocName: "",
  schoolEmail: "",
  pocEmail: "",
  principalPhone: "",
  pocPhone: "",
  email: "",
  whatsapp: "",
  schoolAddress: "",
  state: "",
  city: ""
};

const FIELDS = [
  { id: "schoolName", label: "School Name", type: "text" },
  { id: "username", label: "Username", type: "text" },
  { id: "principalName", label: "Principal Name", type: "text" },
  { id: "pocName", label: "POC Name", type: "text" },
  { id: "schoolEmail", label: "School Email", type: "email" },
  { id: "pocEmail", label: "POC Email", type: "email" },
  { id: "principalPhone", label: "Principal Phone Number", type: "tel" },
  { id: "pocPhone", label: "POC Phone Number", type: "tel" },
  { id: "whatsapp", label: "WhatsApp Number", type: "tel" },
  { id: "email", label: "Other Email", type: "email" },
  { id: "schoolAddress", label: "School Address", type: "text" },
  { id: "state", label: "State", type: "text" },
  { id: "city", label: "City", type: "text" }
] as const;

const isValidIndianPhone = (num: string) => /^[6-9]\d{9}$/.test(num);

export default function ContingentApplicationForm() {
  const [formData, setFormData] = useState<typeof INITIAL_STATE>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: keyof typeof INITIAL_STATE) => {
    setFormData({ ...formData, [id]: e.target.value });
  };

  const isUsernameAvailable = async (username: string) => {
    const q = query(
      collection(db, "Contingent Users'26"),
      where("username", "==", username)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    for (let key in formData) {
      if (formData[key as keyof typeof INITIAL_STATE].trim() === "") {
        toast.error(`Please fill out ${key}`);
        return;
      }
    }

    if (!isValidIndianPhone(formData.whatsapp)) {
      toast.error(`Invalid phone number in whatsapp field`);
      return;
    }

    try {
      setIsSubmitting(true);
      const available = await isUsernameAvailable(formData.username);
      if (!available) {
        toast.error("Username already in use. Please choose another.");
        setIsSubmitting(false);
        return;
      }

      await addDoc(collection(db, "Contingent Users'26"), {
        ...formData,
        paymentSuccessful: false,
        applicationPassword: "Application Password will be provided after payment",
        timestamp: new Date()
      });
      toast.success("Form submitted successfully!");
      setFormData(INITIAL_STATE);
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-24 relative overflow-hidden">
      <Toaster position="top-center" />
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-orange/5 to-transparent pointer-events-none" />
      <div className="absolute top-40 -right-40 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />
      
      <Navigation />

      <div className="mx-auto max-w-4xl px-6 relative z-10">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-brand-orange/10 p-4">
            <Building2 className="h-8 w-8 text-brand-orange" />
          </div>
          <TextReveal as="h1" text="Contingent Application Form" className="font-space-grotesk text-3xl sm:text-4xl font-extrabold text-text-primary mb-3" />
          <p className="text-text-secondary font-inter max-w-xl">
            Register your school contingent directly by filling out the details below.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-[#ECEAF5] shadow-xl p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FIELDS.map(({ id, label, type }) => (
              <div key={id} className="flex flex-col">
                <label htmlFor={id} className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">
                  {label}
                </label>
                <input
                  type={type}
                  id={id}
                  value={formData[id]}
                  onChange={(e) => handleChange(e, id)}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-text-primary font-inter focus:ring-2 focus:ring-brand-orange/20 outline-none transition-colors"
                  placeholder={`Enter ${label.toLowerCase()}`}
                  disabled={isSubmitting}
                />
              </div>
            ))}
            
            <div className="col-span-1 md:col-span-2 mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-brand-orange text-white font-inter font-bold rounded-xl hover:bg-brand-orange/90 transition-colors shadow-lg shadow-brand-orange/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="h-6 w-6 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <><Send size={20} /> Submit Application</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
