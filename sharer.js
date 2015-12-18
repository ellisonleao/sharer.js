/*
 * sharer.js
 *
 * Tiny js lib to create a simple share component. No deps.
 * Version: 0.1.0
 * Author: Ellison Leão
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
                    this.fb();
                    break;
                case 'twitter':
                    this.tw();
                    break;
                case 'email':
                    this.email();
                    break;
                case 'googleplus':
                    this.gplus();
                    break;
                default:
                    break;
            }
        },

        fb: function() {
            var url = encodeURIComponent(this.elem.getAttribute('data-url')),
                fbSharer = 'http://www.facebook.com/sharer/sharer.php?u=' + url;
            window.open(fbSharer, '', 'height=400,width=400,scrollbars=no');
        },

       tw: function() {
            var text = this.elem.getAttribute('data-title'),
                params = '?text='+encodeURIComponent(text)+'&url='+encodeURIComponent(this.elem.getAttribute('data-url')),
                url = 'https://twitter.com/intent/tweet/' + params;
            window.open(url, '', 'height=400,width=400,scrollbars=no');
        },

        gplus: function() {
            var url = 'https://plus.google.com/share',
                params = '?url='+encodeURIComponent(this.elem.getAttribute('data-url'));
            window.open(url + params, '', 'width=400,height=400,scrollbars=no');
        },

        email: function() {
            var to = this.elem.getAttribute('data-to'),
                subject = this.elem.getAttribute('data-subject'),
                body = subject + '\n'+ this.elem.getAttribute('data-title') + '\n' + this.elem.getAttribute('data-url'),
                params = to + '?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
            window.location.href = "mailto:" + params;
        }
    }

    var elems = document.querySelectorAll('.sharer'),
        i,
        l = elems.length;

    for (i = 0; i < l ; i++) {
        elems[i].addEventListener('click', function(){
            var sharer = new Sharer(this);
            sharer.share();
        });
    }
})(window, document);
