import {Router} from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import uploadsTasksFiles from '../helpers/multer.config.tasks.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../validators/task.validator.js';
import { createTask } from '../controllers/task.Controller.js';

const router = Router();

// Aca vienen todas las rutas del CRUD de tareas

// 1-  Create Task
router.post('/tasks', 
    authRequired,
    uploadsTasksFiles, //PRIMERO MULTER
    validateSchema(createTaskSchema), //SEGUNDO EL ESQUEMA DE VALIDACION
    createTask
)



export default router;