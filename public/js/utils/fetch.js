async function fetchOK(request) {
    return fetch(request).then(res => {
        if (res.ok) return res
        else throw res;
    });
}

export default fetchOK;