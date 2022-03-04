export const httpRequest = () => {
    const customFetch = (endpoint, values = null) => {      
        return fetch(endpoint, values && { 
                method: 'post', 
                headers: values.headers, 
                body: values.body })
                .then((res) => res.ok
                    ? res.json()
                    : Promise.reject({
                        status: false,
                        statusText: res.statusText || 'No se pudo procesar la petición.'
                    })  
                )
                .catch((err) => err)
    }

    const get = (url) => customFetch(url);
    const post = (url, values) => customFetch(url, values);

    return { get, post }
}

