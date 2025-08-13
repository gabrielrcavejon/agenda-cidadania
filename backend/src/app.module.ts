import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaisModule } from './pais/pais.module';
import { EstadoModule } from './estado/estado.module';

@Module({
  imports: [PaisModule, EstadoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
