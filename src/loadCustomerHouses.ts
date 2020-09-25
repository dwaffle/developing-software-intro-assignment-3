import { House } from "./house";
import { Houses } from "./house/houses"
import { buildWall} from "./wallCalculator/index"

export function getHouseMatch(customerName:string) {
    //Set the wallSuppliesCalcualtor
    Houses.setWallSuppliesCalculator((inches) => buildWall(inches))
    //Get the houses in the save file.
    const savedHouses = Houses.getAll();
    //If there isn't a house with a name that matches the customer, return that there's no house named that.
    //Otherwise, find the house with a name that matches the customer, then return it.
    if(!savedHouses.get(customerName))
    {
        return "There is no house by that name.";
    } else
    {       
        let houses = [...savedHouses.values()];
        let customerHouse = houses.find((element: any) => element.name === customerName);
        return customerHouse;
    }
}