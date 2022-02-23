export default function handler(req, res){


    // const { query } = req;

    // const isEmpty = query ? true : false;

    // console.log(isEmpty)

    // console.log('Aqui recibimos el request', req)
    return res.status(200).json({
      status: true,
      msg: 'La peticion se hizo bien, sin query'
    })
  }