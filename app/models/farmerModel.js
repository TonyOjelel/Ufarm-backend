import mongoose from 'mongoose';
import validator from 'validator';

const Schema = mongoose.Schema;

const farmerSchema = new Schema({
      fullname:{
        type: String,
        trim: true,
        lowercase: true
      },
      Gender: {
        type: String,
        trim: true,
        lowercase: true
      },
      DOB: {
        type: String,
        required: true,
      },
      Activities: {
        type: String,
        trim: true,
        lowercase: true
      },
      PhoneNumber: {
        type: String,
        required: true,
        lowercase: true
      },
      NIN: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
      },
      Ward: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
      },
      role: {
        type: String,
        default: 'farmerOne',
        lowercase: true,
        trim: true
      }
});

const Farmer = mongoose.model('farmer', farmerSchema);

export default Farmer;