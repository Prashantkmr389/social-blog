const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailer');

// This is the worker process function that will be called when a job is added to the queue
// The job is passed as an argument to this function
// The job is an object that contains the data that is to be sent to the mailer
// The job contains the comment object that is to be sent to the mailer
// The job contains the comment object that is to be sent to the maile
queue.process('emails', function(job, done){
    console.log('emails worker is processing a job', job.data);
    commentsMailer.newComment(job.data);
    done();
})

// The job is passed as an argument to this function
