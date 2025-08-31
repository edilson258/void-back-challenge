import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { ProducerCampaignEntityTypeorm } from "./producer-campaign.entity.typeorm";

@Entity({ name: "producers" })
export class ProducerTypeormEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255 })
  address!: string;

  @OneToMany(() => ProducerCampaignEntityTypeorm, (pc) => pc.producer)
  campaigns!: ProducerCampaignEntityTypeorm[];

  // Timestamps
  //
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt!: Date;
}
