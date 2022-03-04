import { useRouter }            from 'next/router'
import { useEffect, useState }  from 'react';
import { AddNote }              from '../../components/add_note/addNote';
import { AddSection }           from '../../components/add_section';
import { Elements }             from '../../components/elements/elements';
import { Navigation }           from '../../components/layout/navbar';
import { httpRequest }          from '../../helpers/httpRequest';

const Category = () => {

    const [res, setRes] = useState({});

    const { 
        query: { 
            name_category 
          }
    } = useRouter();

    useEffect(() => {

      const fetchData = async () => {
        const [ resp ] = await Promise.all([
            httpRequest().get(`http://localhost:3000/api/category/${name_category}`),
        ]);
        setRes(resp);
      }

      fetchData();
      
    }, [name_category]);

    return (
        <div className='homepage'>
          <Navigation />
          <AddSection 
            category_name={name_category} 
          />
          <article>
              {
                res != null && res.response != null &&  res.response._sections.map(({ section_title, _elements, _id: sectionId }, sectionIndex) => 
                <section key={sectionIndex}>
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
              }
          </article>
        </div>
      )
};

export default Category;

