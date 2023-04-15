import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
      name:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
      },
      price: {
        type: Number,
        required: true,
      },
      quantity:{
        type: String,
        required: true,
      },
      category:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
      },
      image:{
        type: String,
      }
});

const Product = mongoose.model('product', productSchema);

export default Product;