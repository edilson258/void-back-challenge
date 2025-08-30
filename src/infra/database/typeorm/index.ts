import { eVars } from "../../../utils/env.ts";

import { DataSource } from "typeorm";
import { CompanyTypeormEntity } from "./entities/company.typeorm.entity.ts";
import { CampaignTypeormEntity } from "./entities/campaign.typeorm.entity.ts";
import { TechnicianTypeormEntity } from "./entities/technician.typeorm.entity.ts";
import { ProducerEntityTypeorm } from "./entities/producer.entity.typeorm.ts";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: eVars.POSTGRES_URL,
  logging: true,
  entities: [
    CompanyTypeormEntity,
    CampaignTypeormEntity,
    TechnicianTypeormEntity,
    ProducerEntityTypeorm,
  ],
  synchronize: true,
  subscribers: [],
  migrations: ["./migrations/*.ts"],
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Connection initialized with database...");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
