'use strict';

import controller from './packery.controller';

let packeryDirective = () => {
    return {
        scope: {},
        controller,
        restrict: 'E',
        compile: element => {
            let flag = false,
                $obj = $(element).find('packery-item[ng-repeat], packery-item[data-ng-repeat], packery-item [ng-repeat], packery-item [data-ng-repeat]');

            if ($obj.length >= 1) {
                flag = true;
                $obj.attr('data-packery-after-render', '');
            }

            return {
                pre: (scope, element, attributes, controller) => {
                    controller.config.packeryContainer = element;
                    controller.config.packeryOptions = JSON.parse(attributes.packeryOptions || '{}');
                },
                post: (scope, element, attributes, controller) => {
                    if (!flag) {
                        controller.initialize();
                    }
                }
            };
        }
    };
};

export default packeryDirective;