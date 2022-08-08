export const getPositionPromised = (): Promise<GeolocationPosition> => {
  function successCb(
    cb: (value: GeolocationPosition | PromiseLike<GeolocationPosition>) => void
  ) {
    return (position: GeolocationPosition) => cb(position);
  }

  function errorCb(cb: (reason?: any) => void) {
    return () => cb("Could not retrieve geolocation");
  }

  return new Promise((resolve, reject) => {
    if (window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        successCb(resolve),
        errorCb(reject)
      );
    } else {
      return reject("No geolocation support");
    }
  });
};
