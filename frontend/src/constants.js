// change url backend login api (on heroku)
// for now it is set to the IP address of my machine (192.168.1.100) to test it on yours replace it with your IP
const BACKEND_ENDPOINT_USERS = 'http://192.168.1.100:3000/api/users/';
const BACKEND_ENDPOINT_TOILETS = 'http://192.168.1.100:3000/api/toilets/';

module.exports = { BACKEND_ENDPOINT_USERS, BACKEND_ENDPOINT_TOILETS };