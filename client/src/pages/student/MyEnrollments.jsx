import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { Line } from 'rc-progress';
import Footer from '../../components/student/Footer';
import { Link } from 'react-router-dom';

const MyEnrollments = () => {

    const { userData, enrolledCourses, fetchUserEnrolledCourses, navigate, backendUrl, getToken, calculateCourseDuration, calculateNoOfLectures } = useContext(AppContext)

    const [progressArray, setProgressData] = useState([])

    const getCourseProgress = async () => {
        try {
            const token = await getToken();

            // Use Promise.all to handle multiple async operations
            const tempProgressArray = await Promise.all(
                enrolledCourses.map(async (course) => {
                    const { data } = await axios.post(
                        `${backendUrl}/api/user/get-course-progress`,
                        { courseId: course._id },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    // Calculate total lectures
                    let totalLectures = calculateNoOfLectures(course);

                    const lectureCompleted = data.progressData ? data.progressData.lectureCompleted.length : 0;
                    return { totalLectures, lectureCompleted };
                })
            );

            setProgressData(tempProgressArray);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (userData) {
            fetchUserEnrolledCourses()
        }
    }, [userData])

    useEffect(() => {

        if (enrolledCourses.length > 0) {
            getCourseProgress()
        }

    }, [enrolledCourses])

    return (
        <>

            <div className='md:px-36 px-8 pt-10'>

                <h1 className='font-display text-3xl font-bold text-forge-ink tracking-tight'>My learning</h1>

                {enrolledCourses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                        <div className="w-14 h-14 rounded-full bg-forge-signal-light flex items-center justify-center text-2xl">
                            🧭
                        </div>
                        <h3 className="text-lg font-semibold text-forge-ink font-display">
                            Your learning path starts here
                        </h3>
                        <p className="text-forge-muted text-sm max-w-xs leading-relaxed">
                            You haven't enrolled in a course yet. Pick one skill to focus on — you don't need a plan, just a beginning.
                        </p>
                        <Link to="/course-list" className="mt-2 bg-forge-signal text-white text-sm font-semibold px-6 py-2.5 rounded-btn hover:bg-indigo-700 transition-colors duration-150">
                            Browse courses
                        </Link>
                    </div>
                ) : (
                    <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
                        <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
                            <tr>
                                <th className="px-4 py-3 font-semibold truncate">Course</th>
                                <th className="px-4 py-3 font-semibold truncate max-sm:hidden">Length</th>
                                <th className="px-4 py-3 font-semibold truncate max-sm:hidden">Your progress</th>
                                <th className="px-4 py-3 font-semibold truncate">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {enrolledCourses.map((course, index) => (
                                <tr key={index} className="border-b border-gray-500/20">
                                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 ">
                                        <img src={course.courseThumbnail} alt="" className="w-14 sm:w-24 md:w-28" />
                                        <div className='flex-1'>
                                            <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                                            <Line className='bg-gray-300 rounded-full' strokeWidth={2} percent={progressArray[index] ? (progressArray[index].lectureCompleted * 100) / progressArray[index].totalLectures : 0} />
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 max-sm:hidden">{calculateCourseDuration(course)}</td>
                                    <td className="px-4 py-3 max-sm:hidden">
                                        {progressArray[index] && `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`}
                                        <span className='text-xs ml-2'>Lectures</span>
                                    </td>
                                    <td className="px-4 py-3 max-sm:text-right">
                                        <button onClick={() => navigate('/player/' + course._id)} className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white'>
                                            {progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1 ? 'Completed' : 'On Going'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

            </div>

            <Footer />

        </>
    )
}

export default MyEnrollments