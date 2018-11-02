export function log(type, ...args) {
  if (process.env.NODE_ENV === 'development') {
    console[type](...args);
  }
}

export function info(...args) {
  return log('info', ...args);
}

export function warn(...args) {
  return log('warn', ...args);
}

export function error(...args) {
  return log('error', ...args);
}
