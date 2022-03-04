import dbConnect from "../../../lib/mongo";
import category from '../../../models/category';

export default async function handler(req, res){
  await dbConnect();

  const response = await 
      category.find().select({ 'name': 1, '_id': 0 });

  return res.status(200).json({
    status: true,
    msg: 'Request accept!',
    response
  })
}
