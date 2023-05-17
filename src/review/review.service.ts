import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewDto } from './dto/review.dto';
import { Review } from './entities/review.entity';
import { UpdateReviewDto } from './dto/update.review.dto';
import { PaginationParamsDto } from './dto/pagination.params.dto';

@Injectable()
export class ReviewService {
    constructor(
        @Inject(PrismaService) private prismaService : PrismaService
    ) {}

    async create(reviewDto : ReviewDto) : Promise<Review> {
        return await this.prismaService.review.create({
            data : {
                rating : reviewDto.rating,
                comment : reviewDto.comment,
                user : {
                    connect : {
                        id : reviewDto.user.id,
                    }
                },
                movie : {
                    connect : {
                        id : reviewDto.movie.id
                    }
                },
            },
            include : {
                user : true,
                movie : true
            }
        });
    }

    async findOneById(id : number) : Promise<Review> {
        return await this.prismaService.review.findUnique({
            where : {
                id : id
            },
            include : {
                user : true,
                movie : true
            }
        });
    }

    async reviewsByMovie(movieId : number,paginationParamsDto : PaginationParamsDto) : Promise<Review[]> {
        const {skip, take} = paginationParamsDto;
        return await this.prismaService.review.findMany({
            skip : take *(skip-1),
            take : take,
            where : {
                movieId : movieId
            },
            include : {
                user : true,
                movie : true
            },
            orderBy : {
                movieId :'asc'
            }
        });
    }

    async updateByMovie(reviewId : number, updateReviewDto : UpdateReviewDto, userId : number ): Promise<Review> {
        const review = await this.findOneById(userId);
        if(userId === review.user.id) {
            return await this.prismaService.review.update({
                where: {
                    id : reviewId
                },
                data : {
                    rating : updateReviewDto.rating,
                    comment : updateReviewDto.comment
                },
                include : {
                    user : true,
                    movie : true
                }
            });
        }
        else{
            throw new UnauthorizedException();
        }
    }
    
    async delete(id : number) : Promise<Review> {
        return await this.prismaService.review.delete({
            where : {
                id : id
            },
            include : {
                user : true,
                movie : true
            }
        });
    }
}
