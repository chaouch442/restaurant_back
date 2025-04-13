import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { TableRepository } from './repositories/table.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTableDto } from './types/dtos/create-table.dto';
import { UpdateTableDto } from './types/update-table.dto';
import { TableRestaurant } from './entities/table.entity';
import { Bloc } from 'src/bloc/entities/bloc.entity';
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
            const { numChaises, status, row, col,  blocId } = createTableDto;
            const blocFound = await this.blocRepository.findOneBy( { id:  blocId },
            );
          
            if (!blocFound) {
              throw new BadRequestException('Bloc non trouvé');
            }
            
            const newTable = this.TableRepository.create({
              numChaises,
              status,
              row,
              col,   
            
            });
            return this.TableRepository.save( newTable)
            
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
          
          async delete(id: string): Promise<void> {
            const table = await this.TableRepository.findOne({ where: { id } });
          
            if (!table) {
              throw new NotFoundException('Table not found');
            }
          
            try {
              await this.TableRepository.delete(id);
            } catch (error) {
              console.error('Erreur lors de la suppression :', error);
              throw new InternalServerErrorException('Impossible de supprimer la table.');
            }
          }
          
         
          }

