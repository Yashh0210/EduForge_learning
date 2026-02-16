import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const CourseCard = ({ course }) => {

    const { currency, calculateRating } = useContext(AppContext)

    return (
        <Link onClick={() => scrollTo(0, 0)} to={'/course/' + course._id} className="group bg-white border border-forge-border rounded-card overflow-hidden shadow-card hover:shadow-card-hover hover:border-indigo-200 transition-all duration-200 flex flex-col">
            <div className="relative overflow-hidden">
                <img className="w-full aspect-video object-cover group-hover:scale-[1.02] transition-transform duration-300" src={course.courseThumbnail} alt='' />
            </div>
            <div className="p-5 text-left flex flex-col gap-2 flex-1">
                <h3 className="text-base font-semibold text-forge-ink leading-snug group-hover:text-forge-signal transition-colors duration-150 line-clamp-2">{course.courseTitle}</h3>
                <p className="text-sm text-forge-muted font-medium">{course.educator.name}</p>
                {course.courseRatings.length > 0 ? (
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-semibold text-forge-ink">{calculateRating(course)}</p>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <img
                                    key={i}
                                    className="w-3.5 h-3.5"
                                    src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
                                    alt=""
                                />
                            ))}
                        </div>
                        <p className="text-xs text-forge-muted">({course.courseRatings.length})</p>
                    </div>
                ) : (
                    <p className="text-xs text-forge-muted italic">No reviews yet</p>
                )}
                <div className="mt-auto pt-2">
                    <p className="text-base font-bold text-forge-ink">{currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
                </div>
            </div>
        </Link>
    )
}

export default CourseCard