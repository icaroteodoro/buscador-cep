import { useState } from 'react';
import {Input, Button} from 'reactstrap';


export function Cep(){
    const erro = "Sinto muito, não conseguimos encontrar o seu CEP!";
    const [codigo, setCodigo] = useState('');
    const [meuCep, setMeuCep] = useState({});

    function buscarCep(){
        const cep = codigo.replace('-','')
        if(codigo === ''){
            alert('Digite seu CEP!')
        }else if(cep.length < 8 || cep.length > 8  ){
            alert('CEP inválido!')
        }else{
            fetch(`https://viacep.com.br/ws/${cep}/json/`, {method: 'GET', mode: 'cors'}).then(response => response.json()).then(data => data.erro === true ? alert(erro) : setMeuCep(data))
        }  
    }

    return (

        <div className='container mt-5'>
            <div className='row form-group p-5'>  
                <img className='w-25 mx-auto rounded-circle' src="MeuCEP.png" alt="Logo" />
            </div>
            
            <div className='row form-group p-5 border rounded-4' >
                <div className='col-md-4 mx-auto'>
                    <label className='my-2 text-white'>Digite seu CEP:</label>
                    <Input onChange={e => setCodigo(e.target.value)} value={codigo} placeholder='00000-000'/>
                    <Button onClick={e => buscarCep(codigo)} className='col-md-4 offset-md-4 bg-success mt-3 '>Meu CEP</Button>
                </div>
            </div>
            <div className='row form-group p-5 border rounded-4 mt-5' >
                <div className='col-md-4 mx-auto'>
                    <label className='my-2 text-white'>Cidade:</label>
                    <Input  value={meuCep.localidade}/>
                    <label className='my-2 text-white'>Logradouro:</label>
                    <Input  value={meuCep.logradouro}/>
                    <label className='my-2 text-white'>Bairro:</label>
                    <Input  value={meuCep.bairro}/>
                    <label className='my-2 text-white'>Estado:</label>
                    <Input  value={meuCep.uf}/>
                </div>
            </div>
        </div> 
    );
}