import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';

@Entity('companies')
export default class Company {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  address: string;

  @Column()
  health_plan: string;

  @Column()
  specialization: string;

  @Column()
  contact_phone: string;

  @Column()
  services_hours: string;

  @Column()
  open_on_weekends: boolean;

  @Column()
  accepted: boolean;

  @OneToMany( () => Image, image => image.company, {
    cascade: ['insert', 'update', 'remove']
  })
  @JoinColumn({ name: 'company_id'})
  images: Image[];
}