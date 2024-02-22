import { useState } from 'react'
import './App.css'

function App() {
  
  const[cep, setCep] = useState('')
  const[endereco, setEndereco] = useState(null);
  const handleBuscaCep = async (event) => {
    event.preventDefault()
    try{
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      if(!response.ok){
        throw new error("CEP não encontrado")
      }
      setEndereco(await response.json());
    }catch (error){
      console.error(error);
    }
  }

  return (
    <>
      <div className='container'>
        <h1>Busca de endereço</h1>
        <input 
          type="number"
          placeholder='Digite seu CEP'
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          />
          &nbsp;&nbsp;
          <button onClick={handleBuscaCep}>
            Buscar
          </button>
          
            {endereco ?(<div className='endereco'>
              <p>Rua: {endereco.logradouro} </p>
              <p>Bairro: {endereco.bairro} </p>
              <p>Cidade: {endereco.localidade} </p>
              <p>Estado: {endereco.uf} </p>
              </div> ): (null)}
         
      </div>
    </>
  )
}

export default App
