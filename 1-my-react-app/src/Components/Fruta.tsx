import type { JSX } from "react";

type FrutaTipos = 'Paramecia' | 'Zoan' | 'Logia';
type FrutaProps<T extends FrutaTipos> = {
    nome: string;
    imagem: string;
    tipo: T;
};
function Fruta({ nome, imagem, tipo }: FrutaProps<FrutaTipos>): JSX.Element {
    return (
        <div className="fruta">
            <img src={imagem} alt="Imagem da fruta" />
            <h3>{nome}</h3>
            <p>{tipo}</p>
        </div>
    );
}
export default Fruta;