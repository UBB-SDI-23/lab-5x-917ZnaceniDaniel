import { Flight } from "./Flight";
import { Passenger } from "./Passenger";

export interface Ticket{
    id: number;
    flight:Flight;
    passenger: Passenger;
    seat_number: number;
    booking_date: Date;
}