import { Router } from "express";
import { DiContainer } from "../services/di-container.ts";
import { CompanyController } from "./controllers/company-controller.ts";
import { CampaignController } from "./controllers/campaign.controller.ts";

const companyController = new CompanyController(
  DiContainer.companyUseCaseCreate,
  DiContainer.companySchemaValidator,
);

const compaignController = new CampaignController(
  DiContainer.compaignUseCaseCreate,
  DiContainer.compaignSchemaValidator,
);

export const apiRouter = Router();

apiRouter.use("/empresas", companyController.getRouter());
apiRouter.use("/campanhas", compaignController.getRouter());
