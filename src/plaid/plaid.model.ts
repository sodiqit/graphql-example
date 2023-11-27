import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PlaidLink {
  @Field()
  link: string;
}

@InputType()
export class GetPlaidLink {
  @Field()
  bankName: string;
}
