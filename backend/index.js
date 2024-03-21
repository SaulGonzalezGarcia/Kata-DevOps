const express = require('express')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();
const app = express();

//json
app.use(express.json());

//cors
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
});

//test-api
app.get('/test', (req,res)=>{
    try{
        res.status(200).json({message: 'Conectado a la API'})
    } catch (error){
        res.status(500).json({message: 'Error en el servidor'})

}):

//Get all users
app.get('/users', async (req,res) => {
    try{
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:'No se pudo obtener los usuarios'} );
    }
    }
);

//Get user by id
app.get('/user/:id', async (req,res)=> {
    try{
        cosnt user = await prisma.user.findUnique({
            where {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message:"Usuario no encontrado"});
    }});


    //create user
app.post( '/users', async (req,res) => {
    try{
        const user = await prisma.user.create({
            data:{
                name: req.body.name,
                email: req.body.email
            },
        });
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({message: error.message});

    }});


    //update user
app.put('/users/id', async (req, res) =>{
    try{
        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                name: req.body.name,
                email: req.body.email
            },
        });
        res.status(200).json(user);
    } catch(error){
        res.status(500).json({message:error.message})
}});

//delete user
app.delete("/users/:id", async (req,res)=>{
    try{
        const user = await prisma.user.delete({
            where:{
                id: Number(req.params.id),
            },
        }),
            res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: error.message});
    }});