import { Schema, model, Document, Types } from "mongoose";
import { ICategory } from "./category.interface";

interface ICategoryDocument extends Document, ICategory { }

const categorySchema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      enum: [
        "Italian",
        "Chinese",
        "Indian",
        "Mexican",
        "Thai",
        "Japanese",
        "Mediterranean",
        "American",
      ],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
     

    },
    description: {
      type: String,
      trim: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // createdBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    icon: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre<ICategory>("validate", function (next) {
  if (this instanceof Document) {
    if (this.isModified("name") && !this.slug) {
      this.slug = this.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    }
  }
  next();
});

export const Category = model<ICategoryDocument>("Category", categorySchema);
