import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';
import { MovieDto } from './dto/movie.dto';
import { PaginationParamsDto } from 'src/review/dto/pagination.params.dto';
import { UpdateMovieDto } from './dto/update.movie.dto';
import { AuthService } from 'src/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';

@Resolver()
export class MovieResolver {
    constructor(
        private readonly movieService : MovieService,
        private readonly authService : AuthService
    ) {}

    @Mutation(()=>Movie,{name : 'createMovie'})
    async createMovie(@Args('movieDto') movieDto : MovieDto, @Context('req') req) : Promise<Movie> {
        const token = req.headers.authorization.replace('Bearer','');
        const resp = await this.authService.validateToken(token);
        if(resp.status === 200) {
            return await this.movieService.create(movieDto);
        }
        throw new UnauthorizedException();
    }

    @Query(()=>Movie, {name : 'getMovie'})
    async movie(@Args('id') id : number, @Context('req') req) : Promise<Movie> {
        const token = req.headers.authorization.replace('Bearer','');
        const resp = await this.authService.validateToken(token);
        if(resp.status === 200) {
            return await this.movieService.findOneById(id);
        }
        throw new UnauthorizedException();
    }

    @Query(()=>[Movie], {name : 'getMovies'})
    async movies(@Args('paginationParamsDto') paginationParamsDto : PaginationParamsDto,@Context('req') req) : Promise<Movie[]> {
        const token = req.headers.authorization.replace('Bearer','');
        const resp = await this.authService.validateToken(token);
        if(resp.status === 200) {
            return await this.movieService.findAll(paginationParamsDto);
        }
        throw new UnauthorizedException();
    }

    @Query(()=>[Movie], {name : 'searchMovie'})
    async searchMovies(@Args('search') search : string, @Args('movieName') movieName : string, 
    @Args('paginationParamsDto') paginationParamsDto :PaginationParamsDto, @Context('req') req) : Promise<Movie[]> {
        const token = req.headers.authorization.replace('Bearer','');
        const resp = await this.authService.validateToken(token);
        if(resp.status === 200) {
            return await this.movieService.search(search,movieName,paginationParamsDto);
        }
        throw new UnauthorizedException();
    }

    @Mutation(()=> Movie,{name : 'updateMovie'})
    async updateMovie(@Args('id') id : number, @Args('updateMovieDto') updateMovieDto : UpdateMovieDto, @Context('req') req) : Promise<Movie> {
        const token = req.headers.authorization.replace('Bearer','');
        const resp = await this.authService.validateToken(token);
        if(resp.status === 200) {
            return await this.movieService.update(id,updateMovieDto);
        }
        throw new UnauthorizedException();
    }

    @Mutation(()=>Movie, {name : 'deleteMovie'})
    async deleteMovie(@Args('id') id : number, @Context('req')req) : Promise<Movie> {
        const token = req.headers.authorization.replace('Bearer','');
        const resp = await this.authService.validateToken(token);
        if(resp.status === 200) {
            return await this.movieService.delete(id);
        }
        throw new UnauthorizedException();
    }
}
