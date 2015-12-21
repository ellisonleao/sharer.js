Sharer.js
=========

Sharer.js is a very tiny js lib (~1.6kb) to create custom social share components on DOM elements for your website. Sharer.js has no dependencies.
Currently supporting Facebook, Twitter, Google Plus, Linkedin, WhatsApp and Email Message.

# Usage:

## Grab the latest min version and add on your page

```html
<script src="js/sharer.min.js"></script>
```

## Adding share behaviour to a component

### Available Sharer components:

- [#twitter](Twitter)
- [#facebook](Facebook)
- [#google-plus](Google Plus)
- [#email](Email)
- [#whatsapp](Whatsapp)
- [#telegram](Telegram)
- [#viber](Viber)

Simply add the `sharer` class and the attributes above:

- `data-url`: URL you want to share
- `data-title`: Title of the share message (twitter, whatsapp, email, only)
- `data-to`: Email to (Email only)
- `data-subject`: Email subject (Email only)


### Twitter:

Available Data params:

- `data-title`
- `data-url`


```html
<button class="sharer" data-url="http://mywesomeurl.com" data-sharer="twitter" data-title="Checkout my awesome url!"></button>
```

### Facebook:

Available Data params:

- `data-url`

```html
<button class="sharer" data-url="http://mywesomeurl.com" data-sharer="facebook"></button>
```

### Google Plus:

Available Data params:

- `data-url`

```html
<button class="sharer" data-url="http://mywesomeurl.com" data-sharer="googleplus"></button>
```

## Email

Available Data params:

- `data-title`
- `data-url`
- `data-to`
- `data-subject`

```html
<button class="sharer"
	data-url="http://mywesomeurl.com"
	data-sharer="email"
	data-title="Please check my awesome URL!"
	data-to="someemail@test.com"
	data-subject="Hey, check this out!"></button>
```

### WhatsApp

Available Data params:

- `data-title`
- `data-url`

```html
<button class="sharer" data-url="http://mywesomeurl.com" data-sharer="whatsapp" data-title="Please check my awesome URL!"></button>
```

### Telegram

Available Data params:

- `data-title`
- `data-url`

```html
<button class="sharer" data-url="http://mywesomeurl.com" data-sharer="telegram" data-title="Please check my awesome URL!"></button>
```

### Viber

Available Data params:

- `data-title`
- `data-url`

```html
<button class="sharer" data-url="http://mywesomeurl.com" data-sharer="viber" data-title="Please check my awesome URL!"></button>
```
