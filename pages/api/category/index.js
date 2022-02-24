import dbConnect from "../../../lib/mongo";
import category from "../../../models/category";

export default async function handler(req, res){
  await dbConnect();

  const response = await 
      category.findById({ _id: '62168b438da4aef8cda8da50'}).populate({
        path: 'sections',
        populate: [
          {
            path: 'elements',
          }
      ]
    }).exec();

  return res.status(200).json({
    status: true,
    msg: 'La peticion se hizo bien, sin query',
    response
  })
}




// Para insertar una nueva section
// const INSERT_FIELD = new section({
//   section_title: 'Funciones anonimas',
//   elements: [{ _id: '621689c58da4aef8cda8da4a'}]
// })

// section.create(INSERT_FIELD);



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