import Link                     from "next/link";
import { useEffect, useState }  from "react";
import { httpRequest }          from "../../../helpers/httpRequest";
import { AddCategory } from "../../add_category";

export const Navigation = () => {

    const [res, setRes] = useState(null);
    
    
    useEffect(() => {
        const fetchData = async () => {
            const [ resp ] = await Promise.all([
                httpRequest().get('http://localhost:3000/api/categories'),
            ]);
            setRes(resp);
          }
    
          fetchData();
    }, []);

    const firstLetterUpperCase = (category_name) => { 
    }

    return (
        <div className='homepage'>
            <header>
                <nav>
                <ul>
                    <li>CheatSheet Fabrizio</li>
                    {
                        !!res && res.response.map((category, index) => (
                            <Link href={`/category/${category.name}`}><li key={index}>
                                {category.name.replace(/\b\w/g, l => l.toUpperCase())}
                            </li></Link>
                        ))
                    }
                </ul>
                <AddCategory />
                </nav>
            </header>
        </div>
    )
}