// change url backend login api (on heroku)
// for now it is set to the IP address of my machine (192.168.1.100) to test it on yours replace it with your IP
const BACKEND_ENDPOINT_USERS = 'http://192.168.178.61:3000/api/users/';
const BACKEND_ENDPOINT_TOILETS = 'http://192.168.178.61:3000/api/toilets/';
const BACKEND_ENDPOINT_REVIEWS = 'http://192.168.178.61:3000/api/reviews/';
const BACKEND_ENDPOINT_REPORTS = 'http://192.168.178.61:3000/api/reports/';

module.exports = { BACKEND_ENDPOINT_USERS, BACKEND_ENDPOINT_TOILETS, BACKEND_ENDPOINT_REVIEWS, BACKEND_ENDPOINT_REPORTS };