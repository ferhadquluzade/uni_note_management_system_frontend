export interface Note {
    id: number,
    title: string
    description?: string
    cover_image?: string
}

export interface NoteCreate {
    title: string
    description?: string
    cover_image?: File
}