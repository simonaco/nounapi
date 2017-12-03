var NounProject = require('the-noun-project');
module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
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
        unfurl_media: true,
        unfurl_links: true
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
