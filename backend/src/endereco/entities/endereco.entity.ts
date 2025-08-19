import { Cidade } from 'src/cidade/entities/cidade.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'endereco' })
export class Endereco {
  @PrimaryGeneratedColumn({ name: 'idendereco' })
  idEndereco: number;

  @Column({ name: 'idcidade' })
  idCidade: number;

  @Column({ name: 'logradouro', length: 60 })
  logradouro: string;

  @Column({ name: 'bairro', length: 60 })
  bairro: string;

  @Column({ name: 'cep', length: 8 })
  cep: string;

  @Column({ name: 'numero', length: 10 })
  numero: string;

  @ManyToOne(() => Cidade, (cidade) => cidade.endereco)
  @JoinColumn({ name: 'idcidade' })
  cidade: Cidade;

  @OneToMany(() => Empresa, (empresa) => empresa.endereco)
  empresa: Empresa[];
}
