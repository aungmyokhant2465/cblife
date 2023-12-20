class Token {
  #token = null;
  #role = null;

  constructor(token) {
    this.#token = token;
  }

  get token() {
    return this.#token;
  }

  get role() {
    return this.#role;
  }
}

export let instanceToken = "start";

export const initToken = (token, role) => {
  instanceToken = new Token(token, role);
};

// export const BACKEND_URL = "http://localhost:3001";
export const BACKEND_URL = "http://cblife.axra.app/dashboard";
