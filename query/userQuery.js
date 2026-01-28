export const GET_ALL_USER='select * from users';
export const EXSISTING_USER=`select * from users where email=?`;
export const ADD_USER=`insert into users(name,email,password,role)
values(?,?,?,?)`;