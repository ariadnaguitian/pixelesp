'use strict';

let packeryItemDirective = () => {
    return {
        restrict: 'E',
        require: '^packery',
        priority: 1
    };
};

export default packeryItemDirective;