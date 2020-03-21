export default async function jsonRequest(url, data) {
    // async function getResponse() {
        let response = await fetch(url, data);
        console.log(response)
        if (response.ok) {
            let json = await response.json();
            return json;
        } else {
            return new Error('status is not 200')
        }
    // }

    // const result = await getResponse()
    // console.log(result)
    // return result;
}
