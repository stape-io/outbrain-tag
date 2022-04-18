const sendHttpRequest = require('sendHttpRequest');
const setCookie = require('setCookie');
const parseUrl = require('parseUrl');
const JSON = require('JSON');
const getRequestHeader = require('getRequestHeader');
const encodeUriComponent = require('encodeUriComponent');
const getCookieValues = require('getCookieValues');
const getEventData = require('getEventData');

const logToConsole = require('logToConsole');
const getContainerVersion = require('getContainerVersion');
const containerVersion = getContainerVersion();
const isDebug = containerVersion.debugMode;
const isLoggingEnabled = determinateIsLoggingEnabled();
const traceId = getRequestHeader('trace-id');

if (data.type === 'page_view') {
    const url = getEventData('page_location') || getRequestHeader('referer');

    if (url) {
        const value = parseUrl(url).searchParams[data.clickIdParameterName];

        if (value) {
            const options = {
                domain: 'auto',
                path: '/',
                secure: true,
                httpOnly: false
            };

            if (data.expiration > 0) options['max-age'] = data.expiration;

            setCookie('outbrain_cid', value, options, false);
        }
    }

    data.gtmOnSuccess();
} else {
    const outbrain_cid = getCookieValues('outbrain_cid')[0] || '';

    let requestUrl = 'https://tr.outbrain.com/unifiedPixel?ob_click_id=' + enc(outbrain_cid);
        requestUrl = requestUrl + '&name=' + enc(data.name);

    if (data.orderId) {
        requestUrl = requestUrl + '&orderId=' + enc(data.orderId);
    }

    if (data.orderValue) {
        requestUrl = requestUrl + '&orderValue=' + enc(data.orderValue);
    }

    if (data.currency) {
        requestUrl = requestUrl + '&currency=' + enc(data.currency);
    }

    if (isLoggingEnabled) {
        logToConsole(JSON.stringify({
            'Name': 'Outbrain',
            'Type': 'Request',
            'TraceId': traceId,
            'EventName': 'Conversion',
            'RequestMethod': 'GET',
            'RequestUrl': requestUrl,
        }));
    }

    sendHttpRequest(requestUrl, (statusCode, headers, body) => {
        if (isLoggingEnabled) {
            logToConsole(JSON.stringify({
                'Name': 'Outbrain',
                'Type': 'Response',
                'TraceId': traceId,
                'EventName': 'Conversion',
                'ResponseStatusCode': statusCode,
                'ResponseHeaders': headers,
                'ResponseBody': body,
            }));
        }

        if (statusCode >= 200 && statusCode < 300) {
            data.gtmOnSuccess();
        } else {
            data.gtmOnFailure();
        }
    }, {method: 'GET'});
}

function enc(data) {
    data = data || '';
    return encodeUriComponent(data);
}

function determinateIsLoggingEnabled() {
    if (!data.logType) {
        return isDebug;
    }

    if (data.logType === 'no') {
        return false;
    }

    if (data.logType === 'debug') {
        return isDebug;
    }

    return data.logType === 'always';
}
