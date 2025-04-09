import { Identifiable } from "src/shared/interfaces/identifiable.interface";

export interface TableInterface  extends Identifiable{
    
    numChaises: number;
    status: 'available' | 'occupied';
   
  }
  