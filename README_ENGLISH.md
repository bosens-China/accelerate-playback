# accelerate-playback

A Greasemonkey plugin for accelerating playback, which requires the installation of a browser extension.

- https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd

> The above link is for the Edge Store.

## How to use

1. Modify the `match` range in the increase.mjs file to adjust the websites that require accelerated playback.
2. Modify the effect.ts file to locate the video element according to the default logic.
3. Run `npm run build`.

## Future development plans

- Improve the storage logic and verify boundary cases.
- Improve the effect section to support clicking the next item (for oneself).

## License

MIT License.
