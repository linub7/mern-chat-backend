import { Job, DoneCallback } from 'bull';
import { authService } from '@service/db/auth.service';

class AuthWorker {
  async addAuthUserToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const {
        data: { value }
      } = job;

      await authService.createAuthUser(value);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      console.log(error);
      done(error as Error);
    }
  }
}

export const authWorker: AuthWorker = new AuthWorker();
