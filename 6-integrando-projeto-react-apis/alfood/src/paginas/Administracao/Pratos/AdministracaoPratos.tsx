import { useEffect, useState } from 'react'
import IRestaurante from '../../../interfaces/IRestaurante';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';


const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([]);

    useEffect(() => {
        http.get<IPrato[]>("v2/pratos/")
            .then(resposta => {
                setPratos(resposta.data);
            });
    }, [])

    const excluir = (restauranteAhSerExcluido: IPrato) => {
        http.delete(`v2/pratos/${restauranteAhSerExcluido.id}/`)
            .then(() => {
                const novalistaPrato = pratos.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id);
                setPratos(novalistaPrato);
            })
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell> Nome</TableCell>
                        <TableCell> Decrição</TableCell>
                        <TableCell> Tag</TableCell>
                        <TableCell> Imagem</TableCell>
                        <TableCell> Editar</TableCell>
                        <TableCell> Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map(prato =>
                        <TableRow key={prato.id}>
                            <TableCell>{prato.nome}</TableCell>
                            <TableCell>{prato.descricao}</TableCell>
                            <TableCell>{prato.tag}</TableCell>
                            <TableCell>
                                [<a href={prato.imagem} target='_blank' rel='noreferrer'>ver imagem</a>]
                            </TableCell>

                            <TableCell>
                                [ <Link to={`/admin/pratos/${prato.id}`}>Editar</Link>]
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color='error'
                                    onClick={() => excluir(prato)}>

                                    Excluir

                                </Button>
                            </TableCell>

                        </TableRow>)}

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoPratos;