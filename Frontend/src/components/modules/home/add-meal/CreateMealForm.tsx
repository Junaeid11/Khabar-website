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
import { Textarea } from "@/components/ui/textarea";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import { useState } from "react";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { addMeal } from "@/services/meal";
import { toast } from "sonner";
import Select from "react-select"; 

export default function CreateMealForm() {
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]); 

    const form = useForm();

    const {
        formState: { isSubmitting },
    } = form;

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
            ingredients: Array.isArray(data.ingredients) ? data.ingredients : data.ingredients.split(",").map((i :any) => i.trim()),
            dietaryTags: selectedTags,
            price: parseFloat(data.price),
            stock: parseInt(data.stock),
            rating: parseFloat(data.rating),
            ratingCount: parseInt(data.ratingCount),
            preparationTime: parseInt(data.preparationTime),
            calories: parseInt(data.calories),
            protein: parseInt(data.protein),
            carbs: parseInt(data.carbs),
            fat: parseInt(data.fat),
        };

        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(modifiedData));
            if (imageFiles.length > 0) {
                formData.append("images", imageFiles[0]); 
            }

            const res = await addMeal(formData);
            
            

            if (res?.success) {
                form.reset()
                toast.success(res.message );
            } else {
                toast.error(res?.message );
            }
        } catch (err) {
            toast.error("An error occurred. Please try again.",);
        }
    };

    return (
        <div className="rounded-xl flex-grow mx-10 p-5 my-5">
            <h1 className="text-xl font-semibold mb-2">Create Meal</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {[ 
                            { name: "name", label: "Meal Name" },
                            { name: "description", label: "Description" },
                            { name: "slug", label: "Slug" },
                            { name: "ingredients", label: "Ingredients (comma separated)" },
                            { name: "price", label: "Price" },
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
