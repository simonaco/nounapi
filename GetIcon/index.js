var NounProject = require('the-noun-project');
var qs = require('querystring');
module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  const body = qs.parse(req.body);
  nounProject = new NounProject({
    key: process.env.NounApiKey,
    secret: process.env.NounApiSecret
  });
  nounProject.getIconsByTerm(body.text, { limit: 5 }, (err, data) => {
    let slack_res;
    let attachments = [];
    for (icon of data.icons) {
      attachments.push({ image_url: icon.preview_url, text: icon.preview_url });
    }
    if (!err) {
      slack_res = {
        parse: 'full',
        response_type: 'in_channel',
        attachments: attachments
      };
    } else {
      context.log(`Error: ${err}`);
      slack_res = {
        response_type: 'ephemeral',
        text: "Sorry, that didn't work. Please try again."
      };
    }
    context.log(slack_res);
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: slack_res
    };
    context.done();
  });
};
