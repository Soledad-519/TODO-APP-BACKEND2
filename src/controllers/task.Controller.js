import fs from 'fs';
import path from 'path';
import Task from '../models/task.model.js';


export const createTask = async (req,res) => {

    //verificar errores de validacion del esquema
    if(req.validationError){
        if(req.files && req.files.length > 0){
            req.files.forEach(file => {
                const filePath = path.join('public', 'uploads', 'tasks', file.filename);
                if(fs.existsSync(filePath)){
                    fs.unlinkSync(filePath)
                }
            })
        }
       return res.status(400).json({message: req.validationError}); 
    }

    //verificar errores de Multer
  if(req.fileValidationError){
        if(req.files && req.files.length > 0){
            req.files.forEach(file => {
                const filePath = path.join('public', 'uploads', 'tasks', file.filename);
                if(fs.existsSync(filePath)){
                    fs.unlinkSync(filePath)
                }
            })
        }
       return res.status(400).json({message: req.fileValidationError}); 
    }

    try {
        const {title, description, dueDate} = req.body;

        let savedFiles = [];

        if(req.files && req.files.length > 0) {
            savedFiles = req.files.map(file => ({
                name: file.originalname,
                path: `/uploads/tasks/${file.filename}`,
                size: file.size,
                mimetype: file.mimetype
            }));
        }

        const newTask = new Task({
            title,
            description,
            dueDate: dueDate || new Date(),
            user: req.user.id,
            files: savedFiles
        })

        const savedTask = await newTask.save();
        return res.status(201).json(savedTask)
        
    } catch (error) {

         if(req.files && req.files.length > 0){
            req.files.forEach(file => {
                const filePath = path.join('public', 'uploads', 'tasks', file.filename);
                if(fs.existsSync(filePath)){
                    fs.unlinkSync(filePath)
                }
            })
        }

       return res.status(400).json({message: error.message});         
    }
}