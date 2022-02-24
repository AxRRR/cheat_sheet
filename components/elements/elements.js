import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Prism from "prismjs";

export const Elements = ({ information }) => {

    const [showForm, setShowForm] = useState(false);
    const { title, code } = information;

    useEffect(() => Prism.highlightAll(), [showForm]);

    const editButtonHandler = () =>{
        return showForm ? setShowForm(false) : setShowForm(true); 
    }

    const editingChange = ({ target }) => {
        // setCurrentText({
        //     ...currentText,
        //     [target.name]: target.value
        // })
    }

    const submitHandler = async(e) => {}

    return ( 
        <div>
            <h4>{title}</h4>
            <button 
                onClick={() => editButtonHandler()}>
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <pre>
                <code className='language-javascript'>
                    {code}
                </code>
            </pre>
            {
                showForm && 
                <form onSubmit={submitHandler}>
                    <div>
                        <input 
                            name='title'
                            placeholder='titulo' 
                            // value={currentText.title}
                            onChange={editingChange}
                        />
                        <textarea 
                            name='code' 
                            placeholder='codigo' 
                            // value={currentText.code} 
                            onChange={editingChange}
                        />
                        <button type='submit'>Guardar cambios</button>
                    </div>
                </form>
            }
        </div>
    )
}