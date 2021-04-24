export default function mockFetch(cb, time){
  console.log('%c START MOCK FETCH', 'background-color: orange; color: white;')
  
  
  setTimeout(() => {
    console.log('%c DONE FETCHING', 'background-color: pink; color: black;')
    
    cb({thisIs: "an object"})
  }, time)
}