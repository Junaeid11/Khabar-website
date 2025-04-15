"use client";

import { useEffect, useState } from "react";
import { getMyProfile } from "@/services/profile";
import Image from "next/image";
import Loading from "../loading";
import { IUser } from "@/types";
import Link from "next/link";

const ProfilePage = () => {
  const [profile, setProfile] = useState<IUser | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        if (res?.success) {
          setProfile(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <Loading />;

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg font-semibold">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-amber-300/30 backdrop-blur-lg shadow-2xl rounded-3xl p-10 border border-white/50">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-amber-400 to-purple-500 p-[3px] shadow-lg">
              <Image
                src={profile.profile.photo || "https://static.thenounproject.com/png/354384-200.png"}
                alt="Profile Picture"
                width={144}
                height={144}
                className="rounded-full object-cover border-4 border-white"
              />
            </div>
          </div>

          <h1 className="mt-5 text-4xl font-bold text-gray-800">{profile.name}</h1>
          <p className="text-gray-600 mt-1">{profile.email}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <ProfileInfo label="📱 Phone" value={profile.profile.phoneNo || "N/A"} />
          <ProfileInfo label="⚧ Gender" value={profile.profile.gender || "N/A"} />
          <ProfileInfo label="🎂 Date of Birth" value={profile.profile.dateOfBirth || "N/A"} />
          <ProfileInfo label="🏠 Address" value={profile.profile.address || "N/A"} />
        </div>

        
      </div>
    </div>
  );
};

const ProfileInfo = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-gray-500 font-medium">{label}</p>
    <p className="text-lg font-semibold text-gray-800 mt-1">{value}</p>
  </div>
);

export default ProfilePage;
