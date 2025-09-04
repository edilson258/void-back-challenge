export type TecnicoCreateDto = {
	nome: string;
	campanha_id: number;
};

export type TecnicoListProdutoresDto = {
	id: number;
};

export interface ITecnicoSchemaValidation {
	validateCreate: (input: unknown) => TecnicoCreateDto;
	validateListProdutores: (input: unknown) => TecnicoListProdutoresDto;
}
