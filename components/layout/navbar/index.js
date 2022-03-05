import Link from "next/link";
import { useEffect, useState } from "react";
import { httpRequest } from "../../../helpers/httpRequest";

export const Navigation = () => {

    const [res, setRes] = useState(null);
    const [showForm, setShowForm] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            const [ resp ] = await Promise.all([
                httpRequest().get('http://localhost:3000/api/categories'),
            ]);
            setRes(resp);
          }
    
          fetchData();
    }, []);

    return (
        <div className='homepage'>
            <header>
                <nav>
                <ul>
                    <li>CheatSheet Fabrizio</li>
                    {
                        !!res && res.response.map((category) => (
                            <Link href={`/category/${category.name}`}><li>
                                {category.name}
                            </li></Link>
                        ))
                    }
                </ul>
                <button onClick={() => {
                    showForm ? setShowForm(false) : setShowForm(true)
                }}>Agregar categoria</button>
                {
                    showForm && 
                    <div>
                        <input placeholder='Nombre de la Categoria' />
                        <button>Aceptar</button>
                    </div>
                }
                </nav>
            </header>
        </div>
    )
}