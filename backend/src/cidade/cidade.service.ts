import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cidade } from './entities/cidade.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CidadeService {
  constructor(
    @InjectRepository(Cidade)
    private readonly cidadeRepository: Repository<Cidade>,
  ) {}

  findAll(idEstado: number) {
    return this.cidadeRepository.find({
      where: {
        idEstado,
      },
    });
  }
}
