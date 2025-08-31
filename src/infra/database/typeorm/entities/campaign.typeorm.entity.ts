import {
  Entity,
  Column,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CompanyTypeormEntity } from "./company.typeorm.entity";
import { ProducerTypeormEntity } from "./producer.entity.typeorm";
import { TechnicianTypeormEntity } from "./technician.typeorm.entity";
import { ProducerCampaignEntityTypeorm } from "./producer-campaign.entity.typeorm";

@Entity({ name: "campaigns" })
export class CampaignTypeormEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  @ManyToOne(() => CompanyTypeormEntity, {
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "company_id" })
  company!: CompanyTypeormEntity;

  @OneToMany(() => ProducerCampaignEntityTypeorm, (pc) => pc.campaign)
  producers!: ProducerCampaignEntityTypeorm[];

  @OneToMany(() => TechnicianTypeormEntity, (technician) => technician.campaign)
  technicians!: TechnicianTypeormEntity[];

  @Column({ type: "date", nullable: false })
  startedAt!: Date;

  @Column({ type: "date", nullable: false })
  finishedAt!: Date;
}
