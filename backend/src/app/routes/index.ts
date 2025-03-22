import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { MealRoutes } from '../modules/Meal/meal.routes';
import { OrderRoutes } from '../modules/order/order.routes';
import { ReviewRoutes } from '../modules/review/review.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { BlogRoute } from '../modules/Blog/blog.route';
const router = Router();

const moduleRoutes = [
   {
      path: '/',
      route: UserRoutes,
   },
   {
      path: '/auth',
      route: AuthRoutes,
   },
   {
      path: '/',
      route: MealRoutes,
   },
   {
      path: '/',
      route: CategoryRoutes,
   },
 
   {
      path: '/',
      route: OrderRoutes,
   },
  
 
   {
      path: '/review',
      route: ReviewRoutes,
   },
   {
      path: '/blogs',
      route: BlogRoute,
   },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
