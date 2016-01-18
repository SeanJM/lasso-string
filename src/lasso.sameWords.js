lasso.sameWords = function (a, b) {
	var aLoose = a.toLowerCase().match(/[a-zA-Z0-9 ]+/g).join(' ').replace(/[ ]+/g, ' ');
  var bLoose = b.toLowerCase().match(/[a-zA-Z0-9 ]+/g).join(' ').replace(/[ ]+/g, ' ');
  var aLooseSplit = aLoose.split(' ');
  var bLooseSplit = bLoose.split(' ');
  var sameWords = [];
  var i = aLooseSplit.length - 1;
  var index;
  while (i >= 0) {
  	index = bLooseSplit.indexOf(aLooseSplit[i]);
    while (index > -1) {
    	sameWords.push(aLooseSplit[i]);
      bLooseSplit.splice(index, 1);
    	index = bLooseSplit.indexOf(aLooseSplit[i]);
    }
    i -= 1;
  }
	i = bLooseSplit.length - 1;
	while (i >= 0) {
		index = aLooseSplit.indexOf(bLooseSplit[i]);
    while (index > -1) {
			if (sameWords.indexOf(bLooseSplit[i]) === -1) {
				sameWords.push(bLooseSplit[i]);
			}
      aLooseSplit.splice(index, 1);
    	index = aLooseSplit.indexOf(bLooseSplit[i]);
    }
    i -= 1;
	}
	return sameWords;
};
