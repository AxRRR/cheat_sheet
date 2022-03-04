import { faCirclePlus }     from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome"
import { useState }         from "react"
import { httpRequest }      from "../../helpers/httpRequest"


export const AddNote = ({ sectionId }) => {

    const [showForm, setShowForm] = useState(false);
    const [currentText, setCurrentText] = useState();

    const editingChange = ({ target }) => {
        setCurrentText({
            ...currentText,
            [target.name]: target.value
        })
    }

    const addNoteHandler = async(e) => {
        e.preventDefault();

        await Promise.all([
            httpRequest().post('http://localhost:3000/api/element/add', { 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ 
                    _id: sectionId, 
                    title: currentText.title, 
                    code: currentText.code
                }), 
            }),
        ]);

        setShowForm(false);
    }

    return ( 
        <div className='homepage--addNewSection'>
            <h1>¡Agrega algunas notas!</h1>
            <button onClick={() => {
                    return showForm ? setShowForm(false) : setShowForm(true)
                }
            }><FontAwesomeIcon icon={faCirclePlus} /></button>
            {
                showForm && 
                    <form onSubmit={addNoteHandler}>
                        <input 
                            name='title'
                            onChange={editingChange}
                        />
                        <textarea 
                            name='code'
                            onChange={editingChange}
                        />
                        <select>
                            <option>Código</option>
                            <option>Notas</option>
                        </select>
                        <button>Guardar</button>
                    </form>
            }
        </div>
    )
}