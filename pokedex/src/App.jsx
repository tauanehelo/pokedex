import React from 'react'
import { useState, useEffect } from 'react'
import pokeLogo from './assets/pokebola.svg'
import './App.css'
import axios from 'axios'
import Card from './components/card'


function App() {

  const [data, setData] = useState()
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState()

  useEffect(() => {
      async function getData() {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=897")
        setData(response.data.results)
        setSearchResults(response.data.results)
      }
      getData()
  }, [])
  useEffect(() => {
    console.log(data)
  },[data])

  React.useEffect(() => {
    const results = data?.filter(list => {
      if (query === "") {
        return list
      } else if (list.name.toLowerCase().includes(query.toLowerCase())) {
        return list}}
    );
    setSearchResults(results);
  }, [query]);
  
      

  return (
    <div className="App">
      <div >
        <img src={pokeLogo} className="logo" alt="Pokebola" />
      </div>
      <div>
      <input type="text" placeholder='Pesquisar pokémon' onChange={event => {setQuery(event.target.value)}} />
        <h1>Pokédex</h1>
      </div>
      <div className="cards">
          {searchResults? searchResults.map((poke, i) => {
            return (<Card nome={poke.name} link={poke.url} key={i} />)
          }) : <p>carregando...</p> }
      </div>
      <footer>
        <p>Com 💛 Info Jr UFBA 2022</p>
      </footer>
    </div>
  )
}

export default App
