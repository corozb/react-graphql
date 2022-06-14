import './App.css'
import { useState } from 'react'
import Persons from './Persons'
import { PersonForm } from './PersonForm'
import { usePersons } from './persons/customHooks'
import { Notify } from './Notify'
import { PhoneForm } from './PhoneForm'

function App() {
  // Update data every 2 seconds:
  // const { data, error, loading } = useQuery(ALL_PERSONS, { pollInterval: 2000 })

  const { data, error, loading } = usePersons()
  const [errorMessage, setErrorMessage] = useState(null)

  if (error) return <span style='color: red'>{error}</span>

  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  // useEffect(() => {
  //   fetch('http://localhost:4000', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       query: `
  //     query {
  //       allPersonsApi {
  //         name
  //       }
  //     }`,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res.data)
  //     })
  // }, [])

  return (
    <div className='App'>
      <Notify errorMessage={errorMessage} />
      <header className='App-header'>
        {loading ? <h1>Loading...</h1> : <Persons persons={data?.allPersons} />}
        <PhoneForm notifyError={notifyError} />
        <PersonForm notifyError={notifyError} />
      </header>
    </div>
  )
}

export default App
