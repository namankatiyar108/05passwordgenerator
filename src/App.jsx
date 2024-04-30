import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass= ""
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(number) str += "0123456789"
    if(char) str += "!@#$%^&*-_=+{}[]`~"

    for(let i=0; i<=length -1; i++){
      let chars = Math.floor(Math.random() * str.length )
      pass+= str.charAt(chars)
    }
    setPassword(pass)


  }, [length,number,char,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select() 
    passwordRef.current?.setSelectionRange(0,19)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{passwordGenerator()},[length, number, char, passwordGenerator])
  

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-5 text-pink-500 bg-gray-800 text-center'>Password Generator</div>
      <div className='flex flex-col items-center'> 
        <div className='bg-pink-200 flex-auto flex shadow rounded-lg overflow-hidden mb-4 w-full max-w-md text-center items-center'>
          <input type='text' 
            value={password} 
            className='outline-none py-1 px-3 w-full bg-pink-200' 
            placeholder='password' 
            readOnly
            ref={passwordRef} />

          <button onClick={copyPasswordToClipboard} 
          className='outline-none bg-purple-700 text-white rounded-lg w-20'>copy</button>

        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={6} max={18} value={length} onChange={(e)=>{setLength(e.target.value)}}/>
            <label>length:{length}</label>
          </div>
          <div className='flex items-center gp-x-1'>
            <input type='checkbox' defaultChecked={number} id='numberInput' onChange={()=>{
              setNumber((prev)=>!prev);
            }} />
            <label>Number</label>
          </div>

          <div className='flex items-center gp-x-1'>
            <input type='checkbox' defaultChecked={char} id='charInput' onChange={()=>{
              setChar((prev)=>!prev);
            }} />
            <label>Characters</label>

          </div>
        </div>
      </div>
      
    </>
  )
}


export default App;
