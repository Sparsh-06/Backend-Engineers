import path from "path";
import { SyntaxKind } from "ts-morph";
import type { SourceFile } from "ts-morph";
import { findObjectBySlug } from "./ts-array-utils";
import { serializeArchitectureProfile } from "./serialize-architecture-profile";
import type { ArchitectureProfileDraft } from "./types";

const PROFILES_FILE = path.join(process.cwd(), "src/data/architecture-profiles.ts");

async function loadSourceFile(): Promise<SourceFile> {
  const { Project } = await import("ts-morph");
  const project = new Project({
    tsConfigFilePath: path.join(process.cwd(), "tsconfig.json"),
    skipAddingFilesFromTsConfig: true,
  });
  return project.addSourceFileAtPath(PROFILES_FILE);
}

/** Finds the existing profile by its original slug and replaces the whole
 * object literal with a freshly serialized one - no create path, editing
 * existing profiles only (per the confirmed Phase 2 scope). */
export async function buildUpdatedArchitectureProfileText(
  originalSlug: string,
  profile: ArchitectureProfileDraft,
): Promise<string> {
  const sourceFile = await loadSourceFile();
  const arrayDecl = sourceFile.getVariableDeclarationOrThrow("architectureProfiles");
  const array = arrayDecl.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

  if (profile.slug !== originalSlug && findObjectBySlug(array, "slug", profile.slug)) {
    throw new Error(`A profile with slug "${profile.slug}" already exists.`);
  }

  const existing = findObjectBySlug(array, "slug", originalSlug);
  if (!existing) {
    throw new Error(`No architecture profile with slug "${originalSlug}" found.`);
  }

  const replaced = existing.replaceWithText(serializeArchitectureProfile(profile));
  replaced.asKindOrThrow(SyntaxKind.ObjectLiteralExpression).formatText();

  const errors = sourceFile.getPreEmitDiagnostics().filter((d) => d.getCategory() === 1);
  if (errors.length > 0) {
    throw new Error(
      `Generated architecture-profiles.ts would be invalid: ${errors.map((e) => e.getMessageText()).join("; ")}`,
    );
  }

  return sourceFile.getFullText();
}

export { PROFILES_FILE };
