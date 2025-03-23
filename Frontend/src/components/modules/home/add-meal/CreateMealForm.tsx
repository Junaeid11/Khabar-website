/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import { useEffect, useState } from "react";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { addMeal } from "@/services/meal";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { getAllCategories } from "@/services/Category";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function CreateMealForm() {
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<{ _id: string; name: string } | null>(null);


    const form = useForm();
    const { formState: { isSubmitting } } = form;

    const allowedDietaryTags = [
        "vegan", "vegetarian", "gluten-free", "keto", "paleo", "halal", "kosher"
    ];

    const tagOptions = allowedDietaryTags.map(tag => ({
        value: tag,
        label: tag.charAt(0).toUpperCase() + tag.slice(1)
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const modifiedData = {
            ...data,
            category: selectedCategory?._id,
            ingredients: typeof data.ingredients === "string" && data.ingredients.trim()
                ? data.ingredients.split(",").map((i: any) => i.trim())
                : [],
            dietaryTags: selectedTags,
            price: parseFloat(data.price) || 0,
            discountPrice: parseFloat(data.discountPrice) || 0,
            stock: parseInt(data.stock) || 0,
            rating: parseFloat(data.rating) || 0,
            ratingCount: parseInt(data.ratingCount) || 0,
            preparationTime: parseInt(data.preparationTime) || 0,
            calories: parseInt(data.calories) || 0,
            protein: parseInt(data.protein) || 0,
            carbs: parseInt(data.carbs) || 0,
            fat: parseInt(data.fat) || 0,
        };

        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(modifiedData));
            if (imageFiles.length > 0) {
                formData.append("images", imageFiles[0]);
            }

            const res = await addMeal(formData);

            if (res?.success) {
                form.reset();
                setSelectedTags([]);
                toast.success(res.message);
            } else {
                toast.error(res?.message);
            }
        } catch (err) {
            toast.error("An error occurred. Please try again.");
        }
    };
      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const { data } = await getAllCategories();
            setCategories(data);
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
        fetchCategories();
      }, []);

    return (
        <div className="rounded-xl flex-grow mx-10 p-5 my-5">
            <h1 className="text-2xl text-violet-400 text-center font-semibold mb-2">Create Meal</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {[
                            { name: "name", label: "Meal Name" },
                            { name: "description", label: "Description" },
                            { name: "slug", label: "Slug" },
                            { name: "ingredients", label: "Ingredients (comma separated)" },
                            { name: "price", label: "Price" },
                            { name: "discountPrice", label: "Discount Price" },
                            { name: "stock", label: "Stock" },
                            { name: "rating", label: "Rating" },
                            { name: "ratingCount", label: "Rating Count" },
                            { name: "preparationTime", label: "Preparation Time (mins)" },
                            { name: "calories", label: "Calories" },
                            { name: "protein", label: "Protein" },
                            { name: "carbs", label: "Carbs" },
                            { name: "fat", label: "Fat" },
                        ].map((field) => (
                            <FormField
                                key={field.name}
                                control={form.control}
                                name={field.name}
                                render={({ field: inputField }) => (
                                    <FormItem>
                                        <FormLabel>{field.label}</FormLabel>
                                        <FormControl>
                                            <Input {...inputField} value={inputField.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                    <div className="mt-4">
                        <FormLabel>Category</FormLabel>
                        <Select
                            options={categories.map((category) => ({
                                value: category._id,
                                label: category.name,
                            }))}
                            onChange={(selectedOption: any) => {
                                setSelectedCategory(categories.find(cat => cat._id === selectedOption.value) || null);
                            }}
                            value={selectedCategory ? { value: selectedCategory._id, label: selectedCategory.name } : null}
                        />
                    </div>

                    <div className="space-y-2 mt-4">
                        <FormLabel className="text-sm font-medium">Dietary Tags</FormLabel>
                        <Select
                            options={tagOptions}
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={(selectedOptions) =>
                                setSelectedTags(Array.isArray(selectedOptions) ? selectedOptions.map(option => option.value) : [])
                            }
                            value={tagOptions.filter(option => selectedTags.includes(option.value))}
                        />
                    </div>

                    {imagePreview.length > 0 ? (
                        <div>
                            <ImagePreviewer
                                setImageFiles={setImageFiles}
                                imagePreview={imagePreview}
                                setImagePreview={setImagePreview}
                                className="mt-8"
                            />
                        </div>
                    ) : (
                        <div className="mt-8">
                            <NMImageUploader
                                setImageFiles={setImageFiles}
                                setImagePreview={setImagePreview}
                                label="Upload Meal Image"
                            />
                        </div>
                    )}

                    <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create Meal"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
