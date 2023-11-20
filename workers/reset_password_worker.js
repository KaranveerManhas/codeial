const queue = require('../config/kue');

const resetPasswordMailer = require('../mailers/reset_password_mailer');

queue.process('reset_password', function(job, done){
    console.log("Reset Password worker is processing a job", job.data);
    resetPasswordMailer.newResetRequest(job.data);
    done();
})