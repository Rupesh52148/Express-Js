import express from 'express';
const app=express();
const port=3000;

app.use(express.json())
let userData=[]
let nextId=1
//Add new User
app.post("/users",(req,res)=>{
    const {name,email}=req.body
    const newUser={id:nextId++,name,email}
   userData.push(newUser)
   res.status(200).send(newUser)
})
//get all User 
app.get("/users",(req,res)=>{
    res.status(200).send(userData);
})

//get user with id
app.get("/users/:id",(req,res)=>{
    const user=userData.find(u=>u.id===parseInt(req.params.id))
    if(!user) {
        res.status(404).send("user not found")
    }
    res.status(200).send(user);
})

//Update the user data
app.put("/users/:id",(req,res)=>{
    const user=userData.find(u=>u.id===parseInt(req.params.id))
    if(user==-1){
        res.status(404).send("user not found")
    }
    const {name,email}=req.body
    user.name=name;
    user.email=email
    res.status(200).send(user)
})

//Delete the user
 app.delete("/users/:id",(req,res)=>{
    const index= userData.findIndex(u=>u.id===parseInt(req.params.id))
    if(index==-1){
        res.status(404).send("user not found")
    }
    userData.splice(index,1)
    res.status(204).send("user deleted")
 })

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})