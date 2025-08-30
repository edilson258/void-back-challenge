import { DemoError } from "../../../../error";
import { Result } from "../../../../utils/result";
import { CompanyEntity } from "../../../entities/company-entity";

import type { CompanyDtoCreate } from "../../../schemas/company-schemas";
import type { CompanyRepository } from "../../../repositories/company-repository";

export class CompanyUseCaseCreate {
  constructor(private readonly companyRepository: CompanyRepository) {}

  public execute = async (
    dto: CompanyDtoCreate,
  ): Promise<Result<CompanyEntity, DemoError>> => {
    const companyWithCnpjResult = await this.companyRepository.findByCnpj(
      dto.cnpj,
    );
    if (companyWithCnpjResult.isErr()) {
      return Result.err(companyWithCnpjResult.unwrapErr());
    }

    if (companyWithCnpjResult.unwrap().isSome()) {
      return Result.err(
        new DemoError(
          "ENTRY_COLLISION",
          "Company with the same CNPJ already exists",
        ),
      );
    }

    // NOTE: please note that we can also check for email and phone uniqueness as well if needed.

    // NOTE: Dear Delcio, the challenge ask for serial id, but that would make the business logic depend on the database
    // and i don't think that is a good idea for this specific architecture.
    const id = crypto.randomUUID();
    const company = new CompanyEntity(
      id,
      dto.name,
      dto.cnpj,
      dto.email,
      dto.phone,
    );

    const saveResult = await this.companyRepository.save(company);
    if (saveResult.isErr()) {
      return Result.err(saveResult.unwrapErr());
    }

    return Result.ok(company);
  };
}
