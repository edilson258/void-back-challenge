/**
 * @fileoverview Dependency Injection Container for the application.
 *
 * NOTE: we can consider using a full featured DI container like InversifyJS or Tsyringe from Microsoft.
 */

import type { CompanyRepository } from "../domain/repositories/company-repository";
import type { CampaignSchemaValidator } from "../domain/schemas/campaign.schema";
import type { CompanySchemaValidator } from "../domain/schemas/company-schemas";

import { AppDataSource } from "../infra/database/typeorm";

import { CampaignUseCaseCreate } from "../domain/usecases/compaign/comapign.usecase.create";
import { CompanyUseCaseCreate } from "../domain/usecases/company/create";
import { TechnicianUseCaseCreate } from "../domain/usecases/technician/technician.usecase.create";

import { CampaignTypeormEntity } from "../infra/database/typeorm/entities/campaign.typeorm.entity";
import { CompanyTypeormEntity } from "../infra/database/typeorm/entities/company.typeorm.entity";
import { TechnicianTypeormEntity } from "../infra/database/typeorm/entities/technician.typeorm.entity";

import { TypeOrmCompanyRepository } from "../infra/database/typeorm/repositories/company-repository.typeorm.impl";
import { CampaignRepositoryTypeormImpl } from "../infra/database/typeorm/repositories/campaign.repository.typeorm.impl";
import { TechnicianRepositoryTypeormImpl } from "../infra/database/typeorm/repositories/technician.repository.typeorm";
import {
  CompanySchemaValidatorZodImpl,
  CampaignSchemaValidatorZodImpl,
  TechnicianSchemaValidatorZodImpl,
} from "./schema-validator.zod";
import type { ITechnicianRepository } from "../domain/repositories/technician.repository";
import type { ITechnicianSchemaValidator } from "../domain/schemas/technician.schema";

export type DiContainerType = {
  // repositories
  companyRepository: CompanyRepository;
  technicianRepository: ITechnicianRepository;

  // usecases
  companyUseCaseCreate: CompanyUseCaseCreate;
  compaignUseCaseCreate: CampaignUseCaseCreate;
  technicianUseCaseCreate: TechnicianUseCaseCreate;

  // services
  companySchemaValidator: CompanySchemaValidator;
  compaignSchemaValidator: CampaignSchemaValidator;
  technicianSchemaValidator: ITechnicianSchemaValidator;
};

const companyRepository = new TypeOrmCompanyRepository(
  AppDataSource.getRepository(CompanyTypeormEntity),
);
const compaignRepository = new CampaignRepositoryTypeormImpl(
  AppDataSource.getRepository(CampaignTypeormEntity),
);
const technicianRepository = new TechnicianRepositoryTypeormImpl(
  AppDataSource.getRepository(TechnicianTypeormEntity),
);

export const DiContainer: DiContainerType = {
  // repositories
  companyRepository: companyRepository,
  technicianRepository: technicianRepository,

  // usecases
  companyUseCaseCreate: new CompanyUseCaseCreate(companyRepository),
  compaignUseCaseCreate: new CampaignUseCaseCreate(
    companyRepository,
    compaignRepository,
  ),
  technicianUseCaseCreate: new TechnicianUseCaseCreate(
    compaignRepository,
    technicianRepository,
  ),

  // services
  companySchemaValidator: new CompanySchemaValidatorZodImpl(),
  compaignSchemaValidator: new CampaignSchemaValidatorZodImpl(),
  technicianSchemaValidator: new TechnicianSchemaValidatorZodImpl(),
};
