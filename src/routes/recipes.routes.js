import { Router } from "express";
import {
  getRecipes,
  createRecipe,
  updateRecipeById,
  deleteRecipeById,
  getRecipeById,
} from "../controllers/recipes.controller.js";
import { verifyToken, isModerator, isAdmin } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getRecipes);

router.get("/:recipeId", getRecipeById);

router.post("/", [verifyToken, isModerator], createRecipe);

router.put("/:recipeId", [verifyToken, isModerator], updateRecipeById);

router.delete("/:recipeId", [verifyToken, isAdmin], deleteRecipeById);

export default router;
