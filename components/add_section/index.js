import { useState } from "react";
import { httpRequest } from "../../helpers/httpRequest";
import { useForm } from "../../hooks/useForm";


export const AddSection = ({ name_category }) => {

    const [form, inputChange, showFormChange, showForm] = useForm({
      section_title: ''
    });

    const addSectionHandler = async(e) => {
        e.preventDefault();

        await Promise.all([
          httpRequest().post('http://localhost:3000/api/section', { 
              headers: {
                  'Content-type': 'application/json'
              },
              body: JSON.stringify({ 
                name: name_category, 
                section_title: form.section_title
              }), 
          }),
      ]);
    }

    return (
        <section>
            <button onClick={showFormChange}>Agregar sección</button>
            {/* <button onClick={() => onSelectDelete(true)}>Eliminar sección</button> */}
            {showForm && <form onSubmit={addSectionHandler}>
              <h3>Rellena los campos para crear la sección</h3>
              <input 
                name='section_title'
                onChange={inputChange} 
              />
              {/* <select onChange={inputChange}>
                <option>Notas</option>
                <option>Código</option>
              </select> */}
              <button type='submit'>Agregar</button>
            </form>}
          </section>
    )
}