import { Arguments, Argv, string } from "yargs";
import { getHouseMatch } from "../loadCustomerHouses";

export function getExistingCustomer(yargs: Argv): void {
    yargs.command(
        //Name the command to get the name of the customer
        "getCustomer",

        //Describe the command
        "Gets a house by the customer name, or return that there is no house by that name.",

        //Define needed paramaters
        {
            nameOfCustomer: {
                type: "string",
                alias: "name",
                description: "The name of the customer",
            },
        },

        //Define the function we want to run when the arguments are parsed.
        function (args: Arguments<{ nameOfCustomer: string }>) {
            const requirements = getHouseMatch(args.nameOfCustomer);
            console.log(requirements);
        }
    );
}
