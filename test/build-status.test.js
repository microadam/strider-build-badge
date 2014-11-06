var expect = require('expect.js')
  , getBuildStatus = require('../lib/build-status')

describe('Build Status', function () {

  function getContext(job) {
    var jobModel =
    { findOne: function () { return jobModel }
    , sort: function () { return jobModel }
    , where: function (field, value) {
        if(field === 'ref.branch' && value !== 'master') {
          job = null;
        }
        return jobModel
      }
    , ne: function () { return jobModel }
    , exec: function (callback) { callback(null, job) }
    }
    return { models: { Job: jobModel } }
  }

  it('should return success image with successful build', function (done) {
    var job = { test_exitcode: 0 }
    getBuildStatus('test', 'master', getContext(job), function (error, imagePath) {
      expect(imagePath).to.be('build_passing.png')
      done()
    })
  })

  it('should return failed image with failed build', function (done) {
    var job = { test_exitcode: 1 }
    getBuildStatus('test', 'master', getContext(job), function (error, imagePath) {
      expect(imagePath).to.be('build_failing.png')
      done()
    })
  })

  it('should return unknown image when build state unknown', function (done) {
    getBuildStatus('test', 'master', getContext(null), function (error, imagePath) {
      expect(imagePath).to.be('build_unknown.png')
      done()
    })
  })

  it('should return success image for the default branch ', function (done) {
    var job = { test_exitcode: 0 }
    getBuildStatus('test', undefined, getContext(job), function (error, imagePath) {
      expect(imagePath).to.be('build_passing.png')
      done()
    })
  })

  it('should return unknown image when job for the specified branch does not exist', function (done) {
    var job = { test_exitcode: 0 }
    getBuildStatus('test', 'develop', getContext(job), function (error, imagePath) {
      expect(imagePath).to.be('build_unknown.png')
      done()
    })
  })
})