export class Upload {
  constructor(
    public file_name: string,
    public file: Blob,
    public upload_time: Date
  ) {}
}
