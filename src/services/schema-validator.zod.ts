import { z } from "zod";

import { Result } from "../utils/result.ts";
import { DemoValidationError } from "../error/index.ts";

import {
  COMPANY_CNPJ_LEN,
  COMPANY_NAME_LEN_MAX,
  COMPANY_NAME_LEN_MIN,
  type CompanyDtoCreate,
  type CompanySchemaValidator,
} from "../domain/schemas/company-schemas.ts";
import { PHONE_LEN_MAX, PHONE_LEN_MIN } from "../domain/schemas/shared.ts";

const createCompanyZodSchema = z.object({
  nome: z.string().min(COMPANY_NAME_LEN_MIN).max(COMPANY_NAME_LEN_MAX),
  cnpj: z.string().length(COMPANY_CNPJ_LEN),
  email: z.email(),
  telefone: z.string().min(PHONE_LEN_MIN).max(PHONE_LEN_MAX),
});

export class CompanySchemaValidatorZodImpl implements CompanySchemaValidator {
  constructor() {}

  public validateCreate = (
    data: any,
  ): Result<CompanyDtoCreate, DemoValidationError> => {
    const result = createCompanyZodSchema.safeParse(data);
    if (!result.success) {
      return Result.err(new DemoValidationError(result.error.message));
    }
    return Result.ok({
      name: result.data.nome,
      cnpj: result.data.cnpj,
      email: result.data.email,
      phone: result.data.telefone,
    });
  };
}
