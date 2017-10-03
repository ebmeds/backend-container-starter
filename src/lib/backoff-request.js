import request from 'request';
import backoff from 'backoff';

const defaultBackoffOpts = {
  initialDelay: 10,
  maxDelay: 300,
  failAfter: 10,
};

/**
 * HTTP request that gets retried on failure using a Fibonacci backoff algorithm.
 * @param  {Object} requestOpts The same options as for the regular request(...) function call.
 * @param  {Object} backoffOpts Options related to the backoff algorithm. initialDelay = The first delay value (in ms), to get the Fibonacci series started. Default: 10 ms. maxDelay = Maximum delay value allowed in Fibonacci series (in ms). Default: 300. failAfter = how many times to retry. Default: 10.
 * @return {Promise}             Returns a promise that resolves to the response (res) object returned by the successful request, or an Error containing the error message and status of the last failed request attempt ({ lastError, lastStatus}).
 */
export default function backoffRequest(
  requestOpts,
  backoffOpts = defaultBackoffOpts,
) {
  return new Promise((resolve, reject) => {
    const fibonacciBackoff = backoff.fibonacci(backoffOpts);

    fibonacciBackoff.failAfter(backoffOpts.failAfter);

    let lastError;
    let lastStatus;

    fibonacciBackoff.on('ready', () => {
      // Do something when backoff ends, e.g. retry a failed
      // operation (DNS lookup, API call, etc.). If it fails
      // again then backoff, otherwise reset the backoff
      // instance.
      request(requestOpts, (error, res) => {
        // body should be a string or buffer
        if (error || res.statusCode !== 200) {
          lastError = error;
          lastStatus = res.statusCode;
          fibonacciBackoff.backoff();
        } else {
          fibonacciBackoff.reset();
          resolve(res);
        }
      });
    });

    fibonacciBackoff.on('fail', () => {
      // Do something when the maximum number of backoffs is
      // reached, e.g. ask the user to check its connection.
      reject(new Error({ lastError, lastStatus }));
    });

    fibonacciBackoff.backoff();
  });
}
