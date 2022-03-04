import dbConnect    from "../../../../lib/mongo";
import element      from "../../../../models/element";
import section      from "../../../../models/section";

export default async function handler(req, res){

    await dbConnect();

    try {

        const { 
            _id, 
            title, 
            code 
        } = req.body;

        await element.findByIdAndUpdate({ _id }, {
            title,
            code
        })

        res.status(200).json({
            status: true,
            _id,
            title,
            code
        })

    } catch (error) {
        console.log('Ocurrio un error ' + error)   
    }
  }
