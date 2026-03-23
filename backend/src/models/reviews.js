/*
    Campos:
        idEmployee
        idProducts
        rating
        comment
*/

import mongoose, { Schema, model } from "mongoose";

const reviewsSchema = new Schema({
    idEmployee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employees"
    },
    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    },
    rating: {
        type: Number
    },
    comment: {
        type: String
    }
},{
    timpestamps: true,
    strict: false
  },
);

export default model("reviews", reviewsSchema);