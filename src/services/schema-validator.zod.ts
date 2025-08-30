// TODO: split into multiple files

import { z } from "zod";

import { Result } from "../utils/result.ts";
import { DemoValidationError } from "../error/index.ts";
import type {
  CampaignDtoCreate,
  CampaignSchemaValidator,
} from "../domain/schemas/campaign.schema.ts";
import {
  COMPANY_CNPJ_LEN,
  COMPANY_NAME_LEN_MAX,
  COMPANY_NAME_LEN_MIN,
  type CompanyDtoCreate,
  type CompanySchemaValidator,
} from "../domain/schemas/company-schemas.ts";
import {
  ADDRESS_LEN_MAX,
  ADDRESS_LEN_MIN,
  NAME_LEN_MAX,
  NAME_LEN_MIN,
  PHONE_LEN_MAX,
  PHONE_LEN_MIN,
} from "../domain/schemas/shared.ts";
import type {
  TechnicianDtoCreate,
  ITechnicianSchemaValidator,
} from "../domain/schemas/technician.schema.ts";
import type {
  ProducerDtoCreate,
  IProducerSchemaValidator,
} from "../domain/schemas/producer.schema.ts";

const createCompanyZodSchema = z.object({
  nome: z.string().min(COMPANY_NAME_LEN_MIN).max(COMPANY_NAME_LEN_MAX),
  cnpj: z.string().length(COMPANY_CNPJ_LEN),
  email: z.email(),
  telefone: z.string().min(PHONE_LEN_MIN).max(PHONE_LEN_MAX),
});

const DateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid format, must be YYYY-MM-DD")
  .refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && val === date.toISOString().split("T")[0];
    },
    { message: "Invalid calendar date" },
  )
  .transform((val) => new Date(val));

const createCampaignZodSchema = z
  .object({
    nome: z.string().min(NAME_LEN_MIN).max(NAME_LEN_MAX),
    empresa_id: z.uuid(),
    data_inicio: DateSchema,
    data_fim: DateSchema,
  })
  .refine((data) => data.data_inicio < data.data_fim, {
    message: "a data de início deve ser anterior à data de fim",
    path: ["data_fim"],
  });

const createTechnicianZodSchema = z.object({
  nome: z.string().min(NAME_LEN_MIN).max(NAME_LEN_MAX),
  campanha_id: z.uuid(),
});

const createProducerZodSchema = z.object({
  nome: z.string().min(NAME_LEN_MIN).max(NAME_LEN_MAX),
  localizacao: z.string().min(ADDRESS_LEN_MIN).max(ADDRESS_LEN_MAX),
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

export class CampaignSchemaValidatorZodImpl implements CampaignSchemaValidator {
  constructor() {}

  public validateCreate = (
    data: any,
  ): Result<CampaignDtoCreate, DemoValidationError> => {
    const result = createCampaignZodSchema.safeParse(data);
    if (!result.success) {
      return Result.err(new DemoValidationError(result.error.message));
    }
    return Result.ok({
      name: result.data.nome,
      companyId: result.data.empresa_id,
      startedAt: result.data.data_inicio,
      finishedAt: result.data.data_fim,
    });
  };
}

export class TechnicianSchemaValidatorZodImpl
  implements ITechnicianSchemaValidator
{
  constructor() {}

  public validateCreate = (
    data: any,
  ): Result<TechnicianDtoCreate, DemoValidationError> => {
    const result = createTechnicianZodSchema.safeParse(data);
    if (!result.success) {
      return Result.err(new DemoValidationError(result.error.message));
    }
    return Result.ok({
      name: result.data.nome,
      campaignId: result.data.campanha_id,
    });
  };
}

export class ProducerSchemaValidatorZodImpl
  implements IProducerSchemaValidator
{
  constructor() {}

  public validateCreate = (
    data: any,
  ): Result<ProducerDtoCreate, DemoValidationError> => {
    const result = createProducerZodSchema.safeParse(data);
    if (!result.success) {
      return Result.err(new DemoValidationError(result.error.message));
    }
    return Result.ok({
      name: result.data.nome,
      address: result.data.localizacao,
    });
  };
}
