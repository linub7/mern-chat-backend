import { BaseCache } from '@service/redis/base.cache';

class RedisConnection extends BaseCache {
  constructor() {
    super('redisConnection');
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
    } catch (error) {
      console.log(error);
    }
  }
}

export const redisConnection: RedisConnection = new RedisConnection();
