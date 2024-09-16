import { Movie } from "../../../entity/movie";
import { MovieFranchise } from "../../../entity/movie-franchise";

export interface MovieDetailsDto {
    movie: Movie
    franchise: MovieFranchise
}