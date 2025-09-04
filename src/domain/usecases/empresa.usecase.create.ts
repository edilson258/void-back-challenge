import { VoidError } from "../../error";
import { Empresa } from "../entities/empresa.entity";

import type { IEmpresaRepository } from "../repositories/empresa.repository";
import type { EmpresaCreateDto } from "../schemas/empresa.schema";

export class EmpresaUseCaseCreate {
	constructor(private readonly empresaRepo: IEmpresaRepository) {}

	public execute = async (dto: EmpresaCreateDto): Promise<Empresa> => {
		const empresaWithCnpj = await this.empresaRepo.findByCnpj(dto.cnpj);

		if (empresaWithCnpj) {
			throw new VoidError(
				"ENTRY_COLLISION",
				"CNPJ ja foi usado por outra empresa",
			);
		}

		const empresa = new Empresa(dto.nome, dto.cnpj, dto.telefone, dto.email);
		return await this.empresaRepo.save(empresa);
	};
}
