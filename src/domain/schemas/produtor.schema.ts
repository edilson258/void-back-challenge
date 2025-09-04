export type ProdutorCreateDto = {
	nome: string;
	localizacao: string;
};

export interface IProdutorSchemaValidation {
	validateCreate: (input: unknown) => ProdutorCreateDto;
}
