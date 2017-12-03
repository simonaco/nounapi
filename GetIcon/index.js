var NounProject = require('the-noun-project');
var formData = require('form-data-to-object');
module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  context.log(formData.toObj(req.body));
  nounProject = new NounProject({
    key: process.env.NounApiKey,
    secret: process.env.NounApiSecret
  });
  nounProject.getIconsByTerm('goat', { limit: 5 }, (err, data) => {
    if (!err) {
      data = {
        parse: 'full',
        response_type: 'in_channel',
        text: data.icons[0].preview_url,
        attachments: [
          {
            image_url: data.icons[0].preview_url
          }
        ]
      };
      context.log(data.icons);
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: data
      };
    }
    context.done();
  });
};
