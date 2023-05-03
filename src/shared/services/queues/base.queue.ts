import Queue, { Job } from 'bull';
import { BullAdapter, ExpressAdapter, createBullBoard } from '@bull-board/express';
import { config } from '@root/config';
import { IAuthJob } from '@auth/interfaces/auth.interface';

type IBaseJobData = IAuthJob;

let bullAdapters: BullAdapter[] = [];

export let serverAdapter: ExpressAdapter;

export abstract class BaseQueue {
  queue: Queue.Queue;

  constructor(queueName: string) {
    this.queue = new Queue(queueName, `${config.REDIS_HOST}`);
    bullAdapters.push(new BullAdapter(this.queue));
    bullAdapters = [...new Set(bullAdapters)];
    serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/queues');

    createBullBoard({
      queues: bullAdapters,
      serverAdapter
    });

    this.queue.on('completed', (job: Job) => {
      job.remove();
    });

    this.queue.on('global:completed', (jobId: string) => {
      console.log(`Job ${jobId} completed.`);
    });

    this.queue.on('global:stalled', (jobId: string) => {
      console.log(`Job ${jobId} is stalled.`);
    });
  }

  protected addJob(name: string, data: IBaseJobData): void {
    this.queue.add(name, data, { attempts: 3, backoff: { type: 'fixed', delay: 5000 } }); // 3 attempts -> if attempt fail -> wait 5 seconds and repeat
  }

  protected processJob(name: string, concurrency: number, callback: Queue.ProcessCallbackFunction<void>): void {
    this.queue.process(name, concurrency, callback); // concurrency: means is like how many jobs do we want to be processed at a given time
  }
}
