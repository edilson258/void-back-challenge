import {
  Entity,
  Column,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ProducerTypeormEntity } from "./producer.entity.typeorm";
import { CampaignTypeormEntity } from "./campaign.typeorm.entity";
import { TechnicianTypeormEntity } from "./technician.typeorm.entity";

@Entity({ name: "producers_campaigns" })
export class ProducerCampaignEntityTypeorm {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @ManyToOne(() => ProducerTypeormEntity, (producer) => producer.campaigns, {
    eager: true,
    nullable: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "producer_id" })
  producer!: ProducerTypeormEntity;

  @ManyToOne(() => CampaignTypeormEntity, (campaign) => campaign.producers, {
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "campaign_id" })
  campaign!: CampaignTypeormEntity;

  @OneToMany(() => TechnicianTypeormEntity, (technician) => technician.campaign)
  technicians!: TechnicianTypeormEntity[];

  @Column({ type: "timestamp", nullable: false })
  registeredAt!: Date;

  @Column({ type: "timestamp", nullable: false })
  transferredAt!: Date;
}
