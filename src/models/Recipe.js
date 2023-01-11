import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    products: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: Number,
        subtotal: Number
      }
    ],
    type: [String],
    total: Number
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Recipe", recipeSchema);
