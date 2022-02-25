import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
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

    const submitHandler = async(e) => {
        e.preventDefault();
        await fetch("http://localhost:3000/api/element/update", {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ 
            _id: _id, 
            title: currentText.title, 
            code: currentText.code
            })
        })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        setShowForm(false);

    }

    return ( 
        <div>
            <h4>{currentText.title}</h4>
            <button 
                onClick={() => editButtonHandler()}
                className='homepage--buttonStyles'>
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button 
                onClick={() => editButtonHandler()}
                className='homepage--buttonStyles__delete'>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <pre>
                <code className='language-javascript'>
                    {currentText.code}
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