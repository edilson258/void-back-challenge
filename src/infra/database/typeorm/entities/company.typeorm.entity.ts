import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "companies" })
export class CompanyTypeormEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 15 })
  cnpj!: string;

  @Column({ type: "varchar", length: 100 })
  email!: string;

  @Column({ type: "varchar", length: 15 })
  phone!: string;
}
