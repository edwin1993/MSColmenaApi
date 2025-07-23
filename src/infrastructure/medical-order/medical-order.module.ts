import { Module } from '@nestjs/common';
import { MedicalOrderController } from '../../interface/medical-order/medical-order.controller';
import { MedicalOrderService } from '../../application/medical-order/medical-order.service';
import { PrismaMedicalOrderRepository } from './prisma-medical-order.repository';

@Module({
  controllers: [MedicalOrderController],
  providers: [
    MedicalOrderService,
    {
      provide: 'MedicalOrderRepository',
      useClass: PrismaMedicalOrderRepository,
    },
  ],
  exports: [MedicalOrderService],
})
export class MedicalOrderModule {} 