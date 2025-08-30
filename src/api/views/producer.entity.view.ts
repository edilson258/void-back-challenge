import type { ProducerEntity } from "../../domain/entities/producer.entity";

export class ProducerEntityView {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly localizacao: string,
  ) {}

  public static fromEntity = (entity: ProducerEntity): ProducerEntityView => {
    return new ProducerEntityView(entity.id, entity.name, entity.address);
  };
}
