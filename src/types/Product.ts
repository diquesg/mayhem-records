/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX } from "react"

export interface ProductType {
    _id: string
    title: string
    artist: string
    description: {
        info: string,
        tracklist: {
            map(arg0: (side: any, sideIndex: any) => JSX.Element): import("react").ReactNode
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