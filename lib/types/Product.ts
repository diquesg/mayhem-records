export interface ProductType {
    _id: string
    title: string
    artist: string
    description: {
        info: string,
        tracklist: {
            title: string,
            tracks: [string]
        }
    }
    price: number
    edition: string
    year: number
    img: string
    genre?: [string]
    createdAt: Date
    updatedAt: Date
}