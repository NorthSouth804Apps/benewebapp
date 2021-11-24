export class Params {
    private params: string[][];
  
    constructor() {
      this.params = [];
    }
  
    public append(key: string, value: string): void {
      this.params.push([`params[${key}]`, value]);
    }
  
    public createString(): string {
      let str = '';
  
      this.params.forEach((param, index) => {
        str += param[0] + '=' + param[1];
  
        if (index + 1 != this.params.length) {
          str += '&';
        }
      });
  
      return str;
    }
  }