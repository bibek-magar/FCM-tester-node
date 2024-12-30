# Firebase FCM Notification Sender

This project demonstrates how to send Firebase Cloud Messaging (FCM) notifications using Node.js and the Firebase HTTP v1 API. The implementation utilizes a service account for authentication and Google APIs for generating access tokens.

## Prerequisites

Before using this code, ensure you have the following:

1. **Node.js**: Install Node.js (version 14 or higher).
2. **Firebase Project**: Set up a Firebase project in the Firebase console.
3. **Service Account JSON File**:
   - Go to your Firebase console.
   - Navigate to **Project Settings > Service Accounts**.
   - Click "Generate new private key" to download the service account JSON file.
4. **Dependencies**:
   - Install the required Node.js packages: `google-auth-library` and `node-fetch`.

## Installation

1. Clone the repository or copy the script to your local machine.
2. Install the required dependencies:

   ```bash
   npm install google-auth-library node-fetch
   ```

3. Place the service account JSON file in the project directory and update the path in the code:

   ```javascript
   const SERVICE_ACCOUNT_FILE = "./serviceAccount.json"; // Path to your service account JSON file
   ```

4. Update the following variables in the script:

   ```javascript
   const PROJECT_ID = "<your-firebase-project-id>"; // Replace with your Firebase Project ID
   const DEVICE_FCM_TOKEN = "<device-fcm-token>"; // Replace with the target device's FCM token
   ```

## Usage

1. **Run the Script**:

   Execute the script using Node.js:

   ```bash
   node index.js
   ```

2. **Expected Output**:
   - On success: The script logs the successful notification response.
   - On error: The script logs error details.

## Code Overview

### Getting an OAuth2 Access Token

The `getAccessToken` function uses the Google Auth Library to generate an OAuth2 access token required for authenticating Firebase API requests.

### Sending Notifications

The `sendNotification` function constructs the notification payload and sends it to the FCM endpoint using the `fetch` library. Ensure the `DEVICE_FCM_TOKEN` corresponds to the target device.

## Example Notification Payload

```json
{
  "message": {
    "token": "<device-fcm-token>",
    "notification": {
      "title": "Hello from Node.js",
      "body": "This is a test notification sent using Firebase HTTP v1 API."
    },
    "data": {
      "route": "/admin-notification"
    }
  }
}
```

## Notes

- Ensure your Firebase project has enabled the Firebase Cloud Messaging API.
- Verify that the `DEVICE_FCM_TOKEN` is valid and associated with a device registered to your Firebase project.

## Troubleshooting

- **Invalid Token Error**:
  - Check if the service account file is correctly configured and accessible.
  - Ensure the `DEVICE_FCM_TOKEN` is valid.
- **Permission Denied**:
  - Verify that your service account has the appropriate permissions for Firebase Cloud Messaging.
- **Network Issues**:
  - Ensure your environment has access to the internet and the Firebase endpoints.

## License

This project is licensed under the MIT License.
