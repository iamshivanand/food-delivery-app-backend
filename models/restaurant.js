import mongoose from "mongoose";

const dishSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});
const foodTypeSchema = mongoose.Schema({
  name: { type: String, required: true },
  dishes: [dishSchema],
});
const restaurantSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    Image: { type: String, required: true },
    FoodTypes: [ foodTypeSchema ],
    address: { type: String, required: true },
    rating: { type: Number },
    deliveryTime: { type: Number, required: true },
    cost: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Restaurant", restaurantSchema);
