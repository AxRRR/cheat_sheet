import dbConnect from "../../../lib/mongo";
import category from "../../../models/category";


export default async function handler(req, res){

    await dbConnect();

    try {
        
        
        const { 
            query : { 
                name 
            } 
        } = req;
        
        const response = await 
         category
            .find({ name })
                .populate(
                    {
                        path: '_sections',
                        populate: [
                            {
                                path: '_elements',
                            }
                        ] 
                    }
                    ).exec();

        
        return res.status(200).json({
            status: true,
            msg: 'Request successfully',
            response
        })
    } catch (error) {
        console.log('Ocurrio un error ' + error)   
    }
  }