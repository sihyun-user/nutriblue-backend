interface UserStateInfo {
  id: string;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user: UserStateInfo | null;
    }
  }
}

export {};
