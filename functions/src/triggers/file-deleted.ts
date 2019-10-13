import {Storage} from '@google-cloud/storage';
import * as functions from 'firebase-functions';
import {basename, dirname, join} from 'path';
import {unpackGenerateImageString} from '../utils/unpack-generate-image-string';

export const fileDeleted = functions.storage
  .object()
  .onDelete(async (data: any) => {
    const fileName = basename(data.name);
    const dirName = dirname(data.name);
    /**
     * Delete thumbnails for an image
     * Skip if the file is already a thumb
     */
    if (
      data.contentType.startsWith('image/') &&
      data.contentType !== 'image/webp' &&
      !data.metadata['generate_1'] &&
      (data.metadata.skipDelete ? data.metadata.skipDelete !== 'true' : true)
    ) {
      const storage = new Storage().bucket(data.bucket);
      const lookUpName = (entry?: string) =>
        join(dirName, (entry || '') + fileName);
      const webpLookUp = (entry?: string) =>
        lookUpName(entry).replace(/(.jpg|.png|.jpeg)/, '.webp');

      for (const key in data.metadata) {
        if (key.includes('generate_')) {
          const {filePrefix, webpVersion} = unpackGenerateImageString(
            data.metadata[key]
          );

          try {
            await storage.file(lookUpName(filePrefix)).delete();
          } catch (e) {}

          if (webpVersion) {
            try {
              await storage.file(webpLookUp(filePrefix)).delete();
            } catch (e) {}
          }
        }
      }
    }
  });
