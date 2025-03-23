"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
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
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { updateMealMenu } from "@/services/meal";
import { toast } from "sonner";

import Select from "react-select"; 
import { IMeal, IMealForm } from "@/types/meal";
import { getAllCategories } from "@/services/Category"; // Ensure to have this service

const dietaryTags = ["vegan", "vegetarian", "gluten-free", "keto", "paleo", "halal", "kosher"];
const tagOptions = dietaryTags.map(tag => ({ value: tag, label: tag.charAt(0).toUpperCase() + tag.slice(1) }));

export default function UpdateMealForm({ meal }: { meal: IMeal }) {
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreview, setImagePreview] = useState<string[]>(meal?.imageUrls || []);
    const [selectedTags, setSelectedTags] = useState<string[]>(meal?.dietaryTags || []);
    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

    const form = useForm({
        defaultValues: {
            name: meal?.name || '',
            description: meal?.description || '',
            ingredients: meal?.ingredients || '',
            slug: meal?.slug || '',
            dietaryTags: meal?.dietaryTags || [],
            price: meal?.price || '',
            discountPrice: meal?.discountPrice || '',
            stock: meal?.stock || '',
            rating: meal?.rating || '',
            ratingCount: meal?.ratingCount || '',
            preparationTime: meal?.preparationTime || '',
            calories: meal?.calories || '',
            protein: meal?.protein || '',
            carbs: meal?.carbs || '',
            fat: meal?.fat || '',
            category: meal?.category._id || '' // Setting category id to pre-select it
        }
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                setCategories(response.data);  // Assuming the data is returned as an array
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const { formState: { isSubmitting } } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const modifiedData = {
            ...data,
            ingredients: Array.isArray(data.ingredients) ? data.ingredients : (data.ingredients || "").split(",").map((i: any) => i.trim()),
            dietaryTags: selectedTags,
            price: parseFloat(data.price),
            discountPrice: parseFloat(data.discountPrice),
            stock: parseInt(data.stock),
            rating: parseFloat(data.rating),
            ratingCount: parseInt(data.ratingCount),
            preparationTime: parseInt(data.preparationTime),
            calories: parseInt(data.calories),
            protein: parseInt(data.protein),
            carbs: parseInt(data.carbs),
            fat: parseInt(data.fat),
            category: data.category // Send the selected category ID
        };

        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(modifiedData));
            imageFiles.forEach(file => formData.append("images", file));

            const res = await updateMealMenu(formData, meal._id);
            if (res?.success) {
                form.reset();
                toast.success(res.message);
            } else {
                toast.error(res?.message);
            }
        } catch (err) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="rounded-xl flex-grow mx-2 p-5 my-5">
            <h1 className="text-xl text-center font-semibold mb-2 text-violet-500">Update Meal</h1>
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
                                name={field.name as keyof IMealForm}
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

                    <div className="space-y-2 mt-4">
                        <FormLabel className="text-sm font-medium">Dietary Tags</FormLabel>
                        <Select
                            options={tagOptions}
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={(selectedOptions) =>
                                setSelectedTags(selectedOptions.map(option => option.value))
                            }
                            value={tagOptions.filter(option => selectedTags.includes(option.value))}
                        />
                    </div>

                    <div className="space-y-2 mt-4">
                        <FormLabel className="text-sm font-medium">Category</FormLabel>
                        <Select
                            options={categories.map(category => ({
                                value: category._id,
                                label: category.name
                            }))}
                            value={{
                                value: form.watch('category'),
                                label: categories.find(c => c._id === form.watch('category'))?.name || ''
                            }}
                            onChange={(selectedOption) => form.setValue("category", selectedOption?.value || '')}
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
                        {isSubmitting ? "Updating..." : "Update Meal"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
