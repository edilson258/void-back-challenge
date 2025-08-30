import { Router } from "express";
import { DiContainer } from "../services/di-container.ts";
import { CompanyController } from "./controllers/company-controller.ts";

const companyController = new CompanyController(
  DiContainer.companyUseCaseCreate,
  DiContainer.companySchemaValidator,
);

export const apiRouter = Router();

apiRouter.use("/empresas", companyController.getRouter());
