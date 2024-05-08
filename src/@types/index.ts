interface UserStateInfo {
  id: string;
  username: string;
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
