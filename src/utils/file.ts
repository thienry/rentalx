import fs from 'fs'

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename)
  } catch (err) {
    console.error(err)
  }

  await fs.promises.unlink(filename)
}
