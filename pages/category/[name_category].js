import { useRouter }            from 'next/router'
import { useEffect, useState }  from 'react';
import { AddNote }              from '../../components/add_note/addNote';
import { AddSection }           from '../../components/add_section';
import { Elements }             from '../../components/elements/elements';
import { LoaderComponent }      from '../../components/layout/loader';
import { Navigation }           from '../../components/layout/navbar';
import { Sidebar }              from '../../components/layout/sidebar';
import { httpRequest }          from '../../helpers/httpRequest';

const Category = () => {

  const [res, setRes] = useState({});
  const [loading, setLoading] = useState(false);

  const {
    query: {
      name_category
    }
  } = useRouter();

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true)
      const [resp] = await Promise.all([
        httpRequest().get(`http://localhost:3000/api/category/${name_category}`),
      ]);
      setRes(resp);
      setTimeout(() => {
        setLoading(false)

      }, 5009);
    }

    fetchData();

  }, [name_category]);

  return (
    <div className='homepage'>
      <Navigation />
      
      <main>
        <Sidebar name_category={name_category} />
        <article>

          {


            res.response != null && loading == false ? res.response._sections.map(({ section_title, _elements, _id: sectionId }, sectionIndex) =>
              <section>
                <h1>{section_title}</h1>
                {_elements.length == 0
                  && <AddNote sectionId={sectionId} />}
                {
                  _elements.map(({ _id, title, code }) =>
                    <Elements
                      information={
                        {
                          _id,
                          title,
                          code
                        }
                      }
                    />)
                }
                <footer>
                  <p>Agregar</p>
                </footer>
              </section>)
              : <LoaderComponent>
                  <p>Cargando contenido</p>
                </LoaderComponent>}
        </article>
      </main>
    </div>
  )
};

export default Category;

