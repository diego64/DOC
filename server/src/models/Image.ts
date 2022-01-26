import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Company from './Company';

@Entity('images')
export default class Images {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne( () => Company, company => company.images)
  @JoinColumn({name: 'company_id',})
  company: Company
}