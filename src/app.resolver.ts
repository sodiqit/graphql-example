import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor() {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
