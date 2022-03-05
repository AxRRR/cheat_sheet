import { useEffect } from "react";
import { useState } from "react";
import { Input, Menu } from "semantic-ui-react"
import { httpRequest } from "../../../helpers/httpRequest";
import { AddSection } from "../../add_section";
import { LoaderComponent } from "../loader";


export const Sidebar = ({ name_category }) => {
    const [res, setRes] = useState();
    const [loading, setLoading] = useState();

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
                  res != null && loading == false ? 
                  res.response._sections
                  .map(({ section_title }) => ( 
                      <li>{section_title}</li>
                  ))
              : <LoaderComponent />}
          </ul>
        </div>
      )
}