import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mvp_subscribers')
export class MvpSubscribersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 300, nullable: false, unique: true })
  email: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
