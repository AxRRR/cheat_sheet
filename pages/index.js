import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { AddNote } from '../components/add_note/addNote';
import { Elements } from '../components/elements/elements';
import { dataContext } from '../context/dataContext';


const Homepage = ({ response }) => {

  const [showForm, setShowForm] = useState(false);
  const [currentText, setCurrentText] = useState();

  const { 
      name, 
      _id, 
      _sections 
  } = response.response;

  const editingChange = ({ target }) => {
    setCurrentText({
        ...currentText,
        [target.name]: target.value
    })
}

  const addSectionHandler = async(e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/api/section", {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ 
        _id: _id, 
        section_title: currentText.section_title
        })
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    // console.log('La data que recibiria en el EndPoint: >>>>>>>> ', _id, currentText, name);
  }

  return (
    <div className='homepage'>
      <header>
        <nav>
          <ul>
            <li>CheatSheet Fabrizio</li>
            <li>Javascript Vanilla</li>
            <li>React</li>
            <li>Next</li>
            <li>Express</li>
            <li>Firebase</li>
          </ul>
        </nav>
      </header>
      <div className='homepage--menuUp'>
        <button onClick={() => setShowForm(true)}>Agregar una nueva seccion</button>
        <button>Eliminar una section</button>
        {showForm && <form onSubmit={addSectionHandler}>
          <h3>Rellena los campos para crear la sección</h3>
          <input 
            name='section_title'
            onChange={editingChange} 
          />
          <select onChange={editingChange}>
            <option>Notas</option>
            <option>Código</option>
          </select>
          <button type='submit'>Agregar</button>
        </form>}
      </div>
      <article>
          {
            _sections.map(({ section_title, _elements }, sectionIndex) => 
            <section key={sectionIndex}>
              <h1>{section_title}</h1>
              {_elements.length == 0 && <AddNote />}
              {
                _elements.map(({ _id, title, code }) => 
                <Elements 
                  information={
                    {
                      _id,
                      title,
                      code
                    }
                  }
                />)
              }
              <footer>
                <p>Agregar</p>
              </footer>
            </section>)
          }
        {/* </section> */}
      </article>
    </div>
  )
}

export const getServerSideProps = async() => {
  let res = null
  try {
    
    await fetch('http://localhost:3000/api/category')
    .then(response => response.json())
      .then(data => res = data);

      console.log(res)


  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      response: res
    },
  }
}

export default Homepage;
