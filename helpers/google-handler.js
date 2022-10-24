function handleCredentialResponse(response) {

    console.log(window.location.hostname.includes('localhost'))

    var url = ( window.location.hostname.includes('localhost') )
                ? 'http://localhost:3030/api/auth/google'
                : 'https://web-server-node.onrender.com/api/auth/google';
    
    const body = { id_token: response.credential }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then( r=> r.json() )
    .then( resp =>{
        console.log(resp )
        localStorage.setItem('email', resp.usuario.correo )
    })
    .catch( console.warn )
}


const button = document.getElementById('g_id_signout');
button.onclick = async() => {

    console.log(google.accounts.id)
    google.accounts.id.disableAutoSelect()
    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        console.log('consent revoked');
        localStorage.clear()
        location.reload()
    });
}
