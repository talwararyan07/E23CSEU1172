import axios from 'axios';

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

        // Use relative URL so Vite proxy handles CORS in dev
        await axios.post('/evaluation-service/logs', {
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
export default Log;
