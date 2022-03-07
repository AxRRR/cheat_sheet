import { getRealDate } from "../../../../helpers/formatter_date";
import dbConnect    from "../../../../lib/mongo";
import element      from "../../../../models/element";
import section      from "../../../../models/section";

export default async function handler(req, res){

    await dbConnect();

    try {

        const { _id, title, code } = req.body;
        const { getComptDate, getComptTime } = getRealDate();

        await element.findByIdAndUpdate({ _id }, {
            title,
            code,
            dateChange: {
                time: getComptTime,
                date: getComptDate
            }
        })

        res.status(200).json({
            status: true,
            _id,
            title,
            code,
            dateChange: {
                time: getComptTime,
                date: getComptDate
            }
        })

    } catch (error) {
        console.log('Ocurrio un error ' + error)   
    }
  }
