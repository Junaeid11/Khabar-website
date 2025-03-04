import { Router } from 'express';
import { OrderController } from './order.controller';
import auth from '../../middleware/auth';
import { UserRole } from '../user/user.interface';

const router = Router();

// Define routes
router.get(
    '/order',
    auth(UserRole.PROVIDER),
    OrderController.getMyShopOrders
);

router.get(
    '/my-orders',
    auth(UserRole.USER),
    OrderController.getMyOrders
);

router.get(
    '/:orderId',
    auth(UserRole.USER),
    OrderController.getOrderDetails
);

router.post(
    '/',
    auth(UserRole.USER),
    OrderController.createOrder
)

router.patch(
    '/:orderId',
    auth(UserRole.PROVIDER),
    OrderController.changeOrderStatus
)
router.put(
    '/:orderId',
    auth(UserRole.PROVIDER),
    OrderController.changeStatus
)

export const OrderRoutes = router;
