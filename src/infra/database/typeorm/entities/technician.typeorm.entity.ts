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

@Entity({ name: "technicians" })
export class TechnicianTypeormEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  // NOTE: we can alose have a many-to-many relationship, meaning:
  // a technician can be in many campaigns at once and a campaign can have many technicians working on it.
  @ManyToOne(() => CampaignTypeormEntity, {
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "campaign_id" })
  campaign!: CampaignTypeormEntity;

  // Timestamps
  //
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt!: Date;
}
