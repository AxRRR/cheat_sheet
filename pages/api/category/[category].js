import dbConnect from "../../../lib/mongo";
export default async function handler(req, res){

    await dbConnect();

    try {
        
        
        const { query : { category } } = req;
        
        

        
        return res.status(200).json({
            status: true,
            msg: 'Request successfully',
            response
        })
    } catch (error) {
        console.log('Ocurrio un error ' + error)   
    }
  }