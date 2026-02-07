export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
    }
  }
}

declare module "jsonwebtoken" {
  interface JwtPayload {
    userId?: string;
  }
}