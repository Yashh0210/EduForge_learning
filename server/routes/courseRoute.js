import express from 'express'
import { getAllCourse, getCourseId } from '../controllers/courseController.js';


const courseRouter = express.Router()

// Get All Course
courseRouter.get('/all', getAllCourse)

// Get Course Data By Id (clerkMiddleware is applied globally, so req.auth is available if user is authenticated)
courseRouter.get('/:id', getCourseId)


export default courseRouter;