import { Controller, Get, Param, Res } from '@nestjs/common';
import { isCuid } from '@paralleldrive/cuid2';
import { Response } from 'express';
import { existsSync } from 'fs';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('image/:id')
  async getImage(@Param('id') id: string, @Res() res: Response) {
    if (existsSync(`./uploads/${id}`) && isCuid(id)) {
      res.sendFile(id, { root: './uploads' });
      return;
    }
    res.status(404).send('File not found');
  }
}
