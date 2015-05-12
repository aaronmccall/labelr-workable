require('babel/register');
var config = require('hjs-webpack')
var React = require('react')
var Public = require('./src/pages/public')
var Layout = require('./src/layout')

module.exports = config({
  in: 'src/app.js',
  out: 'public',
  isDev: process.env.NODE_ENV !== 'production',
  html: function (data) {
    return {
      'index.html': template(data, React.renderToString(React.createElement(Public))),
      '200.html': template(data, React.renderToString(React.createElement(Layout, {me: {}})))
    }
  },
  port: 3001
})

function template (buildData, html) {
  return [
    '<!doctype>',
    '<html>',
      '<head>',
        '<meta charset="utf-8"/>',
        '<link rel="stylesheet" href="/' + buildData.css + '"/>',
      '</head>',
      '<body>',
        html,
      '</body>',
      '<script src="/' + buildData.main + '"></script>',
    '</html>'
  ].join('')
}