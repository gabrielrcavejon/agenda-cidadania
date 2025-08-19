import { Endereco } from 'src/endereco/entities/endereco.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Tipo {
  ADMINISTRADOR = 'A',
  ORGANIZADOR = 'O',
}

@Entity({ name: 'empresa' })
export class Empresa {
  @PrimaryGeneratedColumn({ name: 'idempresa' })
  idEmpresa: number;

  @Column({ name: 'nome', length: 100 })
  nome: string;

  @Column({ name: 'fantasia', length: 100 })
  fantasia: string;

  @Column({ name: 'cnpj', length: 14, unique: true })
  cnpj: string;

  @Column({
    type: 'enum',
    enum: Tipo,
    name: 'tipo',
    default: Tipo.ADMINISTRADOR,
  })
  tipo: Tipo;

  @OneToMany(() => Usuario, (usuario) => usuario.empresa)
  usuario: Usuario[];

  @ManyToOne(() => Endereco, (endereco) => endereco.empresa, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'idendereco' })
  endereco: Endereco;
}
