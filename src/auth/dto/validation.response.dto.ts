import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ValidationResponse {
    @Field()
    status : number;
    
    @Field()
    userId : number;

    @Field()
    emailId : string;

    @Field()
    error : string;
}
