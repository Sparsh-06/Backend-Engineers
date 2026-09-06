import path from "path";
import { SyntaxKind } from "ts-morph";
import type { SourceFile } from "ts-morph";
import { findObjectByCompoundKey } from "./ts-array-utils";
import { serializeDeepDive } from "./serialize-deep-dive";
import type { DeepDiveDraft } from "./types";

const DEEP_DIVES_FILE = path.join(process.cwd(), "src/data/architecture-deep-dives.ts");

async function loadSourceFile(): Promise<SourceFile> {
  const { Project } = await import("ts-morph");
  const project = new Project({
    tsConfigFilePath: path.join(process.cwd(), "tsconfig.json"),
    skipAddingFilesFromTsConfig: true,
  });
  return project.addSourceFileAtPath(DEEP_DIVES_FILE);
}

/** Edit-existing-only, found by the compound key (companySlug + slug), same
 * as the real getDeepDive() lookup this file already exports. */
export async function buildUpdatedDeepDiveText(
  originalCompanySlug: string,
  originalSlug: string,
  deepDive: DeepDiveDraft,
): Promise<string> {
  const sourceFile = await loadSourceFile();
  const arrayDecl = sourceFile.getVariableDeclarationOrThrow("architectureDeepDives");
  const array = arrayDecl.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

  const keyChanged = deepDive.companySlug !== originalCompanySlug || deepDive.slug !== originalSlug;
  if (
    keyChanged &&
    findObjectByCompoundKey(array, [
      { field: "companySlug", value: deepDive.companySlug },
      { field: "slug", value: deepDive.slug },
    ])
  ) {
    throw new Error(`A deep dive with companySlug "${deepDive.companySlug}" and slug "${deepDive.slug}" already exists.`);
  }

  const existing = findObjectByCompoundKey(array, [
    { field: "companySlug", value: originalCompanySlug },
    { field: "slug", value: originalSlug },
  ]);
  if (!existing) {
    throw new Error(`No deep dive with companySlug "${originalCompanySlug}" and slug "${originalSlug}" found.`);
  }

  const replaced = existing.replaceWithText(serializeDeepDive(deepDive));
  replaced.asKindOrThrow(SyntaxKind.ObjectLiteralExpression).formatText();

  const errors = sourceFile.getPreEmitDiagnostics().filter((d) => d.getCategory() === 1);
  if (errors.length > 0) {
    throw new Error(
      `Generated architecture-deep-dives.ts would be invalid: ${errors.map((e) => e.getMessageText()).join("; ")}`,
    );
  }

  return sourceFile.getFullText();
}

export { DEEP_DIVES_FILE };
