import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ChangePasswordDto {
    @Field(()=> String)
    oldPassword : string;

    @Field(()=> String)
    newPassword : string;

    @Field(()=> String)
    confirmPassword : string;
}