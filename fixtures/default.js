var _ = require('lodash')
    , env = require('./env')
    ;

module.exports = _.merge({
    /*
     * Some default settings. 
     *
     * You can generally leave this as is for general testing purposes.
     */
    simulation: true
    , instance_id: 'local_test_instance'
    , urls: {
        home: "http://rundexter.com/"
    }
    , instance_state: {
        active_step :  "local_test_step"
    }
    , workflow: {
        "id" : "local_test_workflow"
        , "title": "Local test workflow"
        , "description": "A fixture workflow used to test a module"
    }
    , steps: {
        local_test_step: {
            id: 'local_test_step'
            , type: 'module'
            //The test runner will change YOUR_MODULE_NAME to the correct module name
            , name: 'YOUR_MODULE_NAME'
            , next: []
        }
    }
    , modules: {
        //The test runner will add the proper data here
    }
    /*
     * End defaults
     */
    , environment: {
       /*
        * Any API keys you might need should go in the env.js.
        * For example:
        *
        "parse_app_id": "abc123"
        , "parse_app_key": "foobar"
        */
    }
    , user: {
        /*
         * Your dexter user settings should go in the env.js file and remain uncommitted.  
         * For example:
         *
        profile: {
            id: 1,
            api_key: 'apikeytest'
        }
         */
        /*
         * You should also add your providers to env.js
         * Example:
        providers: {
            github: {
                access_token: 'abc123',
                username: 'foo'
            }
        }
         */
         providers: {
            facebook: {
                page_data: {
                    access_token: 'EAAMTi6BCJMgBAOblOmNZC58WDBoXs1nrxPe4M8Um1oTMGM7QjJOhQR2IofjfFIauZBETgxSazODUmjK8v7tNE1WJZBksum22XaZBdrZCZAQygZCZAMDJ19VcSop0AOLqQxUKYfxLPJYWyIsF73orl6ZB0eBmruSyzIWQdtDad1m1AMQZDZD'
                }
            }
         }
    }
    , data: {
        local_test_step: {
            /*
             * You should update this section with some test input for testing your module
             */
            input: {
                //Replace VAR1 with the name of an expected input, and add more inputs as needed.
                user_id: '1074784802592576',
                // text_message: 'test message from dexter CLI',
                attachment: {
                    'type': 'template',
                    'payload': {
                        'template_type': 'generic',
                        'elements': [
                            {
                                'title': 'first bubble',
                                'image_url': 'https://media.giphy.com/media/Fc7LvGqKt3C8/giphy.gif',
                                'buttons': [
                                    {
                                        'type': 'web_url',
                                        'url': 'https://rundexter.com',
                                        'title': 'take me to dexter!'
                                    },
                                    {
                                        'type': 'postback',
                                        'title': 'or send a ping to the callback',
                                        'payload': 'hihihihih'
                                    }
                                ]
                            },

                            {
                                'title': 'second bub',
                                'image_url': 'https://media.giphy.com/media/Fc7LvGqKt3C8/giphy.gif',
                            }
                        ]
                    }
                }
            }
        }
    }
}, env);
