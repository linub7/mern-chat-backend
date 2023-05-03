import mongoose from 'mongoose';
import { config } from '@root/config';
import { redisConnection } from '@service/redis/redis.connection';

export default () => {
  const connect = async () => {
    try {
      await mongoose.connect(`${config.DATABASE_URL}`);
      console.log('DB connected.');
      redisConnection.connect();
    } catch (error) {
      console.log('Error Connecting to db', error);
      return process.exit(1);
    }
  };

  connect();

  mongoose.connection.on('disconnected', connect);
};
