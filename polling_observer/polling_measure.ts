export class PollingMeasure {
  public readonly entryType: string = 'polling-measure';

  constructor(
    public readonly name: string,
    public readonly duration: number,
    public readonly startTime: number
  ) {}

  public toJSON() {
    return {
      duration: this.duration,
      entryType: this.entryType,
      name: this.name,
      startTime: this.startTime,
    };
  }

}
