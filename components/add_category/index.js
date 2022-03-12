import { Fragment }         from 'react';
import { httpRequest } from '../../helpers/httpRequest';
import { useForm } from '../../hooks/useForm';


export const AddCategory = () => {
    const [form, inputChange, showFormChange, showForm, setShowForm] = useForm({
        category_name: ''
    });

    const addCategoryHandler = async(e) => {
        e.preventDefault();

        setShowForm(false);
        await Promise.all([
          httpRequest().post(`${process.env.URL}category/add`, { 
              headers: {
                  'Content-type': 'application/json'
              },
              body: JSON.stringify({ 
                name: form.category_name
              }), 
          }),
      ]);
      
    }

    return (
        <Fragment>
            <button onClick={showFormChange}>Agregar categoria</button>
                {
                    showForm && 
                    <div>
                        <form onSubmit={addCategoryHandler}>
                            <p>Introduce el nombre de la nueva categoria:</p>
                            <input 
                                placeholder='Nombre de la Categoria' 
                                name='category_name'
                                onChange={inputChange}
                            />
                            <button>Aceptar</button>
                        </form>
                    </div>
                }
        </Fragment>
    )
}