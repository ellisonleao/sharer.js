/*
 * sharer.js
 *
 * Tiny js lib to create a simple share component. No deps.
 * Version: 0.1.0
 * Author: Ellison Leao
 *
 */

;(function (window, document) {
    "use strict";
    var Sharer = function(elem) {
        this.elem = elem;
    };

    Sharer.prototype = {
        share: function() {
            var sharer = this.elem.getAttribute('data-sharer');
            switch (sharer) {
                case 'facebook':
                    var shareUrl = 'http://www.facebook.com/sharer/sharer.php',
                        params = {
                            u: this.elem.getAttribute('data-url')
                         };
                    this.urlSharer(shareUrl, params);
                    break;
                case 'googleplus':
                    var shareUrl = 'https://plus.google.com/share',
                        params = {
                            url: this.elem.getAttribute('data-url')
                         };
                    this.urlSharer(shareUrl, params);
                    break;
                case 'linkedin':
                    var shareUrl = 'https://www.linkedin.com/shareArticle',
                        params = {
                            url: this.elem.getAttribute('data-url'),
                            mini: true
                        }
                    this.urlSharer(shareUrl, params);
                    break;
                case 'twitter':
                    this.tw();
                    break;
                case 'email':
                    this.email();
                    break;
                default:
                    break;
            }
        },

        urlSharer: function(shareUrl, params) {
            var params = typeof params === 'object' ? params : {},
                keys = Object.keys(params),
                i,
                str = '?';
            for (i = 0; i < keys.length; i++) {
                if (str !== '?') {
                    str += '&';
                }
                str += keys[i] + '=' + params[keys[i]];
            }
            shareUrl += str;
            window.open(shareUrl, '', 'height=400,width=400,scrollbars=no');
        },

       tw: function() {
            var text = this.elem.getAttribute('data-title'),
                params = '?text='+encodeURIComponent(text)+'&url='+encodeURIComponent(this.elem.getAttribute('data-url')),
                url = 'https://twitter.com/intent/tweet/' + params;
            window.open(url, '', 'height=400,width=400,scrollbars=no');
        },

        email: function() {
            var to = this.elem.getAttribute('data-to') || '',
                subject = this.elem.getAttribute('data-subject'),
                body = subject + '\n'+ this.elem.getAttribute('data-title') + '\n' + this.elem.getAttribute('data-url'),
                params = to + '?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
            window.location.href = "mailto:" + params;
        }
    }

    window.addEventListener('load', function() {
        var elems = document.querySelectorAll('.sharer'),
            i,
            l = elems.length;

        for (i = 0; i < l ; i++) {
            elems[i].addEventListener('click', function(){
                var sharer = new Sharer(this);
                sharer.share();
            }, false);
        }
    });
})(window, document);
