import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productcontroller.js";

const router=express.Router();


//show route
router.get("/",getProducts);
 

//create route
router.post("/",createProduct);

//update route
router.put("/:id",updateProduct);


// delete route
router.delete("/:id",deleteProduct);

export default router;

