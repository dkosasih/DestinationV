export const createSpyObj = (baseName: string, methodNames: string | Array<string>): { [key: string]: any } => {
  let obj: any = {};

  for (let i = 0; i < methodNames.length; i++) {
      obj[methodNames[i]] = jest.fn();
  }

  return obj;
};
