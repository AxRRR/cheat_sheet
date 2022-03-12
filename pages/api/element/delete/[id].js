import dbConnect from "../../../../lib/mongo";
import element from "../../../../models/element";
import section from "../../../../models/section";

export default async function handler(req, res){

    await dbConnect();

    try {

        const { 
            query : { 
                id 
            } 
        } = req;

        await element.findByIdAndDelete({ _id: id });

        res.status(200).json({
            status: true,
            message: 'Se elimino correctamente'
        })

    } catch (error) {
        console.log('Ocurrio un error ' + error)   
    }
  }
