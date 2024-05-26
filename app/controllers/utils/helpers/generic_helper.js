// import moment from 'moment';
// import genericError from '../errors/generic';
// import constants from '../constants';

// const { serverError } = genericError;
// const { FAIL, SUCCESS } = constants;

/**
 *Contains GenericHelper methods
 * @class GenericHelper
 */
class GenericHelper {
  /**
   * Generates a JSON response for success scenarios.
   * @static
   * @param {Response} res - Response object.
   * @param {object} options - An object containing response properties.
   * @param {object} options.data - The payload.
   * @param {string} options.message -  HTTP Status code.
   * @param {number} options.code -  HTTP Status code.
   * @memberof GenericHelpers
   * @returns {JSON} - A JSON success response.
   */
  static successResponse(res, { data, message = SUCCESS, code = 200 }) {
    // logger.debug(`successfully processed request with final response ${JSON.stringify(data)}`);
    return res.status(200).json({
      message,
      code,
      data
    });
  }

  /**
   * Generates a JSON response for failure scenarios.
   * @static
   * @param {Request} req - Request object.
   * @param {Response} res - Response object.
   * @param {object} error - The error object.
   * @param {number} error.status -  HTTP Status code, default is 500.
   * @param {string} error.message -  Error message.
   * @param {object|array} error.errors -  A collection of  error message.
   * @memberof GenericHelpers
   * @returns {JSON} - A JSON failure response.
   */
//   static errorResponse(req, res, error) {
//     logger.debug(`failed to process request due to ${JSON.stringify(error)}`);
//     const aggregateError = { ...serverError, ...error };
//     GenericHelper.apiErrLogMessager(aggregateError, req);
//     return res.status(aggregateError.status).json({
//       message: aggregateError.message ? aggregateError.message : FAIL,
//       code: aggregateError.status,
//       data: null,
//       errors: aggregateError.errors
//     });
//   }

  /**
   * Generates log for module errors.
   * @static
   * @param {object} error - The module error object.
   * @memberof GenericHelpers
   * @returns { Null } -  It returns null.
   */
  static moduleErrLogMessager(error) {
    return logger.error(`${error.status} - ${error.name} - ${error.message}`);
  }

  /**
   * Generates log for api errors.
   * @static
   * @private
   * @param {object} error - The API error object.
   * @param {Request} req - Request object.
   * @memberof GenericHelpers
   * @returns {String} - It returns null.
   */
  static apiErrLogMessager(error, req) {
    logger.error(
      `${error.name} - ${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }

  /**
   * validates an input based on a schema
   * @static
   * @memberof GenericHelper
   * @returns { boolean }
   */
  static async validateInput(schema, object) {
    return schema.validateAsync(object);
  }

  static calcNoOfPages(total, limit = 10) {
    const displayPage = Math.floor(total / limit);
    return total % limit ? displayPage + 1 : displayPage;
  }

  static async getPageCount(model, filter, limit = 10) {
    const count = await GenericHelper.countDocuments(model, filter);
    return GenericHelper.calcNoOfPages(count, limit);
  }

  static async countDocuments(model, filter) {
    return model.countDocuments(filter);
  }

  static parseClosingTime(timeString) {
    const timeParts = timeString.split(':').map(part => parseInt(part, 10));
    const timeDate = new Date();
    timeDate.setHours(timeParts[0]);
    timeDate.setMinutes(timeParts[1]);
    return timeDate;
  }

  static dateFormatter(dateString) {
    return moment(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD');
  }
}

export default GenericHelper;