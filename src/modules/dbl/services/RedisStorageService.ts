// Core
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

// Utils
import { Redis } from 'ioredis';

@Injectable()
export class RedisStorageService {
  private client: Redis;
  private readonly logger = new Logger(RedisStorageService.name);

  constructor(private readonly redisService: RedisService) {}

  async getClient(): Promise<Redis> {
    this.client = await this.redisService.getClient();
    return this.client;
  }

  async hset(redisKey: string, key: string, value: string, expires) {
    if (!this.client) {
      await this.getClient();
    }
    this.logger.log(
      `REDIS save\n redisKey: ${redisKey}\n key: ${key}\n val: ${value}\n exp: ${expires}\n `,
    );

    return new Promise((resolve, reject) => {
      this.client.hset(redisKey, key, value, (error, result) => {
        if (error) {
          reject(error);
        } else {
          this.client.expire(key, expires);
          resolve(result);
        }
      });
    });
  }

  async get(redisKey: string, key: string): Promise<string> {
    this.logger.log(`REDIS get\n redisKey: ${redisKey}\n key: ${key}\n `);
    if (!this.client) {
      await this.getClient();
    }
    const result = await this.client.hget(redisKey, key);
    return result;
  }

  async remove(redisKey: string, key: string): Promise<boolean> {
    this.logger.log(`REDIS remove\n redisKey: ${redisKey}\n key: ${key}\n `);
    await this.client.hdel(redisKey, key);

    return true;
  }
}
