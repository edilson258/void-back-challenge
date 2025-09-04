const VOID_APP_ERRORS = [
	"ENTRY_COLLISION",
	"ENTRY_NOT_FOUND",
	"ENTRY_IS_INVALID",
	"VALIDATION_ERROR",
	"INFRASTRUCTURE_FAILURE",
] as const;

export type VoidErrorType = (typeof VOID_APP_ERRORS)[number];

export class VoidError extends Error {
	public readonly category: VoidErrorType;

	constructor(category: VoidErrorType, message: string) {
		super(message);
		this.category = category;
	}
}

export class VoidValidationError extends VoidError {
	constructor(message: string) {
		super("VALIDATION_ERROR", message);
	}
}
