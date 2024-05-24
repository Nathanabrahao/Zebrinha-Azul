import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  cityName!: string;

  @Column('decimal')
  temperature!: number;

  @Column('int')
  humidity!: number;

  @Column('int')
  pressure!: number;

  @Column({ type: 'varchar' })
  condition!: string;

  @Column({ type: 'varchar' })
  icon!: string;

  @Column({ type: 'varchar' })
  description!: string;
}

@Entity()
export class Traffic {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  cityName!: string;

  @OneToMany(() => TrafficResource, resource => resource.traffic)
  resources!: TrafficResource[];
}

@Entity()
export class TrafficResource {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  trafficCongestion!: string;

  @ManyToOne(() => Traffic, traffic => traffic.resources)
  @JoinColumn({ name: "trafficId" })
  traffic!: Traffic;
}
