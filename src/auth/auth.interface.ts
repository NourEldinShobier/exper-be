import { Role } from '@prisma/client';

export interface JwtPayload {
  id: string,
  name: string,
  username: string,
  phone: string,
  user: Role[],
}