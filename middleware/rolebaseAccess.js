export const rolebaseAccess=(...allowedRole)=>{
    return (req,resp,next)=>{
        if(!req.user || !req.user.role){
            return resp.status(401).json({
                statusCode:401,
                message:"Unauthorized"
            })
        }
        if(!allowedRole.includes(req.user.role)){
            return resp.status(409).json({
                statusCode:409,
                message:"Access Denied"
            })
        }
        next();
    }
}