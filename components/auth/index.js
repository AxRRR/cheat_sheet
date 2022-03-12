import { useState }             from 'react';
import { httpRequest }          from '../../helpers/httpRequest';
import { useForm }              from '../../hooks/useForm';


export const Authentication = () => {

    const ValidatePassword = async(passwordUser) => {
        if (typeof window !== 'undefined') {
            const authLocal = localStorage.getItem("authUser");

            if(authLocal === null){
                localStorage.setItem("authUser", JSON.stringify({
                    authenticated: false,
                    role: 'admin'
                }));
            } 

            const [ resp ] = await Promise.all([
                httpRequest().get(`http://localhost:3000/api/auth/login/${passwordUser}`),
            ]);

            const { status, message } = resp;

            if(status){
                localStorage.setItem("authUser", JSON.stringify({
                    authenticated: true,
                    role: 'admin'
                }));
            }

            // Manejar las excepciones if resp.status
            return { status, message };
        }
    }
    
    const validateToken = () => {
        if (typeof window !== 'undefined') {
            const authLocal = JSON.parse(localStorage.getItem("authUser"));
            
            if(authLocal === null){
                localStorage.setItem("authUser", JSON.stringify({
                    authenticated: false,
                    role: 'admin'
                }));
            }
            return authLocal.authenticated;
        }
        
    }

    return { ValidatePassword, validateToken };
}

export const Auth = ({ onShowModal }) => {

    const [error, setError] = useState('');

    const [form, inputChange] = useForm({
        accessPassword: ''
    });

    const accessUserHandler = async(e) => {
        e.preventDefault();

        if(!isNaN(form.accessPassword)){

            const { status, message } = 
                await Authentication().ValidatePassword(form.accessPassword);

            if(!status){
                return setError(message || 'Hubo un error al autenticarte, contacta al Administrador.');
            }
            onShowModal(false);
            
        } else {
            return setError('La contraseña solo debe contener numeros');
        }
    }

    return (
        <div className='authentication'>
            <form onSubmit={accessUserHandler}>
                <p>Introduce la contraseña de acceso</p>
                <h1>{error !== '' && form.accessPassword != '' && error}</h1>
                <input 
                    name='accessPassword'
                    onChange={inputChange}
                    type='password' 
                />
            </form>
        </div>
    )
}