const fetchApi = async(url, requestBody = "", auth = true, method = "POST") => {
    try {
        const headers = {
            "Content-Type": "application/json",
        };

        const response = await fetch(`http://localhost:4000/users/${url}`, {
            method: method,
            headers: headers,
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        return { data, status: response.status };
    } catch (error) {
        // console.log(error.message);
        const err = {
            errcode: 1,
            message: error.message,
        };
        return err;
    }
};

export default fetchApi;