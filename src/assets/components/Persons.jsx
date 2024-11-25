import numberService from '../services/numbers.js'

const Person = ({person, toggleDeletion}) => {        
    return (
        <div>
            {person.name} {person.number}
            <button onClick={toggleDeletion}>delete</button>
        </div> 
    )
}

const Persons = ({filteredPersons, setFilteredPersons, setErrorMessage}) => {        
    const toggleDeletion =(id) =>{
        const person = filteredPersons.find(n => n.id === id)
        if(window.confirm(`Delete ${person.name}?`)){
            numberService
                .deleteNumber(id)
                .then(response => {
                    alert(`Number with name ${response.name} deleted`)
                    setFilteredPersons(filteredPersons.filter(person => person.id !== response.id))
                })
                .catch(error => {
                    setErrorMessage(
                        `Information '${person.name}' has already been removed from server`
                        )
                        setTimeout(() => {
                        setErrorMessage(null)
                        }, 5000)
                })
            
        }
        
    }
    
    return filteredPersons.map((person, i) => 
        <Person key={i} person={person} toggleDeletion={()=> toggleDeletion(person.id)}/>)
}
export default Persons