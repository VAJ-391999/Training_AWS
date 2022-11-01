export interface Config {
  mongoDBUrl: string;
  saltRound: number;
  tokenSecret: string;
  stripe: {
    publicKey: string;
    secretKey: string;
  };
}
