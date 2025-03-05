import { Router } from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '../user/user.interface';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middleware/bodyParser';
import {  MealController } from './meal.controller';
import validateRequest from '../../middleware/validateRequest';
import { productValidation } from './meal.validation';

const router = Router();

router.get('/menu', MealController.getAllMeal);


router.get('/menu/:mealId', MealController.getSingleMeal);


router.post(
   '/menu',
   auth(UserRole.PROVIDER),
   multerUpload.fields([{ name: 'images' }]),
   parseBody,
   validateRequest(productValidation.createMealValidationSchema),
   MealController.CreateMeal
);

router.patch(
   '/:mealId',
   auth(UserRole.PROVIDER),
   multerUpload.fields([{ name: 'images' }]),
   parseBody,
   MealController.updateProduct
);

router.delete(
   '/:mealId',
   auth(UserRole.PROVIDER),
   MealController.deleteProduct
);

export const MealRoutes = router;
