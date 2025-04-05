import { Identifiable } from 'src/shared/interfaces/identifiable.interface';
import { IPlat } from '../../plats/interfaces/plat.interface';

export interface IMen extends Identifiable {
  datedecreation: string;
  plats: IPlat[];
}
