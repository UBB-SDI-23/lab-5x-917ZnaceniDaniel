import { Airline } from "./Airline";
import { Flight } from "./Flight";
export interface AircraftAllDetails {
    id:number;
    name :string;
    manufacturer:string;
    model :string;
    max_speed :number;
    seating_capacity :number;
    fuel_capacity :number;
    wing_span :number;
    length :number;
    no_engines :number;
    airline_name :Airline;
    operated_flights:Flight[];
}