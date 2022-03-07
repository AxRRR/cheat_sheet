import { useState } from "react";
import { httpRequest } from "../../helpers/httpRequest";


export const AddSection = ({ name_category }) => {
    const [showForm, setShowForm] = useState(false);
    const [currentText, setCurrentText] = useState();

    const addSectionHandler = async(e) => {
        e.preventDefault();

        await Promise.all([
          httpRequest().post('http://localhost:3000/api/section', { 
              headers: {
                  'Content-type': 'application/json'
              },
              body: JSON.stringify({ 
                name: name_category, 
                section_title: currentText.section_title
              }), 
          }),
      ]);
    }

    const editingChange = ({ target }) => {
        setCurrentText({
            ...currentText,
            [target.name]: target.value
        })
    }

    return (
        <section>
            <button onClick={() => setShowForm(true)}>Agregar sección</button>
            <button>Eliminar sección</button>
            {showForm && <form onSubmit={addSectionHandler}>
              <h3>Rellena los campos para crear la sección</h3>
              <input 
                name='section_title'
                onChange={editingChange} 
              />
              <select onChange={editingChange}>
                <option>Notas</option>
                <option>Código</option>
              </select>
              <button type='submit'>Agregar</button>
            </form>}
          </section>
    )
}