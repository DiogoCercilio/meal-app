class BadRequestException extends Error {  
    constructor(public message: string) {
      super(message);
      this.name = "BadRequest";
      (this as any).status = 400;
      this.stack = (<any> new Error()).stack;
    } 
}
  
export default BadRequestException;