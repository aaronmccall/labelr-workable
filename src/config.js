import qs from 'qs'

const config = {
  authUrl: '',
  codeUrl: ''
}

function buildAuthUrl (clientId) {
  return 'https://github.com/login/oauth/authorize?' + qs.stringify({
    scope: 'user,repo',
    redirect_uri: window.location.origin + '/auth/callback',
    client_id: clientId
  })
}

switch (window.location.hostname) {
  case 'labelr-amac.surge.sh':
    config.authUrl = buildAuthUrl('cd82574aebf7c61da076')
    config.codeUrl = 'https://labelr-amac.herokuapp.com/authenticate'
    break
  default:
    config.authUrl = buildAuthUrl('29ffec216dc1e3dacc25')
    config.codeUrl = 'https://labelr-amac-dev.herokuapp.com/authenticate'
    break
}

export default config