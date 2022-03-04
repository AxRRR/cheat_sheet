import dbConnect from "../../../lib/mongo";
import category from '../../../models/category';
import element from '../../../models/element';
import section from '../../../models/section';

export default async function handler(req, res){
  await dbConnect();

  const { 
    query : { 
        name 
    } 
} = req;

  // _id: '62168b438da4aef8cda8da50'

  const response = await 
      category.findOne({name:name})
      .populate({
          path: '_sections',
          model: 'Section',
          populate: [{ path: '_elements', model: 'Element' }]
      });

  return res.status(200).json({
    status: true,
    msg: 'Request accept!',
    response
  })
}








// Para insertar una nueva category
// category.create({
//   id: 2,
//   name: 'Next',
//   sections: [
//     {
//       _id: '62168a668da4aef8cda8da4c'
//     }
//   ]
// })