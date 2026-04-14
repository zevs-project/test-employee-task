import { Storage } from 'aws-amplify'

export function useStorage() {
  async function getImage(imageName: string) {
    return Storage.get(imageName)
  }

  async function removeImage(imageName: string) {
    return Storage.remove(imageName)
  }

  async function saveImage(fileName: string, file: File, options: Record<string, string>) {
    return Storage.put(fileName, file, options)
  }
  return {
    getImage,
    removeImage,
    saveImage
  }
}
