import { Controller, Post, Param, UseGuards, Body, Get, Put, Delete, ParseUUIDPipe, Patch, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateUserDto } from './types/dtos/create.user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './types/dtos/update.user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@ApiTags('users')
@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post(':userId/assign-role/:roleName')
  @UseGuards(RolesGuard)
  @Roles('admin')
  assignRole(@Param('userId') userId: string, @Param('roleName') roleName: string) {
    return this.userService.assignRoleToUser(userId, roleName);
  }
  @Post('create')
  @Roles('admin')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @Roles('admin')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
  @Get()
  @Roles('admin')
  async getUser() {
    return this.userService.getUser();
  }

  @Patch(':id')
  @Roles('admin')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteUser(@Param('id', ParseIntPipe) id: string) {
    console.log("Tentative de suppression de l'utilisateur avec ID:", id);
    return this.userService.deleteUser(id);
  }

}
