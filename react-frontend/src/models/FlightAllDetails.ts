import { Aircraft } from "./Aircraft";
import { Airport } from "./Airport";
import { Passenger } from "./Passenger";
export interface FlightAllDetails{
    id:number;
    departure_airport:Airport;
    arrival_airport:Airport;
    call_sign:string;
    departure_time :Date;
    arrival_time :Date;
    duration : number;
    status :string;
    price :number
    seats_available :number;
    operating_aircraft:Aircraft;
    passengers: Passenger[];
}