import { getRealDate } from "../../../../helpers/formatter_date";
import dbConnect from "../../../../lib/mongo";
import element from "../../../../models/element";
import section from "../../../../models/section";

//  Element Handler 

export default async function handler(req, res){

    await dbConnect();

    try {

        const { _id, title, code } = req.body;
        const { getComptDate, getComptTime } = getRealDate();

        const ELEMENT_DATA = 
            await element
                .create({
                    title,
                    code,
                    dateChange: {
                        time: getComptTime,
                        date: getComptDate
                    }
                });

        const response = await section.findById({ _id });
        response._elements.push(ELEMENT_DATA._id);
        await response.save();

    } catch (error) {
        console.log('Ocurrio un error ' + error)   
    }
  }
