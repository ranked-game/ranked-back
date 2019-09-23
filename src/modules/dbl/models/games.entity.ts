import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';

// Models
import { AccountEntity } from './account.entity';

@Entity('games')
export class GameEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gameId: number;

  @Column('uuid')
  accountId: string;

  @Column({ type: 'jsonb' })
  data: any;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: number;

  @ManyToOne(type => AccountEntity, user => user.games, {
    cascade: ['insert', 'update'],
  })
  account: AccountEntity;
}
