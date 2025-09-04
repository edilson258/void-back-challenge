import type { DataSource, Repository } from "typeorm";
import { Produtor } from "../../../../domain/entities/produtor.entity";
import type { IProdutorRepository } from "../../../../domain/repositories/produtor.repository";
import { VoidError } from "../../../../error";
import { ProdutorTypeorm } from "../entities";

export class ProdutorRepositoryTypeormImpl implements IProdutorRepository {
	private readonly repository: Repository<ProdutorTypeorm>;

	constructor(dataSource: DataSource) {
		this.repository = dataSource.getRepository(ProdutorTypeorm);
	}

	async save(produtor: Produtor): Promise<Produtor> {
		try {
			const tmp = await this.repository.save({
				nome: produtor.nome,
				localizacao: produtor.localizacao,
			});
			return new Produtor(tmp.nome, tmp.localizacao, tmp.id);
		} catch (error) {
			throw new VoidError("INFRASTRUCTURE_FAILURE", (error as Error).message);
		}
	}

	async findById(id: number): Promise<Produtor | null> {
		try {
			const tmp = await this.repository.findOneBy({ id });
			if (!tmp) {
				return null;
			}
			return new Produtor(tmp.nome, tmp.localizacao, tmp.id);
		} catch (error) {
			throw new VoidError("INFRASTRUCTURE_FAILURE", (error as Error).message);
		}
	}
}
