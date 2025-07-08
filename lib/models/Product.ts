import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    edition: {type: String, default: "Standard"},
    year: {type: Number},
    img: {type: String},
    genre: {type: [String]}
},
    {timestamps: true}
);

const Product = models.Product || model("Product", ProductSchema)

export default Product