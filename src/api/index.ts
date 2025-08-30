import { Router } from "express";
import { DiContainer } from "../services/di-container.ts";
import { CompanyController } from "./controllers/company-controller.ts";
import { CampaignController } from "./controllers/campaign.controller.ts";
import { TechnicianController } from "./controllers/technician.controller.ts";

const companyController = new CompanyController(
  DiContainer.companyUseCaseCreate,
  DiContainer.companySchemaValidator,
);

const compaignController = new CampaignController(
  DiContainer.compaignUseCaseCreate,
  DiContainer.compaignSchemaValidator,
);

const technicianController = new TechnicianController(
  DiContainer.technicianUseCaseCreate,
  DiContainer.technicianSchemaValidator,
);

export const apiRouter = Router();

apiRouter.use("/empresas", companyController.getRouter());
apiRouter.use("/campanhas", compaignController.getRouter());
apiRouter.use("/tecnicos", technicianController.getRouter());
