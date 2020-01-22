interface Store {
  get(key: string, def: any): any;
  set(key: string, value: any): void;
}

let Store: Store;

if (process.env.COMP_NODE) {
  Store = {
    get() {
      return '';
    },
    set() {
      /* do nothing */
    },
  };
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
    },
  };
}

export { Store };
