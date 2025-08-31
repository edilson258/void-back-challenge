import {
  Entity,
  Column,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { CampaignTypeormEntity } from "./campaign.typeorm.entity";
import { ProducerCampaignEntityTypeorm } from "./producer-campaign.entity.typeorm";

@Entity({ name: "technicians" })
export class TechnicianTypeormEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @ManyToOne(() => CampaignTypeormEntity, (pc) => pc.technicians, {
    eager: true,
    nullable: true,
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "producer_campaign_id" })
  campaign!: CampaignTypeormEntity;

  // Timestamps
  //
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt!: Date;
}
