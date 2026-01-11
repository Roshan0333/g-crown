import axios from "axios";

const API_URL = "http://localhost:3000/gcrown/api/v1";

export const axiosPostService = async (path, client) => {
    try{
        let response = await axios.post(
            `${API_URL}${path}`,
            client,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );

        return {ok: true,fetchMessage: true, data: response.data};
    }
    catch(err){
        if(err.response){
            return {ok:false,fetchMessage: true, data: err.response.data};
        }
        else{
            return {ok: false,fetchMessage: false, data: err.message}
        }
    }
}