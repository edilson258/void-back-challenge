import type { DemoError } from "../../error";
import type { Option } from "../../utils/option";
import type { Result } from "../../utils/result";
import type { CompanyEntity } from "../entities/company-entity";

export interface CompanyRepository {
  save: (company: CompanyEntity) => Promise<Result<void, DemoError>>;
  findByCnpj: (
    cnpj: string,
  ) => Promise<Result<Option<CompanyEntity>, DemoError>>;
}
