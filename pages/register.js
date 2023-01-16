import { useState, useEffect, useContext } from "react";
import axios from "axios"
import {toast} from 'react-toastify';
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {state: {user },
    } = useContext(Context);

    const router = useRouter();

    useEffect(() => {
        if(user !== null) router.push("/");
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.table({firstName, latName, email, password});
        try{
            setLoading(true);
            const {data} = await axios.post(`/api/register`, {
            firstName, 
            lastName, 
            email, 
            password,
        });
        // console.log("Register Response", data);
        toast("Registeration successful.Please login.");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setLoading(false);
        } catch (err){
            toast(err.response.data);
            setLoading(false);
        }
    };

    return (
        <>
            {/* <h1 className="jumbotron text-center bg-primary square"> </h1> */}
            <div className="container col-md-4 offset-md-4 pb-5 toppad">
                <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className="form-control mb-4 p-4" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    placeholder="Enter First Name"
                    required
                    />

                    <input 
                    type="text" 
                    className="form-control mb-4 p-4" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    placeholder="Enter Last Name"
                    required
                    />

                    <input 
                    type="email" 
                    className="form-control mb-4 p-4" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter email"
                    required
                    />

                    <input 
                    type="password" 
                    className="form-control mb-4 p-4" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter password"
                    required
                    />
                    <div className="d-grid">
                    <button type="submit" className="btn btn-primary"
                    disabled={!firstName || !lastName || !email || !password || loading}>
                        {loading ? <SyncOutlined spin /> : "Submit"}
                    </button>
                    </div>
                </form>
                <p class="text-center p-3">Already registered?{" "}
                <Link href="/login">
                    Login
                </Link>
                </p>
            </div>
        </>
    );
};

export default Register;