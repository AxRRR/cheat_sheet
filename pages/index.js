
import { useState } from 'react';
import { Element } from '../components/elements/elements';
import { dataContext } from '../context/dataContext';
import { getDataByCategory } from '../firebase/controller/controller';


const Homepage = ({ response }) => {

  const [categoryData, setCategoryData] = useState({
    information: response
  }) 

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
        {
            response.map(({ id, category, elements }, parentIndex ) => 
            <section key={id}>
              <h1>
                {category}
              </h1>
                <Element 
                  elements={elements} 
                  parentIndex={parentIndex}
                />
            </section>)
        }  
        </article>
      </dataContext.Provider>
    </div>
  )
}

export const getServerSideProps = async() => {
  try {
    // await dbConnect();

    const categoryData = fetch('api/category')
      .then((data) => data)
        .catch((error) => error);

  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      response: await getDataByCategory()
    },
  }
}

export default Homepage;
