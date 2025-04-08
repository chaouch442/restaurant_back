import { Injectable, NotFoundException} from '@nestjs/common';
import { TableRepository } from './repositories/table.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTableDto } from './types/dtos/create-table.dto';
import { UpdateTableDto } from './types/update-table.dto';
import { TableRestaurant } from './entities/table.entity';


@Injectable()
export class TablesService {
    constructor(
         @InjectRepository(TableRestaurant)
        private readonly TableRepository:TableRepository){}
      
          
  
          async createTable(createTableDto: CreateTableDto) {
            const { numChaises, view, status } = createTableDto;
            const newTable = this.TableRepository.create({ numChaises, view, status });
          return this.TableRepository.save(newTable);
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

