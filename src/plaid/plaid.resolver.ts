import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { GetPlaidLink, PlaidLink } from './plaid.model';
import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

export const PLAID_LINK_CREATED = 'plaidLinkCreated';

const asyncTask = (name: string) => {
  setTimeout(() => {
    pubSub.publish(PLAID_LINK_CREATED, {
      plaidLinkCreated: { link: `link/${name}` },
    }); //pubSub вроде как может подключиться к брокеру сообщений, в теории можно будет в микросервисе использовать pubSub и это сразу будет пролетать в сокет
    //тогда по идее не надо будет держать отдельно handler для очереди, и websocket сервер
  }, 2000);
};

@Resolver()
export class PlaidResolver {
  constructor() {}

  @Mutation(() => Boolean)
  async getPlaidLink(@Args('getPlaidLinkData') getPlaidLinkData: GetPlaidLink) {
    asyncTask(getPlaidLinkData.bankName); //set task in mq
    return true;
  }

  @Subscription(() => PlaidLink)
  plaidLinkCreated() {
    return pubSub.asyncIterator(PLAID_LINK_CREATED);
  }
}

@Module({ providers: [PlaidResolver] })
export class PlaidModule {}
