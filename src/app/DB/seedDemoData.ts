import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import config from '../config';
import { User } from '../modules/User/user.model';
import { Recipe } from '../modules/Recipe/recipe.model';
import { Community } from '../modules/Community/community.model';
import { Vote } from '../modules/Vote/vote.model';
import { Comment } from '../modules/Comment/comment.model';
import { USER_ROLE, USER_STATUS, USER_TYPE } from '../modules/User/user.constant';
import { RECIPE_CATEGORY, RECIPE_STATUS, RECIPE_TYPE } from '../modules/Recipe/recipe.constant';

const seedDemoData = async () => {
  try {
    const mongoUri = config.db_url || 'mongodb://localhost:27017/plateshare';
    console.log('Connecting to MongoDB at:', mongoUri);
    await mongoose.connect(mongoUri);

    console.log('Clearing existing demo data...');
    await User.deleteMany({});
    await Recipe.deleteMany({});
    await Community.deleteMany({});
    await Vote.deleteMany({});
    await Comment.deleteMany({});

    const saltRounds = Number(config.bcrypt_salt_rounds) || 10;
    const defaultUserPass = await bcryptjs.hash('user123456', saltRounds);
    const defaultAdminPass = await bcryptjs.hash('admin123456', saltRounds);

    console.log('Seeding demo users...');
    const adminUser = await User.create({
      firstName: 'PlateShare',
      lastName: 'Admin',
      email: 'admin@plateshare.com',
      password: defaultAdminPass,
      role: USER_ROLE.ADMIN,
      status: USER_STATUS.ACTIVE,
      type: USER_TYPE.PREMIUM,
      age: 30,
      location: 'Dhaka, Bangladesh',
      mobileNumber: '+8801700000000',
      profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    });

    const chefMarco = await User.create({
      firstName: 'Marco',
      lastName: 'Rossi',
      email: 'marco@plateshare.com',
      password: defaultUserPass,
      role: USER_ROLE.USER,
      status: USER_STATUS.ACTIVE,
      type: USER_TYPE.PREMIUM,
      age: 38,
      location: 'Rome, Italy',
      mobileNumber: '+39066987000',
      profilePhoto: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400',
    });

    const chefAisha = await User.create({
      firstName: 'Aisha',
      lastName: 'Rahman',
      email: 'aisha@plateshare.com',
      password: defaultUserPass,
      role: USER_ROLE.USER,
      status: USER_STATUS.ACTIVE,
      type: USER_TYPE.PREMIUM,
      age: 29,
      location: 'Dhaka, Bangladesh',
      mobileNumber: '+8801811111111',
      profilePhoto: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400',
    });

    const chefKenji = await User.create({
      firstName: 'Kenji',
      lastName: 'Takahashi',
      email: 'kenji@plateshare.com',
      password: defaultUserPass,
      role: USER_ROLE.USER,
      status: USER_STATUS.ACTIVE,
      type: USER_TYPE.PREMIUM,
      age: 34,
      location: 'Tokyo, Japan',
      mobileNumber: '+81335803111',
      profilePhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    });

    const demoUser = await User.create({
      firstName: 'Utsho',
      lastName: 'Roy',
      email: 'utsho@plateshare.com',
      password: defaultUserPass,
      role: USER_ROLE.USER,
      status: USER_STATUS.ACTIVE,
      type: USER_TYPE.REGULAR,
      age: 25,
      location: 'Dhaka, Bangladesh',
      mobileNumber: '+8801922222222',
      profilePhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    });

    console.log('Seeding gourmet recipes...');
    const demoRecipes = [
      {
        title: 'Creamy Tuscan Garlic Chicken',
        description: 'Pan-seared chicken breasts smothered in a rich garlic, sundried tomato, and spinach cream sauce. A restaurant-quality dish ready in 25 minutes.',
        category: RECIPE_CATEGORY.DINNER,
        recipeStatus: RECIPE_STATUS.PREMIUM,
        recipeType: RECIPE_TYPE.NON_VEG,
        cookingTime: '25 minutes',
        author: chefMarco._id,
        images: [
          'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800',
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
        ],
        ingredients: [
          { name: 'Boneless Chicken Breasts', quantity: '500g' },
          { name: 'Heavy Cream', quantity: '1 cup' },
          { name: 'Garlic (minced)', quantity: '4 cloves' },
          { name: 'Sundried Tomatoes', quantity: '½ cup' },
          { name: 'Baby Spinach', quantity: '2 cups' },
          { name: 'Parmesan Cheese', quantity: '½ cup' },
          { name: 'Olive Oil', quantity: '2 tbsp' },
        ],
        instructions: [
          { step: 'Season chicken breasts with salt, black pepper, and Italian herbs.' },
          { step: 'Heat olive oil in a skillet over medium-high heat and sear chicken breasts 5 minutes per side until golden brown.' },
          { step: 'Remove chicken and set aside. In the same skillet, saute garlic and sundried tomatoes for 1 minute.' },
          { step: 'Pour in heavy cream and chicken broth. Bring to a gentle simmer, then stir in grated Parmesan cheese until smooth.' },
          { step: 'Add baby spinach leaves and let wilt for 2 minutes. Return chicken breasts to the sauce and simmer for 3 minutes before serving.' },
        ],
      },
      {
        title: 'Authentic Tonkotsu Ramen Bowl',
        description: 'Rich and savory pork bone broth with springy ramen noodles, chashu pork belly, soft-boiled marinated egg, and fresh green onions.',
        category: RECIPE_CATEGORY.LUNCH,
        recipeStatus: RECIPE_STATUS.PREMIUM,
        recipeType: RECIPE_TYPE.NON_VEG,
        cookingTime: '45 minutes',
        author: chefKenji._id,
        images: [
          'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
          'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=800',
        ],
        ingredients: [
          { name: 'Ramen Noodles', quantity: '200g' },
          { name: 'Tonkotsu Broth Base', quantity: '3 cups' },
          { name: 'Chashu Pork Slice', quantity: '4 slices' },
          { name: 'Ajitsuke Tamago (Soft Egg)', quantity: '1 whole' },
          { name: 'Green Onion', quantity: '2 stalks (chopped)' },
          { name: 'Nori Seaweed Sheet', quantity: '2 sheets' },
          { name: 'Sesame Oil', quantity: '1 tsp' },
        ],
        instructions: [
          { step: 'Bring Tonkotsu broth to a simmer in a pot and whisk in soy tare seasoning.' },
          { step: 'Boil ramen noodles in a separate pot for 2-3 minutes until al dente.' },
          { step: 'Drain noodles thoroughly and place into deep ramen serving bowls.' },
          { step: 'Ladle boiling broth over noodles. Top with chashu pork slices, halved marinated egg, scallions, and nori sheets.' },
        ],
      },
      {
        title: 'Traditional Bangladeshi Kacchi Biryani',
        description: 'Aromatic basmati rice cooked with marinated tender mutton, potatoes, saffron, ghee, and exotic whole spices. A royal festive dish.',
        category: RECIPE_CATEGORY.LUNCH,
        recipeStatus: RECIPE_STATUS.PREMIUM,
        recipeType: RECIPE_TYPE.NON_VEG,
        cookingTime: '90 minutes',
        author: chefAisha._id,
        images: [
          'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
          'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800',
        ],
        ingredients: [
          { name: 'Mutton (cut into large pieces)', quantity: '1 kg' },
          { name: 'Aromatic Kalijira/Basmati Rice', quantity: '750g' },
          { name: 'Fried Onions (Beresta)', quantity: '1 cup' },
          { name: 'Yogurt', quantity: '1 cup' },
          { name: 'Ghee (Clarified Butter)', quantity: '4 tbsp' },
          { name: 'Shahi Garam Masala', quantity: '2 tbsp' },
          { name: 'Saffron & Milk', quantity: '½ cup' },
          { name: 'Potatoes (fried)', quantity: '4 whole' },
        ],
        instructions: [
          { step: 'Marinate mutton with yogurt, ginger paste, garlic paste, papaya paste, and biryani spices for 2 hours.' },
          { step: 'Parboil rice with whole spices (cardamom, cinnamon, cloves, bay leaves) until 70% cooked.' },
          { step: 'Layer marinated raw meat at the bottom of a heavy handi, top with fried potatoes, fried onions, and parboiled rice.' },
          { step: 'Drizzle saffron milk, kewra water, and ghee over the top layer. Seal lid with dough and cook on low heat (Dum) for 1 hour.' },
        ],
      },
      {
        title: 'Berry Honey Granola Yogurt Bowl',
        description: 'Creamy Greek yogurt topped with crunchy organic granola, fresh blueberries, strawberries, chia seeds, and raw wild honey.',
        category: RECIPE_CATEGORY.BREAKFAST,
        recipeStatus: RECIPE_STATUS.REGULAR,
        recipeType: RECIPE_TYPE.VEG,
        cookingTime: '10 minutes',
        author: chefAisha._id,
        images: [
          'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
        ],
        ingredients: [
          { name: 'Greek Yogurt', quantity: '1.5 cups' },
          { name: 'Honey Roasted Granola', quantity: '½ cup' },
          { name: 'Fresh Blueberries', quantity: '¼ cup' },
          { name: 'Strawberries (sliced)', quantity: '¼ cup' },
          { name: 'Raw Honey', quantity: '1 tbsp' },
          { name: 'Chia Seeds', quantity: '1 tsp' },
        ],
        instructions: [
          { step: 'Spoon thick Greek yogurt into a serving bowl.' },
          { step: 'Arrange fresh blueberries, sliced strawberries, and crunchy granola side by side.' },
          { step: 'Drizzle raw honey over the bowl and sprinkle with chia seeds before enjoying.' },
        ],
      },
      {
        title: 'Avocado Toast with Poached Eggs',
        description: 'Artisanal sourdough toast topped with mashed lime avocado, runny poached eggs, chili flakes, and microgreens.',
        category: RECIPE_CATEGORY.BREAKFAST,
        recipeStatus: RECIPE_STATUS.REGULAR,
        recipeType: RECIPE_TYPE.VEG,
        cookingTime: '15 minutes',
        author: demoUser._id,
        images: [
          'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
        ],
        ingredients: [
          { name: 'Sourdough Bread', quantity: '2 slices' },
          { name: 'Ripe Avocado', quantity: '1 whole' },
          { name: 'Fresh Eggs', quantity: '2 whole' },
          { name: 'Lime Juice', quantity: '1 tbsp' },
          { name: 'Red Pepper Flakes', quantity: '½ tsp' },
          { name: 'Extra Virgin Olive Oil', quantity: '1 tbsp' },
        ],
        instructions: [
          { step: 'Toast sourdough slices until golden and crisp.' },
          { step: 'Mash avocado with lime juice, sea salt, and black pepper in a small bowl.' },
          { step: 'Poach eggs in simmering water with vinegar for 3 minutes until egg whites are set but yolk is runny.' },
          { step: 'Spread mashed avocado over toast, top with poached eggs, red pepper flakes, and olive oil.' },
        ],
      },
      {
        title: 'Vegan Quinoa & Roasted Veggie Buddha Bowl',
        description: 'Nutritious plant-based bowl packed with fluffy quinoa, roasted chickpeas, sweet potatoes, kale, and creamy tahini dressing.',
        category: RECIPE_CATEGORY.VEGAN,
        recipeStatus: RECIPE_STATUS.REGULAR,
        recipeType: RECIPE_TYPE.VEG,
        cookingTime: '30 minutes',
        author: chefAisha._id,
        images: [
          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
        ],
        ingredients: [
          { name: 'Cooked Quinoa', quantity: '1 cup' },
          { name: 'Sweet Potato (cubed & roasted)', quantity: '1 medium' },
          { name: 'Chickpeas (roasted)', quantity: '1 cup' },
          { name: 'Fresh Kale', quantity: '2 cups' },
          { name: 'Tahini Paste', quantity: '2 tbsp' },
          { name: 'Lemon Juice', quantity: '1 tbsp' },
        ],
        instructions: [
          { step: 'Toss sweet potatoes and chickpeas with olive oil, paprika, cumin, salt, and roast at 200°C for 25 minutes.' },
          { step: 'Massage kale leaves with olive oil and lemon juice.' },
          { step: 'Assemble quinoa base in bowls, layer roasted sweet potatoes, chickpeas, and massaged kale.' },
          { step: 'Whisk tahini with warm water, lemon juice, garlic, and drizzle generously over the bowl.' },
        ],
      },
      {
        title: 'Decadent Molten Chocolate Lava Cake',
        description: 'Warm chocolate cake with a gooey, molten dark chocolate center. Served hot with vanilla bean ice cream.',
        category: RECIPE_CATEGORY.DESSERT,
        recipeStatus: RECIPE_STATUS.PREMIUM,
        recipeType: RECIPE_TYPE.VEG,
        cookingTime: '20 minutes',
        author: chefAisha._id,
        images: [
          'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800',
        ],
        ingredients: [
          { name: 'Dark Chocolate (70%)', quantity: '150g' },
          { name: 'Unsalted Butter', quantity: '100g' },
          { name: 'Eggs', quantity: '2 whole + 2 yolks' },
          { name: 'Caster Sugar', quantity: '⅓ cup' },
          { name: 'All-Purpose Flour', quantity: '3 tbsp' },
          { name: 'Vanilla Bean Ice Cream', quantity: '2 scoops' },
        ],
        instructions: [
          { step: 'Melt dark chocolate and butter together in a heatproof bowl over simmering water.' },
          { step: 'Whisk eggs, egg yolks, and sugar together until pale and thickened.' },
          { step: 'Fold melted chocolate mixture and flour gently into the egg mixture.' },
          { step: 'Divide batter into buttered and cocoa-dusted ramekins. Bake at 200°C for 12 minutes.' },
          { step: 'Invert onto plates immediately and serve with a scoop of vanilla ice cream.' },
        ],
      },
      {
        title: 'Crispy Garlic Parmesan Air-Fryer Wings',
        description: 'Ultra-crispy chicken wings coated in melted garlic butter, fresh parsley, and grated Parmesan cheese made fast in the air fryer.',
        category: RECIPE_CATEGORY.SNACK,
        recipeStatus: RECIPE_STATUS.REGULAR,
        recipeType: RECIPE_TYPE.NON_VEG,
        cookingTime: '25 minutes',
        author: chefMarco._id,
        images: [
          'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800',
        ],
        ingredients: [
          { name: 'Chicken Wings (split)', quantity: '800g' },
          { name: 'Baking Powder', quantity: '1 tbsp' },
          { name: 'Garlic Powder', quantity: '1 tsp' },
          { name: 'Melted Butter', quantity: '3 tbsp' },
          { name: 'Minced Fresh Garlic', quantity: '3 cloves' },
          { name: 'Parmesan Cheese (grated)', quantity: '½ cup' },
        ],
        instructions: [
          { step: 'Pat chicken wings completely dry with paper towels.' },
          { step: 'Toss wings with baking powder, garlic powder, salt, and black pepper.' },
          { step: 'Air fry at 200°C for 20 minutes, flipping halfway through until skin is shattered crispy.' },
          { step: 'Toss hot wings in melted garlic butter, chopped parsley, and grated Parmesan cheese before serving.' },
        ],
      },
    ];

    const createdRecipes = await Recipe.insertMany(demoRecipes);
    console.log(`Successfully seeded ${createdRecipes.length} recipes!`);

    console.log('Seeding demo votes...');
    await Vote.create([
      { user: chefMarco._id, recipe: createdRecipes[0]._id, voteType: 'UPVOTE' },
      { user: chefAisha._id, recipe: createdRecipes[0]._id, voteType: 'UPVOTE' },
      { user: demoUser._id, recipe: createdRecipes[0]._id, voteType: 'UPVOTE' },
      { user: chefKenji._id, recipe: createdRecipes[1]._id, voteType: 'UPVOTE' },
      { user: demoUser._id, recipe: createdRecipes[1]._id, voteType: 'UPVOTE' },
    ]);

    console.log('Seeding demo communities...');
    await Community.create([
      { name: 'Healthy Cooking', creator: chefAisha._id },
      { name: 'Budget Meals', creator: demoUser._id },
      { name: 'Dessert Lovers', creator: chefAisha._id },
      { name: 'Italian Masters', creator: chefMarco._id },
    ]);

    console.log('----------------------------------------------------');
    console.log('✅ Demo database seeding completed successfully!');
    console.log('----------------------------------------------------');
    console.log('Login Credentials for testing:');
    console.log('👑 Admin: admin@plateshare.com | Password: admin123456');
    console.log('👨‍🍳 Chef Marco: marco@plateshare.com | Password: user123456');
    console.log('👩‍🍳 Chef Aisha: aisha@plateshare.com | Password: user123456');
    console.log('🧑‍🍳 Chef Kenji: kenji@plateshare.com | Password: user123456');
    console.log('👤 User Utsho: utsho@plateshare.com | Password: user123456');
    console.log('----------------------------------------------------');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding demo data:', error);
    process.exit(1);
  }
};

seedDemoData();
