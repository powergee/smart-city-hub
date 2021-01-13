import jwt from "jsonwebtoken"

export default function getToken(cookies){
    try{
        const access_token = cookies.get('access_token');
        const token = jwt.decode(access_token);
        return token;
    }catch(err){
        return null;
    }
}