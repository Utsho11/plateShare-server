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

const getRatingFromDB = async (recipeId: string) => {
  const recipeRatingDB: TRating[] | null = await Rating.find({ recipeId });
  if (!recipeRatingDB) {
    return null;
  }

  const totalRatings: number = recipeRatingDB.reduce(
    (acc, item) => acc + item.rating,
    0
  );

  // Calculate the average
  const averageRating: number = totalRatings / recipeRatingDB.length;

  return averageRating;
};

export const RatingServices = {
  addRatingIntoDB,
  getRatingFromDB,
};
