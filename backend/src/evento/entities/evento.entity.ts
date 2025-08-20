import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Endereco } from 'src/endereco/entities/endereco.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'evento' })
export class Evento {
  @PrimaryGeneratedColumn({ name: 'idevento' })
  idEvento: number;

  @Column({ name: 'idempresa' })
  idEmpresa: number;

  @Column({ name: 'idendereco' })
  idEndereco: number;

  @Column({ name: 'idusuariocriacao' })
  idUsuarioCriacao: number;

  @Column({ name: 'nome', length: 60 })
  nome: string;

  @Column({ name: 'descricao', length: 60 })
  descricao: string;

  @Column({ type: 'timestamptz' }) // PostgreSQL: timestamp with time zone
  dataHoraInicio: Date;

  @Column({ type: 'timestamptz' }) // PostgreSQL: timestamp with time zone
  dataHoraFim: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.evento)
  @JoinColumn({ name: 'idusuariocriacao' })
  usuario: Usuario;

  @ManyToOne(() => Empresa, (empresa) => empresa.evento)
  @JoinColumn({ name: 'idempresa' })
  empresa: Empresa;

  @ManyToOne(() => Endereco, (endereco) => endereco.evento, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'idendereco' })
  endereco: Endereco;
}
