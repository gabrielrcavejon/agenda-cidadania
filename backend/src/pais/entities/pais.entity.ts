import { Estado } from 'src/estado/entities/estado.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pais' })
export class Pais {
  @PrimaryGeneratedColumn({ name: 'idpais' })
  idPais: number;

  @Column({ name: 'nome', length: 60 })
  nome: string;

  @Column({ name: 'abreviacao', length: 2 })
  abreviacao: string;

  @OneToMany(() => Estado, (estado) => estado.pais)
  estado: Estado[];
}
