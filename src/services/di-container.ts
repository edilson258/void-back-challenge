/**
 * @fileoverview Dependency Injection Container for the application.
 *
 * NOTE: we can consider using a full featured DI container like InversifyJS or Tsyringe from Microsoft.
 */

import type { CompanyRepository } from "../domain/repositories/company-repository";
import type { ITechnicianRepository } from "../domain/repositories/technician.repository";
import type { IProducerRepository } from "../domain/repositories/producer.repository";

import type { CampaignSchemaValidator } from "../domain/schemas/campaign.schema";
import type { CompanySchemaValidator } from "../domain/schemas/company-schemas";
import type { ITechnicianSchemaValidator } from "../domain/schemas/technician.schema";

import { AppDataSource } from "../infra/database/typeorm";

import { CompanyUseCaseCreate } from "../domain/usecases/company/create";
import { ProducerUseCaseCreate } from "../domain/usecases/producer/producer.usecase.create";
import { CampaignUseCaseCreate } from "../domain/usecases/compaign/comapign.usecase.create";
import { TechnicianUseCaseCreate } from "../domain/usecases/technician/technician.usecase.create";

import { CampaignTypeormEntity } from "../infra/database/typeorm/entities/campaign.typeorm.entity";
import { CompanyTypeormEntity } from "../infra/database/typeorm/entities/company.typeorm.entity";
import { TechnicianTypeormEntity } from "../infra/database/typeorm/entities/technician.typeorm.entity";
import { ProducerTypeormEntity } from "../infra/database/typeorm/entities/producer.entity.typeorm";

import { TypeOrmCompanyRepository } from "../infra/database/typeorm/repositories/company-repository.typeorm.impl";
import { CampaignRepositoryTypeormImpl } from "../infra/database/typeorm/repositories/campaign.repository.typeorm.impl";
import { TechnicianRepositoryTypeormImpl } from "../infra/database/typeorm/repositories/technician.repository.typeorm";
import { ProducerRepositoryTypeormImpl } from "../infra/database/typeorm/repositories/producer.repository.typeorm";

import {
  CompanySchemaValidatorZodImpl,
  CampaignSchemaValidatorZodImpl,
  TechnicianSchemaValidatorZodImpl,
  ProducerSchemaValidatorZodImpl,
} from "./schema-validator.zod";
import type { IProducerSchemaValidator } from "../domain/schemas/producer.schema";

export type DiContainerType = {
  // repositories
  companyRepository: CompanyRepository;
  technicianRepository: ITechnicianRepository;
  producerRepository: IProducerRepository;

  // usecases
  companyUseCaseCreate: CompanyUseCaseCreate;
  compaignUseCaseCreate: CampaignUseCaseCreate;
  technicianUseCaseCreate: TechnicianUseCaseCreate;
  producerUseCaseCreate: ProducerUseCaseCreate;

  // services
  companySchemaValidator: CompanySchemaValidator;
  compaignSchemaValidator: CampaignSchemaValidator;
  technicianSchemaValidator: ITechnicianSchemaValidator;
  producerSchemaValidator: IProducerSchemaValidator;
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
const producerRepository = new ProducerRepositoryTypeormImpl(
  AppDataSource.getRepository(ProducerTypeormEntity),
);

export const DiContainer: DiContainerType = {
  // repositories
  companyRepository: companyRepository,
  technicianRepository: technicianRepository,
  producerRepository: producerRepository,

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
  producerUseCaseCreate: new ProducerUseCaseCreate(producerRepository),

  // services
  companySchemaValidator: new CompanySchemaValidatorZodImpl(),
  compaignSchemaValidator: new CampaignSchemaValidatorZodImpl(),
  technicianSchemaValidator: new TechnicianSchemaValidatorZodImpl(),
  producerSchemaValidator: new ProducerSchemaValidatorZodImpl(),
};
