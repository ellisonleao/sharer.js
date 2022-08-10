/**
 * @preserve
 * Sharer.js
 *
 * @description Create your own social share buttons
 * @version 0.5.1
 * @author Ellison Leao <ellisonleao@gmail.com>
 * @license MIT
 *
 */

(function (window, document) {
  'use strict';
  /**
   * @constructor
   */
  var Sharer = function (elem) {
    this.elem = elem;
    this.config = null;
    this.setup();
  };

  /**
   *  @function init
   *  @description bind the events for multiple sharer elements
   *  @returns {Empty}
   */
  Sharer.init = function () {
    var elems = document.querySelectorAll('[data-sharer]'),
      i,
      l = elems.length;

    for (i = 0; i < l; i++) {
      new Sharer(elems[i]);
    }
  };

  // instance methods
  Sharer.prototype = {
    constructor: Sharer,
    /**
     *  @function getValue
     *  @description Helper to get the attribute of a DOM element
     *  @param {String} attr DOM element attribute
     *  @returns {String|Empty} returns the attr value or empty string
     */
    getValue: function (attr) {
      var val = this.elem.getAttribute('data-' + attr);
      // handing facebook hashtag attribute
      if (val && attr === 'hashtag') {
        if (!val.startsWith('#')) {
          val = '#' + val;
        }
      }
      return val === null ? '' : val;
    },

    /**
     * @function getUrl
     * @description Return the URL to share
     * @returns {String} returns the encoded URL
     */
    getUrl: function () {
      var url = this.getValue('url');
      if (!url) {
        url = document.location.href;
      }

      // Add URL params
      var params = this.getValue('params');
      if (params && params.length) {
        if (url.indexOf('?') < 0) {
          url += '?';
        } else if (params[0] !== '&') {
          params = '&' + params;
        }
        url = url + params;
      }

      return url;
    },

    /**
     * @function Setup
     * @description Setup the element for sharing
     */
    setup: function () {
      this.config = this.getShareConfig();
      if (!this.config) {
        return;
      }

      // Hide share element if not supported
      if (this.config.hidden) {
        this.elem.style.display = 'none';
        return;
      }

      this.elem.addEventListener('click', () => this.share());
    },

    /**
     * @function getShareConfig
     * @description Return the sharing config for the target element
     * @returns {Object} Sharing config object
     */
    getShareConfig: function () {
      var sharer = this.getValue('sharer').toLowerCase(),
        sharers = {
          facebook: {
            shareUrl: 'https://www.facebook.com/sharer/sharer.php',
            params: {
              u: this.getUrl(),
              hashtag: this.getValue('hashtag'),
              quote: this.getValue('quote'),
            },
          },
          linkedin: {
            shareUrl: 'https://www.linkedin.com/shareArticle',
            params: {
              url: this.getUrl(),
              mini: true,
            },
          },
          twitter: {
            shareUrl: 'https://twitter.com/intent/tweet/',
            params: {
              text: this.getValue('title'),
              url: this.getUrl(),
              hashtags: this.getValue('hashtags'),
              via: this.getValue('via'),
              related: this.getValue('related'),
              in_reply_to: this.getValue('in_reply_to'),
            },
          },
          email: {
            shareUrl: 'mailto:' + this.getValue('to'),
            params: {
              subject: this.getValue('subject'),
              body: this.getValue('title') + '\n' + this.getUrl(),
            },
          },
          whatsapp: {
            shareUrl: this.getValue('web') === 'true' ? 'https://web.whatsapp.com/send' : 'https://wa.me/',
            params: {
              phone: this.getValue('to'),
              text: this.getValue('title') + ' ' + this.getUrl(),
            },
          },
          telegram: {
            shareUrl: 'https://t.me/share',
            params: {
              text: this.getValue('title'),
              url: this.getUrl(),
            },
          },
          viber: {
            shareUrl: 'viber://forward',
            params: {
              text: this.getValue('title') + ' ' + this.getUrl(),
            },
          },
          line: {
            shareUrl: 'http://line.me/R/msg/text/?' + encodeURIComponent(this.getValue('title') + ' ' + this.getUrl()),
          },
          pinterest: {
            shareUrl: 'https://www.pinterest.com/pin/create/button/',
            params: {
              url: this.getUrl(),
              media: this.getValue('image'),
              description: this.getValue('description'),
            },
          },
          tumblr: {
            shareUrl: 'http://tumblr.com/widgets/share/tool',
            params: {
              canonicalUrl: this.getUrl(),
              content: this.getUrl(),
              posttype: 'link',
              title: this.getValue('title'),
              caption: this.getValue('caption'),
              tags: this.getValue('tags'),
            },
          },
          hackernews: {
            shareUrl: 'https://news.ycombinator.com/submitlink',
            params: {
              u: this.getUrl(),
              t: this.getValue('title'),
            },
          },
          reddit: {
            shareUrl: 'https://www.reddit.com/submit',
            params: { url: this.getUrl(), title: this.getValue('title') },
          },
          vk: {
            shareUrl: 'http://vk.com/share.php',
            params: {
              url: this.getUrl(),
              title: this.getValue('title'),
              description: this.getValue('caption'),
              image: this.getValue('image'),
            },
          },
          xing: {
            shareUrl: 'https://www.xing.com/social/share/spi',
            params: {
              url: this.getUrl(),
            },
          },
          buffer: {
            shareUrl: 'https://buffer.com/add',
            params: {
              url: this.getUrl(),
              title: this.getValue('title'),
              via: this.getValue('via'),
              picture: this.getValue('picture'),
            },
          },
          instapaper: {
            shareUrl: 'http://www.instapaper.com/edit',
            params: {
              url: this.getUrl(),
              title: this.getValue('title'),
              description: this.getValue('description'),
            },
          },
          pocket: {
            shareUrl: 'https://getpocket.com/save',
            params: {
              url: this.getUrl(),
            },
          },
          mashable: {
            shareUrl: 'https://mashable.com/submit',
            params: {
              url: this.getUrl(),
              title: this.getValue('title'),
            },
          },
          mix: {
            shareUrl: 'https://mix.com/add',
            params: {
              url: this.getUrl(),
            },
          },
          flipboard: {
            shareUrl: 'https://share.flipboard.com/bookmarklet/popout',
            params: {
              v: 2,
              title: this.getValue('title'),
              url: this.getUrl(),
              t: Date.now(),
            },
          },
          weibo: {
            shareUrl: 'http://service.weibo.com/share/share.php',
            params: {
              url: this.getUrl(),
              title: this.getValue('title'),
              pic: this.getValue('image'),
              appkey: this.getValue('appkey'),
              ralateUid: this.getValue('ralateuid'),
              language: 'zh_cn',
            },
          },
          blogger: {
            shareUrl: 'https://www.blogger.com/blog-this.g',
            params: {
              u: this.getUrl(),
              n: this.getValue('title'),
              t: this.getValue('description'),
            },
          },
          baidu: {
            shareUrl: 'http://cang.baidu.com/do/add',
            params: {
              it: this.getValue('title'),
              iu: this.getUrl(),
            },
          },
          douban: {
            shareUrl: 'https://www.douban.com/share/service',
            params: {
              name: this.getValue('name'),
              href: this.getUrl(),
              image: this.getValue('image'),
              comment: this.getValue('description'),
            },
          },
          okru: {
            shareUrl: 'https://connect.ok.ru/dk',
            params: {
              'st.cmd': 'WidgetSharePreview',
              'st.shareUrl': this.getUrl(),
              title: this.getValue('title'),
            },
          },
          mailru: {
            shareUrl: 'http://connect.mail.ru/share',
            params: {
              share_url: this.getUrl(),
              linkname: this.getValue('title'),
              linknote: this.getValue('description'),
              type: 'page',
            },
          },
          evernote: {
            shareUrl: 'https://www.evernote.com/clip.action',
            params: {
              url: this.getUrl(),
              title: this.getValue('title'),
            },
          },
          skype: {
            shareUrl: 'https://web.skype.com/share',
            params: {
              url: this.getUrl(),
              title: this.getValue('title'),
            },
          },
          delicious: {
            shareUrl: 'https://del.icio.us/post',
            params: {
              url: this.getUrl(),
              title: this.getValue('title'),
            },
          },
          sms: {
            shareUrl: 'sms://',
            params: {
              body: this.getValue('body'),
            },
          },
          trello: {
            shareUrl: 'https://trello.com/add-card',
            params: {
              url: this.getUrl(),
              name: this.getValue('title'),
              desc: this.getValue('description'),
              mode: 'popup',
            },
          },
          messenger: {
            shareUrl: 'fb-messenger://share',
            params: {
              link: this.getUrl(),
            },
          },
          odnoklassniki: {
            shareUrl: 'https://connect.ok.ru/dk',
            params: {
              st: {
                cmd: 'WidgetSharePreview',
                deprecated: 1,
                shareUrl: this.getUrl(),
              },
            },
          },
          meneame: {
            shareUrl: 'https://www.meneame.net/submit',
            params: {
              url: this.getUrl(),
            },
          },
          diaspora: {
            shareUrl: 'https://share.diasporafoundation.org',
            params: {
              title: this.getValue('title'),
              url: this.getUrl(),
            },
          },
          googlebookmarks: {
            shareUrl: 'https://www.google.com/bookmarks/mark',
            params: {
              op: 'edit',
              bkmk: this.getUrl(),
              title: this.getValue('title'),
            },
          },
          qzone: {
            shareUrl: 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey',
            params: {
              url: this.getUrl(),
            },
          },
          refind: {
            shareUrl: 'https://refind.com',
            params: {
              url: this.getUrl(),
            },
          },
          surfingbird: {
            shareUrl: 'https://surfingbird.ru/share',
            params: {
              url: this.getUrl(),
              title: this.getValue('title'),
              description: this.getValue('description'),
            },
          },
          yahoomail: {
            shareUrl: 'http://compose.mail.yahoo.com',
            params: {
              to: this.getValue('to'),
              subject: this.getValue('subject'),
              body: this.getValue('body'),
            },
          },
          wordpress: {
            shareUrl: 'https://wordpress.com/wp-admin/press-this.php',
            params: {
              u: this.getUrl(),
              t: this.getValue('title'),
              s: this.getValue('title'),
            },
          },
          amazon: {
            shareUrl: 'https://www.amazon.com/gp/wishlist/static-add',
            params: {
              u: this.getUrl(),
              t: this.getValue('title'),
            },
          },
          pinboard: {
            shareUrl: 'https://pinboard.in/add',
            params: {
              url: this.getUrl(),
              title: this.getValue('title'),
              description: this.getValue('description'),
            },
          },
          threema: {
            shareUrl: 'threema://compose',
            params: {
              text: this.getValue('text'),
              id: this.getValue('id'),
            },
          },
          kakaostory: {
            shareUrl: 'https://story.kakao.com/share',
            params: {
              url: this.getUrl(),
            },
          },
          yummly: {
            shareUrl: 'http://www.yummly.com/urb/verify',
            params: {
              url: this.getUrl(),
              title: this.getValue('title'),
              yumtype: 'button',
            },
          },
          share: {
            hidden: !navigator.share,
            handler: (params) => navigator.share(params),
            params: {
              url: this.getUrl(),
              title: this.getValue('title'),
              text: this.getValue('description'),
            },
          },
        };
      return sharers[sharer];
    },

    /**
     * @event share
     * @description Main share event. Will pop a window or redirect to a link
     * based on the data-sharer attribute.
     */
    share: function () {
      if (!this.config) {
        return false;
      }

      // custom popups sizes
      this.config.width = this.getValue('width');
      this.config.height = this.getValue('height');
      return this.urlSharer(this.config);
    },

    /**
     * @event urlSharer
     * @param {Object} sharer
     */
    urlSharer: function (sharer) {
      var p = sharer.params || {},
        keys = Object.keys(p),
        i,
        str = keys.length > 0 ? '?' : '';
      for (i = 0; i < keys.length; i++) {
        if (str !== '?') {
          str += '&';
        }
        if (p[keys[i]]) {
          str += keys[i] + '=' + encodeURIComponent(p[keys[i]]);
        }
      }
      sharer.shareUrl += str;

      var isLink = this.getValue('link') === 'true';
      var isBlank = this.getValue('blank') === 'true';

      if (isLink) {
        // Share link
        if (isBlank) {
          window.open(sharer.shareUrl, '_blank');
        } else {
          window.location.href = sharer.shareUrl;
        }
      } else if (sharer.handler) {
        // Custom share handler
        sharer.handler(sharer.params);
      } else {
        // defaults to popup if no data-link is provided
        var popWidth = sharer.width || 600,
          popHeight = sharer.height || 480,
          left = window.innerWidth / 2 - popWidth / 2 + window.screenX,
          top = window.innerHeight / 2 - popHeight / 2 + window.screenY,
          popParams = 'scrollbars=no, width=' + popWidth + ', height=' + popHeight + ', top=' + top + ', left=' + left,
          newWindow = window.open(sharer.shareUrl, '', popParams);

        if (window.focus) {
          newWindow.focus();
        }
      }
    },
  };

  // adding sharer events on domcontentload
  if (document.readyState === 'complete' || document.readyState !== 'loading') {
    Sharer.init();
  } else {
    document.addEventListener('DOMContentLoaded', Sharer.init);
  }

  // exporting sharer for external usage
  window.Sharer = Sharer;
})(window, document);
