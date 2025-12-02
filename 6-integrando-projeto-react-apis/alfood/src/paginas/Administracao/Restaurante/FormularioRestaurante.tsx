import { Box, Button, TextField, Typography } from '@mui/material'
import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';
import http from '../../../http';


const FormularioRestaurante = () => {
    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const parametros = useParams();

    useEffect(() => {
        console.log(parametros)
        if (parametros.id) {
            http.get<IRestaurante>(`v2/restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome));
        }
    }, [parametros]);

    const aoSubmeterForm = (evento: FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            http.put(`v2/restaurantes/${parametros.id}/`, { nome: nomeRestaurante })
                .then(() => alert('retaurante atualizao com sucesso'))
        } else {
            http.post('v2/restaurantes/', { nome: nomeRestaurante })
                .then(() => alert('retaurante cadastrado com sucesso'))
        }
    }

    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Typography component='h1' variant='h6'> Formulário de Restaurantes</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField

                    value={nomeRestaurante}
                    onChange={evento => setNomeRestaurante(evento.target.value)}
                    id="standard-basic"
                    label="Nome do restaurante"
                    variant="standard"
                    fullWidth
                    required
                />
                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>

        </Box>




    )
}

export default FormularioRestaurante