import { Router } from 'express';
import { orderFood } from '../controllers/order_controller/order_controller.js';



const router = new Router();


router.post('/order', orderFood);


export default router;