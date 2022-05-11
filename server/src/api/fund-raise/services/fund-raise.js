'use strict';

/**
 * fund-raise service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::fund-raise.fund-raise');
