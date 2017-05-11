import 'whatwg-fetch'

let checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}
let headers = () => {
    return {
        'Authorization': 'b2a55b1539abbeaf13da1bfcb395c86e',
        'Content-Type': 'application/json'
    }
}
export function getListings() {
    return fetch('http://clientside-api.herokuapp.com/api/v1/listings', {
        credentials: 'include',
        method: 'GET',
        headers: headers()
    })
    .then(response => checkStatus(response))
    .then(response => response.json())
    .then(response => response.data)
    .catch(function(ex) {
        console.log('parsing failed', ex)
    })
}

export function postListing(title, url){
    return fetch('http://clientside-api.herokuapp.com/api/v1/listings', {
        credentials: 'include',
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
            "data": {
                "attributes": {
                    "title": title,
                    "url": url
                }
            }
        })
    })
    .then(response => checkStatus(response))
    .then(response => response.json())
    .then(response => response.data)
    .catch(function(ex) {
        console.log('parsing failed', ex)
    })
}

export function deleteListing(id) {
    return fetch('http://clientside-api.herokuapp.com/api/v1/listings/' + id, {
        credentials: 'include',
        method: 'DELETE',
        headers: headers()
    })
        .then(response => checkStatus(response))
        .then(response => response.json())
        .then(response => response.data)
        .catch(function(ex) {
            console.log('parsing failed', ex)
        })
}

export function updateListing(id, title, url) {
    return fetch('http://clientside-api.herokuapp.com/api/v1/listings/' + id, {
        credentials: 'include',
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({
            "id": id,
            "data": {
                "attributes": {
                    "title": title,
                    "url": url
                }
            }
        })
    })
        .then(response => checkStatus(response))
        .then(response => response.json())
        .then(response => response.data)
        .catch(function(ex) {
            console.log('parsing failed', ex)
        })
}
