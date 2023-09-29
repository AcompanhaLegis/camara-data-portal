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

export interface IProposicaoAutor {
    codPartido: number;
    idCadastro: number;
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

export interface IStatusProposicao {
    ambito: string;
    apreciacao: string;
    codSituacao: number;
    codTipoTramitacao: number | string;
    dataHora: string;
    descricaoSituacao: string;
    descricaoTramitacao: string;
    despacho: string;
    regime: string;
    sequencia: number;
    siglaOrgao: string;
    uriOrgao: string;
    uriUltimoRelator: string;
    url: string | null;
}

interface IProposicao {
    ano: number;
    apreciacao: IProposicaoApreciacao;
    autor: IProposicaoAutor;
    siglaTipo: string;
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
    tipo: ITipoProposicao;
    ultimoDespacho: IProposicaoUltimoDespacho;
    statusProposicao: IStatusProposicao;
    keywords: string;
    ementaDetalhada: string;
}

export default IProposicao;