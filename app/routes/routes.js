import express from 'express';
import ProductController from '../controllers/productController';
import FarmerController from '../controllers/farmerController';
import AuthController from '../controllers/authController';
import { 
    Authenticate, 
    verifyAdmin 
} from '../middleware/middleware';

// defining middleware routes
const router = express.Router();

// Users routes
router.post('/api/auth/signup', AuthController.signup);
router.post('/api/auth/login', AuthController.login);

// Products routes
router.post('/api/auth/product/', Authenticate, verifyAdmin, ProductController.addProduct);
router.get('/api/auth/products/', Authenticate, ProductController.getAllProducts);
router.get('/api/auth/product/:id', Authenticate, ProductController.getOneProduct); 
router.put('/api/auth/product/:id', Authenticate, verifyAdmin, ProductController.updateProduct);
router.delete('/api/auth/product/:id', Authenticate, verifyAdmin,  ProductController.deleteProduct);

// Farmers routes
router.post('/api/auth/farmer/', Authenticate, verifyAdmin, FarmerController.addFarmer);
router.get('/api/auth/farmers/', Authenticate, FarmerController.getAllFarmers);
router.get('/api/auth/farmer/:id', Authenticate, FarmerController.getOneFarmer); 
router.put('/api/auth/farmer/:id', Authenticate, verifyAdmin,  FarmerController.updateFarmer);
router.delete('/api/auth/farmer/:id', Authenticate, verifyAdmin, FarmerController.deleteFarmer);

export default router;