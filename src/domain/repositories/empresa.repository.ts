import type { Empresa } from "../entities/empresa.entity";

export interface IEmpresaRepository {
	save(empresa: Empresa): Promise<Empresa>;
	findById(id: number): Promise<Empresa | null>;
	findByCnpj(cnpj: string): Promise<Empresa | null>;
}
