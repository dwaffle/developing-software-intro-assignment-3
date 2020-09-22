import { Houses } from "./house/houses"

export function getHouseMatch(customerName:string) {
    const savedHouses = Houses.getAll();
    if(!savedHouses.get(customerName))
    {
        console.log(savedHouses);
        return "There is no house by that name.";
    } else
    {
        return savedHouses.get(customerName);
    }
}