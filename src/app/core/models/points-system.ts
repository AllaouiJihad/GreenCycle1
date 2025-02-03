import { User } from "./user";

export interface PointsSystem {
  id: number;
  user?: User;
  points: number;
  createdAt: Date;
  updatedAt?: Date;
}
