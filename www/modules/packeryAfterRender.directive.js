'use strict';

let packeryAfterRenderDirective = $timeout => {
    'ngInject';
    return {
        restrict: 'A',
        require: '^packery',
        priority: 0,
        link: (scope, element, attributes, controller) => {
            if (scope.$last) {
                let timeout = null;
                timeout = $timeout(() => {
                    controller.initialize();
                    $timeout.cancel(timeout);
                });
            }
        }
    };
};

export default packeryAfterRenderDirective;