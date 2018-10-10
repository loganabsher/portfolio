'use strict';

let link = document.createElement('a');
let AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
let clientIDQuqery = 'client_id=236093652911-fjbn99qu3r1laejsr16juo20kg0lb9c7.apps.googleusercontent.com';
let responseTypeQuery = 'response_type=code';
let scopeQuery = 'scope=openid%20profile%20email';
let promptQuery = 'prompt=consent';
let redirectURIQuery = 'redirect_uri=http://localhost:3000/oauth/google/code';

let formatedURI = `${AUTH_URL}?${clientIDQuqery}&${responseTypeQuery}&${scopeQuery}&${promptQuery}&${redirectURIQuery}`;

link.setAttribute('href', formatedURI);
link.textContent='login with google';

document.body.appendChild(link);
