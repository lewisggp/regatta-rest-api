import mongoose from "mongoose";

const shapeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    width: Number,
    height: Number,
    depth: Number,
    minRecipe: Number,
    maxRecipe: Number,
    filling: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Shape", shapeSchema);
