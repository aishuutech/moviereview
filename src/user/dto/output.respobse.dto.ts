import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class OutputResponse {
    @Field(()=> String)
    output : string;
}