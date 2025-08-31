import type { DataSource, Repository } from "typeorm";
import type { ICampanhaRepository } from "../../../../domain/repositories/campanha.repository";
import { CampanhaTypeorm } from "../entities";
import { Campanha } from "../../../../domain/entities/campanha.entity";
import { VoidError } from "../../../../error";

export class CampanhaRepositoryTypeormImpl implements ICampanhaRepository {
  private readonly repository: Repository<CampanhaTypeorm>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(CampanhaTypeorm);
  }

  async save(campanha: Campanha): Promise<Campanha> {
    try {
      const tmp = await this.repository.save({
        nome: campanha.nome,
        dataInicio: campanha.data_inicio,
        dataFim: campanha.data_fim,
        empresa: { id: campanha.empresa_id },
      });
      campanha.id = tmp.id;
      return campanha;
    } catch (error) {
      throw new VoidError("INFRASTRUCTURE_FAILURE", (error as Error).message);
    }
  }

  async findById(id: number): Promise<Campanha | null> {
    try {
      const tmp = await this.repository.findOneBy({ id });
      if (!tmp) {
        return null;
      }
      return {
        id: tmp.id,
        nome: tmp.nome,
        data_inicio: tmp.dataInicio,
        data_fim: tmp.dataFim,
        empresa_id: tmp.empresa.id,
      };
    } catch (error) {
      throw new VoidError("INFRASTRUCTURE_FAILURE", (error as Error).message);
    }
  }
}
