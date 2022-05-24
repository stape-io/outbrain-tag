# Outbrain tag for Google Tag Manager Server Side

There are two types of events that Outbrain tag includes: PageView and Conversion.

- Pageview event stores the Outbrain click ID URL parameter inside the outbrain_cid cookie.
- Conversion event sends a request with the specified conversion event data to Outbrain postback URL.

## How to use the Outbrain tag:

**Pageview** - add [Outbrain click ID](https://www.outbrain.com/help/advertisers/server2server-integrations/) parameter that was used in Outbrain campaign settings. Update outbrain_cid cookie lifetime is needed.

**Conversion events** - event name is required, other fields are optional.

- **Event Name** - event-based conversion name that was setup in Outbrain, case-sensitive.
- **Order ID** - unique booking or order reference that identifies event.
- **Total Order Value** - booking or order value.
- **Currency Code** - currency code in ISO standard (e.g., "GBP").

### Useful links:
- [Outbrain server-to-server tracking using sGTM](https://stape.io/blog/outbrain-server-to-server-tracking-using-sgtm)

## Open Source

Outbrain Tag for GTM Server Side is developed and maintained by [Stape Team](https://stape.io/) under the Apache 2.0 license.
