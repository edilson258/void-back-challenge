/**
 * @fileoverview Dependency Injection Container for the application.
 */

import type { CompanyRepository } from "../domain/repositories/company-repository";
import type { CampaignSchemaValidator } from "../domain/schemas/campaign.schema";
import type { CompanySchemaValidator } from "../domain/schemas/company-schemas";
import { CampaignUseCaseCreate } from "../domain/usecases/compaign/comapign.usecase.create";
import { CompanyUseCaseCreate } from "../domain/usecases/company/create";
import { AppDataSource } from "../infra/database/typeorm";
import { CampaignTypeormEntity } from "../infra/database/typeorm/entities/campaign.typeorm.entity";
import { CompanyTypeormEntity } from "../infra/database/typeorm/entities/company.typeorm.entity";
import { CampaignRepositoryTypeormImpl } from "../infra/database/typeorm/repositories/campaign.repository.typeorm.impl";
import { TypeOrmCompanyRepository } from "../infra/database/typeorm/repositories/company-repository.typeorm.impl";
import {
  CompanySchemaValidatorZodImpl,
  CampaignSchemaValidatorZodImpl,
} from "./schema-validator.zod";

export type DiContainerType = {
  // repositories
  companyRepository: CompanyRepository;

  // usecases
  companyUseCaseCreate: CompanyUseCaseCreate;
  compaignUseCaseCreate: CampaignUseCaseCreate;

  // services
  companySchemaValidator: CompanySchemaValidator;
  compaignSchemaValidator: CampaignSchemaValidator;
};

const companyRepository = new TypeOrmCompanyRepository(
  AppDataSource.getRepository(CompanyTypeormEntity),
);
const compaignRepository = new CampaignRepositoryTypeormImpl(
  AppDataSource.getRepository(CampaignTypeormEntity),
);

export const DiContainer: DiContainerType = {
  // repositories
  companyRepository: companyRepository,

  // usecases
  companyUseCaseCreate: new CompanyUseCaseCreate(companyRepository),
  compaignUseCaseCreate: new CampaignUseCaseCreate(
    companyRepository,
    compaignRepository,
  ),

  // services
  companySchemaValidator: new CompanySchemaValidatorZodImpl(),
  compaignSchemaValidator: new CampaignSchemaValidatorZodImpl(),
};
