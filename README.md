
Sharer.js
=========

Sharer.js is a very tiny js lib (~1.6kb) to create custom social share components on DOM elements for your website. Sharer.js has no dependencies.
Currently supporting Facebook, Twitter, Google Plus, Linkedin and Email Message.

# Usage:

## Grab the latest min version and add on your page

```html
<script src="js/sharer.min.js"></script>
```

## Adding share behaviour to a component

Simply add the `sharer` class and the attributes above:

- `data-url`: URL you want to share
- `data-title`: Title of the share message (twitter, email, only)
- `data-to`: Email to (Email only)
- `data-subject`: Email subject (Email only)


## Examples:

### Facebook / Gplus / Linkedin:

```html
<button class="sharer" data-url="http://mywesomeurl.com" data-sharer="facebook"></button>
<button class="sharer" data-url="http://mywesomeurl.com" data-sharer="googleplus"></button>
<button class="sharer" data-url="http://mywesomeurl.com" data-sharer="linkedin"></button>
```

### Twitter:

```html
<button class="sharer" data-url="http://mywesomeurl.com" data-sharer="twitter" data-title="Please check my awesome URL!"></button>
```

## Email

```html
<button class="sharer"
	data-url="http://mywesomeurl.com"
	data-sharer="email"
	data-title="Please check my awesome URL!"
	data-to="someemail@test.com"
	data-subject="Hey, check this out!"></button>
```
