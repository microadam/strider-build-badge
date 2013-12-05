module.exports = function (name, context, callback) {
  var Job = context.models.Job
  name = name.toLowerCase()

  Job.findOne()
    .sort({'finished': -1})
    .where('finished').ne(null)
    .where('archived', null)
    .where('project', name)
    .exec(function (error, job) {
      var status = 'failing'
      if (error || !job) {
        status = 'unknown'
      } else if (job.test_exitcode === 0) {
        status = 'passing'
      }
      callback(error, 'build_' + status + '.png')
    })
}