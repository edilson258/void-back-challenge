export type EmpresaCreateDto = {
	nome: string;
	cnpj: string;
	telefone: string;
	email: string;
};

export interface IEmpresaSchemaValidation {
	validateCreate: (input: unknown) => EmpresaCreateDto;
}
