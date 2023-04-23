import { Airline } from "./Airline";
export interface Aircraft {
    id:number;
    name :string;
    manufacturer:string;
    model :string;
    max_speed :number;
    seating_capacity :number;
    fuelCapacity :number;
    wing_span :number;
    length :number;
    no_engines :number;
    airline_name :Airline;
}