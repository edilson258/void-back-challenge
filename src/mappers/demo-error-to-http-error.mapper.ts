import type { HttpError } from "../api/error";
import type { DemoError } from "../error";

export class DemoErrorToHttpErrorMapper {
  public static map = (error: DemoError): HttpError => {
    switch (error.category) {
      case "ENTRY_COLLISION":
        return { status: 409, message: error.message };
      case "ENTRY_NOT_FOUND":
        return { status: 404, message: error.message };
      case "VALIDATION_ERROR":
        return { status: 422, message: error.message };
      case "INFRASTRUCTURE_FAILURE":
        // Dont leak sensitive information
        return { status: 500, message: "Internal server error" };
    }
  };
}
