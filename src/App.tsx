import { useState } from 'react'

function App() {
  const [message, setMessage] = useState("enter student id")
  const [idInput, setIdInput] = useState(0)
  const getUserScore = async(id: number) => {
    const res = await fetch(`https://script.google.com/macros/s/AKfycbz6LAtf06WhqsOvteCBICQlXCw-Ovys6SmxIjklb6OiunHP_Vf_E7QUqEE2AVkETqx1gg/exec?id=${id}`)
    const data = await res.json()
    if (data['dupe']){
      setMessage("id duplication, check spreadsheet.")
      return
    }
    else if (data['found']){
      setMessage(`student: ${id} score: ${data['score']}`)
    }
    else {
      setMessage("not found")
    }
  }

  const handleInputChanges = (e: any) => {
    setIdInput(e.target.value)
  }

  const handleSubmit = () => {
    setMessage("loading...")
    getUserScore(idInput)
  }

  return (
    <>
      <div className="">
        <div className="flex rounded-full p-4 bg-gray-400 mt-10">
          <input type="number" value={idInput} onChange={handleInputChanges} onKeyDown={(e: any) => {
            if (e.key == "Enter"){
              handleSubmit()
            }
          }} className='w-full px-3'/>
        </div>
        <div className="ml-auto mr-auto text-center text-2xl bg-slate-400 my-4">
          <button onClick={() => {handleSubmit()}}>Search</button>
        </div>
        <p className="text-center text-3xl">{message}</p>
      </div>
    </>
  )
}

export default App
