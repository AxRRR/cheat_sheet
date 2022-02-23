import dbConnect from "../../../lib/mongo";
import Category from "../../../models/categoryModel";

export default async function handler(req, res){

    await dbConnect();

    try {
        
        
        const { query : { category } } = req;
        
        console.log(category)
        const response = await Category.findById(category);
        
        return res.status(200).json({
            status: true,
            msg: 'Request successfully',
            response
        })
    } catch (error) {
        console.log('Ocurrio un error ' + error)   
    }
  }