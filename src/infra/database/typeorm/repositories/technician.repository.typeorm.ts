import { Result } from "../../../../utils/result";
import { DemoError } from "../../../../error";

import type { Repository } from "typeorm";
import type { TechnicianEntity } from "../../../../domain/entities/technician.entity";
import type { ITechnicianRepository } from "../../../../domain/repositories/technician.repository";
import type { TechnicianTypeormEntity } from "../entities/technician.typeorm.entity";

export class TechnicianRepositoryTypeormImpl implements ITechnicianRepository {
  constructor(
    private readonly technicianTypeOrmRepository: Repository<TechnicianTypeormEntity>,
  ) {
    this.technicianTypeOrmRepository = technicianTypeOrmRepository;
  }

  public save = async (
    technician: TechnicianEntity,
  ): Promise<Result<void, DemoError>> => {
    try {
      await this.technicianTypeOrmRepository.save({
        id: technician.id,
        name: technician.name,
        campaign: { id: technician.campaignId },
      });
      return Result.ok(undefined);
    } catch (error) {
      return Result.err(
        new DemoError("INFRASTRUCTURE_FAILURE", (error as Error).message),
      );
    }
  };
}
