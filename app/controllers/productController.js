import productModel from '../models/productModel';
import connection from '../connection';
// import cloudinary from '../cloudinary';

class ProductController {  
  /**
   * Create A product
   * @param {object} req 
   * @param {object} res
   * @returns {object} Return status code 201 and product object 
   */
  static async addProduct(req, res) {
    try {
      const product = await productModel.findOne({ title: req.body.name }).exec();
      if(product) {
          return res.status(409).send(
            { 
              status: 409,
              message: 'product with that Name already added',
            }
          );
      }
    //   const getImage = await cloudinary.uploads(req.body.image, 'Assets');
    //   req.body.image = getImage.url;
      const data = new productModel(req.body);
      await data.save();
      return res.status(201).send({
        status: 201,
        message: 'product successfully added',
        data
    });
    } catch(error) {
        return res.status(400).send(
          {
            status: 400,
            message: 'Oops failed to add a product',
            error
        });
    }
  }

  /**
   * Get All products
   * @param {object} req 
   * @param {object} res 
   * @returns {array} Return status code 200 and products array
   */
  static async getAllProducts(req, res) {
    try {
      const data = await productModel.find({});
      return res.status(200).send(
        { 
          status: 200,
          message: 'All available products',
          data
        });
    } catch(error) {
      return res.status(400).send(
        { 
          status: 400,
          message: 'Oops failed to fetch products',
          error
        });
    }
  }

  /**
   * Get A Single product
   * @param {object} req 
   * @param {object} res
   * @returns {object} Return status code 200 and product object
   */
  static async getOneProduct(req, res) {
    const data = await productModel.findById(req.params.id)
    try {     
      if(data == null) {
        return res.status(200).send(
          { 
            status: 200,
            message: 'product with this Name doesn\'t exist',
          }
        );
    }
      return res.status(200).send(
        { 
          status: 200,
          message: 'product Details',
          data
        }
);
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to fetch product',
          error
    })
    }
  }

  /**
   * Update A product
   * @param {object} req 
   * @param {object} res 
   * @returns {object} Return status code 200 and product object
   */
  static async updateProduct(req, res) {
    try {
      const data = req.body;
      await productModel.findOneAndUpdate({
          _id: req.params.id
        }, 
        data
      );
      return res.status(200).send({ 
        status: 200,
        message: 'product updated successfully',
        data 
    });
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to update the product',
          error
        });
    }
  }

  /**
   * Delete A product
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 200 and message 
   */
  static async deleteProduct(req, res) {
    try {      
      const product = await productModel.findById(req.params.id)
      if(product == null) {
        return res.status(200).send(
          { 
            status: 200,
            message: 'product with this Name doesn\'t exist',
          }
        );
    }
      await productModel.deleteOne(product)
      return res.status(200).send({ 
        status: 200,
        message: 'product deleted successfully'
});
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to delete the product',
          error
        });
    }
  }
}

export default ProductController;