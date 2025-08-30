import { DemoError } from "../../../error";
import { Result } from "../../../utils/result";
import { TechnicianEntity } from "../../entities/technician.entity";

import type { CampaignRepository } from "../../repositories/campaign.repository";
import type { ITechnicianRepository } from "../../repositories/technician.repository";
import type { TechnicianDtoCreate } from "../../schemas/technician.schema";

export class TechnicianUseCaseCreate {
  constructor(
    private readonly campaignRepository: CampaignRepository,
    private readonly technicianRepository: ITechnicianRepository,
  ) {}

  public execute = async (
    dto: TechnicianDtoCreate,
  ): Promise<Result<TechnicianEntity, DemoError>> => {
    const campaignResult = await this.campaignRepository.findById(
      dto.campaignId,
    );

    if (campaignResult.isErr()) {
      // Database (or any data storage being used) might be down or experiencing issues.
      return Result.err(campaignResult.unwrapErr());
    }

    if (campaignResult.unwrap().isNone()) {
      // Client provided an id to an unexisting or deleted campaign.
      return Result.err(
        new DemoError("ENTRY_NOT_FOUND", "Campaign does not exist"),
      );
    }

    const id = crypto.randomUUID();
    const technician = new TechnicianEntity(id, dto.name, dto.campaignId);

    const saveResult = await this.technicianRepository.save(technician);
    if (saveResult.isErr()) {
      return Result.err(saveResult.unwrapErr());
    }

    return Result.ok(technician);
  };
}
