import type { DemoError } from "../../error";
import type { Option } from "../../utils/option";
import type { Result } from "../../utils/result";
import type { CampaignEntity } from "../entities/campaign.entity";

export interface CampaignRepository {
  save: (compaign: CampaignEntity) => Promise<Result<void, DemoError>>;
  findById: (id: string) => Promise<Result<Option<CampaignEntity>, DemoError>>;
}
