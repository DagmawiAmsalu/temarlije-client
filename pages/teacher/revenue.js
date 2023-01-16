import { useState, useEffect, useContext } from "react";
import { Context } from "../../context";
import TeacherRoute from "../../components/routes/TeacherRoute";
import axios from "axios";
import { 
    DollarOutlined, 
    SettingOutlined, 
    LoadingOutlined 
} from "@ant-design/icons";
import {currencyFormatter} from "../../utils/helpers"

const TeacherRevenue = () => {
    const [balance, setBalance] = useState({ pending: [] });

    useEffect(() => {
        sendBalanceRequest()
    }, []);

    const sendBalanceRequest = async () => {
        console.log("Send balance request");
    };

    const handlePayoutSettings = async () => {
        console.log("handle payout settings");
    }
    return (
        <TeacherRoute >
            <div className="container">
                <div className="row pt-2">
                    <div className="col-md-8 offset-md-2 bg-light p-5">
                        <h2>
                            Revenue report <DollarOutlined className="float-right"/> {" "}
                        </h2>
                        <small>
                            You get paid ..... {/*  EDIT IT LATER */}
                        </small>  
                        <hr/>
                        <h4>
                            Pending balance <span className="float-right">ETB 0.00</span>
                        </h4>
                        <small>
                            For 48 hours {/*  EDIT IT LATER */}
                        </small>
                        <hr/>
                        <h4>
                            Payouts 
                            <SettingOutlined 
                                className="float-right pointer" 
                                onClick={handlePayoutSettings}
                            />
                        </h4>
                        <small>Update your Chapa account details or view previous payouts</small>
                    </div>
                </div>
            </div>
        </TeacherRoute>
    )
}

export default TeacherRevenue;
