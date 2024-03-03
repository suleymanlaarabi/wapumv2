import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileValidator implements PipeTransform {
  transform(value: File) {
    const oneKb = 1024;
    return value.size < oneKb;
  }
}
