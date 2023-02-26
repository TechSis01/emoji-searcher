import { useState,useEffect,createContext } from 'react'
import axios from 'axios'
import './App.css'
import Heading from './Heading'
import DefaultEmoj from './DefaultEmoj'

export const globalContext = createContext()
function App() {
  const [defaultEmoji,setDefaultEmoji] = useState([])
  const [emojis, setEmojis] = useState([])
  const [errorState,setErrorState] = useState(false)
  const [search, setSearch] = useState("")

  function setSearchBox(e){
    setSearch(e.target.value)
  }

  async function showEmojis(){
    let data = await axios.get(`https://emoji-api.com/emojis?search=${search}&access_key=7b7b2ff496dd0389afc7b36ae3079331a912e5f5`)
    try{
      if(data.data === null){
        setErrorState(true)
        setEmojis([])
        console.log("emoji not found")
      }
      else{
        setEmojis(data.data)
        setErrorState(false)
        setDefaultEmoji([])
      
      }
    }
    catch{
      console.log(error)
    }
  }

  
function displaySearch(){
  showEmojis()
  setSearch("")
}
  
  
  return (
    <>
    <globalContext.Provider value={{defaultEmoji,setDefaultEmoji}}>
    <Heading />
    <div className="App">
      <div>
        <div className='input-container'>
          <input type="text" value={search} onChange={setSearchBox} className="input-box" placeholder='search for an emoji'></input>
          <button onClick={displaySearch}>Search Emoji</button>
        </div>
       
        <div className='emoji-container'>
        <DefaultEmoj />
        {emojis.map((emoji)=>(
            <div key={emoji.codePoint}>
                <div width="400" className='emoji'>{emoji.character}</div>
            </div>
          ))}
          </div>
        {errorState &&  <p>Emoji not found</p>} 
      </div>
        
    </div>
    </globalContext.Provider>
   
    </>
  )
}

export default App
