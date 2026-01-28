import { pool } from "../conn/db.js";
import { ADD_USER, EXSISTING_USER, GET_ALL_USER } from "../query/userQuery.js";
import bcrypt from 'bcrypt';
export const getAllUsers=async(req,resp)=>{
    let conn;
    try {
        conn=await pool.getConnection();
        const rows=await conn.query(GET_ALL_USER);
        return resp.json(rows);
    } catch (error) {
        return resp.json(error);
    }
    finally{
        conn.release();
    }
}
export const registerUser=async(req,resp)=>{
    let conn;
    try {
        const {name,email,password,role}=req.body;
        if(!name || !email || !password || !role){
            return resp.status(400).json({
                statusCode:400,
                message:"Field cannot be empty"
            })
        }
        conn=await pool.getConnection();
        const exsistingUser=await conn.query(EXSISTING_USER,[email]);
        if(exsistingUser.length > 0){
            return resp.status(400).json({
                statusCode:400,
                message:"User already registered please login"
            })
        }
        const hashPass=await bcrypt.hash(password,10);
        const result=await conn.query(ADD_USER,[name,email,hashPass,role]);
        return resp.status(201).json({
            statusCode:201,
            message:'User Registered Successfully!!',
            id:result.insertId.toString()
        })
    } catch (error) {
       return resp.status(500).json({
        statusCode:500,
        error
       }); 
    }
    finally{
        if(conn)conn.release();
    }
}
export const loginUser=async(req,resp)=>{
    let conn;
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return resp.status(400).json({
                statusCode:400,
                message:"Feild cannot be empty"
            })
        }
        conn=await pool.getConnection();
        const user=await conn.query(EXSISTING_USER,[email]);
        if(user.length===0){
            return resp.status(400).json({
                statusCode:400,
                message:"User not registered"
            })
        }
        const isMatch=await bcrypt.compare(password,user[0].password);
        if(!isMatch){
            return resp.status(400).json({
                statusCode:400,
                message:"Ivalid Creadential!!"
            })
        }
        return resp.status(200).json({
            statusCode:200,
            message:"Login success",
            id:user[0].id.toString(),
            name:user[0].name
        });

    } catch (error) {
        return resp.status(500).json({
            statusCode:500,
            message:"INTERNAL_SERVER_ERROR"
        })
    }
    finally{
        if(conn)conn.release();
    }
}