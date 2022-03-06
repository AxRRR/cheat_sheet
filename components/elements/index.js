import { 
    faPenToSquare, 
    faTrashCan 
}                          from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    useEffect, 
    useState
}                          from "react";
import Prism               from "prismjs";
import { httpRequest }     from "../../helpers/httpRequest";
import { LoaderComponent } from "../layout/loader";


export const Elements = ({ information }) => {
    const { title, code, _id } = information;

    const [showForm, setShowForm] = useState(false);
    const [currentText, setCurrentText] = useState({
        _id,
        title,
        code
    });

    useEffect(() => { 
        
        setCurrentText({
            _id,
            title,
            code
        })
        Prism.highlightAll(); 

    },  [information]);

    const editButtonHandler = () =>{
        return showForm ? setShowForm(false) : setShowForm(true); 
    }

    const editingChange = ({ target }) => {
        setCurrentText({
            ...currentText,
            [target.name]: target.value
        })
    }

    const deleteButtonHandler = async(id) => {
        await Promise.all([
            httpRequest().post(`http://localhost:3000/api/element/delete/${id}`),
        ])
    }

    const submitHandler = async(e) => {
        e.preventDefault();

        const [ resp ] = await Promise.all([
            httpRequest().post('http://localhost:3000/api/element/update', { 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ 
                    _id: _id, 
                    title: currentText.title, 
                    code: currentText.code
                }), 
            }),
        ]);
        setCurrentText(resp);
        setShowForm(false);
    }

    return ( 
        <div>
            {information != null ?
            <section>
            <p>{currentText.title}</p>
            <button 
                onClick={() => editButtonHandler()}
                className='homepage--buttonStyles'>
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button 
                onClick={() => deleteButtonHandler(currentText._id)}
                className='homepage--buttonStyles__delete'>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <pre>
                <code className='language-javascript'>
                    {currentText.code}
                </code>
            </pre>
        <div>
            <p>Ultima modificacion: 05/03/2022 a las 23:00</p>
        </div>
        </section> 
        : <LoaderComponent/>
        }
        {
            showForm && 
            <form onSubmit={submitHandler}>
                <div>
                    <input 
                        name='title'
                        placeholder='titulo' 
                        value={currentText.title}
                        onChange={editingChange}
                    />
                    <textarea 
                        name='code' 
                        placeholder='codigo' 
                        value={currentText.code} 
                        onChange={editingChange}
                    />
                    <button type='submit'>Guardar cambios</button>
                </div>
            </form>
        }
        </div>
    )
}