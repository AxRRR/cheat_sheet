import { Fragment }     from 'react';


export const FormSchema = ({ setFormComponent, addNoteHandler }) => {

    const [form, inputChange] = useForm({
        title: '',
        code: ''
    });


    return (
        <Fragment>
            <form onSubmit={addNoteHandler(form)}>
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
        </Fragment>
    )
}