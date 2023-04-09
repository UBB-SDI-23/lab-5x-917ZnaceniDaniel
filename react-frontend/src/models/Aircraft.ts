import { Airline } from "./Airline";
export interface Aircraft {
    id:number;
    name :string;
    manufacturer:string;
    model :string;
    maxSpeed :number;
    seatingCapacity :number;
    fuelCapacity :number;
    wingSpan :number;
    length :number;
    noEngines :number;
    airlineName :Airline;
}