module.exports = function() {
  return {
        api_version: 'v1.0',
        app_id: "1734628550106267",
        app_secret: process.env.ACCOUNT_KIT_APP_SECRET ? process.env.ACCOUNT_KIT_APP_SECRET : 'efb41ee1b3b77c21f320ec538bae0c4f', //reset secret
        me_endpoint_base_url: 'https://graph.accountkit.com/v1.0/me',
        token_exchange_base_url: 'https://graph.accountkit.com/v1.0/access_token', 
  };
}