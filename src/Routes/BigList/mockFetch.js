const mockFetch = (startIdx, stopIdx, statusTrackingObj) => {
  return new Promise(resolve =>
    setTimeout(() => {
      for (let index = startIdx; index <= stopIdx; index++) {
        statusTrackingObj[index] = 1;
      }
      resolve();
    }, 250)
  );
}
export default mockFetch;