import { useEffect, useState } from 'react';
import { httpRequest } from '../helpers/httpRequest';
import Link                     from "next/link";
import { Footer } from '../components/layout/footer';

const Homepage = () => {

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
  
  return (
    <div>
      {/* <Navigation /> */}
      <div className='home'>
        <h3>
          ¡Bienvenido a tu espacio personal para guardar código, 
          listas y más de programación!
        </h3>
        <p>Si aun no cuentas con un perfil, hazlo ahora.</p>
        <button>Crear un perfil</button>
        <section>
          <h4>
            Navega por tus categorias
          </h4>
          <div>
          {
              !!res && res.response.map((category, index) => (
                  <Link href={`/category/${category.name}`}>
                    <article key={index}>
                      <p>
                        {category.name.replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                    </article>
                  </Link>
              ))
          }
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default Homepage;

