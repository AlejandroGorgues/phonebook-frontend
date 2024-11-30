import { useState, useEffect } from 'react'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import numberService from './services/numbers.js'
import NotificationSuccess from './components/NotificationSuccess.jsx'
import NotificationError from './components/NotificationError.jsx'

const App = () => {
    const [persons, setPersons] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [inputMessage, setInputMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        numberService
        .getAll()
        .then(initialNumber  => {
            setPersons(initialNumber)
            setFilteredData(initialNumber)
            })
    }, [])
    
    return (
        <div>
            <h1>Phonebook</h1>
            <NotificationSuccess message={inputMessage} />
            <NotificationError message={errorMessage} />
            <Filter persons={persons} setFilteredData={setFilteredData}/>
            <h1>add a new</h1>
            <PersonForm persons={persons} 
                        setPersons={setPersons} 
                        setFilteredData={setFilteredData}
                        setInputMessage={setInputMessage}
                        setErrorMessage={setErrorMessage}/>
            <h2>Numbers</h2>
            <Persons filteredPersons={filteredData} 
                        setFilteredPersons={setFilteredData}
                        setErrorMessage={setErrorMessage}/>
              
        </div>
    )
}

export default App