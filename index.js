import { GoogleAuth } from "google-auth-library";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const SERVICE_ACCOUNT_FILE = process.env.SERVICE_ACCOUNT_FILE;
const PROJECT_ID = process.env.PROJECT_ID;
const DEVICE_FCM_TOKEN = process.env.DEVICE_FCM_TOKEN;

/**
 * Get OAuth2 Access Token
 */
async function getAccessToken() {
    const auth = new GoogleAuth({
        keyFile: SERVICE_ACCOUNT_FILE,
        scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
    });

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    console.log("Access Token:", accessToken.token); // Log the token string
    return accessToken.token; // Return the token string
}

/**
 * Send FCM Notification
 */
async function sendNotification() {
    try {
        const accessToken = await getAccessToken();

        const url = `https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`;
        const payload = {
            message: {
                token: DEVICE_FCM_TOKEN,
                notification: {
                    title: "Hello from Node.js",
                    body: "This is a test notification sent using Firebase HTTP v1 API.",
                },
                data: {
                    route: "/admin-notification",
                },
            },
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`, // Pass the correct token
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Notification sent successfully:", data);
        } else {
            const error = await response.json();
            console.error("Error sending notification:", error);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

sendNotification().catch(console.error);
