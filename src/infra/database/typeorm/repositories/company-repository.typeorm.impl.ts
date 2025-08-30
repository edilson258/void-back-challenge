import { DemoError } from "../../../../error";
import { Option } from "../../../../utils/option";
import { Result } from "../../../../utils/result";
import { CompanyTypeormEntity } from "../entities/company.typeorm.entity";

import type { Repository } from "typeorm";
import type { CompanyEntity } from "../../../../domain/entities/company-entity";
import type { CompanyRepository } from "../../../../domain/repositories/company-repository";

export class TypeOrmCompanyRepository implements CompanyRepository {
  private readonly typeOrmCompanyRepository: Repository<CompanyTypeormEntity>;

  constructor(typeOrmCompanyRepository: Repository<CompanyTypeormEntity>) {
    this.typeOrmCompanyRepository = typeOrmCompanyRepository;
  }

  public save = async (
    company: CompanyEntity,
  ): Promise<Result<void, DemoError>> => {
    try {
      await this.typeOrmCompanyRepository.save(company);
      return Result.ok(undefined);
    } catch (error) {
      return Result.err(
        new DemoError("INFRASTRUCTURE_FAILURE", (error as Error).message),
      );
    }
  };

  public findById = async (
    id: string,
  ): Promise<Result<Option<CompanyEntity>, DemoError>> => {
    try {
      const company = await this.typeOrmCompanyRepository.findOne({
        where: { id },
      });
      return Result.ok(company ? Option.some(company) : Option.none());
    } catch (error) {
      return Result.err(
        new DemoError("INFRASTRUCTURE_FAILURE", (error as Error).message),
      );
    }
  };

  public findByCnpj = async (
    cnpj: string,
  ): Promise<Result<Option<CompanyEntity>, DemoError>> => {
    try {
      const company = await this.typeOrmCompanyRepository.findOne({
        where: { cnpj },
      });
      return Result.ok(company ? Option.some(company) : Option.none());
    } catch (error) {
      return Result.err(
        new DemoError("INFRASTRUCTURE_FAILURE", (error as Error).message),
      );
    }
  };
}
