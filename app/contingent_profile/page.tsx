"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { Edit2, LogOut, CheckCircle, AlertCircle, Save, X, School } from "lucide-react";
import { TextReveal } from "@/components/animations/TextReveal";

const FIELDS = [
  { id: "schoolName", label: "School Name", type: "text" },
  { id: "username", label: "Username", type: "text" },
  { id: "pocName", label: "POC Name", type: "text" },
  { id: "principalName", label: "Principal Name", type: "text" },
  { id: "email", label: "School Email", type: "email", disabled: true },
  { id: "pocEmail", label: "POC Email", type: "email" },
  { id: "pocPhone", label: "POC Phone Number", type: "tel" },
  { id: "principalPhone", label: "Principal Phone Number", type: "tel" },
  { id: "whatsapp", label: "WhatsApp Number", type: "tel" },
  { id: "schoolAddress", label: "School Address", type: "text" },
  { id: "state", label: "State", type: "text" },
  { id: "city", label: "City", type: "text" }
];

export default function ContingentProfilePage() {

  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login");
        return;
      }
      setUser(firebaseUser);
      
      try {
        const docRef = doc(db, "Contingent Users'26", firebaseUser.uid);
        const snapshot = await getDoc(docRef);
        
        if (snapshot.exists()) {
          setProfileData({ id: snapshot.id, ...snapshot.data() });
        } else {
          toast.error("Profile not found!");
          router.push("/login");
        }
      } catch (err) {
        console.error("Error fetching profile", err);
        toast.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const isProfileComplete = () => {
    if (!profileData) return false;
    const required = [
      "schoolName", "username", "pocName", "principalName", "email", "pocEmail", "pocPhone", "principalPhone", "whatsapp",
      "schoolAddress", "state", "city"
    ];
    return required.every(field => profileData[field] && profileData[field].toString().trim() !== "");
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      await updateDoc(doc(db, "Contingent Users'26", user.uid), {
        ...profileData
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-brand-orange/20 border-t-brand-orange rounded-full animate-spin" />
      </div>
    );
  }

  const complete = isProfileComplete();

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-24 relative overflow-hidden">
      <Toaster position="top-center" />
      
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-orange/5 to-transparent pointer-events-none" />
      <div className="absolute top-40 -right-40 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <div className="mb-10">
          <TextReveal as="h1" text="Contingent Portal" className="font-space-grotesk text-3xl font-extrabold text-text-primary" />
          <p className="text-text-secondary font-inter">Manage your school's registration details.</p>
        </div>

        {!complete && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-red-800 text-sm">Action Required: Incomplete Profile</h3>
              <p className="text-red-600 text-sm mt-1">
                You must complete your profile by filling all required fields to be able to make a payment and register for UNOSQ '26.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Avatar & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-[#ECEAF5] p-6 text-center shadow-sm">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full border-4 border-brand-orange bg-brand-orange/10 mx-auto flex items-center justify-center text-brand-orange">
                  <School size={40} />
                </div>
                {complete && (
                  <div className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1 shadow-md border-2 border-white">
                    <CheckCircle size={16} />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold text-text-primary font-space-grotesk">{profileData?.schoolName || "UNOSQ Contingent"}</h2>
              <p className="text-text-secondary text-xs mt-1 font-mono">{user?.uid}</p>

              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-3">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-inter font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>

            <div className="bg-brand-purple text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
              <h3 className="font-semibold mb-2">Application Status</h3>
              {complete ? (
                <div>
                  <div className="flex items-center gap-2 text-green-300 text-sm font-medium mb-4">
                    <CheckCircle size={16} /> Profile Complete
                  </div>
                  <button
                    onClick={() => {
                      if (!profileData?.paymentSuccessful) {
                        router.push("/contingentPayment");
                      }
                    }}
                    disabled={profileData?.paymentSuccessful}
                    className={`w-full py-3 rounded-xl font-bold shadow-sm transition-transform ${profileData?.paymentSuccessful ? 'bg-green-500 text-white cursor-not-allowed' : 'bg-white text-brand-purple hover:scale-[1.02]'}`}
                  >
                    {profileData?.paymentSuccessful ? "Payment Completed" : "Pay Registration Fee"}
                  </button>
                </div>
              ) : (
                <div className="text-sm text-white/80">
                  Please complete your profile to unlock the payment portal.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Form Details */}
          <div className="lg:col-span-2">
            <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-[#ECEAF5] p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-text-primary">Contingent Information</h3>
                <button
                  onClick={() => {
                    if (isEditing) {
                      setIsEditing(false);
                    } else {
                      setIsEditing(true);
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isEditing ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20"
                  }`}
                >
                  {isEditing ? <><X size={16} /> Cancel</> : <><Edit2 size={16} /> Edit Profile</>}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {FIELDS.map((field) => (
                  <div key={field.id} className={field.id === "schoolAddress" ? "md:col-span-2" : ""}>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={profileData?.[field.id] || ""}
                      onChange={(e) => setProfileData({ ...profileData, [field.id]: e.target.value })}
                      disabled={!isEditing || field.disabled}
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-text-primary font-inter focus:ring-2 focus:ring-brand-orange/20 outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                    />
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-brand-orange text-white px-8 py-3 rounded-xl font-semibold shadow-sm hover:brightness-110 active:translate-y-[1px] transition-all disabled:opacity-70"
                  >
                    {isSaving ? (
                      <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      <><Save size={18} /> Save Changes</>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
