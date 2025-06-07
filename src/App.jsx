import { useState } from 'react'
import './App.css'
import PokeCards from './components/poke_cards'

function App() {

  return (
    <>
      <PokeCards col={7}/>
    </>
  )
}

export default App

// step 1: npm install daisyui
//step 2: npm install tailwindcss
//step 3: npm install @tailwindcssvite
// create components folder
//add file poke_cards