import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import FileErrors from '../errors/file.error';

const fileType = {
  cariculum: {
    type: 'application/pdf',
    allowPath: ['class'],
  },
};

const mkdir = (directory: string) => {
  const logger = new Logger('Mkdir');
  try {
    fs.readdirSync(path.join(process.cwd(), directory));
  } catch (err) {
    logger.log(
      `지정한 경로에 ${directory}가 존재하지 않아 ${directory}를 생성합니다.`,
    );
    fs.mkdirSync(path.join(process.cwd(), directory));
  }
};

mkdir('uploads');

export const multerOptionsFactory = (): MulterOptions => {
  return {
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, path.join(process.cwd(), 'uploads'));
      },

      filename(req, file, done) {
        const id = req.params.id;
        const type = req.params.type;
        const rootPath = req.originalUrl.split('/')?.[2];
        const ext = path.extname(file.originalname);
        done(null, `${rootPath}_${id}_${type}${ext}`);
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const type = fileType[req.params.type]?.type;
      const rootPath = req.originalUrl.split('/')?.[2];
      if (req.params.id.replaceAll(' ', '') === '') {
        return cb(
          new HttpException(FileErrors.EMPTY_FILE_ID, HttpStatus.BAD_REQUEST),
          false,
        );
      }
      if (
        type === undefined ||
        !fileType[req.params.type]?.allowPath.includes(rootPath)
      ) {
        return cb(
          new HttpException(FileErrors.BAD_REQUEST, HttpStatus.BAD_REQUEST),
          false,
        );
      }
      if (file.mimetype !== type) {
        return cb(
          new HttpException(
            FileErrors.UNSUPPORTED_FILE_TYPE,
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
      cb(null, true);
    },
  };
};
