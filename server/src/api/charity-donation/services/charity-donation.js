'use strict';

/**
 * charity-donation service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::charity-donation.charity-donation');
