import { assertDirectoryThenFile } from "../assertDirectoryThenFile";
import { nameOnlyRedirect } from "../nameOnlyRedirect";
import { assertFileExists } from "../assertFileExists";

export const ifNameOnly = [nameOnlyRedirect, assertDirectoryThenFile, assertFileExists]
