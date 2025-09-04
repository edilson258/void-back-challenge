import { Router } from "express";
import { DiContainer } from "../services/di-container.ts";
import { CampanhaController } from "./controllers/campanha.controller.ts";
import { EmpresaController } from "./controllers/empresa.controller.ts";
import { ProdutorController } from "./controllers/produtor.controller.ts";
import { TecnicoController } from "./controllers/tecnico.controller.ts";

const empresaController = new EmpresaController(
	DiContainer.empresaUseCaseCreate,
	DiContainer.empresaSchemaValidator,
);
const companhaController = new CampanhaController(
	DiContainer.campanhaUseCaseCreate,
	DiContainer.campanhaSchemaValidator,
);
const tecnicoController = new TecnicoController(
	DiContainer.tecnicoUseCaseCreate,
	DiContainer.tecnicoUseCaseListProdutores,
	DiContainer.tecnicoSchemaValidator,
);
const produtorController = new ProdutorController(
	DiContainer.produtorUseCaseCreate,
	DiContainer.produtorSchemaValidator,
	DiContainer.produtorCampanhaUseCaseAssign,
	DiContainer.produtorCampanhaUseCaseReassign,
	DiContainer.produtorCampanhaSchemaValidator,
);

export const apiRouter = Router();

apiRouter.use("/empresas", empresaController.getRouter());
apiRouter.use("/campanhas", companhaController.getRouter());
apiRouter.use("/tecnicos", tecnicoController.getRouter());
apiRouter.use("/produtores", produtorController.getRouter());
