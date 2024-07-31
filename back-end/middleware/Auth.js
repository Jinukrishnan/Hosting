import pkg from 'jsonwebtoken'
const {verify}=pkg
export default async function Auth(req,res,next){
   
   try {
      console.log("hai");
console.log(req.headers.authorization);
    const key=req.headers.authorization;
    console.log(key);
    const token=key.split(" ")[1]
    console.log(token);
    const auth=await verify(token,process.env.JWT_KEY)
    console.log(auth);
    req.user=auth.username;
    next()
   } catch (error) {
    return res.status(401).send("Some error occured");
   }
}