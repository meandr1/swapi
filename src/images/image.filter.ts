import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { FILE_TYPES, MAX_FILES_SIZE } from 'src/common/constants';
import { ExtendedRequest } from 'src/common/request.interface';

export const imageFilterOptions: MulterOptions = {
  limits: { fileSize: MAX_FILES_SIZE },
  fileFilter: (req: ExtendedRequest, file, callback) => {
    if (FILE_TYPES.includes(file.mimetype)) return callback(null, true);
    req.fileValidationError = 'UNSUPPORTED_FILE_TYPE';
    callback(null, false);
  }
};
