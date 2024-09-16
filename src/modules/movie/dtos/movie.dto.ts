// For requests (create, update, etc), what's sent from the client
export interface MovieRequestDto {
  id?: string
  title: string
  typeId: string
  description?: string
  position?: number
  releaseDate?: Date
  groupName?: string
  author?: string
  producer?: string
  logoUrl?: string
  coverUrl?: string
  // franchise?: object
  franchise?: string
}

// For responses, to send back to client
export interface MovieDto {
  id: string
  title: string
  typeId: string | object
  description?: string
  position?: number
  releaseDate?: Date
  groupName?: string
  author?: string
  producer?: string
  logoUrl?: string
  coverUrl?: string
  franchise?: string | object
  franchiseId?: string
}