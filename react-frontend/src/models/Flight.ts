import { Airport } from "./Airport";

export interface Flight{
    id:number;
    departure_airport:Airport;
    arrival_airport:Airport;
    departure_time :Date;
    arrival_time :Date;
    duration : number;
    status :string;
    price :number
    seats_available :number;
}