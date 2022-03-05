import { useRouter }            from 'next/router'
import { useState }  from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import { Elements }             from '../../components/elements/elements';
import { LoaderComponent } from '../../components/layout/loader';
import { Navigation }           from '../../components/layout/navbar';
import { Sidebar }              from '../../components/layout/sidebar';

const Category = () => {

  const [elementData, setElementData] = useState(null);

  const {
    query: {
      name_category
    }
  } = useRouter();

  return (
    <div className='homepage'>
      <Navigation />
      <main>
          <Sidebar 
            name_category={name_category} 
            setElementData={setElementData} 
          />
        <article>
          <section>  
            {
              !!elementData 
              ? elementData.map(({ _id, title, code }) =>
                <Fragment>
                    <Elements
                      information={
                        {
                          _id,
                          title,
                          code
                        }
                      }
                    />
                    <footer>
                      <p>Agregar</p>
                    </footer>
                </Fragment>
                )
              : <LoaderComponent>
                  <p>Cargando contenido</p>
                </LoaderComponent>}
              </section>
        </article>
      </main>
    </div>
  )
};

export default Category;

