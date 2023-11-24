import { Controller, Get, HttpStatus, Request, Res } from '@nestjs/common';
import { TransformDataService } from './transform-data.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
} from '@nestjs/swagger';

@Controller('transformData')
export class TransformDataController {
  constructor(private readonly transformDataService: TransformDataService) {}

  @Get('/')
  // Swagger
  @ApiOperation({
    summary: 'Transform data',
    description: 'Transform data from data.json to data.csv',
  })
  @ApiOkResponse({ description: 'Newly created data.csv' })
  @ApiServiceUnavailableResponse({
    description: "Can't read data.json / Error while processing data",
  })
  async transformFata(@Request() req, @Res() res) {
    res
      .status(HttpStatus.OK)
      .send(await this.transformDataService.transform('data.json'));
  }
}
