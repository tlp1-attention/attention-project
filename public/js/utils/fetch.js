async function fetchOK(request, error) {
    return fetch(request).then(res => {
        if (res.ok) return res
        else throw error;
    })
                 
}

export default fetchOK;