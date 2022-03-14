import mockFetch from './mockFetch';

async function loadMoreItems(startIndex, stopIndex, itmStatusObj){
  for (let index = startIndex; index <= stopIndex; index++) {
    itmStatusObj[index] = 2;
  }
  return await mockFetch(startIndex, stopIndex, itmStatusObj);
}

export default loadMoreItems;