import { VoidError } from "../../../../error";
import { EmpresaTypeorm } from "../entities";

import type { DataSource, Repository } from "typeorm";
import type { Empresa } from "../../../../domain/entities/empresa.entity";
import type { IEmpresaRepository } from "../../../../domain/repositories/empresa.repository";

export class EmpresaRepositoryTypeormImpl implements IEmpresaRepository {
  private repository: Repository<EmpresaTypeorm>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(EmpresaTypeorm);
  }

  async save(empresa: Empresa): Promise<Empresa> {
    try {
      return await this.repository.save({
        nome: empresa.nome,
        cnpj: empresa.cnpj,
        telefone: empresa.telefone,
        email: empresa.email,
      });
    } catch (error) {
      throw new VoidError("INFRASTRUCTURE_FAILURE", (error as Error).message);
    }
  }

  async findByCnpj(cnpj: string): Promise<Empresa | null> {
    try {
      return await this.repository.findOneBy({ cnpj });
    } catch (error) {
      throw new VoidError("INFRASTRUCTURE_FAILURE", (error as Error).message);
    }
  }

  async findById(id: number): Promise<Empresa | null> {
    try {
      return await this.repository.findOneBy({ id });
    } catch (error) {
      throw new VoidError("INFRASTRUCTURE_FAILURE", (error as Error).message);
    }
  }
}
