import farmerModel from '../models/farmerModel';
import connection from '../connection';
// import cloudinary from '../cloudinary';

class FarmerController {  
  /**
   * Create A Farmer
   * @param {object} req 
   * @param {object} res
   * @returns {object} Return status code 201 and Farmer object 
   */
  static async addFarmer(req, res) {
    try {
      const Farmer = await farmerModel.findOne({ email: req.body.email }).exec();
      if(Farmer) {
          return res.status(409).send(
            { 
              status: 409,
              message: 'Farmer with that email already exists',
            }
          );
      }
    //   const getImage = await cloudinary.uploads(req.body.image, 'Assets');
    //   req.body.image = getImage.url;
      const data = new farmerModel(req.body);
      await data.save();
      return res.status(201).send({
        status: 201,
        message: 'Farmer successfully registered',
        data
    });
    } catch(error) {
        return res.status(400).send(
          {
            status: 400,
            message: 'Oops failed to add a Farmer',
            error
        });
    }
  }

  /**
   * Get All Farmers
   * @param {object} req 
   * @param {object} res 
   * @returns {array} Return status code 200 and Farmers array
   */
  static async getAllFarmers(req, res) {
    try {
      const data = await farmerModel.find({});
      return res.status(200).send(
        { 
          status: 200,
          message: 'All available Farmers',
          data
        });
    } catch(error) {
      return res.status(400).send(
        { 
          status: 400,
          message: 'Oops failed to fetch Farmers',
          error
        });
    }
  }

  /**
   * Get A Single Farmer
   * @param {object} req 
   * @param {object} res
   * @returns {object} Return status code 200 and Farmer object
   */
  static async getOneFarmer(req, res) {
    const data = await farmerModel.findById(req.params.id)
    try {     
      if(data == null) {
        return res.status(200).send(
          { 
            status: 200,
            message: 'Farmer with this Name doesn\'t exist',
          }
        );
    }
      return res.status(200).send(
        { 
          status: 200,
          message: 'Farmer Details',
          data
        }
);
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to fetch Farmer',
          error
    })
    }
  }

  /**
   * Update A Farmer
   * @param {object} req 
   * @param {object} res 
   * @returns {object} Return status code 200 and Farmer object
   */
  static async updateFarmer(req, res) {
    try {
      const data = req.body;
      await farmerModel.findOneAndUpdate({
          _id: req.params.id
        }, 
        data
      );
      return res.status(200).send({ 
        status: 200,
        message: 'Farmer updated successfully',
        data 
    });
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to update the Farmer',
          error
        });
    }
  }

  /**
   * Delete A Farmer
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 200 and message 
   */
  static async deleteFarmer(req, res) {
    try {      
      const Farmer = await farmerModel.findById(req.params.id)
      if(Farmer == null) {
        return res.status(200).send(
          { 
            status: 200,
            message: 'Farmer with this Name doesn\'t exist',
          }
        );
    }
      await farmerModel.deleteOne(Farmer)
      return res.status(200).send({ 
        status: 200,
        message: 'Farmer deleted successfully'
});
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to delete the Farmer',
          error
        });
    }
  }
}

export default FarmerController;