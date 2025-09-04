export class ProdutorCampanha {
	constructor(
		public readonly tecnico_id: number,
		public readonly produtor_id: number,
		public readonly campanha_id: number,
		public readonly data_registro: Date,
		public readonly data_transferencia: Date,
		public readonly id?: number,
	) {}
}
