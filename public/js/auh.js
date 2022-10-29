
const miFormulario = document.querySelector('form');

var url = ( window.location.hostname.includes('localhost') )
        ? 'http://localhost:8080/api/auth/'
        : 'https://web-server-node.onrender.com/api/auth/';


miFormulario.addEventListener('submit', ev => {

    ev.preventDefault();
    const formData = {};

    for(let el of miFormulario.elements){
        if (el.name.length > 0) {
            formData[el.name] = el.value
        }
    }

    // console.log(formData);
    fetch( url + 'login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
    })
    .then( resp => resp.json() )
    .then( ({msg, token}) => {
        // console.log(data)
        if (msg) {
            return console.log(msg);
        }
        localStorage.setItem('token', token);
        window.location = 'chat.html';
    })
    .catch( err => {
        console.log(err)
    })

});



function handleCredentialResponse(response) {
    
    // console.log("Encoded JWT ID token: " + response.credential);
    // console.log(window.location.hostname.includes('localhost'))

    const body = { id_token: response.credential }
    fetch(url + 'google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then( resp=> resp.json() )
    .then( resp =>{

        token = resp.token;
        // console.log(token )
        localStorage.setItem('email', resp.usuario.correo )
        localStorage.setItem('token', token )
        return window.location = 'chat.html';
        // location.reload()
        
    })
    .catch( console.warn )

}

window.onload = function () {
    
    google.accounts.id.initialize({
      client_id: "346467029932-qfevd2u60hn6ti822gka0kupr49215rm.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    
    google.accounts.id.prompt(); // also display the One Tap dialog
}

function signOut() {
    
    console.log(google.accounts.id)
    google.accounts.id.disableAutoSelect()
    
    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        console.log('consent revoked');
        localStorage.clear()
        location.reload()
    });
}
  
