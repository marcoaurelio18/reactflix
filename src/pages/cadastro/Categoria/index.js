import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageDefault from '../../../components/PageDefault'
import FormField from '../../../components/FormField'
import Button from '../../../components/Button'
import useForm from '../../../hooks/useForm'

function CadastroCategoria() {

    const valoresIniciais = {
        titulo: '',
        descricao: '',
        cor: '',
    }

    const { handleChange, values, clearForm } = useForm(valoresIniciais)

    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        console.log("adfasfa");
        const URL = window.location.hostname.includes('localhost')?
        'http://localhost:8080/categorias':
        'http://domflix.herokuapp.com/categorias';
        fetch(URL).then(async (response) => {
            const resposta = await response.json();
            setCategorias([ 
                ...resposta,
            ]);
        });
    }, []);

    return (
        <PageDefault>
            <h1>Cadastro de Categoria: { values.titulo } </h1>

            <form onSubmit={function handleSubmit(infosDoEvento){
                infosDoEvento.preventDefault();
                setCategorias([
                    ...categorias,
                    values
                ]);

                clearForm(valoresIniciais);
            }}>

                <FormField 
                    label="Titulo"
                    name="titulo"
                    value = { values.titulo }
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
                        <li key={`${categoria.titulo}${indice}`}>
                            {categoria.titulo}
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