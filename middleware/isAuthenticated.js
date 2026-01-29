import jwt from 'jsonwebtoken';
import { SECRATE_KEY } from '../util/config.js';
export const isAuthenticated=async(req,resp,next)=>{
    const token=req.cookies.token;
    if(!token){
        return resp.status(401).json({
            statusCode:401,
            message:"UnAuthorized"
        });        
    }
    try {
        const decode=jwt.verify(token,SECRATE_KEY);
        const id=decode.id;
        const role=decode.role;
        req.user={
            id,role
        }
        next();
    } catch (error) {
        return resp.status(401).json({
            statusCode:401,
            message:"TOKEN_EXPIRED"
        })
    }

}