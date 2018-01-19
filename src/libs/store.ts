let Store: IStore;

interface IStore {
  get(key: string, def: any): any;
  set(key: string, value: any): void;
}

if (process.env.COMP_NODE) {
  Store = {
    get(): any {
      return ''
    },
    set(): void {
    }
  }
} else {
  Store = {
    get(key: string, def: any = null) {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }

      return def;
    },
    set(key: string, value: any) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}

export { Store };
