import { Movie } from "../../../entity/movie";

export interface PatchMovieDto {
  key: keyof Movie
  value: string
}