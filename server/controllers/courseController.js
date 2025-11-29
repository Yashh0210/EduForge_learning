import Course from "../models/Course.js"


// Get All Courses
export const getAllCourse = async (req, res) => {
    try {

        const courses = await Course.find({ isPublished: true })
            .select(['-courseContent', '-enrolledStudents'])
            .populate({ path: 'educator', select: '-password' })

        res.json({ success: true, courses })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Get Course by Id
export const getCourseId = async (req, res) => {

    const { id } = req.params
    const userId = req.auth?.userId // Get userId if authenticated (optional)

    try {

        const courseData = await Course.findById(id)
            .populate({ path: 'educator'})

        // Check if the requesting user is the course educator
        const isCourseOwner = userId && courseData.educator._id.toString() === userId.toString()

        // Remove lectureUrl if isPreviewFree is false, UNLESS user is the course owner
        if (!isCourseOwner) {
            courseData.courseContent.forEach(chapter => {
                chapter.chapterContent.forEach(lecture => {
                    if (!lecture.isPreviewFree) {
                        lecture.lectureUrl = "";
                    }
                });
            });
        }

        res.json({ success: true, courseData })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

} 