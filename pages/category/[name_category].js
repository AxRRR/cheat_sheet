import { useRouter }            from 'next/router'
import { 
  useState, 
  Fragment,
  useEffect
}                               from 'react';
import { AddNote }              from '../../components/add_note';
import { Elements }             from '../../components/elements';
import { LoaderComponent }      from '../../components/layout/loader';
import { Navigation }           from '../../components/layout/navbar';
import { Sidebar }              from '../../components/layout/sidebar';
import Prism                    from "prismjs";
import { Footer }               from '../../components/layout/footer';
import { categoryData }         from '../../context/categoryContext';
import { Auth, Authentication } from '../../components/auth';

const Category = () => {

  const [payloadCategory, setPayloadCategory] =   useState(null);
  const [elementData, setElementData] =           useState(null);
  const [sectionId, setSectionId] =               useState(null);
  const [loading, setLoading] =                   useState(false);
  const [showFormAddNote, setShowFormAddNote] =   useState(false);
  const [showModalAuth, setShowModalAuth] =       useState(false);

  const {
    query: {
      name_category
    }
  } = useRouter();

  useEffect(() => {
    const checkLocalStorage = async() => {
      const response = await Authentication().validateToken();

      response ? setShowModalAuth(false) : setShowModalAuth(true);
    }

    checkLocalStorage();
    
  }, [])
  
  useEffect(() => {
    setShowFormAddNote(false);
    Prism.highlightAll(); 
  }, [elementData]);

  return (
    <div className='homepage'>
      {showModalAuth && <Auth onShowModal={setShowModalAuth} />}
      <categoryData.Provider
          value={{
              payloadCategory,
              setPayloadCategory
      }}>
        <Navigation />
        <main>
            <Sidebar 
              name_category={name_category} 
              setLoading={setLoading}
              setElementData={setElementData}
              setSectionId={setSectionId}
              loading={loading}
            />
          <article>
            <section>  
              
                {loading && <LoaderComponent><p>Cargando contenido...</p></LoaderComponent>}

                {
                  elementData != null 
                  && !loading && 
                  <Fragment>
                      {elementData.map(({ _id, title, code, dateChange }) => 
                      <Elements
                        information={
                          {
                            _id,
                            title,
                            code,
                            dateChange
                          }
                        }
                      />)}
                      <footer>
                        <p 
                          onClick={() => { 
                              showFormAddNote 
                              ? setShowFormAddNote(false) 
                              : setShowFormAddNote(true) }}>Agregar una nota nueva +</p>
                      </footer>
                      {
                        showFormAddNote && 
                        <AddNote 
                          showDefaultComponent={false} 
                          sectionId={sectionId} 
                        />
                      }
                  </Fragment>
                }
                {
                  elementData === null && 
                    !loading && 
                      <AddNote 
                        showDefaultComponent={true} 
                        sectionId={sectionId} 
                      />
                }
                </section>
          </article>
        </main>
        <Footer />
      </categoryData.Provider>
    </div>
  )
};

export default Category;

