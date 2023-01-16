import { useState, useEffect, useContext} from "react";
import { Menu } from "antd";
import Link from "next/link";
import { 
    CoffeeOutlined, 
    LoginOutlined, 
    LogoutOutlined, 
    UserAddOutlined, 
    CarryOutOutlined, 
    TeamOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from 'axios';
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item , SubMenu, ItemGroup } = Menu;

const TopNav = () => {
    const [current, setCurrent] = useState("");

    const { state, dispatch } = useContext(Context);
    const { user } = state;

    const router = useRouter();

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    const logout = async () => {
        dispatch({type: "LOGOUT"});
        window.localStorage.removeItem("user");
        const {data} = await axios.get("/api/logout");
        toast(data.message);
        router.push("/login");
    };

    return(
        <Menu 
        theme="dark"
        mode="horizontal" 
        selectedKeys={[current]}
        className="mb-2" 
        >
            <Item 
            key="/" 
            onClick={e => setCurrent(e.key)}
            >
                <Link href="/">
                    <img src="/course.png" width="40px" height="40px"/>
                </Link>
            </Item>

            {/* {user && user.role && user.role.includes("Teacher") && (
                <Item key="/teacher/course/create" onClick={e => setCurrent(e.key)} 
                icon={<CarryOutOutlined/>}>
                    <Link href="/teacher/course/create">
                        Create Course
                    </Link>
                </Item>
            )} */}


{user === null && (
        <>
          <Item
            style={{ marginLeft: 'auto' }}
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
            
          >
            <Link href="/register">
              Register
            </Link>
          </Item>

          <Item
            className="float-right"
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/login">
              Login
            </Link>
          </Item>
        </>
      )}

            {user && user.role && !user.role.includes("Teacher") && (
               <Item key="/user/become-teacher" onClick={e => setCurrent(e.key)} 
               icon={<TeamOutlined/>}>
                   <Link href="/user/become-teacher">
                       Become Teacher
                   </Link>
               </Item>
            )}

            {user !== null && (
        <SubMenu
          icon={<CoffeeOutlined />}
          title={user && user.firstName}
          className="float-right"
          style={{ marginLeft: 'auto' }}
        >
          <ItemGroup>
            <Item key="/user">
              <Link href="/user">
                Dashboard
              </Link>
            </Item>
            <Item onClick={logout}>Logout</Item>
          </ItemGroup>
        </SubMenu>
      )}

            {user && user.role && user.role.includes("Teacher") && (
               <Item className="float-right" key="/teacher" onClick={e => setCurrent(e.key)} 
               icon={<TeamOutlined/>}>
                   <Link href="/teacher">
                       Teacher
                   </Link>
               </Item> 
            )}

           
        </Menu>
    );
};

export default TopNav;