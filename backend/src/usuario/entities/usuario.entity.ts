import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Evento } from 'src/evento/entities/evento.entity';
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
  PARTICIPANTE = 'P',
}

@Entity({ name: 'usuario' })
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'idusuario' })
  idUsuario: number;

  @Column({ name: 'idempresa', nullable: true })
  idEmpresa: number;

  @Column({
    type: 'enum',
    enum: Tipo,
    name: 'tipo',
    default: Tipo.ADMINISTRADOR,
  })
  tipo: Tipo;

  @Column({ name: 'nome', length: 100, default: '' })
  nome: string;

  @Column({ name: 'email', length: 60, unique: true })
  email: string;

  @Column({ name: 'senha', length: 256, nullable: true })
  senha: string;

  @Column({ name: 'telefone', length: 14, default: '' })
  telefone: string;

  @Column({ name: 'foto', nullable: true })
  foto: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.usuario)
  @JoinColumn({ name: 'idempresa' })
  empresa: Empresa;

  @OneToMany(() => Evento, (evento) => evento.empresa)
  evento: Evento[];
}
