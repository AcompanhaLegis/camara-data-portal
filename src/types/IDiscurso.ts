export default interface IDiscurso {
    dataHoraFim: string;
    dataHoraInicio: string;
    faseEvento: {
        dataHoraFim: string;
        dataHoraInicio: string;
        titulo: string;
    };
    keywords: string;
    sumario: string;
    tipoDiscurso: string;
    transcricao: string;
    uriEvento: string;
    urlAudio: string;
    urlTexto: string;
    urlVideo: string;
}