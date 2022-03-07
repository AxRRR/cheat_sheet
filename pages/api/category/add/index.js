import { getRealDate } from "../../../../helpers/formatter_date";
import dbConnect from "../../../../lib/mongo";
import category from "../../../../models/category";
import element from "../../../../models/element";
import section from "../../../../models/section";

//  Element Handler 

export default async function handler(req, res){

    await dbConnect();

    try {

        const { name } = req.body;
        const category_create = 
            await category
                .create({
                    name: name.toLowerCase()
                });

        await category_create.save();

    } catch (error) {
        console.log('Ocurrio un error ' + error)   
    }
  }
