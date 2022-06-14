import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FIND_PERSON } from './persons/graphql-queries'

const Persons = ({ persons = [] }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON)
  const [person, setPerson] = useState(null)

  const showPerson = (name) => {
    getPerson({
      variables: { nameToSearch: name },
    })
  }

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson)
    }
  }, [result])

  if (person)
    return (
      <div>
        <h2>{person.name}</h2>
        <div>
          {person.address.street}, {person.address.city}
        </div>
        <div>{person.phone}</div>
        <button onClick={() => setPerson(null)}>Close</button>
      </div>
    )

  if (persons === null) return null

  return (
    <>
      <h2>Persons</h2>
      {persons.map((person) => (
        <div
          key={person.id}
          onClick={() => {
            showPerson(person.name)
          }}
        >
          {person.name} {person.phone}
        </div>
      ))}
    </>
  )
}

export default Persons
