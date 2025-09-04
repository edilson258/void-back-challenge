import { DataSource } from "typeorm";
import { eVars } from "../../../utils/env.ts";
import {
	CampanhaTypeorm,
	EmpresaTypeorm,
	ProdutorCampanhaTypeorm,
	ProdutorTypeorm,
	TecnicoTypeorm,
} from "./entities.ts";

export const AppDataSource = new DataSource({
	type: "postgres",
	url: eVars.POSTGRES_URL,
	logging: true,
	entities: [
		EmpresaTypeorm,
		CampanhaTypeorm,
		TecnicoTypeorm,
		ProdutorTypeorm,
		ProdutorCampanhaTypeorm,
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
