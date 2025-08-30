export const COMPANY_NAME_LEN_MIN = 5;
export const COMPANY_NAME_LEN_MAX = 255;
export const COMPANY_CNPJ_LEN = 20;

export type CompanyDtoCreate = {
  name: string;
  cnpj: string;
  email: string;
  phone: string;
};

export interface CompanyDtoCreateValidator {
  validateDtoCreate(data: any): CompanyDtoCreate;
}
