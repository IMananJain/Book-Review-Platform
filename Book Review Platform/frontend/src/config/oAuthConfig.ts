export const googleOAuthConfigWeb = {
    client_id:process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
    project_id:process.env.REACT_APP_GOOGLE_PROJECT_ID || '',
    auth_uri:process.env.REACT_APP_GOOGLE_AUTH_URI || '',
    token_uri:process.env.REACT_APP_GOOGLE_TOKEN_URI || '',
    client_secret:process.env.REACT_APP_GOOGLE_CLIENT_SECRET || '',
    redirect_uris: process.env.REACT_APP_GOOGLE_REDIRECT_URI || ''
};

export const facebookOAuthConfigWeb = {
    app_id:process.env.REACT_APP_FACEBOOK_APP_ID || ''
};
  