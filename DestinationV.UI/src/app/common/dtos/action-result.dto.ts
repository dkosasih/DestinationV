export class ActionResult<P> {
  payload?: P;
  actionMessages: string[];
  isSuccess: boolean;
  is500Error: boolean;

  constructor(actionMessage: any, isSuccess: boolean, is500Error: boolean, payload?: P) {
      // make it array if it's not array
      if (actionMessage != null && actionMessage.length) {
          this.actionMessages = [...actionMessage];
      } else {
          this.actionMessages = [actionMessage];
      }

      this.payload = payload;
      this.isSuccess = isSuccess;
      this.is500Error = is500Error;
  }
}
