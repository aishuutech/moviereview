import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginDto {
    @Field()
    emailId : string;

    @Field()
    password : string;
}