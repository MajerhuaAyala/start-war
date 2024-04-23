type Left<L> = { kind: "left"; leftValue: L };
type Right<R> = { kind: "right"; rightValue: R };

type EitherValue<L, R> = Left<L> | Right<R>;

export class Either<L, R> {
  private constructor(private readonly value: EitherValue<L, R>) {}

  isLeft(): boolean {
    return this.value.kind === "left";
  }

  isRight(): boolean {
    return this.value.kind === "right";
  }

  fold<T>(leftFn: (left: L) => T, rightFn: (right: R) => T): T {
    switch (this.value.kind) {
      case "left":
        return leftFn(this.value.leftValue);
      case "right":
        return rightFn(this.value.rightValue);
    }
  }

  map<T>(fn: (r: R) => T): Either<L, unknown> {
    return this.flatMap((r) => Either.right(fn(r)));
  }

  flatMap<T>(fn: (right: R) => Either<L, T>): Either<L, unknown> {
    return this.fold(
      (leftValue) => Either.left(leftValue),
      (rightValue) => fn(rightValue),
    );
  }

  getOrThrow(
    exceptionClass: new (message: string) => Error,
    errorMessage?: string,
  ): R {
    const throwFn = (leftValue: L) => {
      throw new exceptionClass(errorMessage ? errorMessage : "" + leftValue);
    };

    return this.fold(
      (leftValue) => throwFn(leftValue),
      (rightValue) => rightValue,
    );
  }

  getOrElse(defaultValue: R): R {
    return this.fold(
      () => defaultValue,
      (someValue) => someValue,
    );
  }

  getLeft(): L {
    if (this.value.kind === "left") {
      return this.value.leftValue;
    } else {
      throw new Error("No se puede obtener el valor izquierdo de un Right.");
    }
  }

  getRight(): R {
    if (this.value.kind === "right") {
      return this.value.rightValue;
    } else {
      throw new Error("No se puede obtener el valor derecho de un Left.");
    }
  }

  static left<L, R>(value: L) {
    return new Either<L, R>({ kind: "left", leftValue: value });
  }

  static right<L, R>(value: R) {
    return new Either<L, R>({ kind: "right", rightValue: value });
  }
}
