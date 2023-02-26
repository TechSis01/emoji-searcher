import React from 'react'
import axios from 'axios'
import { useEffect,useContext } from 'react'
import { globalContext } from './App'
function DefaultEmoj() {
    const {defaultEmoji,setDefaultEmoji} = useContext(globalContext)
    useEffect(()=>{
        async function showEmojis(){
            let data = await axios.get(`https://emoji-api.com/emojis?access_key=7b7b2ff496dd0389afc7b36ae3079331a912e5f5`)
            try{
                setDefaultEmoji(data.data.splice(0,20))
            }
            catch{
              console.log(error)
            }
          }
          showEmojis()
    },[])
  
  return (
    <div >
        <div className='default-emoji-container'>
    {defaultEmoji.map((emoji)=>(
        <div key={defaultEmoji.codePoint}>
            <div width="400" className='emoji' >{emoji.character}</div>
        </div>
      ))}
      </div>
      </div>
  )
}

export default DefaultEmoj