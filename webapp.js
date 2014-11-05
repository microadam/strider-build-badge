var getBuildStatus = require('./lib/build-status')

module.exports = function (context, done) {
  context.app.get('/:org/:repo/badge', function (req, res) {
    var name = req.params.org + '/' + req.params.repo
    var branch = req.query.branch

    getBuildStatus(name, branch, context, function (error, imageName) {
      if (error) {
        console.error('[badge] error occured when getting badge: ' + error.message)
      }
      res.setHeader('Cache-Control', 'no-cache')
      res.sendfile(__dirname + '/images/' + imageName)
    })
  })
  done()
}
