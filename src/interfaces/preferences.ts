export type IPreference = {
  id: number;
  time_day: string;
  subject: string;
  people: string;
  contact_type: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: number;
}
