import type { Request, Response } from "express";
import { Router } from "express";
import type { IProdutorSchemaValidation } from "../../domain/schemas/produtor.schema";
import type { IProdutorCampanhaSchemaValidation } from "../../domain/schemas/produtor-campanha.schema";
import type { ProdutorUseCaseCreate } from "../../domain/usecases/produtor.usecase.create";
import type { ProdutorCampanhaUseCaseAssign } from "../../domain/usecases/produtor-campanha.usecase.assign";
import type { ProdutorCampanhaUseCaseReassign } from "../../domain/usecases/produtor-campanha.usecase.reassign";
import { VoidError } from "../../error";
import { mapVoidErrorToHttpError } from "../../mappers/demo-error-to-http-error.mapper";

export class ProdutorController {
	private readonly router: Router;

	constructor(
		private readonly produtorUseCaseCreate: ProdutorUseCaseCreate,
		private readonly produtorSchemaValidation: IProdutorSchemaValidation,
		private readonly produtorCampanhaUseCaseAssign: ProdutorCampanhaUseCaseAssign,
		private readonly produtorCampanhaUseCaseReassign: ProdutorCampanhaUseCaseReassign,
		private readonly produtorCampanhaSchemaValidation: IProdutorCampanhaSchemaValidation,
	) {
		this.router = Router();

		this.setupRoutes();
	}

	public getRouter = () => this.router;

	private setupRoutes = () => {
		this.router.post("/", this.createProdutor.bind(this));
		this.router.post("/atribuir", this.assignTecnicoAndCampanha.bind(this));
		this.router.put("/transferir", this.reassignTecnico.bind(this));
	};

	private createProdutor = async (req: Request, res: Response) => {
		try {
			const dto = this.produtorSchemaValidation.validateCreate(req.body);
			const produtor = await this.produtorUseCaseCreate.execute(dto);
			return res.status(201).json({ data: produtor });
		} catch (error) {
			if (error instanceof VoidError) {
				const httpError = mapVoidErrorToHttpError(error);
				return res.status(httpError.status).json({ error: httpError.message });
			}
			return res.status(500).json({ error: "Internal Server Error" });
		}
	};

	private assignTecnicoAndCampanha = async (req: Request, res: Response) => {
		try {
			const dto = this.produtorCampanhaSchemaValidation.validateAssign(
				req.body,
			);
			const produtor = await this.produtorCampanhaUseCaseAssign.execute(dto);
			return res.status(200).json({ data: produtor });
		} catch (error) {
			if (error instanceof VoidError) {
				const httpError = mapVoidErrorToHttpError(error);
				return res.status(httpError.status).json({ error: httpError.message });
			}
			return res.status(500).json({ error: "Internal Server Error" });
		}
	};

	private reassignTecnico = async (req: Request, res: Response) => {
		try {
			const dto = this.produtorCampanhaSchemaValidation.validateReassign(
				req.body,
			);
			const produtor = await this.produtorCampanhaUseCaseReassign.execute(dto);
			return res.status(200).json({ data: produtor });
		} catch (error) {
			if (error instanceof VoidError) {
				const httpError = mapVoidErrorToHttpError(error);
				return res.status(httpError.status).json({ error: httpError.message });
			}
			return res.status(500).json({ error: "Internal Server Error" });
		}
	};
}
