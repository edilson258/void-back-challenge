import { VoidError } from "../../error";
import { Campanha } from "../entities/campanha.entity";

import type { ICampanhaRepository } from "../repositories/campanha.repository";
import type { IEmpresaRepository } from "../repositories/empresa.repository";
import type { CampanhaCreateDto } from "../schemas/campanha.schema";

export class CampanhaUseCaseCreate {
	constructor(
		private readonly empresaRepo: IEmpresaRepository,
		private readonly campanhaRepo: ICampanhaRepository,
	) {}

	public execute = async (dto: CampanhaCreateDto): Promise<Campanha> => {
		const empresa = await this.empresaRepo.findById(dto.empresa_id);
		if (!empresa) {
			throw new VoidError("ENTRY_NOT_FOUND", "Empresa nao existe");
		}
		const campanha = new Campanha(
			dto.nome,
			dto.empresa_id,
			dto.data_inicio,
			dto.data_fim,
		);
		return await this.campanhaRepo.save(campanha);
	};
}
