import type { HttpError } from "../api/error";
import type { VoidError } from "../error";

export function mapVoidErrorToHttpError(error: VoidError): HttpError {
	switch (error.category) {
		case "ENTRY_COLLISION":
			return { status: 409, message: error.message };
		case "ENTRY_NOT_FOUND":
			return { status: 404, message: error.message };
		case "VALIDATION_ERROR":
		case "ENTRY_IS_INVALID":
			return { status: 422, message: error.message };
		case "INFRASTRUCTURE_FAILURE":
			return { status: 500, message: "Internal server error" };
	}
}
