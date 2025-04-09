import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { TableRepository } from './repositories/table.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTableDto } from './types/dtos/create-table.dto';
import { UpdateTableDto } from './types/update-table.dto';
import { TableRestaurant } from './entities/table.entity';
import { Bloc } from 'src/bloc/entities/bloc.entity/bloc.entity';
import { BlocRepository } from 'src/bloc/repositories/bloc.repository';
import { ViewType } from './enums/view.enums';


@Injectable()
export class TablesService {
    constructor(
         @InjectRepository(TableRestaurant)
        private readonly TableRepository:TableRepository,
        @InjectRepository(Bloc)
        private readonly blocRepository:BlocRepository){}
      
          
  
          async createTable(createTableDto: CreateTableDto) {
            const { numChaises, status, row, col, bloc } = createTableDto;
            const blocFound = await this.blocRepository.findOneBy({
             
                name: bloc.name,
                etage: bloc.etage,
              
            });
            
            if (!blocFound) {
              throw new BadRequestException('Bloc non trouvé');
            }
            
            const newTable = this.TableRepository.create({
              numChaises,
              status,
              row,
              col,   
              blocId: blocFound.id,   
            });
            
            
          }

          async getTable(){
            return this.TableRepository.find();
          }
          async getTableById(id: string) {
            const table = await this.TableRepository.findOneBy({ id:id });
        
            if (!table) {
              throw new NotFoundException(`Table with ID ${id} not found`);
            }
        
            return table;
          }
          async updateTable(id: string, updateTableDto: UpdateTableDto) {
            const table = await this.TableRepository.findOneBy({ id });
          
            if (!table) {
              throw new NotFoundException(`Table with ID ${id} not found`);
            }
          
            Object.assign(table, updateTableDto);
            return await this.TableRepository.save(table);
          }
          
          async deleteTable(id: string){
            const table = await this.TableRepository.findOneBy({ id });
          
            if (!table) {
              throw new NotFoundException(`Table with ID ${id} not found`);
            }
          
            await this.TableRepository.remove(table);
            return { message: `Table with ID ${id} successfully deleted` };
          }
          
         
          }

