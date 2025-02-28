import { IAPIDeputado } from "@/types/IAPI";
import { IDeputado } from "@/types/IDeputado";

export const mockedDeputados = (config = {}): IAPIDeputado => ({
    dados: {
        id: 1,
        ...config,
    } as IDeputado // TODO: provavel que com testes completos isso não será mais necessário
});
