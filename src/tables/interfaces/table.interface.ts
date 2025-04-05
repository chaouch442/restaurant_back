import { Identifiable } from "src/shared/interfaces/identifiable.interface";

export interface TableInterface  extends Identifiable{
    
    numChaises: number;
    view: string;
    status: 'available' | 'occupied';
    qrCode: string;
  }
  