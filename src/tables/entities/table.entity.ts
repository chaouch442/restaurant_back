import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numChaises: number;

  @Column()
  view: string;

  @Column()
  status: string;

  @Column({ unique: true })
  qrCode: string;
}
