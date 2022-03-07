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
import { useForm }         from "../../hooks/useForm";


export const Elements = ({ information }) => {

    const { title, code, _id, dateChange } = information;

    const [currentText, setCurrentText] = useState({
        _id,
        title,
        code,
        dateChange
    });

    const [
        form, 
        inputChange, 
        showFormChange, 
        showForm, 
        setShowForm
    ] = useForm({
        title: title,
        code: code
    });

    useEffect(() => { 
        
        setCurrentText({
            _id,
            title,
            code,
            dateChange
        });

    },  [information]);

    useEffect(() => {

        Prism.highlightAll(); 
    
    }, [showForm]);

    const submitHandler = async(e) => {
        e.preventDefault();

        const [ resp ] = await Promise.all([
            httpRequest().post('http://localhost:3000/api/element/update', { 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ 
                    _id: _id, 
                    title: form.title, 
                    code: form.code
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
            <p>{form.title}</p>
            <button 
                onClick={showFormChange}
                className='homepage--buttonStyles'>
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button 
                onClick={async() => {
                    await Promise.all([
                        httpRequest().post(`http://localhost:3000/api/element/delete/${currentText._id}`),
                    ])
                }}
                className='homepage--buttonStyles__delete'>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <pre>
                <code className='language-javascript'>
                    {form.code}
                </code>
            </pre>
        <div>
            <p>Ultima modificacion {currentText.dateChange.date} a las {currentText.dateChange.time}</p>
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
                        value={form.title}
                        onChange={inputChange}
                    />
                    <textarea 
                        name='code' 
                        placeholder='codigo' 
                        value={form.code} 
                        onChange={inputChange}
                    />
                    <button type='submit'>Guardar cambios</button>
                </div>
            </form>
        }
        </div>
    )
}