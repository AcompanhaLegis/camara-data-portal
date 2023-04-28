export interface ITipoProposicao {
    id: number;
    nome: string;
    sigla: string;
}

export interface IProposicaoUltimoDespacho {
    data: string;
    descricao: string;
}

export interface IProposicaoOrgao {
    codOrgaoEstado: number;
    siglaOrgaoEstado: string;
}

export interface IProposicaoRegime {
    descricao: string;
    id: number;
}

export interface IProposicaoPrincipal {
    codProposicaoPrincipal: number;
    proposicaoPrincipal: string;
}

export interface IProposicaoSituacao {
    descricao: string;
    id: number;
    orgao: IProposicaoOrgao;
    principal: IProposicaoPrincipal;
}

export interface IProposicaoAutor {
    codPartido: number;
    ideCadastro: number;
    nome: string;
    siglaPartido: string;
    siglaUF: string;
}

interface IProposicaoApreciacao {
    descricao: string;
    id: number;
}

interface IProposicaoOrgaoNumerador {
    id: number;
    nome: string;
    sigla: string;
}

export interface IProposicaoSummary {
    ano: number;
    codTipo: number;
    ementa: string;
    id: number;
    numero: number;
    siglaTipo: string;
    uri: string;
}

interface IProposicao {
    ano: number;
    apreciacao: IProposicaoApreciacao;
    autor: IProposicaoAutor;
    dataApresentacao: string;
    ementa: string;
    explicacaoEmenta: string;
    id: number;
    indGenero: string;
    nome: string;
    numero: number;
    orgaoNumerador: IProposicaoOrgaoNumerador;
    qtdAutores: number;
    qtdOrgaosComEstado: number;
    regime: IProposicaoRegime;
    situacao: IProposicaoSituacao;
    tipo: ITipoProposicao;
    ultimoDespacho: IProposicaoUltimoDespacho;
}

export default IProposicao;