import { useEffect, useState } from 'react'
import IRestaurante from '../../../interfaces/IRestaurante';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import http from '../../../http';


const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        http.get<IRestaurante[]>("v2/restaurantes/")
            .then(resposta => {
                setRestaurantes(resposta.data);
            });
    }, [])

    const excluir = (restauranteAhSerExcluido: IRestaurante) => {
        http.delete(`v2/restaurantes/${restauranteAhSerExcluido.id}/`)
            .then(() => {
                const novaListaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id);
                setRestaurantes(novaListaRestaurante);
            })
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell> Restaurantes</TableCell>
                        <TableCell> Editar</TableCell>
                        <TableCell> Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante =>
                        <TableRow key={restaurante.id}>
                            <TableCell>{restaurante.nome}</TableCell>
                            <TableCell>
                                [ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>]
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color='error'
                                    onClick={() => excluir(restaurante)}>
                                    
                                    Excluir

                                </Button>
                            </TableCell>

                        </TableRow>)}

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes;