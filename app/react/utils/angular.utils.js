let angularInjector = null;

export function registerInjector(injector) {
  if (!angularInjector) {
    angularInjector = injector;
  }
}

export function getService(serviceName) {
  if (!angularInjector) {
    return null;
  }

  return angularInjector.get(serviceName);
}
