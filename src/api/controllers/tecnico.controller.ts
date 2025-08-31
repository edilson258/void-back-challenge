import { Router } from "express";
import type { Request, Response } from "express";

import { VoidError } from "../../error";
import { VoidErrorToHttpErrorMapper } from "../../mappers/demo-error-to-http-error.mapper";

import type { ITecnicoSchemaValidation } from "../../domain/schemas/tecnico.schema";
import type { TecnicoUseCaseCreate } from "../../domain/usecases/tecnico.usecase.create";
import type { TecnicoUseCaseListProdutores } from "../../domain/usecases/tecnico.usecase.listprodutores";

export class TecnicoController {
  private readonly router: Router;

  constructor(
    private readonly tecnicoUseCaseCreate: TecnicoUseCaseCreate,
    private readonly tecnicoUseCaseListProdutores: TecnicoUseCaseListProdutores,
    private readonly tecnicoSchemaValidation: ITecnicoSchemaValidation,
  ) {
    this.router = Router();

    this.setupRoutes();
  }

  public getRouter = (): Router => this.router;

  private setupRoutes = (): void => {
    this.router.post("/", this.createTecnico.bind(this));
    this.router.get("/:id/produtores", this.listProdutores.bind(this));
  };

  private createTecnico = async (req: Request, res: Response) => {
    try {
      const dto = this.tecnicoSchemaValidation.validateCreate(req.body);
      const tecnico = await this.tecnicoUseCaseCreate.execute(dto);
      return res.status(201).json({ data: tecnico });
    } catch (error) {
      if (error instanceof VoidError) {
        const httpError = VoidErrorToHttpErrorMapper.map(error);
        return res.status(httpError.status).json({ error: httpError.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  private listProdutores = async (req: Request, res: Response) => {
    try {
      const dto = this.tecnicoSchemaValidation.validateListProdutores(
        req.params.id,
      );
      const produtores = await this.tecnicoUseCaseListProdutores.execute(dto);
      return res.status(200).json({ data: produtores });
    } catch (error) {
      if (error instanceof VoidError) {
        const httpError = VoidErrorToHttpErrorMapper.map(error);
        return res.status(httpError.status).json({ error: httpError.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
