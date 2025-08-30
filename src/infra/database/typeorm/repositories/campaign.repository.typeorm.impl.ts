import { DemoError } from "../../../../error";
import { Option } from "../../../../utils/option";
import { Result } from "../../../../utils/result";

import type { Repository } from "typeorm";
import type { CampaignRepository } from "../../../../domain/repositories/campaign.repository";
import type { CampaignEntity } from "../../../../domain/entities/campaign.entity";
import type { CampaignTypeormEntity } from "../entities/campaign.typeorm.entity";

export class CampaignRepositoryTypeormImpl implements CampaignRepository {
  private readonly typeOrmCompaignRepository: Repository<CampaignTypeormEntity>;

  constructor(typeOrmCompaignRepository: Repository<CampaignTypeormEntity>) {
    this.typeOrmCompaignRepository = typeOrmCompaignRepository;
  }

  public save = async (
    compaign: CampaignEntity,
  ): Promise<Result<void, DemoError>> => {
    try {
      await this.typeOrmCompaignRepository.save({
        id: compaign.id,
        name: compaign.name,
        company: { id: compaign.companyId },
        startedAt: compaign.startedAt,
        finishedAt: compaign.finishedAt,
      });
      return Result.ok(undefined);
    } catch (error) {
      return Result.err(
        new DemoError("INFRASTRUCTURE_FAILURE", (error as Error).message),
      );
    }
  };

  public findById = async (
    id: string,
  ): Promise<Result<Option<CampaignEntity>, DemoError>> => {
    try {
      const compaign = await this.typeOrmCompaignRepository.findOne({
        where: { id },
      });
      return Result.ok(
        compaign
          ? Option.some({
              id: compaign.id,
              name: compaign.name,
              companyId: compaign.company.id,
              startedAt: compaign.startedAt,
              finishedAt: compaign.finishedAt,
            })
          : Option.none(),
      );
    } catch (error) {
      return Result.err(
        new DemoError("INFRASTRUCTURE_FAILURE", (error as Error).message),
      );
    }
  };
}
