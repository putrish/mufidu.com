/**
 * Copyright (c) 2020 Google Inc
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Provides the default CSP (Content Security Policy).
 * Inline scripts must have the `csp-hash` attribute to be allowed.
 * Example: `<script csp-hash>console.log('Hello World')</script>`
 * For more info see https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
 * or the comments at the end of the `CSP` const below.
 */

const SELF = quote("self");

const CSP = {
  regular: serialize([
    // By default only talk to same-origin
    ["default-src", SELF],
    // No plugins
    ["object-src", quote("none")],
    // Script from same-origin and inline-hashes.
    [
      "script-src",
      SELF,
      /* Replaced by csp.js plugin */ "HASHES",
      "https://cdn.jsdelivr.net/",
      "https://www.instagram.com/",
      "https://platform.twitter.com/",
      "https://beampipe.io",
      "https://static.cloudflareinsights.com",
      "https://ajax.cloudflare.com",
      "https://unpkg.com",
      "https://utteranc.es/",
      "https://um.mufidu.com",
    ],
    // Inline CSS is allowed.
    ["style-src", quote("unsafe-inline"), "https://cdn.jsdelivr.net/"],
    // Images may also come from data-URIs.
    ["img-src", SELF, "data:", "https://i.ytimg.com/"],

    // To add new rules, add new array literals here or extend those above with
    // additional allowed elements.
    // Example for allowing YouTube iframe embeds
    // ['frame-src', 'https://www.youtube.com/embed/']
    [
      "frame-src",
      "https://www.youtube-nocookie.com/embed/",
      "https://open.spotify.com/",
      "https://www.instagram.com/",
      "https://platform.twitter.com/",
      "https://utteranc.es/",
    ],
    [
      "connect-src",
      "https://cloudflareinsights.com",
      "https://beampipe.io/",
      "https://mufidu.com",
      "https://um.mufidu.com",
    ],
  ]),
};

// Quotes CSP "keywords" like `none` or `self`. This function does very little
// but reads better than the inlined contents because of the nested quotes.
function quote(str) {
  return `'${str}'`;
}

function serialize(csp) {
  return csp.map((src) => src.join(" ")).join(";");
}

module.exports = () => CSP;
