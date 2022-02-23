import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useContext, useEffect, useState } from "react"
import prism from 'prismjs';
import { dataContext } from "../../context/dataContext";
// import { dataContext } from "../../context/dataContext";

export const Childrens = ({ 
    title, 
    code, 
    parentIndex, 
    childrenIndex, 
    elementIndex 
    }) => {

    const [showForm, setShowForm] = useState(false);
    const [currentText, setCurrentText] = useState({
        title,
        code
    });

    const contextInformation = useContext(dataContext);

    console.log('Aca recibimos el category', contextInformation);

    useEffect(() => prism.highlightAll(), [showForm]);

    const editButtonHandler = () =>{
        return showForm ? setShowForm(false) : setShowForm(true); 
    }

    const editingChange = ({ target }) => {
        setCurrentText({
            ...currentText,
            [target.name]: target.value
        })
    }

    const submitHandler = async(e) => {
        e.preventDefault();

        // Aqui hacemos el endpoint para actualice los datos

        // console.log('El state que esta actualmente', state)

        // console.log('EL state aninado: ', 
        //     state.category[parentIndex].elements[elementIndex].children[index])

        // console.log('el currenttext', currentText)
        const updateState = 
            contextInformation.information
                .category[parentIndex]
                    .elements[elementIndex]
                        .children[index] = currentText;


                        console.log('El texto editado', updateState)
        // console.log(state);
        // console.log(updateState);
        
        // dispatch(update({
        //     updateState
        // }));

        // dispatch(update({
        //     currentState: state,
        //     currentText,
        //     allIndex: {
        //         parentIndex, 
        //         childrenIndex, 
        //         elementIndex
        //     }
        // }))

        setShowForm(false);

    }

    return(
        <Fragment>
            <div key={childrenIndex}>
                <h3>{currentText.title}</h3>
                <button onClick={() => editButtonHandler()}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <pre>
                    <code className='language-javascript'>
                    {currentText.code}
                    </code>
                </pre>
                {
                    showForm && <form onSubmit={submitHandler}>
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
               
        </Fragment>
    )
}