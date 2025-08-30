import { Router } from "express";
import { DemoErrorToHttpErrorMapper } from "../../mappers/demo-error-to-http-error.mapper";

import type { Request, Response } from "express";
import type { CompanySchemaValidator } from "../../domain/schemas/company-schemas";
import type { CampaignSchemaValidator } from "../../domain/schemas/campaign.schema";
import type { CampaignUseCaseCreate } from "../../domain/usecases/compaign/comapign.usecase.create";
import { CampaignEntityView } from "../views/campaign.entity.view";

export class CampaignController {
  private readonly router: Router;
  private readonly compaignUseCaseCreate: CampaignUseCaseCreate;
  private readonly compaignSchemaValidator: CampaignSchemaValidator;

  constructor(
    compaignUseCaseCreate: CampaignUseCaseCreate,
    compaignSchemaValidator: CampaignSchemaValidator,
  ) {
    this.router = Router();
    this.compaignUseCaseCreate = compaignUseCaseCreate;
    this.compaignSchemaValidator = compaignSchemaValidator;

    this.setupRoutes();
  }

  public getRouter = () => {
    return this.router;
  };

  private setupRoutes = () => {
    this.router.post("/", this.createCampaign.bind(this));
  };

  private createCampaign = async (req: Request, res: Response) => {
    const validationResult = this.compaignSchemaValidator.validateCreate(
      req.body,
    );

    if (validationResult.isErr()) {
      return res
        .status(400)
        .json({ error: validationResult.unwrapErr().message });
    }

    const dto = validationResult.unwrap();
    const createResult = await this.compaignUseCaseCreate.execute(dto);

    if (createResult.isErr()) {
      const mappedError = DemoErrorToHttpErrorMapper.map(
        createResult.unwrapErr(),
      );
      return res
        .status(mappedError.status)
        .json({ error: mappedError.message });
    }

    return res
      .status(201)
      .json({ data: CampaignEntityView.fromEntity(createResult.unwrap()) });
  };
}
