import sleep from './sleep';

export default function exponentialBackoff(operation, {
  jitter, maxRetries = 10, baseDelay = 500, maxDelay = 7000,
}) {
  let currentAttempt = 0;
  const DELAY_AFTER_MAX_ATTEMPT = 4000;
  (async function retry() {
    let currentDelay = Math.min(baseDelay * currentAttempt, maxDelay);
    let jitterValue = 0;
    if (jitter) {
      jitterValue = Math.round(Math.random() * 400);
      currentDelay += jitterValue;
    }
    try {
      await sleep(currentDelay);
      return await operation();
    } catch (err) {
      if (currentAttempt === maxRetries) {
        await sleep(DELAY_AFTER_MAX_ATTEMPT);
        currentAttempt = 0;
        return retry();
      }
      currentAttempt += 1;
      return retry();
    }
  }());
}
