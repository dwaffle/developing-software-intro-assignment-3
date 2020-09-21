import { Arguments, Argv, string } from "yargs";
import { calculateHouseRequirements } from "../wallCalculator";

export function calcWoodNeeded(yargs: Argv): void {
    // create a new yargs "command"
    yargs.command(
        // name the command with no spaces
        "calc-wood-needed",

        // describe the command so that the --help flag is helpful
        "Calculate the number of studs required to stick frame a house for Gerald",

        // define the parameters we need for our command
        {
            width: {
                type: "number",
                alias: "w",
                description: "The width of the house",
            },

            length: {
                type: "number",
                alias: "l",
                description: "The length of the house",
            },

            isWidthInches: {
                type: "boolean",
                alias: "inw",
                description: "Are the entered units in width feet or inches?",
            },

            isLengthInches: {
                type: "boolean",
                alias: "inl",
                description: "Are the entered units in length feet or inches?",
            },

            nameOfCustomer: {
                type: "string",
                alias: "name",
                description: "The name of the customer",
            },
        },

        // define the function we want to run once the arguments are parsed
        function (
            args: Arguments<{
                width: number;
                length: number;
                isWidthInches: boolean;
                isLengthInches: boolean;
                nameOfCustomer: string;
                w: number;
                l: number;
                inw: boolean;
                inl: boolean;
                name: string;
            }>
        ) {
            const requirements = calculateHouseRequirements(
                args.width,
                args.length,
                args.isLengthInches,
                args.isWidthInches,
                args.nameOfCustomer
            );

            console.log(requirements);
        }
    );
}
