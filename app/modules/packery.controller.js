'use strict';

class packeryController {
    constructor() {
        this.config = {};
        this.container = undefined;
    }

    ready() {
        return !!this.config;
    }

    initialize() {
        if (this.container === undefined) {
            let defaultOpts = {itemSelector: 'packery-item'},
                opts = !this.config.packeryOptions ? defaultOpts : $.extend(defaultOpts, this.config.packeryOptions);

            this.container = new Packery(this.config.packeryContainer[0], opts);
        }
    }
}

export default packeryController;