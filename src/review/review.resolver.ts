import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto/review.dto';
import { UpdateReviewDto } from './dto/update.review.dto';
import { PaginationParamsDto } from './dto/pagination.params.dto';
import { AuthService } from 'src/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';

@Resolver(()=> Review)
export class ReviewResolver {
    constructor(
        private readonly reviewService : ReviewService,
        private readonly authService : AuthService
    ) {}

    @Mutation(()=> Review, {name : 'createReview'})
    async create(@Args('reviewDto') reviewDto : ReviewDto, @Context('req')req) : Promise<Review> {
        const token = req.headers.authorization.replace('Bearer','');
        const resp = await this.authService.validateToken(token);
        if(resp.status === 200) {
            return await this.reviewService.create(reviewDto);
        }
        throw new UnauthorizedException();
    }

    @Query(()=> Review, {name : 'getReview'})
    async review(@Args('id') id : number, @Context('req')req) : Promise<Review> {
        const token = req.headers.authorization.replace('Bearer','');
        const resp = await this.authService.validateToken(token);
        if(resp.status === 200) {
            return await this.reviewService.findOneById(id);
        }
        throw new UnauthorizedException();
    }

    @Query(()=> [Review],{name : 'getReviewsByMovie'})
    async reviewsByMovie(@Args('movieId') movieId : number, 
    @Args('pagainationParamsDto') paginationParamsDto : PaginationParamsDto,
    @Context('req')req) : Promise<Review[]> {
        const token = req.headers.authorization.replace('Bearer','');
        const resp = await this.authService.validateToken(token);
        if(resp.status === 200) {
            return await this.reviewService.reviewsByMovie(movieId,paginationParamsDto);
        }
        throw new UnauthorizedException();
    }

    @Mutation(()=>Review,{name : 'deleteReview'})
    async deleteReview(@Args('id') id : number, @Context('req')req) : Promise<Review> {
        const token = req.headers.authorization.replace('Bearer','');
        const resp = await this.authService.validateToken(token);
        if(resp.status === 200) {
            return await this.reviewService.delete(id);
        }
        throw new UnauthorizedException();
    }

    @Mutation(()=>Review, {name : 'updateReview'})
    async updateReview(@Args('id') id : number, @Args('updateReviewDto') updateReviewDto : UpdateReviewDto,
    @Context('req')req) : Promise<Review> {
        const token = req.headers.authorization.replace('Bearer','');
        const resp = await this.authService.validateToken(token);
        if(resp.status === 200) {
            return await this.reviewService.updateByMovie(id,updateReviewDto,resp.userId);            
        }
        throw new UnauthorizedException();
    }
 }
