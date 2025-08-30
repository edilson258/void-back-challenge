export class Result<T, E> {
  private readonly data?: T = undefined;
  private readonly error?: E = undefined;

  constructor({ data }: { data: T });
  constructor({ error }: { error: E });
  constructor(value: { data: T } | { error: E }) {
    if ("data" in value) {
      this.data = value.data;
    } else {
      this.error = value.error;
    }
  }

  public static ok = <T, E>(data: T): Result<T, E> => new Result({ data });
  public static err = <T, E>(error: E): Result<T, E> => new Result({ error });

  public isOk = (): boolean => this.data !== undefined;
  public isErr = (): boolean => this.error !== undefined;

  public unwrap = (): T => {
    if (this.isErr()) {
      throw new Error("Unwrap called on an Err");
    }
    return this.data!;
  };
  public unwrapErr = (): E => {
    if (this.isOk()) {
      throw new Error("UnwrapErr called on an Ok");
    }
    return this.error!;
  };
}
