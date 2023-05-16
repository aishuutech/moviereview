import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieDto } from './dto/movie.dto';
import { Movie } from './entities/movie.entity';
import { UpdateMovieDto } from './dto/update.movie.dto';
import { PaginationParamsDto } from 'src/review/dto/pagination.params.dto';

@Injectable()
export class MovieService {
    constructor(
        @Inject(PrismaService) private prismaService : PrismaService
    ) {}

    async create(movieDto : MovieDto) : Promise<Movie> {
        return await this.prismaService.movie.create({
            data : {
                movieName : movieDto.movieName,
                description : movieDto.description,
                directorName : movieDto.directorName,
                releaseDate : movieDto.releaseDate,
            }
        });
    }

    async findOneById(id : number) : Promise<Movie> {
        return await this.prismaService.movie.findUnique({
            where : {
                id : id
            }
        });
    }

    async findAll(pagainationParamsDto : PaginationParamsDto) : Promise<Movie[]> {
        const {skip, take} = pagainationParamsDto;
        return await this.prismaService.movie.findMany({
            skip : skip*(take-1),
            take : take
        });
    }

    async update(id : number, updateMovieDto : UpdateMovieDto) : Promise<Movie> {
        return await this.prismaService.movie.update({
            where : {
                id : id
            },
            data : {
                movieName : updateMovieDto.movieName,
                description : updateMovieDto.description,
                directorName : updateMovieDto.directorName,
                releaseDate : updateMovieDto.releaseDate
            }
        });
    }

    async delete(id : number) : Promise<Movie> {
        return await this.prismaService.movie.delete({
            where : {
                id : id
            }
        });
    }

    async search(keyword : string,movieName : string, paginationParamsDto : PaginationParamsDto) : Promise<Movie[]> {
        const {skip,take} = paginationParamsDto;
        return await this.prismaService.movie.findMany({
            skip : skip * (take-1),
            take : take,
            where : {
                OR:{
                    movieName : {
                        contains : movieName
                    },
                    description : {
                        contains : keyword
                    }
                },
            },
            orderBy : {
                movieName : 'asc',
                releaseDate : 'desc'
            }
        });
    }
}           