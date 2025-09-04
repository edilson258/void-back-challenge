export class Empresa {
	constructor(
		public readonly nome: string,
		public readonly cnpj: string,
		public readonly telefone: string,
		public readonly email: string,
		public id?: number,
	) {}
}
