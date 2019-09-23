import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 300, nullable: false, unique: true })
  email: string;
}
