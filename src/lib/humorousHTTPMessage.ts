const httpStatusMessages = [
    { code: 400, message: '400 (Bad Request): Oops! Looks like you sent something the server didn\'t understand 🤷‍♀️' },
    { code: 401, message: '401 (Unauthorized): Sorry bud, this virtual playground is for VIPs only. Unless you\'re Batman, Gandalf, or a unicorn...  🚫' },
    { code: 402, message: '402 (Payment Required): Give us all your money 💰' },
    { code: 403, message: '403 (Forbidden): You shall not pass! 🔒' },
    { code: 404, message: '404 (Not Found): How mysterious! 🔍 It seems like something is missing' },
    { code: 405, message: '405 (Method Not Allowed): You\'re doing it wrong! 🙅‍♂️' },
    { code: 406, message: '406 (Not Acceptable): I don\'t like your taste 👎' },
    { code: 407, message: '407 (Proxy Authentication Required): Who are you? Identify yourself! 🕵️‍♂️' },
    { code: 409, message: '409 (Conflict): Uh oh, something went wrong and now we\'re fighting 🤜🤛' },
    { code: 410, message: '410 (Gone): Like a thief in the night, it\'s disappeared forever 🌃' },
    { code: 411, message: '411 (Length Required): Size matters 📐' },
    { code: 413, message: '413 (Payload Too Large): That\'s too much information for me to handle 🚫' },
    { code: 418, message: '418 (I\'m a Teapot): This is not the coffee you\'re looking for ☕️' },
    { code: 420, message: '420 (Enhance Your Calm): Woah there, you need to chill out 😎' },
    { code: 451, message: '451 (Unavailable For Legal Reasons): Sorry, my lawyer says I can\'t do that 🤐' },
    { code: 500, message: '500 (Internal Server Error): The server is currently experiencing a meltdown 🤯' },
    { code: 501, message: '501 (Not Implemented): We haven\'t figured out how to do that yet 🤔' },
    { code: 502, message: '502 (Bad Gateway): Houston, we have a problem 🚀' },
    { code: 503, message: '503 (Service Unavailable): Our hamsters are taking a break, please try again later 🐹' },
    { code: 504, message: '504 (Gateway Timeout): The hamsters took too long of a break and now they\'re all asleep 😴' },
];

const getHumorousHTTPMessage = (statusCode: number) => {
    return httpStatusMessages.find((e) => e.code === statusCode)?.message || 'oh no! it seems that an unknown error has occurred🧐';
};

export default getHumorousHTTPMessage;

