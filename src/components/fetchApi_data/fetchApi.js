const fetchApi = async(url, requestBody = "", auth = true, method = "POST") => {
    try {
        const headers = {
            "Content-Type": "application/json",
        };

        if (auth) {
            headers["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`, {
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
            message: error,
        };
        return err;
    }
};

export default fetchApi;