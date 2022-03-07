import { useEffect, useState }      from "react";
import { httpRequest }              from "../../../helpers/httpRequest";
import { AddSection }               from "../../add_section";
import { LoaderComponent }          from "../loader";


export const Sidebar = ({ 
      name_category, 
      setElementData, 
      setSectionId, 
      setLoading, 
      loading
    }) => {


    const [res, setRes] = useState();

    useEffect(() => {

        const fetchData = async () => {
          setLoading(true)
          const [ resp ] = await Promise.all([
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
        <div className='sidebar'>
          <AddSection name_category={name_category} />
          <section>
              <input placeholder='Buscar en la lista' />
          </section>
          <ul>
              {
                  res != null && !loading ? 
                  res.response._sections
                  .map(({ _id, section_title, _elements }, index) => ( 
                      <li
                        key={index} 
                        onClick={() => {
                            _elements.length === 0 
                            ? isEmptyData(_id, setElementData, setSectionId)
                            : isEmptyData2(_id, setElementData, setSectionId, _elements)
                          }
                        }
                          >{section_title}</li>
                  ))
              : <LoaderComponent />}
          </ul>
        </div>
      )
}

const isEmptyData = (_id, setElementData, setSectionId) => {
  return setSectionId(_id), setElementData(null);
} 
const isEmptyData2 = (_id, setElementData, setSectionId, elements) => {
  return setSectionId(_id), setElementData(elements);
} 
