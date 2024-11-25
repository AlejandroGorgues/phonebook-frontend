import { useState, useEffect } from 'react'
import numberService from '../services/numbers.js'

const PersonForm =({persons, setPersons, setFilteredData, setInputMessage}) =>{
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) =>{
        setNewName(event.target.value)
    }
    
    const handleNumberChange = (event) =>{
        setNewNumber(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault() 
        const person = persons.find(n => n.name === newName)
        const changedPerson = { ...person, name: newName, number: newNumber}         
        if(person){
            if(confirm(`${newName} is already added to phonebook,
                replace the old number with a new one`)){
                    
                    numberService
                        .update(person.id, changedPerson)
                        .then(returnedPerson => {
                            alert(`Number with name ${returnedPerson.name} updated`)
                            setFilteredData(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
                        })
            }
        }else{
            numberService
                .create(changedPerson)
                .then(returnedPerson  => {
                    setPersons(persons.concat(returnedPerson))
                    setFilteredData(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
                setInputMessage(
                    `Added '${changedPerson.name}'`
                    )
                    setTimeout(() => {
                    setInputMessage(null)
                    }, 3000)
        }     
    }

    return (
        <form>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit" onClick={addName}>add</button>
            </div>
        </form>
    )
}

export default PersonForm