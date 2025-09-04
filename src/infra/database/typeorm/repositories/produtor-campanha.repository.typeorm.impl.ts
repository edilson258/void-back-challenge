import { type DataSource, Equal, MoreThan, type Repository } from "typeorm";
import type { Produtor } from "../../../../domain/entities/produtor.entity";
import type { ProdutorCampanha } from "../../../../domain/entities/produtor-campanha.assign";
import type { IProdutorCampanhaRepository } from "../../../../domain/repositories/produtor-campanha.repository";
import { VoidError } from "../../../../error";
import { ProdutorCampanhaTypeorm } from "../entities";

export class ProdutorCampanhaRepositoryTypeormImpl
	implements IProdutorCampanhaRepository
{
	private readonly repository: Repository<ProdutorCampanhaTypeorm>;

	constructor(dataSource: DataSource) {
		this.repository = dataSource.getRepository(ProdutorCampanhaTypeorm);
	}

	async save(produtorCampanha: ProdutorCampanha): Promise<ProdutorCampanha> {
		try {
			return await this.repository.save(produtorCampanha);
		} catch (error) {
			throw new VoidError("INFRASTRUCTURE_FAILURE", (error as Error).message);
		}
	}

	async listProdutoresByTecnicoId(id: number): Promise<Produtor[]> {
		try {
			const xs = await this.repository.find({
				select: { produtor: true },
				where: { tecnico: { id }, campanha: { dataFim: MoreThan(new Date()) } },
			});
			return xs.map((x) => x.produtor);
		} catch (error) {
			throw new VoidError("INFRASTRUCTURE_FAILURE", (error as Error).message);
		}
	}

	async updateTecnico(id: number, novoTecnicoId: number): Promise<void> {
		try {
			await this.repository.update(
				{ id },
				{
					tecnico: { id: novoTecnicoId },
				},
			);
		} catch (error) {
			throw new VoidError("INFRASTRUCTURE_FAILURE", (error as Error).message);
		}
	}

	async findByProdutorAndActiveCampanha(
		produtorId: number,
		campanhaId: number,
	): Promise<ProdutorCampanha | null> {
		try {
			const tmp = await this.repository.findOne({
				where: {
					produtor: {
						id: Equal(produtorId),
					},
					campanha: {
						id: Equal(campanhaId),
						dataFim: MoreThan(new Date()),
					},
				},
			});
			if (!tmp) {
				return null;
			}
			return {
				campanha_id: campanhaId,
				produtor_id: produtorId,
				tecnico_id: tmp.tecnico.id,
				id: tmp.id,
				data_registro: tmp.data_registro,
				data_transferencia: tmp.data_transferencia,
			};
		} catch (error) {
			throw new VoidError("INFRASTRUCTURE_FAILURE", (error as Error).message);
		}
	}

	async findByTecnicoAndActiveCampanha(
		tecnicoId: number,
		campanhaId: number,
	): Promise<ProdutorCampanha | null> {
		try {
			const tmp = await this.repository.findOne({
				where: {
					tecnico: {
						id: Equal(tecnicoId),
					},
					campanha: {
						id: Equal(campanhaId),
						dataFim: MoreThan(new Date()),
					},
				},
			});
			if (!tmp) {
				return null;
			}
			return {
				campanha_id: campanhaId,
				produtor_id: tmp.produtor.id,
				tecnico_id: tmp.tecnico.id,
				id: tmp.id,
				data_registro: tmp.data_registro,
				data_transferencia: tmp.data_transferencia,
			};
		} catch (error) {
			throw new VoidError("INFRASTRUCTURE_FAILURE", (error as Error).message);
		}
	}

	async findByTecnicoAndProductorAndActiveCampanha(
		tecnicoId: number,
		produtorId: number,
		campanhaId: number,
	): Promise<ProdutorCampanha | null> {
		try {
			const tmp = await this.repository.findOne({
				where: {
					tecnico: {
						id: Equal(tecnicoId),
					},
					produtor: {
						id: Equal(produtorId),
					},
					campanha: {
						id: Equal(campanhaId),
						dataFim: MoreThan(new Date()),
					},
				},
			});
			if (!tmp) {
				return null;
			}
			return {
				campanha_id: campanhaId,
				produtor_id: produtorId,
				tecnico_id: tecnicoId,
				id: tmp.id,
				data_registro: tmp.data_registro,
				data_transferencia: tmp.data_transferencia,
			};
		} catch (error) {
			throw new VoidError("INFRASTRUCTURE_FAILURE", (error as Error).message);
		}
	}
}
