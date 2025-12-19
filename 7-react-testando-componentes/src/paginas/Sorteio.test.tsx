import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import Sorteio from "./Sorteio";
import { useResultadoSorteio } from "../state/hook/useResultadoSorteio";

jest.mock('../state/hook/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
});

jest.mock('../state/hook/useResultadoSorteio', () => {
    return {
        useResultadoSorteio: jest.fn()
    }
});


describe('na pagina de sorteio', () => {
    const participantes = ['ana', 'catarina', 'joao'];

    const resultado = new Map([
        ['ana', 'jao'],
        ['catarina', 'ana'],
        ['jao', 'catarina']
    ])

    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes),
        (useResultadoSorteio as jest.Mock).mockReturnValue(resultado)
    });
    test('todos os participantes podem exibir o seu amigo secreto', () => {
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        );

        const opcoes = screen.queryAllByRole('option');
        expect(opcoes).toHaveLength(participantes.length + 1); // ja vem uma option por padrao
    });

    test('o amigo secreto é exibido quando solicitado', () => {
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        );

        const select = screen.getByPlaceholderText('Selecione o seu nome');

        fireEvent.change(select, {
            target: {
                value: participantes[0]
            }
        });

        const botao = screen.getByRole('button');

        fireEvent.click(botao);

        const amigoSecreto = screen.getByRole('alert');

        expect(amigoSecreto).toBeInTheDocument();
    });
});