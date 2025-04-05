import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { TableRepository } from './repositories/table.repository';
import { TableEntity } from './entities/table.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTableDto } from './types/dtos/create-table.dto';
import * as QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTableDto } from './types/update-table.dto';


@Injectable()
export class TablesService {
    constructor(
         @InjectRepository(TableEntity)
        private readonly TableRepository:TableRepository){}
        async generateTableQRCode(tableId: string) {
            try {
              const uniqueId = uuidv4(); 
              const qrCodeData = `https://restaurant.com/table/${tableId}?uuid=${uniqueId}`; 
              return await QRCode.toDataURL(qrCodeData);
            } catch (error) {
              console.error('Erreur lors de la génération du QR Code:', error);
              throw new Error('Impossible de générer le QR Code.');
            }
          }
          
  
          async createTable(createTableDto: CreateTableDto) {
            const { numChaises, view, status } = createTableDto;
            const newTable = this.TableRepository.create({ numChaises, view, status });
            newTable.qrCode = await this.generateTableQRCode(newTable.id);
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

