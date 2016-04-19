# angular-packery
[AngularJS](http://angularjs.org/) Directive for Packery Layout by [David DeSandro](http://packery.metafizzy.co/)

## Usage
### Browserify
install from npm
```npm
npm install --save ng-packery 
```
require module
```js
var ngPackery = require('ngPackery')
```
attach module to application
```js
var app = angular.module('app', [ngPackery]);
```

### Manually
include in HTML
```html
<!-- Dependencies -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/packery/1.4.3/packery.pkgd.min.js"></script>
<!-- End Dependencies -->

<script src="angular-packery.js"></script>
```
attach to application
```js
var app = angular.module('app', ['ngPackery']);
```

## Example
Any options listed in [Packery](http://packery.metafizzy.co/options.html) website can be used in the 'data-packery-options' attribute
```html
<packery data-packery-options='{ "columnWidth": 200 }'>
    <packery-item data-ng-repeat="item in list">
        {{ item }}
    </packery-item>
</packery>
```

## Credits
This directive is created based on Packery Layout by [David DeSandro](http://packery.metafizzy.co/)