'use strict';

import packeryDirective from './modules/packery.directive';
import packeryItemDirective from './modules/packeryItem.directive';
import packeryAfterRenderDirective from './modules/packeryAfterRender.directive';

angular.module('ngPackery', [])
    .directive('packery', packeryDirective)
    .directive('packeryItem', packeryItemDirective)
    .directive('packeryAfterRender', packeryAfterRenderDirective);