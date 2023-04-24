import { Ticket } from "./Ticket";

export interface PassengerAllDetails{
    id: number;
    first_name: string;
    last_name: string;
    email:string;
    phone_number:string;
    citizenship:string;
    tickets: Ticket[]
}