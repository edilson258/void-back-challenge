import type { Empresa } from "../../../../src/domain/entities/empresa.entity";
import type { IEmpresaRepository } from "../../../../src/domain/repositories/empresa.repository";

export class EmpresaRepositoryMock implements IEmpresaRepository {
	public empresas: Empresa[];

	constructor() {
		this.empresas = [];
	}

	async save(empresa: Empresa): Promise<Empresa> {
		empresa.id = Math.max(...this.empresas.map((e) => e.id ?? 0)) + 1;
		this.empresas.push(empresa);
		return empresa;
	}

	async findByCnpj(cnpj: string): Promise<Empresa | null> {
		return this.empresas.find((empresa) => empresa.cnpj === cnpj) || null;
	}

	async findById(id: number): Promise<Empresa | null> {
		return this.empresas.find((empresa) => empresa.id === id) || null;
	}
}
