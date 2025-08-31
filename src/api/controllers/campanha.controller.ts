import { Router } from "express";
import type { Request, Response } from "express";

import { VoidError } from "../../error";
import { VoidErrorToHttpErrorMapper } from "../../mappers/demo-error-to-http-error.mapper";

import type {
  CampanhaCreateDto,
  ICampanhaSchemaValidation,
} from "../../domain/schemas/campanha.schema";
import type { CampanhaUseCaseCreate } from "../../domain/usecases/campanha.usecase.create";

export class CampanhaController {
  private readonly router: Router;

  constructor(
    private readonly campanhaUseCaseCreate: CampanhaUseCaseCreate,
    private readonly campanhaSchemaValidation: ICampanhaSchemaValidation,
  ) {
    this.router = Router();

    this.setupRoutes();
  }

  public getRouter = () => {
    return this.router;
  };

  private setupRoutes = () => {
    this.router.post("/", this.createCampanha.bind(this));
  };

  private createCampanha = async (req: Request, res: Response) => {
    try {
      const dto = this.campanhaSchemaValidation.validateCreate(req.body);
      const campanha = await this.campanhaUseCaseCreate.execute(dto);
      return res.status(201).json({ data: campanha });
    } catch (error) {
      if (error instanceof VoidError) {
        const httpError = VoidErrorToHttpErrorMapper.map(error);
        return res.status(httpError.status).json({ error: httpError.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
