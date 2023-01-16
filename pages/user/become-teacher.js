import { useContext, useState } from "react";
import { Context } from "../../context";
import { Button } from "antd";
import axios from "axios";
import { 
    SettingOutlined, 
    UserSwitchOutlined, 
    LoadingOutlined, 
} from "@ant-design/icons";
import {toast} from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";
import Link from "next/link";

const BecomeTeacher = () =>{
    //state
    const [loading, setLoading] = useState(false);
    const [chapaSecretKey, setChapaSecretKey] = useState("");
    const {
        state: {user},
    } = useContext(Context);

const becomeTeacher = async () => {
    try{
        setLoading(true);
        const {data} = await axios.post(`/api/make-teacher`, {
            chapaSecretKey, 
    });
    // console.log("chapaSecretKey Response", data);
    toast("Secret key added successfully. Please Login again.");
    setChapaSecretKey("");
    setLoading(false);
    } catch (err){
        toast(err.response.data);
        setLoading(false);
    }
    console.log("become Teacher");
    setLoading(true);
    axios
        .post('/api/make-teacher')
        .then(res => {
            console.log(res);
            window.location.href = res.data;
    })
    .catch(err => {
        console.log(err.response.state);
        toast("Chapa onboarding failed. Try again.");
        setLoading(false);
    });
};

    return (
        <>
            {/* <h1 className="jumbotron text-center square">Become Teacher</h1> */}

            <div className="container toppad">
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center">
                        <div className="pt-4">
                            <UserSwitchOutlined className="display-1 pb-3" />
                            <br/>
                            <h2>Setup payout to publish courses on TemarLije</h2>
                            <p className="lead text-warning">TemarLije integrates Chapa to transfer earnings to 
                            your accocunt
                            </p>

                        <form onSubmit={becomeTeacher}>
                            <input 
                            type="text" 
                            className="form-control mb-4 p-4" 
                            value={chapaSecretKey} 
                            onChange={(e) => setChapaSecretKey(e.target.value)} 
                            placeholder="Enter chapa Secret Key"
                            required
                            />
                        </form>

                        <Link className="lead" href="https://dashboard.chapa.co/register">
                            GET THE KEY BY REGISTERING
                        </Link>
                        
                        </div>
                        <Button 
                            className="mb-3" 
                            type="primary" 
                            block shape="round" 
                            // icon={loading ? <LoadingOutlined/> : <SettingOutlined/>}
                            size="large"
                            onClick={becomeTeacher}
                            disabled={(user && user.role && user.role.includes("Teacher")) || !chapaSecretKey || loading }
                            >
                                {/* {loading ? "Processing..." : "Payout Setup"} */}
                                Save Secret Key
                            </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BecomeTeacher;