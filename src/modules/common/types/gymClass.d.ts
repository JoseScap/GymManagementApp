export type GymClass = {
    id: string
    className: string
    professor: string
    total: number
    countAssistant: number
    date: string
    isCanceled: boolean
    createdAt?: string
    updatedAt?: string
}

export type GymClassField = keyof GymClass
export type GymClassFieldValue<K extends GymClassField> = GymClass[K]