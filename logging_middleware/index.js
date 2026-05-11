const axios = require("axios");

let authToken = null;

function setLogToken(token) {
    authToken = token;
}

async function Log(stack, level, pkg, message) {
    try {
        let tokenToUse = authToken;
        if (!tokenToUse && typeof window !== 'undefined' && window.localStorage) {
            tokenToUse = window.localStorage.getItem('access_token');
        }

        if (!tokenToUse) {
            console.warn(`[Log] [${level}] [${pkg}] ${message} (No auth token)`);
            return;
        }

        await axios.post('http://4.224.186.213/evaluation-service/logs', {
            stack,
            level,
            package: pkg,
            message
        }, {
            headers: {
                'Authorization': `Bearer ${tokenToUse}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        console.error("Log Middleware Error:", err.message);
    }
}

Log.setLogToken = setLogToken;
module.exports = Log;