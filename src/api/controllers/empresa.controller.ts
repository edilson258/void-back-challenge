import { Router } from "express";

import { VoidError } from "../../error/index.ts";
import { VoidErrorToHttpErrorMapper } from "../../mappers/demo-error-to-http-error.mapper.ts";

import type { Request, Response } from "express";
import type { EmpresaUseCaseCreate } from "../../domain/usecases/empresa.usecase.create.ts";
import type { IEmpresaSchemaValidation } from "../../domain/schemas/empresa.schema.ts";

export class EmpresaController {
  private readonly router: Router;

  constructor(
    private readonly empresaUseCaseCreate: EmpresaUseCaseCreate,
    private readonly empresaSchemaValidation: IEmpresaSchemaValidation,
  ) {
    this.router = Router();

    this.setupRoutes();
  }

  private setupRoutes = () => {
    this.router.post("/", this.createEmpresa.bind(this));
  };

  public getRouter = (): Router => this.router;

  private createEmpresa = async (req: Request, res: Response) => {
    try {
      const dto = this.empresaSchemaValidation.validateCreate(req.body);
      const empresa = await this.empresaUseCaseCreate.execute(dto);
      return res.status(201).json({ data: empresa });
    } catch (error) {
      if (error instanceof VoidError) {
        const httpError = VoidErrorToHttpErrorMapper.map(error);
        return res.status(httpError.status).json({ error: httpError.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
