import { useState } from 'react';

type RecompensaProps = {
  valorRecompensa: number;
};

function Recompensa({ valorRecompensa }: RecompensaProps) {
    const [recompensa, setRecompensa] = useState(valorRecompensa);
    const [novoValor, setNovoValor] = useState('');

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const valorDigitado = evento.target.value;
        setNovoValor(valorDigitado);
      };

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
        setRecompensa(valorRecompensa);
        setNovoValor('');
};
    
    return (
        <div className="recompensa">
        <h3>Recompensa</h3>
        <p>{recompensa.toLocaleString()} berries</p>
        <form onSubmit={handleSubmit}>
            <input
            type="number"
            value={novoValor}
            onChange={handleChange}
            placeholder="Novo valor"
            />
            <button type="submit">Atualizar</button>
        </form>
        </div>
    );
}
export default Recompensa;
    