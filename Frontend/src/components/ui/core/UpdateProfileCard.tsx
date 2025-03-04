"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/services/profile";
import ImagePreviewer from "./NMImageUploader/ImagePreviewer";
import NMImageUploader from "./NMImageUploader";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

export default function UpdateProfileCard() {
    const [profile, setProfile] = useState({
        phoneNo: "",
        gender: "",
        dateOfBirth: "",
        address: "",
    });

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const form = useForm();

    const {
        formState: { isSubmitting },
    } = form;
    
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("data", JSON.stringify(profile));
        imageFiles.forEach((file) => {
            formData.append("profilePhoto", file);
        });

        try {
            const res = await updateProfile(formData);
            if (res?.success) {
                toast.success(res.message);
                form.reset();
                } else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <Card className=" mx-auto mt-10 p-6 shadow-2xl rounded-2xl bg-white">
            <CardHeader className="text-2xl font-bold text-center text-gray-800">Update Profile</CardHeader>
            <CardContent className="space-y-6">
                {imagePreview.length > 0 ? (
                    <ImagePreviewer
                        setImageFiles={setImageFiles}
                        imagePreview={imagePreview}
                        setImagePreview={setImagePreview}
                        className="mt-4"
                    />
                ) : (
                    <NMImageUploader
                        setImageFiles={setImageFiles}
                        setImagePreview={setImagePreview}
                        label="Upload Profile Image"
                        className="mt-4"
                    />
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        type="text"
                        name="phoneNo"
                        value={profile.phoneNo}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="p-3 border rounded-lg shadow-sm"
                    />
                    <Input
                        type="text"
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
                        placeholder="Gender"
                        className="p-3 border rounded-lg shadow-sm"
                    />
                    <Input
                        type="date"
                        name="dateOfBirth"
                        value={profile.dateOfBirth}
                        onChange={handleChange}
                        className="p-3 border rounded-lg shadow-sm"
                    />
                    <Input
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="p-3 border rounded-lg shadow-sm"
                    />
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition"> 
                        {isSubmitting ? "Updating..." : "Update Profile"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
