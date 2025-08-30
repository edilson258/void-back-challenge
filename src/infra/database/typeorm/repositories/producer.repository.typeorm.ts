import { DemoError } from "../../../../error";
import { Option } from "../../../../utils/option";
import { Result } from "../../../../utils/result";
import type { ProducerEntity } from "../../../../domain/entities/producer.entity";
import type { IProducerRepository } from "../../../../domain/repositories/producer.repository";
import type { Repository } from "typeorm";
import type { ProducerTypeormEntity } from "../entities/producer.entity.typeorm";

export class ProducerRepositoryTypeormImpl implements IProducerRepository {
  constructor(
    private readonly producerRepository: Repository<ProducerTypeormEntity>,
  ) {}

  public save = async (
    producer: ProducerEntity,
  ): Promise<Result<void, DemoError>> => {
    try {
      await this.producerRepository.save(producer);
      return Result.ok(undefined);
    } catch (error) {
      return Result.err(
        new DemoError("INFRASTRUCTURE_FAILURE", (error as Error).message),
      );
    }
  };

  public findById = async (
    id: string,
  ): Promise<Result<Option<ProducerEntity>, DemoError>> => {
    try {
      const producer = await this.producerRepository.findOneBy({ id });
      return Result.ok(Option.fromNullable(producer));
    } catch (error) {
      return Result.err(
        new DemoError("INFRASTRUCTURE_FAILURE", (error as Error).message),
      );
    }
  };
}
