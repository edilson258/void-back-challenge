import { Router } from "express";
import type { Request, Response } from "express";

import { VoidError } from "../../error";
import { VoidErrorToHttpErrorMapper } from "../../mappers/demo-error-to-http-error.mapper";

import type { ProdutorUseCaseCreate } from "../../domain/usecases/produtor.usecase.create";
import type { IProdutorCampanhaSchemaValidation } from "../../domain/schemas/produtor-campanha.schema";
import type { IProdutorSchemaValidation } from "../../domain/schemas/produtor.schema";
import type { ProdutorCampanhaUseCaseAssign } from "../../domain/usecases/produtor-campanha.usecase.assign";
import type { ProdutorCampanhaUseCaseReassign } from "../../domain/usecases/produtor-campanha.usecase.reassign";

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
        const httpError = VoidErrorToHttpErrorMapper.map(error);
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
        const httpError = VoidErrorToHttpErrorMapper.map(error);
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
        const httpError = VoidErrorToHttpErrorMapper.map(error);
        return res.status(httpError.status).json({ error: httpError.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
