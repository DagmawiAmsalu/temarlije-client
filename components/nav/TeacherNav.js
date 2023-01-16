import { useState, useEffect } from "react";
import Link from "next/link";

const TeacherNav = () => {
    const [current, setCurrent] = useState("");

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    return (
        <div className="nav flex-column nav-pills">
            <Link href="/teacher" 
                className={`nav-link ${current === '/teacher' && 'active'}`}>
                Dashboard
            </Link>
            <Link href="/teacher/course/create" 
                className={`nav-link ${current === '/teacher/course/create' && 'active'}`}>
                Course Create
            </Link>

            <Link href="/teacher/revenue" 
                className={`nav-link ${current === '/teacher/revenue' && 'active'}`}>
                Revenue
            </Link>
        </div>
    );
};

export default TeacherNav;