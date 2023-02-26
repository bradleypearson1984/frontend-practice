import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show'; 



function Main(props) {
    const [people, setPeople] = useState(null);

    const API_URL = 'http://localhost:3001/people';
    
//index GET
    const getPeople = async () => {
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          setPeople(data);
        } catch (error) {
          // TODO: Add a task we wish to perform in the event of an error
        }
      }
//New POST 
      const createPeople = async (person) => {
        try {
          await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'Application/json',
            },
            body: JSON.stringify(person),
          });
          getPeople();
        } catch (error) {
          // TODO: Add a task we wish to perform in the event of an error
        }
      };
//Delete
      const deletePeople = async (id) => {
        await fetch(API_URL + id, {
            method: 'DELETE', 
        });
        getPeople();
      };

//Update PUT
      const updatePeople = async (person, id) => {
        await fetch(URL + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(person),
        });
        //update list of people
        getPeople();
      }


    useEffect(() => {
        getPeople();
      }, []); 

    return (
        <main>
            <Routes>
                <Route path='/' 
                element={<Index people={people} 
                createPeople={createPeople} 
            />} 
        />
            <Route
          path="/people/:id"
          element={
            <Show
              people={people}
              updatePeople={updatePeople}
              deletePeople={deletePeople}
            />
          }
        />
      </Routes>
    </main>
  );
}
  
  export default Main;