import { mockAccounts } from "./mock-data";
import { buildTree } from "./tree-utils";

console.log(JSON.stringify(buildTree(mockAccounts), null, 2));
