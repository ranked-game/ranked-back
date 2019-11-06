import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

// Models
import { GameEntity } from './game.entity';

@Entity('accounts')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 300, nullable: false, unique: true })
  email: string;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: number;

  @OneToMany(type => GameEntity, game => game.account)
  games: GameEntity[];
}
