"use client";

import { useEffect, useState } from "react";
import { getMyProfile } from "@/services/profile";
import Image from "next/image";
import Loading from "../loading";
import { IUser } from "@/types";

const ProfilePage = () => {
  const [profile, setProfile] = useState<IUser|null>();
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

  if (loading) {
    return <Loading/>
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-red-500 text-lg font-semibold">
          Failed to load profile
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8">
      <div className="flex flex-col items-center">
        <div className="relative">
          <Image
            src={profile.profile.photo || "https://static.thenounproject.com/png/354384-200.png"}
            alt="Profile Picture"
            width={150}
            height={150}
            className="rounded-full border-4 border-white shadow-md"
          />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-800">
          {profile.name}
        </h1>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg font-semibold text-gray-700">Email:</p>
            <p className="text-gray-800">{profile.email}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700">Phone:</p>
            <p className="text-gray-800">{profile.profile.phoneNo || 'N/A'}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700">Gender:</p>
            <p className="text-gray-800">{profile.profile.gender || 'N/A'}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700">Date of Birth:</p>
            <p className="text-gray-800">{profile.profile.dateOfBirth || 'N/A'}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-lg font-semibold text-gray-700">Address:</p>
            <p className="text-gray-800">{profile.profile.address || 'N/A'}</p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
        
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;