import { Router } from "express";
import type { Request, Response } from "express";

import { DemoErrorToHttpErrorMapper } from "../../mappers/demo-error-to-http-error.mapper.ts";

import type { CompanySchemaValidator } from "../../domain/schemas/company-schemas.ts";
import type { CompanyUseCaseCreate } from "../../domain/usecases/company/create/index.ts";

export class CompanyController {
  private readonly router: Router;
  private readonly companyUseCaseCreate: CompanyUseCaseCreate;
  private readonly companySchemaValidator: CompanySchemaValidator;

  constructor(
    companyUseCaseCreate: CompanyUseCaseCreate,
    companyDtoCreateValidator: CompanySchemaValidator,
  ) {
    this.router = Router();
    this.companySchemaValidator = companyDtoCreateValidator;
    this.companyUseCaseCreate = companyUseCaseCreate;

    this.setupRoutes();
  }

  private setupRoutes = () => {
    this.router.post("/", this.createCompany.bind(this));
  };

  public getRouter = (): Router => this.router;

  private createCompany = async (req: Request, res: Response) => {
    const validationResult = this.companySchemaValidator.validateCreate(
      req.body,
    );

    if (validationResult.isErr()) {
      return res
        .status(400)
        .json({ error: validationResult.unwrapErr().message });
    }

    const createDto = validationResult.unwrap();
    const createResult = await this.companyUseCaseCreate.execute(createDto);

    if (createResult.isErr()) {
      const mappedErr = DemoErrorToHttpErrorMapper.map(
        createResult.unwrapErr(),
      );
      return res.status(mappedErr.status).json({ error: mappedErr.message });
    }

    res.status(201).json({ data: createResult.unwrap() });
  };
}
