import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TablesService } from './tables.service';
import { CreateTableDto } from './types/dtos/create-table.dto';
import { UpdateTableDto } from './types/update-table.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';



@ApiTags('tables')
@Controller('tables')
export class TablesController {
constructor(private readonly tableService: TablesService) {}

 @Roles('manager')
@Post()
  createTable(@Body() createTableDto:CreateTableDto) {
    return this.tableService.createTable(createTableDto);
  }
  @Get()
  async getTable(){
    return this.tableService.getTable();
  }
  @Get(':id')
  async getTableById(@Param('id',ParseUUIDPipe)id:string){
    return this.tableService.getTableById(id);
  }
  @Roles('manager')
  @Patch(':id')
  async updateTable(@Param('id') id: string, @Body() UpdateTableDto:UpdateTableDto ) {
    return this.tableService.updateTable(id, UpdateTableDto);
  }
  @Roles('manager')
  @Delete(':id')
  async deleteTable(@Param('id') id: string) {
    return this.tableService.deleteTable(id);
  }
  }


