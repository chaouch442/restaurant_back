import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RoleRepository } from 'src/auth/repositories/role.repository';
import { CreateUserDto } from './types/dtos/create.user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './types/dtos/update.user.dto';
import { UserRepository } from './repositories/user.repository';
import { RoleUser } from 'src/auth/entities/role.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(RoleUser)
    private readonly roleRepository: RoleRepository,

  ) { }
  public generateRandomPassword(length = 8): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      password += chars[rnum];
    }
    return password;
  }



  async findByEmail(email: string) {
    console.log('Recherche de l\'utilisateur avec email :', email);
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });

    return user;
  }
  async findByResetToken(token: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { resetToken: token } });
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
  async assignRoleToUser(userId: string, roleName: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['role'],
    });

    const role = await this.roleRepository.findOneBy({ name: roleName });

    if (!user || !role) {
      throw new Error('User or Role not found');
    }

    user.role = (role);
    return this.userRepository.save(user);
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, name, lastname, role, phone, dateDebutContrat } = createUserDto;


    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new BadRequestException('Cet utilisateur existe déjà.');
    }

    if (role === 'admin') {
      throw new BadRequestException("Un admin ne peut pas créer un autre admin.");
    }
    const randomPassword = this.generateRandomPassword();
    console.log('Generated Password:', randomPassword);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);


    let roleEntity = await this.roleRepository.findOneBy({ name: role });

    if (!roleEntity) {
      roleEntity = this.roleRepository.create({ name: role });
      await this.roleRepository.save(roleEntity);
    }

    const newUser = this.userRepository.create({
      email,
      name,
      lastname,
      phone,
      dateDebutContrat,
      password: hashedPassword,
      role: roleEntity,
    });

    return this.userRepository.save(newUser);

  }
  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé.');
    }

    return user;
  }

  async getUser() {
    return this.userRepository.find();
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const role = await this.roleRepository.findOneBy({ name: updateUserDto.role });
    if (!role) {
      throw new NotFoundException(`Role ${updateUserDto.role} non trouvé`);
    }

    if (updateUserDto.role && !['manager', 'serveur'].includes(updateUserDto.role)) {
      throw new BadRequestException("Seuls les rôles 'manager' et 'serveur' peuvent être assignés.");
    }

    Object.assign(user, updateUserDto);
    user.role = role;
    return await this.userRepository.save(user);
  }

  async deleteUser(id: string) {
    console.log("ID reçu pour suppression:", id);
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      console.log("Utilisateur introuvable !");
      throw new NotFoundException(`L'utilisateur avec l'ID ${id} n'existe pas`);
    }

    await this.userRepository.delete(id);
    return { message: 'Utilisateur supprimé avec succès.' };
  }


}

