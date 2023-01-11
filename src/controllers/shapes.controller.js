import Shape from "../models/Shape.js";

export const createShape = async (req, res) => {
  const { name, width, height, depth, minRecipe, maxRecipe, filling } = req.body;

  try {
    const newShape = new Shape({
      name, 
      width, 
      height, 
      depth, 
      minRecipe, 
      maxRecipe, 
      filling
    });

    const shapeSaved = await newShape.save();

    res.status(201).json(shapeSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getShapeById = async (req, res) => {
  const { shapeId } = req.params;

  const shape = await Shape.findById(shapeId);
  res.status(200).json(shape);
};

export const getShapes = async (req, res) => {
  const shapes = await Shape.find();
  return res.json(shapes);
};

export const updateShapeById = async (req, res) => {
  const updatedShape = await Shape.findByIdAndUpdate(
    req.params.shapeId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedShape);
};

export const deleteShapeById = async (req, res) => {
  const { shapeId } = req.params;

  await Shape.findByIdAndDelete(shapeId);

  // code 200 is ok too
  res.status(204).json();
};
