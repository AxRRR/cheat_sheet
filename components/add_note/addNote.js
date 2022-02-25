import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"


export const AddNote = () => {
    const [showForm, setShowForm] = useState(false);

    return ( 
        <div className='homepage--addNewSection'>
            <h1>¡Agrega algunas notas!</h1>
            <button onClick={() => {
                    return showForm ? setShowForm(false) : setShowForm(true)
                }
            }><FontAwesomeIcon icon={faCirclePlus} /></button>
            {
                showForm && 
                    <form>
                        <input />
                        <textarea />
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