import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { UploadCarImagesUseCase } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesUseCase'

interface IFiles {
  filename: string
}

class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const images = req.files as IFiles[]
    const filenames = images.map((file) => file.filename)

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase)
    await uploadCarImageUseCase.execute({ car_id: req.params.id, images_name: filenames })

    return res.status(201).json({ message: 'Uploaded!' })
  }
}

export default Object.freeze(new UploadCarImagesController())
