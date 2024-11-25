import { useState } from 'react'

const Filter = ({persons, setFilteredData}) =>{
    
    const [searchName, setSearchName] = useState('')

    const handleSearchNameChange = (event) =>{
        const value = event.target.value
        setSearchName(value)
                
        setFilteredData(persons.filter((person) => 
            person.name.toLowerCase().includes(value.toLowerCase())))
        
    }
    
    return(
        <div>
            filter shown with <input value={searchName} onChange={handleSearchNameChange} />
        </div>
    )
}

export default Filter