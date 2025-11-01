type PirataProps = {
    nome: string;
    cargo: string;
    imagem: string;
};

function Pirata({nome, cargo, imagem} : PirataProps) {
    return (
        <div className="pirata">
            <img src={imagem} alt={nome} />
            <h3>{nome}</h3>
            <p>{cargo}</p>
        </div>

    );
}

export default Pirata;
