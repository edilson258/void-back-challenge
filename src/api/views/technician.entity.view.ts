import type { TechnicianEntity } from "../../domain/entities/technician.entity";

export class TechnicianEntityView {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly campanha_id: string,
  ) {}

  public static fromEntity(entity: TechnicianEntity): TechnicianEntityView {
    return new TechnicianEntityView(entity.id, entity.name, entity.campaignId);
  }
}
