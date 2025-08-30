import { Option } from "../../../../src/utils/option";
import { Result } from "../../../../src/utils/result";

import type { DemoError } from "../../../../src/error";
import type { CompanyEntity } from "../../../../src/domain/entities/company-entity";
import type { CompanyRepository } from "../../../../src/domain/repositories/company-repository";

export class CompanyRepositoryMock implements CompanyRepository {
  private store: CompanyEntity[] = [];

  constructor() {
    this.store = [];
  }

  public save = async (
    company: CompanyEntity,
  ): Promise<Result<void, DemoError>> => {
    this.store.push(company);
    return Result.ok(undefined);
  };

  public findByCnpj = async (
    cnpj: string,
  ): Promise<Result<Option<CompanyEntity>, DemoError>> => {
    const company = this.store.find((c) => c.cnpj === cnpj);
    return company ? Result.ok(Option.some(company)) : Result.ok(Option.none());
  };

  public reset = async (): Promise<void> => {
    Promise.resolve((this.store = []));
  };
}
