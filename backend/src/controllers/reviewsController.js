const reviewsController = {};

import reviewsModel from "../models/reviews.js"

//Select
reviewsController.getReviews = async (req, res) =>{
    const reviews = await reviewsModel.find();
    res.json(reviews);
}

//Insert
reviewsController.insertReviews = async(req, res)=>{
    const{idEmployee, idProducts, rating, comment} = req.body;

    const newReview = new reviewsModel({
        idEmployee,
        idProducts,
        rating,
        comment
    })
    
    await newReview.save();

    res.json({message: "Review saved"})
}

//Delete
reviewsController.deleteReviews = async(req, res)=>{
    await reviewsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Review deleted"})
}

//Update
reviewsController.updateReviews = async(req, res)=>{
    const{idEmployee, idProducts, rating, comment} = req.body;

    await reviewsModel.findByIdAndUpdate(
        req.params.id,{
            idEmployee,
            idProducts,
            rating,
            comment
        },
        {new:true}
    );

    res.json({message: "Review Updated"})
}

export default reviewsController;