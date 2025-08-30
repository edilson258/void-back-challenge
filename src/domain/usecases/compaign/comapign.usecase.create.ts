import { DemoError } from "../../../error";
import { Result } from "../../../utils/result";
import { CampaignEntity } from "../../entities/campaign.entity";

import type { CampaignDtoCreate } from "../../schemas/campaign.schema";
import type { CompanyDtoCreate } from "../../schemas/company-schemas";
import type { CampaignRepository } from "../../repositories/campaign.repository";
import type { CompanyRepository } from "../../repositories/company-repository";

export class CampaignUseCaseCreate {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly compaignRepository: CampaignRepository,
  ) {}

  async execute(
    dto: CampaignDtoCreate,
  ): Promise<Result<CampaignEntity, DemoError>> {
    const companyResult = await this.companyRepository.findById(dto.companyId);
    if (companyResult.isErr()) {
      return Result.err(companyResult.unwrapErr());
    }

    if (companyResult.unwrap().isNone()) {
      return Result.err(
        new DemoError("ENTRY_NOT_FOUND", "Company does not exist"),
      );
    }

    const id = crypto.randomUUID();
    const compaign = new CampaignEntity(
      id,
      dto.name,
      dto.companyId,
      dto.startedAt,
      dto.finishedAt,
    );

    const saveResult = await this.compaignRepository.save(compaign);
    if (saveResult.isErr()) {
      return Result.err(saveResult.unwrapErr());
    }

    return Result.ok(compaign);
  }
}
