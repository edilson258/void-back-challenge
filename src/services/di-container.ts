/**
 * @fileoverview Dependency Injection Container for the application.
 */

import type { CompanyRepository } from "../domain/repositories/company-repository";
import type { CompanySchemaValidator } from "../domain/schemas/company-schemas";
import { CompanyUseCaseCreate } from "../domain/usecases/company/create";
import { AppDataSource } from "../infra/database/typeorm";
import { CompanyTypeormEntity } from "../infra/database/typeorm/entities/company.typeorm.entity";
import { TypeOrmCompanyRepository } from "../infra/database/typeorm/repositories/company-repository.typeorm.impl";
import { CompanySchemaValidatorZodImpl } from "./schema-validator.zod";

export type DiContainerType = {
  // repositories
  companyRepository: CompanyRepository;

  // usecases
  companyUseCaseCreate: CompanyUseCaseCreate;

  // services
  companySchemaValidator: CompanySchemaValidator;
};

const companyRepository = new TypeOrmCompanyRepository(
  AppDataSource.getRepository(CompanyTypeormEntity),
);

export const DiContainer: DiContainerType = {
  // repositories
  companyRepository: companyRepository,

  // usecases
  companyUseCaseCreate: new CompanyUseCaseCreate(companyRepository),

  // services
  companySchemaValidator: new CompanySchemaValidatorZodImpl(),
};
