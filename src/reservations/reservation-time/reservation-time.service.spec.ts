import { Test, TestingModule } from '@nestjs/testing';
import { ReservationTimeService } from './reservation-time.service';

describe('ReservationTimeService', () => {
  let service: ReservationTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationTimeService],
    }).compile();

    service = module.get<ReservationTimeService>(ReservationTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
