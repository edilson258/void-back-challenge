export class Campanha {
	constructor(
		public readonly nome: string,
		public readonly empresa_id: number,
		public readonly data_inicio: Date,
		public readonly data_fim: Date,
		public id?: number,
	) {}
}
