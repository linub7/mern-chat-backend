import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;
  public JWT_SECRET: string | undefined;
  public NODE_ENV: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public FRONTEND_URL: string | undefined;
  public REDIS_HOST: string | undefined;
  public CLOUDINARY_NAME: string | undefined;
  public CLOUDINARY_KEY: string | undefined;
  public CLOUDINARY_SECRET: string | undefined;
  public SALT_ROUND: string | undefined;

  private readonly DEFAULT_DATABASE_URL = 'mongodb://127.0.0.1:27017/chatty';

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.JWT_SECRET = process.env.JWT_SECRET || '1234';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
    this.FRONTEND_URL = process.env.FRONTEND_URL || '';
    this.REDIS_HOST = process.env.REDIS_HOST || '';
    this.CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || '';
    this.CLOUDINARY_KEY = process.env.CLOUDINARY_KEY || '';
    this.CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET || '';
    this.SALT_ROUND = process.env.SALT_ROUND || '';
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
  }

  public cloudinaryConfig(): void {
    cloudinary.v2.config({
      cloud_name: this.CLOUDINARY_NAME,
      api_key: this.CLOUDINARY_KEY,
      api_secret: this.CLOUDINARY_SECRET
    });
  }
}

export const config: Config = new Config();
