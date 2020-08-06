import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import PageDefault from '../../../components/PageDefault'
import useForm from '../../../hooks/useForm'
import FormField from '../../../components/FormField'
import Button from '../../../components/Button'
import VideosRepository from '../../../repositories/videos'
import CategoriasRepository from '../../../repositories/categorias'

function CadastroVideo() {
    const history = useHistory();
    const [categorias, setCategorias] = useState([]);
    const categoryTitles = categorias.map(({titulo}) => titulo)

    const { handleChange, values } = useForm({
        titulo: 'video padrão',
        url: 'https://www.youtube.com/watch?v=9VH0fUABBjY&list=RD9VH0fUABBjY&start_radio=1',
        categoria: 'Front End'
    });

    useEffect(() => {
        CategoriasRepository.getAll()
        .then((categorias) => {
            setCategorias(categorias);
        })
    }, []);

    return (
        <PageDefault>
            <h1>Cadastro de video</h1>
    
            <form onSubmit={(event) => {
                event.preventDefault();

                const categoriaEscolhida = categorias.find((categoria) => {
                    return categoria.titulo === values.categoria;
                });
                
                VideosRepository.create({
                    titulo: values.titulo,
                    url: values.url,
                    categoriaId: categoriaEscolhida.id
                }).then(() => {
                    console.log('video cadastrado com sucesso');
                    history.push('/');
                })
            }}
            >
                <FormField 
                    label="Titulo do video"
                    name="titulo"
                    value = { values.titulo }
                    onChange = { handleChange }
                />

                <FormField 
                    label="URL"
                    name="url"
                    value = { values.url }
                    onChange = { handleChange }
                />

                <FormField 
                    label="Categoria"
                    name="categoria"
                    value = { values.categoria }
                    suggestions = { categoryTitles }
                    onChange = { handleChange }
                />

                <Button type="submit">Cadastrar</Button>
            </form>

            <Link to="/cadastro/categoria">
                Cadastrar categoria
            </Link> 
        </PageDefault>
    )
}

export default CadastroVideo;