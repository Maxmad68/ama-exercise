import { TransformDataService } from './transform-data.service';
import * as fs from 'fs';
import { ServiceUnavailableException } from '@nestjs/common';

jest.mock('fs');

describe('TransformDataService', () => {
  let service: TransformDataService;

  beforeEach(() => {
    service = new TransformDataService();
  });

  it('should transform data', async () => {
    const mockData = [
      {
        name: 'arthur',
        date: '01/1899',
        day: 11,
      },
      {
        name: 'arthur',
        date: '01/1999',
        day: 2,
      },
      {
        name: 'Joel',
        date: '01/1999',
        day: 12,
      },
    ];
    const expectedResult = [
      {
        name: 'arthur',
        values: ['1899-01-11', '1999-01-02'],
      },
      {
        name: 'Joel',
        values: ['1999-01-12'],
      },
    ];

    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockData));

    const result = await service.transform('dummyPath');
    expect(result).toEqual(expectedResult);
  });

  it('should throw error if file does not exist', async () => {
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error();
    });

    expect(service.transform('dummyPath')).rejects.toThrowError(
      new ServiceUnavailableException('Error while reading file'),
    );
  });

  it("should throw error if json doesn't respect format", async () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue('[{"name": "arthur"}]');

    expect(service.transform('dummyPath')).rejects.toThrowError(
      new ServiceUnavailableException('Error while parsing file'),
    );
  });
});
