import axios from "axios";
import api from "../api";
export default function (callback) {
    if (localStorage.getItem("sessionId")) {
        axios.get(window.api.local_host + api.gwUser + "?token=" + new Date().getTime(), {
            headers: {sessionId: localStorage.getItem("sessionId")}
        }).then(data => {
            if (callback) {
                if (data.status === 200 && data.data.data) {
                    
                    callback(data.data.data[0]);
                } else {
                    console.log("getUserInfo------error", data);
                }
                
            }
        }).catch(err => {
            console.log("getUserInfo------catch", data);
        });
    }
}