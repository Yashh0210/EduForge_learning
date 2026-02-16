import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';
import { Link } from 'react-router-dom';

const CoursesSection = () => {

  const { allCourses } = useContext(AppContext)

  return (
    <div className="py-16 md:px-40 px-8">
      <h2 className="text-3xl font-medium text-gray-800">What you can build toward</h2>
      <p className="md:text-base text-sm text-gray-500 mt-3">
        Focused on DSA, Web Development, and System Design. Pick where you want to grow.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-4">
        {allCourses.slice(0, 4).map((course, index) => <CourseCard key={index} course={course} />)}
      </div>
      <Link to={'/course-list'} onClick={() => scrollTo(0, 0)} className="border border-forge-border text-forge-ink text-sm font-medium px-6 py-2.5 rounded-btn hover:bg-forge-mist hover:border-forge-signal transition-all duration-150">Browse all courses →</Link>
    </div>
  );
};

export default CoursesSection;
