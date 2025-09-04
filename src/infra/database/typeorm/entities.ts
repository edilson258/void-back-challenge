import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("empresas")
export class EmpresaTypeorm {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "varchar", length: 255, nullable: false })
	nome!: string;

	@Column({ type: "varchar", length: 20, nullable: false, unique: true })
	cnpj!: string;

	@Column({ type: "varchar", length: 15, nullable: true })
	telefone!: string;

	@Column({ type: "varchar", length: 100, nullable: true })
	email!: string;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;

	@OneToMany(
		() => CampanhaTypeorm,
		(campanha) => campanha.empresa,
	)
	campanhas!: CampanhaTypeorm[];
}

@Entity("campanhas")
export class CampanhaTypeorm {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "varchar", length: 255, nullable: false })
	nome!: string;

	@Column({ type: "date", nullable: false })
	dataInicio!: Date;

	@Column({ type: "date", nullable: true })
	dataFim!: Date;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;

	@ManyToOne(
		() => EmpresaTypeorm,
		(empresa) => empresa.campanhas,
		{
			eager: true,
		},
	)
	@JoinColumn({ name: "empresa_id" })
	empresa!: EmpresaTypeorm;

	@OneToMany(
		() => TecnicoTypeorm,
		(tecnico) => tecnico.campanha,
	)
	tecnicos!: TecnicoTypeorm[];

	@OneToMany(
		() => ProdutorCampanhaTypeorm,
		(produtorCampanha) => produtorCampanha.campanha,
	)
	produtorCampanhas!: ProdutorCampanhaTypeorm[];
}

@Entity("tecnicos")
export class TecnicoTypeorm {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "varchar", length: 255, nullable: false })
	nome!: string;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;

	@ManyToOne(
		() => CampanhaTypeorm,
		(campanha) => campanha.tecnicos,
		{
			eager: true,
		},
	)
	@JoinColumn({ name: "campanha_id" })
	campanha!: CampanhaTypeorm;

	@OneToMany(
		() => ProdutorCampanhaTypeorm,
		(produtorCampanha) => produtorCampanha.tecnico,
	)
	produtorCampanhas!: ProdutorCampanhaTypeorm[];
}

@Entity("produtores")
export class ProdutorTypeorm {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "varchar", length: 255, nullable: false })
	nome!: string;

	@Column({ type: "varchar", length: 255, nullable: true })
	localizacao!: string;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;

	@OneToMany(
		() => ProdutorCampanhaTypeorm,
		(produtorCampanha) => produtorCampanha.produtor,
	)
	produtorCampanhas!: ProdutorCampanhaTypeorm[];
}

@Entity("produtores_campanhas")
export class ProdutorCampanhaTypeorm {
	@PrimaryGeneratedColumn()
	id!: number;

	@CreateDateColumn()
	data_registro!: Date;

	@Column({ type: "timestamp", nullable: true })
	data_transferencia!: Date;

	@ManyToOne(
		() => ProdutorTypeorm,
		(produtor) => produtor.produtorCampanhas,
	)
	@JoinColumn({ name: "produtor_id" })
	produtor!: ProdutorTypeorm;

	@ManyToOne(
		() => CampanhaTypeorm,
		(campanha) => campanha.produtorCampanhas,
	)
	@JoinColumn({ name: "campanha_id" })
	campanha!: CampanhaTypeorm;

	@ManyToOne(
		() => TecnicoTypeorm,
		(tecnico) => tecnico.produtorCampanhas,
	)
	@JoinColumn({ name: "tecnico_id" })
	tecnico!: TecnicoTypeorm;
}
