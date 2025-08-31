/**
 * @fileoverview Dependency Injection Container for the application.
 *
 * NOTE: we can consider using a full featured DI container like InversifyJS or Tsyringe from Microsoft.
 */

import { AppDataSource } from "../infra/database/typeorm";

import type { IEmpresaRepository } from "../domain/repositories/empresa.repository";
import type { IProdutorRepository } from "../domain/repositories/produtor.repository";
import type { ITecnicoRepository } from "../domain/repositories/tecnico.repository";

import type { ICampanhaSchemaValidation } from "../domain/schemas/campanha.schema";
import type { IEmpresaSchemaValidation } from "../domain/schemas/empresa.schema";
import type { IProdutorSchemaValidation } from "../domain/schemas/produtor.schema";
import type { ITecnicoSchemaValidation } from "../domain/schemas/tecnico.schema";

import { CampanhaUseCaseCreate } from "../domain/usecases/campanha.usecase.create";
import { EmpresaUseCaseCreate } from "../domain/usecases/empresa.usecase.create";
import { ProdutorUseCaseCreate } from "../domain/usecases/produtor.usecase.create";
import { TecnicoUseCaseCreate } from "../domain/usecases/tecnico.usecase.create";

import { CampanhaRepositoryTypeormImpl } from "../infra/database/typeorm/repositories/campanha.repository.typeorm.impl";
import { EmpresaRepositoryTypeormImpl } from "../infra/database/typeorm/repositories/empresa.repository.typeorm.impl";
import { ProdutorRepositoryTypeormImpl } from "../infra/database/typeorm/repositories/produtor.repository.typeorm.impl";
import { TecnicoRepositoryTypeormImpl } from "../infra/database/typeorm/repositories/tecnico.repository.typeorm.impl";

import {
  CampanhaSchemaValidationZodImpl,
  EmpresaSchemaValidationZodImpl,
  ProdutorCampanhaSchemaVaidationZodImpl,
  ProdutorSchemaValidationZodImpl,
  TecnicoSchemaValidationZodImpl,
} from "./schema.validation.service.zod.impl";
import { ProdutorCampanhaUseCaseAssign } from "../domain/usecases/produtor-campanha.usecase.assign";
import { ProdutorCampanhaUseCaseReassign } from "../domain/usecases/produtor-campanha.usecase.reassign";
import { ProdutorCampanhaRepositoryTypeormImpl } from "../infra/database/typeorm/repositories/produtor-campanha.repository.typeorm.impl";
import type { IProdutorCampanhaSchemaValidation } from "../domain/schemas/produtor-campanha.schema";
import { TecnicoUseCaseListProdutores } from "../domain/usecases/tecnico.usecase.listprodutores";

export type DiContainerType = {
  // repositories
  empresaRepository: IEmpresaRepository;
  tecnicoRepository: ITecnicoRepository;
  produtorRepository: IProdutorRepository;

  // usecases
  empresaUseCaseCreate: EmpresaUseCaseCreate;
  campanhaUseCaseCreate: CampanhaUseCaseCreate;
  tecnicoUseCaseCreate: TecnicoUseCaseCreate;
  tecnicoUseCaseListProdutores: TecnicoUseCaseListProdutores;
  produtorUseCaseCreate: ProdutorUseCaseCreate;
  produtorCampanhaUseCaseAssign: ProdutorCampanhaUseCaseAssign;
  produtorCampanhaUseCaseReassign: ProdutorCampanhaUseCaseReassign;

  // services
  empresaSchemaValidator: IEmpresaSchemaValidation;
  campanhaSchemaValidator: ICampanhaSchemaValidation;
  tecnicoSchemaValidator: ITecnicoSchemaValidation;
  produtorSchemaValidator: IProdutorSchemaValidation;
  produtorCampanhaSchemaValidator: IProdutorCampanhaSchemaValidation;
};

const empresaRepository = new EmpresaRepositoryTypeormImpl(AppDataSource);
const campanhaRepository = new CampanhaRepositoryTypeormImpl(AppDataSource);
const tecnicoRepository = new TecnicoRepositoryTypeormImpl(AppDataSource);
const produtorRepository = new ProdutorRepositoryTypeormImpl(AppDataSource);
const produtorCampanhaRepository = new ProdutorCampanhaRepositoryTypeormImpl(
  AppDataSource,
);

export const DiContainer: DiContainerType = {
  // repositories
  empresaRepository: empresaRepository,
  tecnicoRepository: tecnicoRepository,
  produtorRepository: produtorRepository,

  // usecases
  empresaUseCaseCreate: new EmpresaUseCaseCreate(empresaRepository),
  campanhaUseCaseCreate: new CampanhaUseCaseCreate(
    empresaRepository,
    campanhaRepository,
  ),
  tecnicoUseCaseCreate: new TecnicoUseCaseCreate(
    tecnicoRepository,
    campanhaRepository,
  ),
  tecnicoUseCaseListProdutores: new TecnicoUseCaseListProdutores(
    tecnicoRepository,
    produtorCampanhaRepository,
  ),
  produtorUseCaseCreate: new ProdutorUseCaseCreate(produtorRepository),
  produtorCampanhaUseCaseAssign: new ProdutorCampanhaUseCaseAssign(
    tecnicoRepository,
    campanhaRepository,
    produtorRepository,
    produtorCampanhaRepository,
  ),
  produtorCampanhaUseCaseReassign: new ProdutorCampanhaUseCaseReassign(
    tecnicoRepository,
    produtorCampanhaRepository,
  ),

  // services
  empresaSchemaValidator: new EmpresaSchemaValidationZodImpl(),
  campanhaSchemaValidator: new CampanhaSchemaValidationZodImpl(),
  tecnicoSchemaValidator: new TecnicoSchemaValidationZodImpl(),
  produtorSchemaValidator: new ProdutorSchemaValidationZodImpl(),
  produtorCampanhaSchemaValidator: new ProdutorCampanhaSchemaVaidationZodImpl(),
};
