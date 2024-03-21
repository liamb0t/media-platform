export default function useAssets(asset) {
    const assets = import.meta.glob('/assets/media/**/*', {eager: true})

    const getAllFiles = () => {
        const files = []
        for (const path in assets) {
            files.push(path)
        }
        return files
    }

  return getAllFiles()

}