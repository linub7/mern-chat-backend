import { userService } from '@service/db/user.service';
import { DoneCallback, Job } from 'bull';

class UserWorker {
  async addUserToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const {
        data: { value }
      } = job;
      await userService.addUserData(value);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      console.log(error);
      done(error as Error);
    }
  }
}

export const userWorker: UserWorker = new UserWorker();
