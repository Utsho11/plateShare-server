import { User } from '../User/user.model';
import { Recipe } from '../Recipe/recipe.model';
import { Blog } from '../Blog/blog.model';
import { USER_TYPE } from '../User/user.constant';

const getPlatformStatsFromDB = async () => {
  const [totalUsers, premiumUsers, totalRecipes, totalAdmins, totalBlogs] =
    await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ type: USER_TYPE.PREMIUM }),
      Recipe.countDocuments({ isDeleted: false }),
      User.countDocuments({ role: 'ADMIN' }),
      Blog.countDocuments({ isDeleted: false }),
    ]);

  const regularUsers = totalUsers - premiumUsers;

  return {
    totalUsers,
    premiumUsers,
    regularUsers,
    totalRecipes,
    totalAdmins,
    totalBlogs,
  };
};

export const StatsServices = { getPlatformStatsFromDB };
