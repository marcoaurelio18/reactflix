import React, { useState, useEffect } from 'react'
import PageDefault from '../../../components/PageDefault'
import FormField from '../../../components/FormField'
import Button from '../../../components/Button'
import { Link } from 'react-router-dom'

function CadastroCategoria() {

    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: '',
    }

    const [categorias, setCategorias] = useState([])
    const [values, setValues] = useState(valoresIniciais);
    
    

    function setValue(chave, valor) {
        setValues({
            ...values,
            [chave]: valor,
        })
    }

    function handleChange(infosDoEvento){
        setValue(
            infosDoEvento.target.getAttribute('name'),
            infosDoEvento.target.value
        );
    }

    useEffect(() => {
        console.log("adfasfa");
        const URL = 'http://localhost:8080/categorias';
        fetch(URL).then(async (response) => {
            const resposta = await response.json();
            setCategorias([ 
                ...resposta,
            ]);
        });
        /*setTimeout(() => {
            setCategorias([
            ...categorias,
            {
                "id": 1,
                "nome": "Front end",
                "descricao": "Uma categoria bacanuda",
                "cor": "#cbd1ff"
            },
            {
                "id": 2,
                "nome": "Back end",
                "descricao": "Outra categoria bacanuda",
                "cor": "#cbd1ff"
            }
        ]);
    }, 4 * 1000);*/
    }, []);

    return (
        <PageDefault>
            <h1>Cadastro de Categoria: { values.nome } </h1>

            <form onSubmit={function handleSubmit(infosDoEvento){
                infosDoEvento.preventDefault();
                setCategorias([
                    ...categorias,
                    values
                ]);

                setValues(valoresIniciais);
            }}>

                <FormField 
                    label="Nome"
                    type="text"
                    name="nome"
                    value = { values.nome }
                    onChange = { handleChange }
                />

                <FormField 
                    label="Descricao"
                    type="textarea"
                    name="descricao"
                    value = { values.descricao }
                    onChange = { handleChange }
                />

                <FormField 
                    label="Cor"
                    type="color"
                    name="cor"
                    value = { values.cor }
                    onChange = { handleChange }
                />

                <Button type="submit">Cadastrar</Button>    
            </form>

            {categorias.length === 0 && (
                <div>
                    Loading...
                </div>
            )}
            
            <ul>
                {categorias.map((categoria, indice) => {
                    return (
                        <li key={`${categoria.nome}${indice}`}>
                            {categoria.nome}
                        </li>
                    )
                })}
            </ul>

            
            <Link to="/">
                Ir pra home
            </Link>
        </PageDefault>
    )
}

export default CadastroCategoria;