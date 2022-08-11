const asyncHandler = require('express-async-handler');
const productModel = require("../models/productModel")



const getAllProduct = asyncHandler(async(req,res)=>{
   const product = await productModel.find({});
   if(product){
    res.json(product)
   }
});



const postProduct = asyncHandler(async(req,res)=>{
    const {user, name, image, brand, category, description, reviews, review_name, comment,  rating , numReviews, price, countInStock} = req.body;
    
    // kt sản phẩm có trong hệ thống k 
    const Exist = await productModel.findOne({name});
    if(Exist) {
        res.status(401);
        throw new Error("đã có sản phẩm trong hệ thống");
    }

    const newProduct = await productModel.create({user, name, image, brand, category, description, reviews, review_name, comment, rating, numReviews, price, countInStock});
    if(newProduct){
         
        res.json({
        
            _id:newProduct.id,
        user:newProduct.user,
        name:newProduct.name,
        image:newProduct.image,
        brand:newProduct.brand,
        category:newProduct.category,
        description:newProduct.description,
        reviews:{
           review_name:newProduct.reivew_name,
           rating:newProduct.rating,
           comment:newProduct.comment
        },
        rating:newProduct.rating,
        numReviews:newProduct.numReviews,
        price:newProduct.price,
        countInStock:newProduct.countInStock
        })
    }else {
        res.status(400);
        throw new Error('Invalid product data');
    }
});



const getProductById = asyncHandler(async(req,res)=>{
   const product = await productModel.findOne({_id:req.params.id});
   if(product){
    res.json({
        _id:product.id,
        user:product.user,
        name:product.name,
        image:product.image,
        brand:product.brand,
        category:product.category,
        description:product.description,
        reviews:{
            review_name:product.review_name,
            rating:product.rating,
            comment:product.comment,
            user:product.user
        },
        rating:product.rating,
        numReviews:product.numReviews,
        price:product.price,
        countInStock:product.countInStock
    })
   }
});


const deleteProduct = asyncHandler(async(req,res)=>{
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (product) {
        res.json({
            message: 'product removed'
        });
    } else {
        res.status(400);
        throw new Error('product not found');
    }
}
);

const putProduct = asyncHandler(async(req,res)=>{
  const product = await productModel.findById(req.params.id)

  if (product) {
       product.name = req.body.name || product.name,
       product.image = req.body.image || product.image,
       product.brand = req.body.brand || product.brand,
       product.category = req.body.category || product.category,
       product.description = req.body.description|| product.description,
       product.rating = req.body.rating || product.rating,
       product.numReviews = req.body.numReviews || product.numReviews,
       product.price = req.body.price|| product.price,
       product.countInStock = req.body.countInStock|| product.countInStock

       const updateProduct = await product.save();
       name = updateProduct.name,
       image = updateProduct.image,
       brand = updateProduct.brand,
       category = updateProduct.category,
       description = updateProduct.description,
       rating = updateProduct.rating,
       numReviews = updateProduct.numReviews,
       price = updateProduct.price,
       countInStock = updateProduct.countInStock

       res.json(updateProduct);
  }
  else{
    res.status(401);
    throw new Error('product not found');
  }


    
})

module.exports = {
    getAllProduct,
    postProduct,
    getProductById,
    deleteProduct,
    putProduct
}
