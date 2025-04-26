import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TablesService } from './tables.service';
import { CreateTableDto } from './types/dtos/create-table.dto';
import { UpdateTableDto } from './types/update-table.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';



@ApiTags('tables')
@Controller('tables')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TablesController {
  constructor(private readonly tableService: TablesService) { }

  @Roles('admin')
  @Post()
  createTable(@Body() createTableDto: CreateTableDto) {
    return this.tableService.createTable(createTableDto);
  }

  @Get()
  async getTable() {
    return this.tableService.getTable();
  }

  @Get(':id')
  async getTableById(@Param('id', ParseUUIDPipe) id: string) {
    return this.tableService.getTableById(id);
  }

  @Roles('admin')
  @Patch(':id')
  async updateTable(@Param('id') id: string, @Body() UpdateTableDto: UpdateTableDto) {
    return this.tableService.updateTable(id, UpdateTableDto);
  }
  @Roles('admin')
  @Delete(':id')
  async deleteTable(@Param('id') id: string) {
    return this.tableService.delete(id);
  }

  @Roles('admin')
  @Patch(':id/status')
  async updateTableStatus(
    @Param('id') id: string,
    @Body('status') status: string
  ) {
    return this.tableService.updateStatus(id, status);
  }

}


