import { Schema, model } from "mongoose";
import { IMeal } from "./meal.interface";

const MealSchema = new Schema<IMeal>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String,  unique: true },
    provider: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ingredients: { type: [String], required: true },
    price: { type: Number, required: true },
    dietaryTags: {
      type: [String],
      enum: ["vegan", "vegetarian", "gluten-free", "keto", "paleo", "halal", "kosher"],
      required: true,
    },
    imageUrls: { type: [String], required: true },
    isActive: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    preparationTime: { type: Number },
    calories: { type: Number },
    protein: { type: Number },
    carbs: { type: Number },
    fat: { type: Number },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);
MealSchema.pre<IMeal>('validate', function (next) {
   if (this.isModified('name') && !this.slug) {
      this.slug = this.name
         .toLowerCase()
         .replace(/ /g, '-')
         .replace(/[^\w-]+/g, '');
   }
   next();
});



export default model<IMeal>("Meal", MealSchema);


// Middleware to auto-generate the slug before saving


// productSchema.methods.calculateOfferPrice = async function () {
//    const flashSale = await FlashSale.findOne({ product: this._id });

//    if (flashSale) {
//       const discount = (flashSale.discountPercentage / 100) * this.price;
//       return this.price - discount;
//    }

//    return null; // or you can return 0 or another default value
// };
