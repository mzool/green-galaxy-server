import google from "googleapis"

// Set up OAuth2 client
const oauth2Client = new google.Auth.OAuth2Client(
    process.env.google_cloud_id,
    process.env.google_cloud_secret,
    process.env.redirect_url
);
oauth2Client.credentials
// Set the credentials from the JSON file
oauth2Client.setCredentials({
    access_token: process.env.google_cloud_id,
    refresh_token: process.env.,
    expiry_date: YOUR_EXPIRY_DATE,
});

// Create Gmail API instance
const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

// Example: List emails
const listEmails = async () => {
    try {
        const response = await gmail.users.messages.list({
            userId: 'me',
        });

        const messages = response.data.messages;

        // Process messages as needed
        console.log('Messages:', messages);
    } catch (error) {
        console.error('Error listing emails:', error.message);
    }
};

// Example: Get a specific email
const getEmail = async (messageId) => {
    try {
        const response = await gmail.users.messages.get({
            userId: 'me',
            id: messageId,
        });

        const email = response.data;

        // Process email as needed
        console.log('Email:', email);
    } catch (error) {
        console.error('Error getting email:', error.message);
    }
};

export default listEmails
