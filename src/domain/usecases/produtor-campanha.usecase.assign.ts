import { VoidError } from "../../error";
import { ProdutorCampanha } from "../entities/produtor-campanha.assign";
import type { ICampanhaRepository } from "../repositories/campanha.repository";
import type { IProdutorRepository } from "../repositories/produtor.repository";
import type { IProdutorCampanhaRepository } from "../repositories/produtor-campanha.repository";
import type { ITecnicoRepository } from "../repositories/tecnico.repository";
import type { ProdutorCampanhaAssignDto } from "../schemas/produtor-campanha.schema";

export class ProdutorCampanhaUseCaseAssign {
	constructor(
		private readonly tecnicoRepo: ITecnicoRepository,
		private readonly campanhaRepo: ICampanhaRepository,
		private readonly produtorRepo: IProdutorRepository,
		private readonly produtorCampanhaRepo: IProdutorCampanhaRepository,
	) {}

	public execute = async (
		dto: ProdutorCampanhaAssignDto,
	): Promise<ProdutorCampanha> => {
		await this.validateAssignInfo(dto);

		if (
			await this.produtorCampanhaRepo.findByTecnicoAndProductorAndActiveCampanha(
				dto.tecnico_id,
				dto.produtor_id,
				dto.campanha_id,
			)
		) {
			throw new VoidError(
				"ENTRY_IS_INVALID",
				"Produtor ja esta vinculado a campanha",
			);
		}

		const dataRegistro = new Date();
		const dataTransferencia = new Date();
		const produtorCampanha = new ProdutorCampanha(
			dto.tecnico_id,
			dto.produtor_id,
			dto.campanha_id,
			dataRegistro,
			dataTransferencia,
		);
		return await this.produtorCampanhaRepo.save(produtorCampanha);
	};

	private validateAssignInfo = async (dto: ProdutorCampanhaAssignDto) => {
		const campanha = await this.campanhaRepo.findById(dto.campanha_id);
		if (!campanha) {
			throw new VoidError("ENTRY_NOT_FOUND", "Campanha nao existe");
		}

		if (campanha.data_fim < new Date()) {
			throw new VoidError("ENTRY_IS_INVALID", "Campanha ja terminou");
		}

		if (!(await this.tecnicoRepo.findById(dto.tecnico_id))) {
			throw new VoidError("ENTRY_NOT_FOUND", "Tecnico nao existe");
		}

		if (!(await this.produtorRepo.findById(dto.produtor_id))) {
			throw new VoidError("ENTRY_NOT_FOUND", "Produtor nao existe");
		}

		if (
			await this.produtorCampanhaRepo.findByProdutorAndActiveCampanha(
				dto.produtor_id,
				dto.campanha_id,
			)
		) {
			throw new VoidError("ENTRY_COLLISION", "Produtor ja esta nessa campanha");
		}

		if (
			await this.produtorCampanhaRepo.findByTecnicoAndActiveCampanha(
				dto.tecnico_id,
				dto.campanha_id,
			)
		) {
			throw new VoidError(
				"ENTRY_COLLISION",
				"Tecnico ja esta em outra campanha activa",
			);
		}
	};
}
