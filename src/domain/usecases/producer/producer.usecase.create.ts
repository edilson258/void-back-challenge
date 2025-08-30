import { Result } from "../../../utils/result";
import { ProducerEntity } from "../../entities/producer.entity";

import type { DemoError } from "../../../error";
import type { IProducerRepository } from "../../repositories/producer.repository";
import type { ProducerDtoCreate } from "../../schemas/producer.schema";

export class ProducerUseCaseCreate {
  constructor(private readonly producerRepository: IProducerRepository) {}

  public execute = async (
    dto: ProducerDtoCreate,
  ): Promise<Result<ProducerEntity, DemoError>> => {
    // Note: we could check for duplicate names, ... before creating a new producer
    const id = crypto.randomUUID();
    const producer = new ProducerEntity(id, dto.name, dto.address);
    const saveResult = await this.producerRepository.save(producer);
    if (saveResult.isErr()) {
      return Result.err(saveResult.unwrapErr());
    }
    return Result.ok(producer);
  };
}
