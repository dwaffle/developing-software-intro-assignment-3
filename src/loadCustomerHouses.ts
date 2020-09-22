import { House } from "./house";
import { Houses } from "./house/houses"
import { buildWall} from "./wallCalculator/index"

export function getHouseMatch(customerName:string) {
    Houses.setWallSuppliesCalculator((inches) => buildWall(inches))
    const savedHouses = Houses.getAll();
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