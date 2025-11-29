import { v2 as cloudinary } from 'cloudinary'
import Course from '../models/Course.js';
import { Purchase } from '../models/Purchase.js';
import User from '../models/User.js';
import { clerkClient } from '@clerk/express'

// update role to educator
export const updateRoleToEducator = async (req, res) => {

    try {

        const userId = req.auth.userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'educator',
            },
        })

        res.json({ success: true, message: 'You can publish a course now' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Add New Course
export const addCourse = async (req, res) => {

    try {

        const { courseData } = req.body

        const imageFile = req.file

        const educatorId = req.auth.userId

        if (!imageFile) {
            return res.json({ success: false, message: 'Thumbnail Not Attached' })
        }

        const parsedCourseData = await JSON.parse(courseData)

        parsedCourseData.educator = educatorId

        const newCourse = await Course.create(parsedCourseData)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        newCourse.courseThumbnail = imageUpload.secure_url

        await newCourse.save()

        res.json({ success: true, message: 'Course Added' })

    } catch (error) {

        res.json({ success: false, message: error.message })

    }
}

// Get Educator Courses
export const getEducatorCourses = async (req, res) => {
    try {

        const educator = req.auth.userId

        const courses = await Course.find({ educator })

        res.json({ success: true, courses })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get Educator Dashboard Data ( Total Earning, Enrolled Students, No. of Courses)
export const educatorDashboardData = async (req, res) => {
    try {
        const educator = req.auth.userId;

        const courses = await Course.find({ educator });

        const totalCourses = courses.length;

        const courseIds = courses.map(course => course._id);

        // Calculate total earnings from purchases
        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: 'completed'
        });

        const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

        // Collect unique enrolled student IDs with their course titles
        const enrolledStudentsData = [];
        for (const course of courses) {
            const students = await User.find({
                _id: { $in: course.enrolledStudents }
            }, 'name imageUrl');

            students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,
                    student
                });
            });
        }

        res.json({
            success: true,
            dashboardData: {
                totalEarnings,
                enrolledStudentsData,
                totalCourses
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get Enrolled Students Data with Purchase Data
export const getEnrolledStudentsData = async (req, res) => {
    try {
        const educator = req.auth.userId;

        // Fetch all courses created by the educator
        const courses = await Course.find({ educator });

        // Get the list of course IDs
        const courseIds = courses.map(course => course._id);

        // Fetch purchases with user and course data
        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: 'completed'
        }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle');

        // enrolled students data
        const enrolledStudents = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt
        }));

        res.json({
            success: true,
            enrolledStudents
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

// Delete Course
export const deleteCourse = async (req, res) => {
    try {
        const educator = req.auth.userId;
        const { courseId } = req.params;

        // Find the course and verify ownership
        const course = await Course.findById(courseId);

        if (!course) {
            return res.json({ success: false, message: 'Course not found' });
        }

        if (course.educator.toString() !== educator) {
            return res.json({ success: false, message: 'You are not authorized to delete this course' });
        }

        // Delete thumbnail from Cloudinary if it exists
        if (course.courseThumbnail) {
            try {
                // Extract public_id from Cloudinary URL
                const urlParts = course.courseThumbnail.split('/');
                const publicIdWithExtension = urlParts[urlParts.length - 1];
                const publicId = publicIdWithExtension.split('.')[0];
                const folderPath = urlParts[urlParts.length - 2];
                const fullPublicId = folderPath ? `${folderPath}/${publicId}` : publicId;
                
                await cloudinary.uploader.destroy(fullPublicId);
            } catch (cloudinaryError) {
                console.error('Error deleting thumbnail from Cloudinary:', cloudinaryError);
                // Continue with course deletion even if thumbnail deletion fails
            }
        }

        // Remove course from enrolled students' enrolledCourses arrays
        const enrolledStudentIds = course.enrolledStudents.map(id => id.toString());
        if (enrolledStudentIds.length > 0) {
            await User.updateMany(
                { _id: { $in: enrolledStudentIds } },
                { $pull: { enrolledCourses: courseId } }
            );
        }

        // Delete related purchases
        await Purchase.deleteMany({ courseId: courseId });

        // Delete the course
        await Course.findByIdAndDelete(courseId);

        res.json({ success: true, message: 'Course deleted successfully' });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};