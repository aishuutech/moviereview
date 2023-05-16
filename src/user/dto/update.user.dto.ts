import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { UserDto } from "./user.dto";

@InputType()
export class UpdateUserDto extends PartialType(UserDto) {
    @Field(() => Int, {nullable : true})
    id: number;
}