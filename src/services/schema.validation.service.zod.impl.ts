import { z } from "zod";

import { Result } from "../utils/result.ts";
import { VoidError, VoidValidationError } from "../error/index.ts";

import {
  LOC_LEN_MAX,
  LOC_LEN_MIN,
  NOME_LEN_MAX,
  NOME_LEN_MIN,
  TELEFONE_LEN_MIN,
  TELEFONE_LEN_MAX,
  CNPJ_LEN,
} from "../domain/schemas/index.ts";
import type {
  EmpresaCreateDto,
  IEmpresaSchemaValidation,
} from "../domain/schemas/empresa.schema.ts";
import { da } from "zod/v4/locales";
import type {
  CampanhaCreateDto,
  ICampanhaSchemaValidation,
} from "../domain/schemas/campanha.schema.ts";
import type {
  ITecnicoSchemaValidation,
  TecnicoCreateDto,
  TecnicoListProdutoresDto,
} from "../domain/schemas/tecnico.schema.ts";
import type {
  IProdutorCampanhaSchemaValidation,
  ProdutorCampanhaAssignDto,
  ProdutorCampanhaReassignDto,
} from "../domain/schemas/produtor-campanha.schema.ts";
import type {
  IProdutorSchemaValidation,
  ProdutorCreateDto,
} from "../domain/schemas/produtor.schema.ts";

const empresaCreateSchema = z.object({
  nome: z.string().min(NOME_LEN_MIN).max(NOME_LEN_MAX),
  cnpj: z.string().length(CNPJ_LEN),
  telefone: z.string().min(TELEFONE_LEN_MIN).max(TELEFONE_LEN_MAX),
  email: z.email(),
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

const campanhaCreateSchema = z
  .object({
    nome: z.string().min(NOME_LEN_MIN).max(NOME_LEN_MAX),
    empresa_id: z.coerce.number().positive(),
    data_inicio: DateSchema,
    data_fim: DateSchema,
  })
  .refine((data) => data.data_inicio < data.data_fim, {
    message: "a data de início deve ser anterior à data de fim",
    path: ["data_fim"],
  });

const tecnicoCreateSchema = z.object({
  nome: z.string().min(NOME_LEN_MIN).max(NOME_LEN_MAX),
  campanha_id: z.coerce.number().positive(),
});

const tecnicoListProdutoresSchema = z.coerce.number().positive();

const produtorCreateSchema = z.object({
  nome: z.string().min(NOME_LEN_MIN).max(NOME_LEN_MAX),
  localizacao: z.string().min(LOC_LEN_MIN).max(LOC_LEN_MAX),
});

const produtorCampanhaAssignSchema = z.object({
  produtor_id: z.coerce.number().positive(),
  tecnico_id: z.coerce.number().positive(),
  campanha_id: z.coerce.number().positive(),
});

const produtorCampanhaReassignSchema = z.object({
  produtor_id: z.coerce.number().positive(),
  tecnico_antigo_id: z.coerce.number().positive(),
  tecnico_novo_id: z.coerce.number().positive(),
  campanha_id: z.coerce.number().positive(),
});

export class EmpresaSchemaValidationZodImpl
  implements IEmpresaSchemaValidation
{
  validateCreate = (input: any): EmpresaCreateDto => {
    const { success, data, error } = empresaCreateSchema.safeParse(input);
    if (!success) {
      throw new VoidError("VALIDATION_ERROR", error.message);
    }
    return data;
  };
}

export class CampanhaSchemaValidationZodImpl
  implements ICampanhaSchemaValidation
{
  validateCreate = (input: any): CampanhaCreateDto => {
    const { success, data, error } = campanhaCreateSchema.safeParse(input);
    if (!success) {
      throw new VoidError("VALIDATION_ERROR", error.message);
    }
    return data;
  };
}

export class TecnicoSchemaValidationZodImpl
  implements ITecnicoSchemaValidation
{
  validateCreate = (input: any): TecnicoCreateDto => {
    const { success, data, error } = tecnicoCreateSchema.safeParse(input);
    if (!success) {
      throw new VoidError("VALIDATION_ERROR", error.message);
    }
    return data;
  };

  validateListProdutores = (input: any): TecnicoListProdutoresDto => {
    const { success, data, error } =
      tecnicoListProdutoresSchema.safeParse(input);
    if (!success) {
      throw new VoidError("VALIDATION_ERROR", error.message);
    }
    return {
      id: data,
    };
  };
}

export class ProdutorSchemaValidationZodImpl
  implements IProdutorSchemaValidation
{
  validateCreate = (input: any): ProdutorCreateDto => {
    const { success, data, error } = produtorCreateSchema.safeParse(input);
    if (!success) {
      throw new VoidError("VALIDATION_ERROR", error.message);
    }
    return data;
  };
}

export class ProdutorCampanhaSchemaVaidationZodImpl
  implements IProdutorCampanhaSchemaValidation
{
  validateAssign = (input: any): ProdutorCampanhaAssignDto => {
    const { success, data, error } =
      produtorCampanhaAssignSchema.safeParse(input);
    if (!success) {
      throw new VoidError("VALIDATION_ERROR", error.message);
    }
    return data;
  };

  validateReassign = (input: any): ProdutorCampanhaReassignDto => {
    const { success, data, error } =
      produtorCampanhaReassignSchema.safeParse(input);
    if (!success) {
      throw new VoidError("VALIDATION_ERROR", error.message);
    }
    return data;
  };
}
