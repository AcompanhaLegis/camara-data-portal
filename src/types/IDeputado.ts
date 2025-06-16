export interface IGabinete {
    andar: string;
    email: string;
    nome: string;
    predio: string;
    sala: string;
    telefone: string;
}

export interface IUltimoStatus {
    condicaoEleitoral: string;
    data: string;
    descricaoStatus: string;
    email: string;
    gabinete: IGabinete;
    id: number;
    idLegislatura: number;
    nome: string;
    nomeEleitoral: string;
    siglaPartido: string;
    siglaUf: string;
    situacao: string;
    uri: string;
    uriPartido: string;
    urlFoto: string;
}

export interface IDeputado {
    id: number;
    cpf: string;
    dataFalecimento: string;
    dataNascimento: string;
    escolaridade: string;
    municipioNascimento: string;
    nomeCivil: string;
    redeSocial: string[];
    sexo: string;
    ufNascimento: string;
    ultimoStatus: IUltimoStatus;
    uri: string;
    urlWebsite: string;
}

export interface IDeputadoExpense {
    ano: number;
    cnpjCpfFornecedor: string;
    codDocumento: number;
    codLote: number;
    codTipoDocumento: number;
    dataDocumento: string;
    mes: number;
    nomeFornecedor: string;
    numDocumento: string;
    numRessarcimento: string;
    parcela: number;
    tipoDespesa: string;
    tipoDocumento: string;
    urlDocumento: string;
    valorDocumento: number;
    valorGlosa: number;
    valorLiquido: number;
}

export interface IDeputadoSummary {
    id: number;
    nome: string;
    siglaPartido: string;
    siglaUf: string;
    uri: string;
    urlFoto: string;
    uriPartido?: string;
}