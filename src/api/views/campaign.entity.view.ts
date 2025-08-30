import type { CampaignEntity } from "../../domain/entities/campaign.entity";

export class CampaignEntityView {
  public readonly id: string;
  public readonly nome: string;
  public readonly empresa_id: string;
  public readonly data_inicio: Date;
  public readonly data_fim: Date;

  constructor(
    id: string,
    nome: string,
    empresa_id: string,
    data_inicio: Date,
    data_fim: Date,
  ) {
    this.id = id;
    this.nome = nome;
    this.empresa_id = empresa_id;
    this.data_inicio = data_inicio;
    this.data_fim = data_fim;
  }

  public static fromEntity(entity: CampaignEntity): CampaignEntityView {
    return new CampaignEntityView(
      entity.id,
      entity.name,
      entity.companyId,
      entity.startedAt,
      entity.finishedAt,
    );
  }
}
