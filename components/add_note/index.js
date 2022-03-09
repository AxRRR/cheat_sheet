import { faCirclePlus }     from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome"
import { httpRequest }      from "../../helpers/httpRequest"
import { useForm }          from "../../hooks/useForm"


export const AddNote = ({ showDefaultComponent = true, sectionId }) => {

    const [form, inputChange, showFormChange, showForm, setShowForm] = useForm({
        title: '',
        code: ''
    });

    const addNoteHandler = async(e) => {
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
                        <button onClick={
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
                    <form onSubmit={addNoteHandler}>
                        <input 
                            name='title'
                            onChange={inputChange}
                            placeholder='Titulo del a nota'
                        />
                        <textarea 
                            name='code'
                            onChange={inputChange}
                            placeholder='Escribe el código'
                        />
                        <select>
                            <option>Código</option>
                            <option>Notas</option>
                        </select>
                        <button>Guardar</button>
                    </form>
            }
            {
                !showDefaultComponent && 
                    <form onSubmit={addNoteHandler}>
                        <input 
                            name='title'
                            onChange={inputChange}
                            placeholder='Titulo del a nota'
                        />
                        <textarea 
                            name='code'
                            onChange={inputChange}
                            placeholder='Escribe el código'
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