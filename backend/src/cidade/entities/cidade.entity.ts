import { Estado } from 'src/estado/entities/estado.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'cidade' })
export class Cidade {
  @PrimaryGeneratedColumn({ name: 'idcidade' })
  idCidade: number;

  @Column({ name: 'idestado' })
  idEstado: number;

  @Column({ name: 'nome', length: 60 })
  nome: string;

  @Column({ name: 'idibge' })
  idIbge: number;

  @ManyToOne(() => Estado, (estado) => estado.cidade)
  @JoinColumn({ name: 'idestado' })
  estado: Estado;
}
