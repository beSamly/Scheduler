import { Stan } from 'node-nats-streaming';

interface Event {
  subject: any;
  data: any;
}

export class WorkerCreatedPublisher {

  private client: Stan;
  private subject: string;

  constructor(client: Stan) {
    this.client = client;
    this.subject = "worker:created"
  }

  publish(data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }
        console.log('Event published to subject', this.subject);
        resolve();
      });
    });
  }
}
