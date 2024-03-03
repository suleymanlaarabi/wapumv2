import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as sharp from 'sharp';
@Injectable()
export class FileService {
  async compressAndSaveImage(
    image: Express.Multer.File,
    id: string,
  ): Promise<void> {
    return new Promise(async (resolve) => {
      const compressedImage = sharp(image.buffer);
      fs.writeFile(
        `./uploads/${id}`,
        await compressedImage.webp({ quality: 80 }).toBuffer(),
        (err) => {
          if (err) {
            throw new Error('Error saving file');
          }
          resolve();
        },
      );
    });
  }

  async deleteFile(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.unlink(`./uploads/${id}`, (err) => {
        if (err) {
          reject();
        }
        resolve();
      });
    });
  }

  async getUploadedFile(id: string): Promise<Buffer> {
    return new Promise((resolve) => {
      fs.readFile(`./uploads/${id}`, (err, data) => {
        if (err) {
          throw new Error('Error getting file');
        }

        resolve(data);
      });
    });
  }
}
