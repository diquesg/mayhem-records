import { Schema, models, model } from "mongoose";

const DescriptionSchema = new Schema({
    info: {type: String},
    tracklist: [{
        title: {type: String},
        tracks: {type: [String]}
    }]
}, { _id: false });

const ProductSchema = new Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    description: DescriptionSchema,
    price: {type: Number, required: true},
    edition: {type: String, default: "Standard"},
    year: {type: Number},
    img: {type: String},
    genre: {type: [String]},
    sales: {type: Number, default: 0},
},
    {timestamps: true}
);



const Product = models.Product || model("Product", ProductSchema)

export default Product