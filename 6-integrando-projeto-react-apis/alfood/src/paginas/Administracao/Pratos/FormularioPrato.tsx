import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';
import http from '../../../http';
import ITag from '../../../interfaces/ITag';
import IPrato from '../../../interfaces/IPrato';


const FormularioPrato = () => {
    const [nomePrato, setNomePrato] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tag, setTag] = useState('');
    const [restaurante, setRestaurante] = useState('');
    const [imagem, setImagem] = useState<File | null>(null);



    const [tags, setTags] = useState<ITag[]>([]);
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);


    const parametros = useParams();

    useEffect(() => {
        http.get<{ tags: ITag[] }>('v2/tags/')
            .then(resposta => setTags(resposta.data.tags));

       
        
        (async ()=> {
            const result = await http.get<IRestaurante[]>('v2/restaurantes/');
            setRestaurantes(result.data);

            if (parametros.id) {
                http.get<IPrato>(`v2/pratos/${parametros.id}/`)
                    .then(resposta => {
                        console.log(resposta)
                        setNomePrato(resposta.data.nome);
                        setDescricao(resposta.data.descricao);
                        setTag(resposta.data.tag);
    
                        if(result.data){
                            console.log(result.data)
                            const nome = result.data?.find(item => item?.id === resposta.data.restaurante)?.nome;
                            console.log('passou', nome)
                            if(nome){
                                setRestaurante(nome);
                            }
                        }
                    });
            }
        })()

        
    }, [parametros]);

    const aoSubmeterForm = (evento: FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const formData = new FormData();
        formData.append('nome', nomePrato);
        formData.append('descricao', descricao);
        formData.append('tag', tag);
        formData.append('restaurante', restaurante);

        if (imagem) {
            formData.append('imagem', imagem);
        }


        if (parametros.id) {
            http.put(`v2/pratos/${parametros.id}/`, { nome: nomePrato })
                .then(() => alert('prato atualizao com sucesso'))
        } else {
            http.request({
                url: 'v2/pratos/',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            }).then((ß) => alert('Prato Cadastrado com sucesso'))
                .catch(erro => console.log(erro));
        }
    }

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null);
        }

    }

    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Typography component='h1' variant='h6'> Formulário de pratos</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField

                    value={nomePrato}
                    onChange={evento => setNomePrato(evento.target.value)}
                    id="standard-basic"
                    label="Nome do Prato"
                    variant="standard"
                    fullWidth
                    required
                    margin='dense'
                />

                <TextField

                    value={descricao}
                    onChange={evento => setDescricao(evento.target.value)}
                    id="standard-basic"
                    label="Descrição do Prato"
                    variant="standard"
                    fullWidth
                    required
                    margin='dense'
                />

                <FormControl
                    margin='dense'
                    fullWidth
                >
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                        {tags.map(tag =>
                            <MenuItem
                                value={tag.value}
                                key={tag.id}
                            >
                                {tag.value}
                            </MenuItem>
                        )}
                    </Select>

                </FormControl>

                <FormControl
                    margin='dense'
                    fullWidth
                >
                    <InputLabel id="select-restaurante">Restaurante</InputLabel>
                    <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                        {restaurantes.map(restaurante =>
                            <MenuItem
                                value={restaurante.id}
                                key={restaurante.id}
                            >
                                {restaurante.nome}
                            </MenuItem>
                        )}
                    </Select>

                </FormControl>

                <input type='file' onChange={selecionarArquivo} />

                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>

        </Box>




    )
}

export default FormularioPrato