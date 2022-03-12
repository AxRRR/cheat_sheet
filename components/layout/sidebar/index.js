import { 
  useEffect, 
  useState, 
  Fragment, 
  useContext 
}                                   from "react";
import { categoryData }             from "../../../context/categoryContext";
import { httpRequest }              from "../../../helpers/httpRequest";
import { useForm }                  from "../../../hooks/useForm";
import { AddSection }               from "../../add_section";
import { LoaderComponent }          from "../loader";
import { ShowSection }              from "./show_sections";


export const Sidebar = ({ 
      name_category, 
      setElementData, 
      setSectionId, 
      setLoading, 
      loading
    }) => {

    const [res, setRes] = useState({
      response: null
    });

    const { payloadCategory } = useContext(categoryData);

    const [form, inputChange] = useForm({
      search: ''
    });

    useEffect(() => {

        const fetchData = async () => {
          setLoading(true)
          const [ resp ] = await Promise.all([
              httpRequest().get(`${process.env.URL}category/${name_category}`),
          ]);
          setRes(resp);
          setLoading(false)
            
        }
  
        fetchData();
        
    }, [name_category, payloadCategory]);

    // Search function
    const findInSections = () => {
      const getSections =
        res.response._sections
          .filter((e) => e.section_title.toLowerCase().indexOf(form.search) != -1)
          
       
    return <Fragment>
        {
          getSections.length >= 1 
            && getSections.map(({_id, section_title, _elements}, index) => 
            <ShowSection 
              payload={
              { 
                  index,
                  _id,
                  section_title,
                  _elements
                }
              }
              setElementData={setElementData}
              setSectionId={setSectionId}
          />)
        }
    </Fragment>
    }

    return (
        <div className='sidebar'>
          <AddSection 
            name_category={name_category} 
          />
          <section>
              <input 
                placeholder='Buscar en la lista' 
                name='search'
                onChange={inputChange}
              />
          </section>
          <ul>
            {form.search !== '' && findInSections() }
              {
                  !!res.response && loading === false ? 
                  res.response._sections
                  .map(({ _id, section_title, _elements }, index) => ( 
                    <Fragment>
                        {
                          form.search == '' && 
                            <ShowSection 
                              payload={
                              { 
                                  index,
                                  _id,
                                  section_title,
                                  _elements
                                }
                              }
                              setElementData={setElementData}
                              setSectionId={setSectionId}
                            /> 
                          }
                      </Fragment>
                  ))
              : 
                <LoaderComponent />
            }
          </ul>
        </div>
      )
}


