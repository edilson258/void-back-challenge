import type { DemoError } from "../../error";
import type { Option } from "../../utils/option";
import type { Result } from "../../utils/result";
import type { ProducerEntity } from "../entities/producer.entity";

export interface IProducerRepository {
  save: (producer: ProducerEntity) => Promise<Result<void, DemoError>>;
  findById: (id: string) => Promise<Result<Option<ProducerEntity>, DemoError>>;
}
