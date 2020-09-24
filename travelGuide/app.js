var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var AssistantV2 = require('ibm-watson/assistant/v2'); // watson sdk
const { IamAuthenticator } = require('ibm-watson/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
// Setup assistant
let authenticator;
if (process.env.ASSISTANT_IAM_APIKEY) {
    authenticator = new IamAuthenticator({
        apikey: process.env.ASSISTANT_IAM_APIKEY
    });
}
var assistant = new AssistantV2({
    version: process.env.ASSISTANT_VERSION,
    authenticator: authenticator,
    serviceUrl: process.env.ASSISTANT_IAM_URL,
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.get('/api/session', function(req, res) {
    assistant.createSession({
            assistantId: process.env.ASSISTANT_ID || '{assistant_id}',
        },
        function(error, response) {
            if (error) {
                console.log("Error")
                return res.send(error);
            } else {
                return res.send(response);
            }
        }
    );
});

app.post('/api/message', function(req, res) {
    // Give assistant some value if the environment variable hasnt been set in order to let the user know
    // that they haven't fully configured the app.
    let assistant = process.env.ASSISTANT_ID || '<assistant-id>';
    if (!assistantId || assistantId === '<assistant-id>') {
        // Match the format the watson response returns
        return res.json({
            output: {
                text: 'This app has not been configured with a <b>ASSISTANT_ID</b> environment variable.'
            }
        })
    }
    var text = '';
    if (req.body.input) {
        text = req.body.input.text;
    }
    var payload = {
        assistantId: assistantId,
        sessionId: req.body.session_id,
        input: {
            message_type: 'text',
            text: textIn,
        },
    };
    assistant.message(payload, function(err, data) {
        if (err) {
            const status = err.code !== undefined && err.code > 0 ? err.code : 500;
            return res.status(status).json(err)
        }
        return res.json(data);
    });
});

module.exports = app;