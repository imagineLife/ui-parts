const categorizeSingleRow = (dataArr, indexArr, srcObj, headerData) => {
	
	//first-row consistent vars
	let thisID;				//the column id
	
	dataArr.forEach((itm, idx) => {
		let storageStr = indexArr[idx]
		//id column
		if(idx == 0){
			thisID = itm;

		//state-name column
		}else if(idx == 1){
			srcObj.state = itm;
			srcObj.id = thisID;
			
		}else if([2,3].includes(idx) || indexArr[idx] === "_"){
			return;
		}else if(!indexArr[idx] || indexArr[idx][0] == '_'){
			return;
		
		//data-columns
		}else{
			const storageArr = storageStr.split('.')
			let firstLevel = srcObj[storageArr[0]]
			let lastChildKey = firstLevel[storageArr[1]]
			if(storageArr.length == 3){
				lastChildKey = srcObj[storageArr[0]][storageArr[1]][storageArr[2]]
			}
			srcObj[storageArr[0]][storageArr[1]][storageArr[2]] = parseFloat(itm);
			return;
		}
	})

	return srcObj;
}

module.exports = {
	categorizeSingleRow
}