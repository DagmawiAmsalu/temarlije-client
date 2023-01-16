import {useState, useEffect, useContext} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron";
import PreviewModal from "../../components/modal/PreviewModal";
import SingleCourseLessons from "../../components/cards/SingleCourseLessons";
import { Context } from "../../context";
import {toast} from "react-toastify"; 
import { redirect } from "next/dist/server/api-utils";

const SingleCourse = ({course}) => {
    //state
    const [showModal, setShowModal] = useState(false);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [enrolled, setEnrolled] = useState({});
    //context
    const {
        state : {user}
    } = useContext(Context);

    useEffect(() => {
        if(user && course) checkEnrollement()
    }, [user, course]);

    const checkEnrollement = async () => {
        const {data} = await axios.get(`/api/check-enrollment/${course._id}`)
        console.log("Check enrollment", data);
        setEnrolled(data);
    }

    const router = useRouter()
    const {slug} = router.query;
     
    const handlePaidEnrollement = async () => {
        // console.log("handle paid enrollment");
    try {
        setLoading(true);
        // check if user is logged in
        if (!user) router.push("/login");
        // check if already enrolled
        if (enrolled.status)
          return router.push(`/user/course/${enrolled.course.slug}`);
        const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);
        router.push(data);
        console.log("DATA=> ", data);
      } catch (err) {
        toast("Enrollment failed, try again.");
        console.log(err);
        setLoading(false);
      }
    };

    const handleFreeEnrollement = async (e) => {
        // console.log("handle free enrollment");
        e.preventDefault();
        try {
            // check if user is logged in
            if(!user) router.push("/login");
            // check if already enrolled
            if(enrolled.status) 
                return router.push(`/user/course/${enrolled.course.slug}`);
            setLoading(true);
            const {data} = await axios.post(`/api/free-enrollment/${course._id}`);
            toast(data.message);
            setLoading(false);
            router.push(`/user/course/${data.course.slug}`);
        } catch (err) {
            toast("Enrollment failed. Try again.");
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <>
            {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
                    <SingleCourseJumbotron 
                    course={course} 
                    showModal={showModal}
                    setShowModal={setShowModal}
                    preview={preview}
                    setPreview={setPreview}
                    user={user}
                    loading={loading}
                    handlePaidEnrollement={handlePaidEnrollement}
                    handleFreeEnrollement={handleFreeEnrollement}
                    enrolled={enrolled}
                    setEnrolled={setEnrolled}
                    />

                    <PreviewModal 
                        showModal={showModal} 
                        setShowModal={setShowModal} 
                        preview={preview}
                    />

                    {course.lessons && (
                        <SingleCourseLessons 
                            lessons={course.lessons} 
                            setPreview={setPreview} 
                            showModal={showModal} 
                            setShowModal={setShowModal} 
                        />
                    )}
        </>
    );
};

export async function getServerSideProps({query}) {
    const {data} = await axios.get(`${process.env.API}/course/${query.slug}`);
    return {
        props: {
            course: data,
        },
    };
}

export default SingleCourse;