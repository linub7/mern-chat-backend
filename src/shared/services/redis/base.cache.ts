import { createClient } from 'redis';
import { config } from '@root/config';

export type RedisClient = ReturnType<typeof createClient>;

export abstract class BaseCache {
  client: RedisClient;

  constructor(cacheName: string) {
    this.client = createClient({ url: config.REDIS_HOST });
    this.cacheError(cacheName);
  }

  private cacheError(cacheName: string): void {
    this.client.on('error', (error: unknown) => {
      console.log(error, cacheName);
    });
  }
}
