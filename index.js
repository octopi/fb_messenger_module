var FB = require('fb');
FB.options({version: 'v2.6'});

module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var self = this;
        var access_token = dexter.provider('facebook').data('page_data.access_token');
        FB.setAccessToken(access_token);

        var fbApiPostBody = {
            'recipient': {
                'id': step.input('user_id').first()
            },
            'message': {
                'text': step.input('message').first()
            }
        };

        FB.api('me/messages', 'post', fbApiPostBody, function (res) {
            if (!res || res.error) {
                return this.fail('Something went wrong with Facebook: ' + res);
            }

            self.log('FB Message sent successfully');
            self.complete({});
        });
    }
};
