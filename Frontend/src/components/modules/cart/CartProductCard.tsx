import { Button } from "@/components/ui/button";
import {
  CartProduct,
  decrementOrderQuantity,
  incrementOrderQuantity,
  removeProduct,
  updateDeliverySchedule,
  updateDietary,
} from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CartProductCard({ meal }: { meal: CartProduct }) {
  const dispatch = useAppDispatch();
  const [dietaryPreference, setDietaryPreference] = useState<string>();
  const [deliverySchedule, setDeliverySchedule] = useState<string>();

  const handleIncrementQuantity = (id: string) => {
    dispatch(incrementOrderQuantity(id));
  };

  const handleDecrementQuantity = (id: string) => {
    dispatch(decrementOrderQuantity(id));
  };

  const handleRemoveProduct = (id: string) => {
    dispatch(removeProduct(id));
  };
  const handleDietaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPreference = event.target.value;
    setDietaryPreference(newPreference);
    dispatch(updateDietary(newPreference));
  };

  const handleDeliveryScheduleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSchedule = event.target.value;
    setDeliverySchedule(newSchedule);
    dispatch(updateDeliverySchedule(newSchedule));
  };

  return (
    <div className="bg-white rounded-lg flex p-5 gap-5">
      <div className="h-full w-32 rounded-md overflow-hidden">
        <Image
          src={meal?.imageUrls?.[0]}
          height={200}
          width={200}
          alt="product"
          className="aspect-square object-cover"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <h1 className="text-xl font-semibold">{meal?.name}</h1>
        <div className="flex gap-5 my-2">
          <p>
            <span className="text-gray-500">Stock Availability:</span>{" "}
            <span className="font-semibold">{meal?.stock}</span>
          </p>
        </div>
        <div className="my-2">
          <label className="block text-gray-600 text-sm font-semibold">
            Dietary Preferences:
          </label>
          <input
            type="text"
            value={dietaryPreference ?? ""}
            onChange={handleDietaryChange}
            placeholder="E.g., No spicy food, Vegan, Gluten-free"
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        {/* Delivery Schedule */}
        <div className="my-2">
          <label className="block text-gray-600 text-sm font-semibold">
            Delivery Schedule:
          </label>
          <input
            type="date"
            value={deliverySchedule ?? ""}
            onChange={handleDeliveryScheduleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <hr className="my-1" />
        <hr className="my-1" />
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">
            <p className="text-gray-500 font-semibold">Quantity</p>
            <Button
              onClick={() => handleDecrementQuantity(meal._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Minus />
            </Button>
            <p className="font-semibold text-xl p-2">
              {meal?.orderQuantity}
            </p>
            <Button
              onClick={() => handleIncrementQuantity(meal._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Plus />
            </Button>
            <Button
              onClick={() => handleRemoveProduct(meal._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Trash className="text-red-500/50" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
