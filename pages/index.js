import { useEffect, useState } from 'react';
import { Elements } from '../components/elements/elements';
import { dataContext } from '../context/dataContext';


const Homepage = ({ response }) => {

  const [categoryData, setCategoryData] = useState({
    information: response
  }) 

  const { name, id, sections } = response.response;


  return (
    <div className='homepage'>
      <dataContext.Provider
        value={
          {
            information: response,
          }
          
        }>
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
        <article>
          <section>
            <h1>{name}</h1>
            <h1>{id}</h1>
            {
              sections.map(({ section_title, elements }, sectionIndex) => 
              <div key={sectionIndex}>
                <h1>{section_title}</h1>
                {
                  elements.map(({ title, code }) => 
                  <Elements 
                    information={
                      {
                        title,
                        code
                      }
                    }
                  />)
                }
              </div>)
            }
          </section>
        </article>
      </dataContext.Provider>
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
