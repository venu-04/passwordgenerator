import { useState ,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="1234567890"
    if(charAllowed) str+="!@#$%^&*()_+"

  for(let i=1;i< length;i++){
    const char = Math.floor(Math.random() * str.length + 1)
    pass+=str.charAt(char)
  }
  setPassword(pass)

  },[length,numberAllowed,charAllowed])

  const copypasswordToclipboard = () =>{
    window.navigator.clipboard.writeText(password)
    // alert("copied!")
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,4)  //this is used to select certaian range of charcacters from the password
  }

  useEffect(() => {
    generatePassword()
  },[length,numberAllowed,charAllowed])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800
    text-orange-500'>
      <h1 className='text-3xl font-bold mb-2 text-center'>Password generator</h1>
      <div className='flex shadow rounded-lg ovreflow-hidden mb-4'>
        <input
         type="text"
         value={password}
         className='outliine-none w-full py-1 px-3'
         placeholder='password'
         readOnly
         ref={passwordRef}

         />
         <button
         onClick={copypasswordToclipboard}
         className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
        <input type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => setLength(e.target.value)}
        name="" 
        id="" />
        <label htmlFor="length"> Length:{length}</label>

        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={() => {
            setNumberAllowed((prev) => !prev)

          }}
          
           />
           <label htmlFor="number">Numbers</label>

        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
         onChange={() => {
          setCharAllowed((prev) => !prev)
         }}
           />
           <label htmlFor="charcters">Characters</label>

        </div>

      </div>


    </div>
  )
}

export default App
