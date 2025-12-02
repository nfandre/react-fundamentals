import React, { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { AxiosRequestConfig } from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import { Button, TextField } from '@mui/material';
import http from '../../http';

interface IparametrosBusca {
  ordering?: string,
  search?: string
}

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');
  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState('');


  const carregaDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    http.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resposta => {
        console.log(resposta)
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  useEffect(() => {
    carregaDados('v1/restaurantes/');
  }, [])

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const opcoes = {
      params: {

      } as IparametrosBusca
    }
    if (busca) {
      opcoes.params.search = busca;
    }
    if (ordenacao) {
      opcoes.params.ordering = ordenacao;
    }
    carregaDados(`v1/restaurantes/`, opcoes)
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <form onSubmit={buscar}>
      <div>
        <TextField onChange={(evento) => setBusca(evento.target.value)} id="standard-basic" label="Standard" variant="standard" />
      </div>
      <div>
        <label htmlFor='select-ordenacao'> Ordenação</label>
        <select
          name='select-ordenacao'
          id="select-ordenacao"
          value={ordenacao}
          onChange={evento => setOrdenacao(evento.target.value)}>
          <option value=''>Padrão</option>
          <option value='id'> Por ID </option>
          <option value='nome'>Por Nome</option>

        </select>
      </div>
      <Button variant="outlined" type='submit'>Buscar</Button>
    </form>

    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {paginaAnterior && <button onClick={() => carregaDados(paginaAnterior)}> Página anterior</button>}
    {proximaPagina && <button onClick={() => carregaDados(proximaPagina)}> Próxima página</button>}

  </section>)
}

export default ListaRestaurantes