import { useState } from "react";
import { httpRequest } from "../../helpers/httpRequest";


export const AddSection = ({ category_name }) => {
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
                name: category_name, 
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
        <div className='homepage--menuUp'>
            <button onClick={() => setShowForm(true)}>Agregar una nueva seccion</button>
            <button>Eliminar una section</button>
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
          </div>
    )
}