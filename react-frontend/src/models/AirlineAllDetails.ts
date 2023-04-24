import { Aircraft } from "./Aircraft";

export interface AirlineAllDetails{
    id:number;
    name :string;
    headquarters :string;
    website:string;
    established_date:Date;
    revenue :number;
    num_employees: number;
    aircraft_list: Aircraft[];
}