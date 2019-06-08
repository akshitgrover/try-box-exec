import { ExecEmitter } from 'box-exec';

class Queue<T extends ExecEmitter> {
  private running = 0;
  private tasks:T[] = [];

  constructor(readonly limit: number = 1) {};

  push (task: T): void {
    if (this.running < this.limit) {
      this.running++;
      task.execute();
      return;
    }
    this.tasks.push(task);
  }

  next () {
    this.running--;
    if (this.tasks.length != 0) {
      this.tasks[0].execute();
      this.tasks.splice(0, 1);
    }
  }
}

const queue: Queue<ExecEmitter> = new Queue<ExecEmitter>();

export default queue;
