import GenerateJWT from "../../../../helpers/json_web_token";
import dbConnect from "../../../../lib/mongo";
import auth from '../../../../models/auth';
import bcrypt from 'bcryptjs';

export default async function handler(req, res){

    await dbConnect();

    try {
        const { 
            query : { 
                password: passwordReceived 
            } 
        } = req;

        const Authentication = await auth.findOne({ role: 'admin' });

        if(!Authentication){
            return res.status(500).json({
                status: false,
                message: 'Ocurrió un error. No pudimos encontrar en la db al admin.'
            });
        }

        const ValidatePassword = 
            bcrypt.compareSync(passwordReceived, Authentication.password);

        if(!ValidatePassword){
            return res.status(201).json({
                status: false,
                message: 'Ocurrió un error. Contraseña no válida.'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Acceso autorizado.'
        })

    } catch (error) {
        console.log('Ocurrio un error ' + error)   
    }
  }
