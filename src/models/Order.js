import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    images: [String],
    specifications: {
      mix: [{
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "specifications.mix.type"
        },
        type: {
          type: String,
          required: true,
          enum: ['Product', 'Recipe']
        },
        quantity: Number,
        subtotal: Number
      }],
      filling: [{
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "specifications.filling.type"
        },
        type: {
          type: String,
          required: true,
          enum: ['Product', 'Recipe']
        },
        quantity: Number,
        subtotal: Number
      }],
      cream: [{
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "specifications.cream.type"
        },
        type: {
          type: String,
          required: true,
          enum: ['Product', 'Recipe']
        },
        name: String,
        quantity: Number,
        subtotal: Number
      }],
      decoration: [{
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "specifications.decoration.type"
        },
        type: {
          type: String,
          required: true,
          enum: ['Product', 'Recipe']
        },
        quantity: Number,
        subtotal: Number
      }],
    },
    shape: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shape"
    },
    weight: Number,
    popularity: Number,
    active: Boolean,
    total: Number
  },
  {
    timestamps: true,
    versionKey: false
  }
);

/*orderSchema.virtual('specifications.name', {
  ref: function() { return this.specifications['mix'].name; },
  localField: 'specifications.name',
  foreignField: 'name',
  justOne: true
});*/

export default mongoose.model("Order", orderSchema);
