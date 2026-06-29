import type { ProfileValues } from "../constants/profile";

export class User {
  constructor(
    public profile: ProfileValues,
    public endDate: Date,
  ) {}
}
