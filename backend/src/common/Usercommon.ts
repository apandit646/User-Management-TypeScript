import { Optional } from 'sequelize';

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  phoneNo: string;
  type: 'employee' | 'manager';
  role: 'backend developer' | 'frontend developer' | 'uiux develper' | 'developer';
  password: string;
}
type UserCreationAttributes = Optional<UserAttributes, 'id'>;
export type { UserAttributes, UserCreationAttributes };