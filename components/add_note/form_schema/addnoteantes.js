import { faCirclePlus }     from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome"
import { useState }         from 'react';
import { httpRequest }      from "../../helpers/httpRequest"
import { useForm }          from "../../hooks/useForm"
import { FormSchema }       from "./form_schema"


export const AddNote = ({ showDefaultComponent = true, sectionId }) => {

    const [formComponent, setFormComponent] = useState();
    

    const addNoteHandler = async(e, form) => {
        e.preventDefault();

        await Promise.all([
            httpRequest().post('http://localhost:3000/api/element/add', { 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ 
                    _id: sectionId, 
                    title: form.title, 
                    code: form.code
                }), 
            }),
        ]);

        setShowForm(false);
    }

    return ( 
        <div className='homepage--addNewSection'>
            {
                showDefaultComponent && 
                    <div>
                        <p>No hemos encontrado información para mostrar. ¡Empieza a llenarlo!</p>
                        <button 
                            onClick={
                                sectionId != null 
                                    ? showFormChange 
                                    : () => window.alert('Antes por favor selecciona una sección')
                                }>
                            <FontAwesomeIcon icon={faCirclePlus} />
                        </button>
                    </div>
            }
            {
                showForm && 
                    <FormSchema 
                        setFormComponent={setFormComponent}
                        addNoteHandler={addNoteHandler} />
            }

            {
                !showDefaultComponent && 
                    <FormSchema 
                        setFormComponent={setFormComponent} 
                        addNoteHandler={addNoteHandler} />
            }
        </div>
    )
}