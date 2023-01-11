import Recipe from "../models/Recipe.js";
import Product from "../models/Product.js";

export const createRecipe = async (req, res) => {
  const { name, description, products, type, total } = req.body;

  try {
    const newRecipe = new Recipe({
      name,
      description,
      type,
      total
    });

    if (products) {
      for(var i = 0; i < products.length; i++) {
        const p_id = products[i]._id || (await Product.findOne({ name: products[i]['name'] }))._id;
        newRecipe.products.push({
          "_id": p_id,
          "quantity": products[i].quantity,
          "subtotal": products[i].subtotal
        });
      }
    } else {
      return res.status(500).json({"message": "Products empty"});
    }

    const recipeSaved = await newRecipe.save();

    const c = await Recipe.findOne({_id: recipeSaved._id}).populate({
      path: 'products._id'
    });
    console.log(c.products);

    res.status(201).json(recipeSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getRecipeById = async (req, res) => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);
  res.status(200).json(recipe);
};

export const getRecipes = async (req, res) => {
  const recipes = await Recipe.find();
  return res.json(recipes);
};

export const updateRecipeById = async (req, res) => {
  const { name, description, products, type, total } = req.body;

  try {
    req.body.products = [];

    if (products) {
      for(var i = 0; i < products.length; i++) {
        const p = await Product.findOne({ name: { $in: products[i]['name'] } });
        req.body.products.push({
          "_id": p._id,
          "quantity": products[i].quantity,
          "subtotal": products[i].subtotal
        });
      }
    } else {
      return res.status(500).json({"message": "Products empty"});
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      req.body,
      {
        new: true,
      }
    );

    res.status(204).json(updatedRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const deleteRecipeById = async (req, res) => {
  const { recipeId } = req.params;

  await Recipe.findByIdAndDelete(recipeId);

  // code 200 is ok too
  res.status(204).json();
};
