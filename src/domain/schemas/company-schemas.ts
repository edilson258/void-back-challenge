import { Result } from "../../utils/result.ts";
import type { DemoValidationError } from "../../error";

export const COMPANY_NAME_LEN_MIN = 5;
export const COMPANY_NAME_LEN_MAX = 255;
export const COMPANY_CNPJ_LEN = 15;

export type CompanyDtoCreate = {
  name: string;
  cnpj: string;
  email: string;
  phone: string;
};

export interface CompanySchemaValidator {
  validateCreate(data: any): Result<CompanyDtoCreate, DemoValidationError>;
}
