import { Test, TestingModule } from '@nestjs/testing';
import { ReservationTimeController } from './reservation-time.controller';

describe('ReservationTimeController', () => {
  let controller: ReservationTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationTimeController],
    }).compile();

    controller = module.get<ReservationTimeController>(ReservationTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
