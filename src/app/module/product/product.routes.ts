import  express  from "express";
import { productController } from "./product.controller";
import validateRequist from "../../middlewares/validateRequist";
import { productValidation } from "./product.validation";


const router = express.Router()


router.post("/create", validateRequist(productValidation.createProductZodValidationSchema) ,productController.createProduct);     // Add Product (Admin)
router.get("/all", productController.getAllProducts);          // Get All Products
router.get("/:id", productController.getProductById);   // Get Single Product
router.put("/update/:id", productController.updateProduct);      // Update Product (Admin)
router.delete("/delete/:id", productController.deleteProduct);   // Delete Product (Admin)




export const productRoute = router