export const saltRounds = 10;

export const OBJECT_ID = /^[0-9a-fA-F]{24}$/;

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const BASE64_REGEX = /^data:image\/(jpeg|jpg|png);base64,/;

export const GENRE = ['Fiction', 'Non-Fiction', 'Drama', 'Poetry'];

export const USER_STATUS = { ACTIVE: 'Active', INACTIVE: 'Inactive'};