import express from 'express';
import ProductController from '../controllers/productController';
import AuthController from '../controllers/authController';
// import { 
//     Authenticate, 
//     verifyAdmin 
// } from '../middleware/middleware';

// defining middleware routes
const router = express.Router();

// Users routes
router.post('/api/auth/signup', AuthController.signup);
router.post('/api/auth/login', AuthController.login);

// Products routes
router.post('/api/auth/product/', ProductController.addProduct);
router.get('/api/auth/products/', ProductController.getAllProducts);
router.get('/api/auth/product/:id', ProductController.getOneProduct); 
router.put('/api/auth/product/:id', ProductController.updateProduct);
router.delete('/api/auth/product/:id', ProductController.deleteProduct);

export default router;