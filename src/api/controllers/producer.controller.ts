import { Router } from "express";

import { ProducerEntityView } from "../views/producer.entity.view";
import { DemoErrorToHttpErrorMapper } from "../../mappers/demo-error-to-http-error.mapper";

import type { Request, Response } from "express";
import type { IProducerSchemaValidator } from "../../domain/schemas/producer.schema";
import type { ProducerUseCaseCreate } from "../../domain/usecases/producer/producer.usecase.create";

export class ProducerController {
  private readonly router: Router;
  private readonly producerUseCaseCreate: ProducerUseCaseCreate;
  private readonly producerSchemaValidator: IProducerSchemaValidator;

  constructor(
    producerUseCaseCreate: ProducerUseCaseCreate,
    producerSchemaValidator: IProducerSchemaValidator,
  ) {
    this.router = Router();
    this.producerUseCaseCreate = producerUseCaseCreate;
    this.producerSchemaValidator = producerSchemaValidator;

    this.setupRoutes();
  }

  public getRouter = () => this.router;

  private setupRoutes = () => {
    this.router.post("/", this.createProducer.bind(this));
  };

  private createProducer = async (req: Request, res: Response) => {
    const validationResult = this.producerSchemaValidator.validateCreate(
      req.body,
    );

    if (validationResult.isErr()) {
      return res
        .status(400)
        .json({ error: validationResult.unwrapErr().message });
    }

    const dto = validationResult.unwrap();
    const createResult = await this.producerUseCaseCreate.execute(dto);

    if (createResult.isErr()) {
      const httpError = DemoErrorToHttpErrorMapper.map(
        createResult.unwrapErr(),
      );
      return res.status(httpError.status).json({ error: httpError.message });
    }

    const producer = createResult.unwrap();

    return res
      .status(201)
      .json({ data: ProducerEntityView.fromEntity(producer) });
  };
}
