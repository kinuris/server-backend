import { assertDirectoryThenFile } from "../assertDirectoryThenFile";
import { assertRoute } from "../assertRoute";
import { nameOnlyRedirect } from "../nameOnlyRedirect";

export const ifNameOnly = [nameOnlyRedirect, assertDirectoryThenFile, assertRoute]
