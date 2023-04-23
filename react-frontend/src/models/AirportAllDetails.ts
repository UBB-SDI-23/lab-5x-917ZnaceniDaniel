import { Flight } from "./Flight";

export interface AirportAllDetails{
    id: number;
    name :string;
    city:string;
    country:string;
    timezone:string;
    elevation :number;
    capacity :number;
    no_gates:number
    no_terminals :number;
    arrival_flights:Flight[];
    departure_flights:Flight[];
}