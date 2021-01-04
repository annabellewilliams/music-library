const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const client_id = '5b6a8cefabc8453fab7e42892ff20a03'; // Your client id
const client_secret = 'f61aa61419384d70893a360e9d3b2d66'; // Your secret
const redirect_uri = 'localhost:3000'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const stateKey = 'spotify_auth_state';

const app = express();

app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());

app.get('/login', (req, res) => {

    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    const scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

app.get('/callback', (req, res) => {

    // your application requests refresh and access tokens
    // after checking the state parameter

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader("Content-Security-Policy", "connect-src 'self' https://www.google-analytics.com");
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Security-Policy': "connect-src 'self' https://www.google-analytics.com"
            },
            json: true
        };

        request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {

                const access_token = body.access_token,
                    refresh_token = body.refresh_token;

                const options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        // 'Content-Security-Policy': "connect-src 'self' https://www.google-analytics.com"
                    },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, (error, response, body) => {
                    console.log(body);
                });

                // we can also pass the token to the browser to make requests from there
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.setHeader("Content-Security-Policy", "connect-src 'self' https://www.google-analytics.com");
                res.redirect('/#' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                // res.setHeader("Content-Security-Policy", "connect-src 'self' https://www.google-analytics.com");
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});

app.get('/refresh_token', (req, res) => {

    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

//res.setHeader("Content-Security-Policy", "connect-src 'self' https://www.google-analytics.com");
app.listen(3001, () => {
    console.log('Listening on port 3001');
})