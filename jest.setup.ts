import "@testing-library/jest-dom";
import { loadEnvConfig } from '@next/env'


// ##################### Load test env variables, to use with .env.test.local #####################
const projectDir = process.cwd()
loadEnvConfig(projectDir)
// ##################### Load test env variables, to use with .env.test.local #####################


// TODO: add all firebase mock in here
// Adding --maxWorkers=25% to speed up the test runner
// Because it runs before all tests
/** 
 *  Add mocks of nodes_modules in a __mocks__ directory
 * adjacent to the node modules
*/