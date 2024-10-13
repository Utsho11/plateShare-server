import { TRecipe } from '../Recipe/recipe.interface';
import { Recipe } from '../Recipe/recipe.model';
import { TRating } from './rating.interface';
import { Rating } from './rating.model';

const addRatingIntoDB = async (
  recipeId: string,
  userId: string,
  rating: number
) => {
  // Validate the rating value
  if (rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }

  // Check if the recipe exists
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new Error('Recipe not found');
  }

  // Find the existing rating by recipeId and userId
  const existingRating = await Rating.findOne({ recipeId, userId });

  let newRating;
  if (!existingRating) {
    // Create a new rating
    newRating = await Rating.create({ recipeId, userId, rating });
  } else {
    // Update the existing rating
    newRating = await Rating.findOneAndUpdate(
      { recipeId, userId },
      { rating },
      { new: true }
    );
  }

  return newRating;
};

const getRatingFromDB = async () => {
  // Fetch all recipes and ratings from the database
  const recipeRatingDB: TRating[] = await Rating.find(); // Get all ratings
  const recipeDB: TRecipe[] = await Recipe.find(); // Get all recipes

  if (!recipeRatingDB || !recipeDB) {
    return null;
  }

  // Iterate through each recipe to calculate its average rating
  const averageRatings = recipeDB.map((recipe) => {
    // Filter ratings that belong to the current recipe
    const recipeRatings = recipeRatingDB.filter(
      (rating) =>
        rating.recipeId && rating.recipeId.toString() === recipe._id.toString()
    );

    // If the recipe has ratings, calculate the average
    const totalRatings = recipeRatings.reduce(
      (acc, item) => acc + item.rating,
      0
    );

    const averageRating =
      recipeRatings.length > 0 ? totalRatings / recipeRatings.length : 0;

    // Return the recipe with its average rating
    return {
      recipeId: recipe._id,
      recipeName: recipe.name,
      averageRating: averageRating,
      totalRatings: recipeRatings.length, // Optionally include the count of ratings
    };
  });


  return averageRatings; // This will be an array of recipes with their average ratings
};

export const RatingServices = {
  addRatingIntoDB,
  getRatingFromDB,
};
