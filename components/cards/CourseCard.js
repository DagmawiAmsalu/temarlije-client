import { Card, Badge } from "antd";
import Link from "next/link";
import {currencyFormatter} from "../../utils/helpers"

const {Meta} = Card

const CourseCard = ({course}) => {
    const {name, teacher, price, image, slug, paid, category} = course;
    return (
        <Link href={`/course/${slug}`}>
            <Card
            className="mb-4"
            cover={
                <img 
                src={image ? image.Location : "/course.png"} 
                alt={name} 
                style={{height: '200px', objectFit: "cover" }}
                className="p-1"
                />
            }
            >
                <h3 className="font-weight-bold">{name}</h3>
                <p>by {teacher.firstName + " " + teacher.lastName}</p>
                <Badge 
                count={category} 
                style={{backgroundColor: "#03a9f4"}} 
                className="pb-2 mr-2"/>
                <h4 className="pt-2">
                    {paid 
                    ? currencyFormatter({
                        amount: price,
                        currency: "etb"
                    }) 
                    : "Free"}
                </h4>
            </Card>
        </Link>
    );
};

export default CourseCard;