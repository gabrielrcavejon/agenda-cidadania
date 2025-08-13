import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pais' })
export class Pais {
  @PrimaryGeneratedColumn({ name: 'idpais' })
  idPais: number;

  @Column({ name: 'nome', length: 60 })
  nome: string;

  @Column({ name: 'abreviacao', length: 2 })
  abreviacao: string;
}
