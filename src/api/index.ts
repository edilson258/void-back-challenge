import { Router } from "express";
import { CompanyController } from "./controllers/company-controller.ts";
import { CompanySchemaValidatorZodImpl } from "../services/schema-validator.zod.ts";
import { CompanyUseCaseCreate } from "../domain/usecases/company/create/index.ts";

const companyDtoCreateValidatorZodImpl = new CompanySchemaValidatorZodImpl();
const companyUseCaseCreate = new CompanyUseCaseCreate(null);

const companyController = new CompanyController(
  companyDtoCreateValidatorZodImpl,
  companyUseCaseCreate,
);

export const apiRouter = Router();

apiRouter.use("/empresas", companyController.getRouter());
