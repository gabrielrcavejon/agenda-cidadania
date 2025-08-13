import { Cidade } from 'src/cidade/entities/cidade.entity';
import { Pais } from 'src/pais/entities/pais.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'estado' })
export class Estado {
  @PrimaryGeneratedColumn({ name: 'idestado' })
  idEstado: number;

  @Column({ name: 'idpais' })
  idPais: number;

  @Column({ name: 'nome', length: 60 })
  nome: string;

  @Column({ name: 'abreviacao', length: 2 })
  abreviacao: string;

  @OneToMany(() => Cidade, (cidade) => cidade.estado)
  cidade: Cidade[];

  @ManyToOne(() => Pais, (pais) => pais.estado)
  @JoinColumn({ name: 'idpais' })
  pais: Pais;
}
