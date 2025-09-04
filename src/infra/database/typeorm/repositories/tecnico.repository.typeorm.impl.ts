import type { DataSource, Repository } from "typeorm";
import { Tecnico } from "../../../../domain/entities/tecnico.entity";
import type { ITecnicoRepository } from "../../../../domain/repositories/tecnico.repository";
import { VoidError } from "../../../../error";
import { TecnicoTypeorm } from "../entities";

export class TecnicoRepositoryTypeormImpl implements ITecnicoRepository {
	private readonly repository: Repository<TecnicoTypeorm>;

	constructor(dataSource: DataSource) {
		this.repository = dataSource.getRepository(TecnicoTypeorm);
	}

	async save(tecnico: Tecnico): Promise<Tecnico> {
		try {
			const tmp = await this.repository.save({
				nome: tecnico.nome,
				campanha: { id: tecnico.campanha_id },
			});
			return new Tecnico(tmp.nome, tmp.campanha.id, tecnico.id);
		} catch (error) {
			throw new VoidError("INFRASTRUCTURE_FAILURE", (error as Error).message);
		}
	}

	async findById(id: number): Promise<Tecnico | null> {
		try {
			const tmp = await this.repository.findOneBy({ id });
			console.log(tmp);
			if (!tmp) {
				return null;
			}
			return new Tecnico(tmp.nome, tmp.campanha.id, tmp.id);
		} catch (error) {
			throw new VoidError("INFRASTRUCTURE_FAILURE", (error as Error).message);
		}
	}
}
