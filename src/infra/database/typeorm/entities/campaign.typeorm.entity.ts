import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from "typeorm";
import { CompanyTypeormEntity } from "./company.typeorm.entity";

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

  @Column({ type: "date", nullable: false })
  startedAt!: Date;

  @Column({ type: "date", nullable: false })
  finishedAt!: Date;
}
