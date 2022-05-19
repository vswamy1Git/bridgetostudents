const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const sharp = require("sharp");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {  

////console.log(req.body);
// [...req.body.ProductSize].map(x =>//console.log(x))
// for(let v of Object.values(req.body.ProductSize)){
//   ////console.log(v.size,v.stock);
// }
  if (req.body.images==undefined) {    
    const _id= "products/"+Math.floor(100000 + Math.random() * 800000);
    const _url = "https://dummyimage.com/600x400/808080/fff.jpg&text="+req.body.name;
    const imagesLinks = [];
    imagesLinks.push({
      public_id: _id,
      url: _url,
    });
   
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    // let productSizereq = [{
    //   size: req.body.ProductSize,
    //   stock:req.body.Stock     
    // }];
    //req.body.ProductSize = productSizereq;
    //console.log("If creating order",req.body);
    const product = await Product.create(req.body);
    ////console.log(product);
    res.status(201).json({
      success: true,
      product,
    });
  } else {
    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
    
    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    // let productSizereq = [{
    //   size: req.body.ProductSize,
    //   stock:req.body.Stock
    // }];
    // req.body.ProductSize = productSizereq;
    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    // //console.log("Else creating order",req.body);
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  }
});

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 100;
  const productsCount = await Product.countDocuments();
  ////console.log(req.query);
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

    ////console.log(apiFeature);

  let products = await apiFeature.query;
  ////console.log(products);

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  
  const products = await Product.find();
  
  res.status(200).json({
    success: true,
    products,
  });
  
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  // //console.log(req.params.id," THis is the product Id for testing")
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  
  // //console.log(product);
  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    // //console.log("before updating stock new values",req.body);
    req.body.images = imagesLinks;
  }
  // let productSizereq = {
  //   "size": req.body.ProductSize,
  //   "stock":req.body.Stock
  // };
  // product &&
  // product.ProductSize &&
  // product.ProductSize.find(
  //   (item) => item.size == ProductSize
  // ) &&
  // product.ProductSize.find((item) => item.size == ProductSize)
  //   .stock <= 0
  //   ? "redColor"
  //   : "greenColor"
  //product.ProductSize.(productSizereq);
  //console.log("before updaiting req.body.ProductSize",req.body.ProductSize);
  //console.log("findindex",product.ProductSize.findIndex(x => x.size == req.body.ProductSize ));
  let index = product.ProductSize.findIndex(x => x.size == req.body.ProductSize );
  //console.log("stock",req.body.Stock);
  product.ProductSize[index].stock = req.body.Stock;
  //console.log("new updated req.body.ProductSize",product.ProductSize);
  req.body.ProductSize = product.ProductSize;
   delete req.body["Stock"];
   delete req.body["Size"];
   
   
  
   //console.log("before updating stock new values",req.body);
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
