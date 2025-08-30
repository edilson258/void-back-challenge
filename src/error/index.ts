const DEMO_ERROR_CATEGORIES = [
  "ENTRY_COLLISION",
  "ENTRY_NOT_FOUND",
  "VALIDATION_ERROR",
  "INFRASTRUCTURE_FAILURE",
] as const;

export type DemoErrorCategory = (typeof DEMO_ERROR_CATEGORIES)[number];

export class DemoError extends Error {
  public readonly category: DemoErrorCategory;

  constructor(category: DemoErrorCategory, message: string) {
    super(message);
    this.category = category;
  }
}

export class DemoValidationError extends DemoError {
  constructor(message: string) {
    super("VALIDATION_ERROR", message);
  }
}
