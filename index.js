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

        //TODO: check if both text and attachment exist
        var input = {
            user_id: step.input('user_id').first(),
            text_message: step.input('text_message').first(),
            attachment: step.input('attachment').first()
        }

        if (input.text_message !== null && input.attachment !== null) {
            return self.fail('You must send one of EITHER text_message or attachment, not both.');
        } else if (input.text_message === null && input.attachment === null) {
            return self.fail('One of either text_message or attachment is required');
        }

        var fbApiPostBody = {
            'recipient': {
                'id': input.user_id
            }
        };

        if (input.text_message) {
            fbApiPostBody.message = {
                'text': input.text_message
            };
        } else if (input.attachment) {
            fbApiPostBody.message = {
                'attachment': input.attachment
            };
        }

        FB.api('me/messages', 'post', fbApiPostBody, function (res) {
            if (!res || res.error) {
                console.log(res);
                return self.fail('Something went wrong with Facebook: ' + res);
            }

            self.log('FB Message sent successfully');
            self.complete({});
        });
    }
};
