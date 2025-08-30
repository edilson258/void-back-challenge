import { Router } from "express";
import type { Request, Response } from "express";

import { DemoErrorToHttpErrorMapper } from "../../mappers/demo-error-to-http-error.mapper";
import { TechnicianEntityView } from "../views/technician.entity.view";

import type { ITechnicianSchemaValidator } from "../../domain/schemas/technician.schema";
import type { TechnicianUseCaseCreate } from "../../domain/usecases/technician/technician.usecase.create";

export class TechnicianController {
  private readonly router: Router;
  private readonly technicianUseCaseCreate: TechnicianUseCaseCreate;
  private readonly technicianSchemaValidator: ITechnicianSchemaValidator;

  constructor(
    technicianUseCaseCreate: TechnicianUseCaseCreate,
    technicianSchemaValidator: ITechnicianSchemaValidator,
  ) {
    this.router = Router();
    this.technicianUseCaseCreate = technicianUseCaseCreate;
    this.technicianSchemaValidator = technicianSchemaValidator;

    this.setupRoutes();
  }

  public getRouter = (): Router => this.router;

  private setupRoutes = (): void => {
    this.router.post("/", this.createTechnician.bind(this));
  };

  private createTechnician = async (req: Request, res: Response) => {
    const validationResult = this.technicianSchemaValidator.validateCreate(
      req.body,
    );
    if (validationResult.isErr()) {
      return res
        .status(400)
        .json({ error: validationResult.unwrapErr().message });
    }

    const dto = validationResult.unwrap();
    const createResult = await this.technicianUseCaseCreate.execute(dto);

    if (createResult.isErr()) {
      const httpError = DemoErrorToHttpErrorMapper.map(
        createResult.unwrapErr(),
      );
      return res.status(httpError.status).json({ error: httpError.message });
    }

    const technician = createResult.unwrap();

    return res
      .status(201)
      .json({ data: TechnicianEntityView.fromEntity(technician) });
  };
}
