import { SyntaxKind, type ArrayLiteralExpression, type ObjectLiteralExpression } from "ts-morph";

/**
 * Finds an object literal within an array literal by matching one of its
 * string properties. Shared by every per-type writer (topics, architecture
 * profiles, deep dives, build projects) - each data file is structurally
 * "an array of object literals, found by slug," just with different array
 * variable names and nesting depth.
 */
export function findObjectBySlug(
  arrayLiteral: ArrayLiteralExpression,
  field: string,
  value: string,
): ObjectLiteralExpression | undefined {
  return arrayLiteral
    .getElements()
    .map((el) => el.asKindOrThrow(SyntaxKind.ObjectLiteralExpression))
    .find((obj) => {
      const prop = obj.getProperty(field);
      if (!prop) return false;
      return (
        prop
          .asKindOrThrow(SyntaxKind.PropertyAssignment)
          .getInitializerIfKind(SyntaxKind.StringLiteral)
          ?.getLiteralValue() === value
      );
    });
}

/** Same idea, but matching on two string properties at once (e.g. a deep
 * dive's compound companySlug + slug key). */
export function findObjectByCompoundKey(
  arrayLiteral: ArrayLiteralExpression,
  matchers: { field: string; value: string }[],
): ObjectLiteralExpression | undefined {
  return arrayLiteral
    .getElements()
    .map((el) => el.asKindOrThrow(SyntaxKind.ObjectLiteralExpression))
    .find((obj) =>
      matchers.every(({ field, value }) => {
        const prop = obj.getProperty(field);
        if (!prop) return false;
        return (
          prop
            .asKindOrThrow(SyntaxKind.PropertyAssignment)
            .getInitializerIfKind(SyntaxKind.StringLiteral)
            ?.getLiteralValue() === value
        );
      }),
    );
}
