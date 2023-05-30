const httpStatusMessages = [
    { code: 404, message: '404 (Not Found): How mysterious! 🔍 It seems like something is missing' },
    { code: 418, message: '418 (I\'m a Teapot): This is not the coffee you\'re looking for ☕️' },
    { code: 500, message: '500 (Internal Server Error): The server is currently experiencing a meltdown 🤯' },
    { code: 403, message: '403 (Forbidden): You shall not pass! 🔒' },
    { code: 401, message: '401 (Unauthorized): Sorry bud, this virtual playground is for VIPs only. Unless you\'re Batman, Gandalf, or a unicorn...  🚫' },
    { code: 503, message: '503 (Service Unavailable): Our hamsters are taking a break, please try again later 🐹' },
];

const getHumorousHTTPMessage = (statusCode: number) => {
    return httpStatusMessages.find((e) => e.code === statusCode)?.message || 'oh no! it seems that an unknown error has occurred🧐';
};

export default getHumorousHTTPMessage;

