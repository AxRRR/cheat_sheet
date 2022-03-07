import dbConnect from "../../../lib/mongo";
import category from "../../../models/category";
import section from "../../../models/section";


export default async function handler(req, res) {

    await dbConnect();

    try {


        const {
            name,
            section_title,
        } = req.body;

        const SECTION_DATA = await section.create({
            section_title
        });

        const response = await category.findOne({ name });
        response._sections.push(SECTION_DATA._id);
        await response.save();


        return res.status(200).json({
            status: true,
            msg: 'Request successfully',
            response
        })
    } catch (error) {
        console.log('Ocurrio un error ' + error)
    }
}