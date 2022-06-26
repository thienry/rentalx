import fs from 'fs'
import path from 'path'
import mime from 'mime'
import { S3 } from 'aws-sdk'

import upload from '@config/upload'
import { IStorageProvider } from '@shared/providers/interfaces/IStorageProvider'

class S3StorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    })
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = path.resolve(upload.tmpFolder, file)
    const fileContent = await fs.promises.readFile(originalName)
    const contentType = mime.getType(originalName)

    await this.client
      .putObject({
        Key: file,
        Body: fileContent,
        ACL: 'public-read',
        ContentType: contentType,
        Bucket: `${process.env.AWS_BUCKET_NAME}/${folder}`,
      })
      .promise()

    await fs.promises.unlink(originalName)

    return file
  }

  async delete(file: string, folder: string): Promise<void> {
    console.log(file)
    await this.client
      .deleteObject({ Key: file, Bucket: `${process.env.AWS_BUCKET_NAME}/${folder}` })
      .promise()
  }
}

export { S3StorageProvider }
