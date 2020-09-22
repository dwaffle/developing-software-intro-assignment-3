// import yargs to re-use code from someone else that has already 
// solved the complexities of parsing command line arguments
import yargs = require('yargs');
import { calcWoodNeeded } from './commands/calc-wood-needed';
import { getExistingCustomer } from './commands/get-existing-user'

//Calculate wood needed.
calcWoodNeeded( yargs );

//getHouseMatch
getExistingCustomer( yargs );

// tell yargs to include the --help flag
yargs.help();

// tell yargs to parse the parameters
yargs.parse();