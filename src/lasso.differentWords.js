lasso.differentWords = function (a, b) {
	var aLoose = a.toLowerCase().match(/[a-zA-Z0-9 ]+/g).join(' ').replace(/[ ]+/g, ' ');
  var bLoose = b.toLowerCase().match(/[a-zA-Z0-9 ]+/g).join(' ').replace(/[ ]+/g, ' ');
  var aLooseSplit = aLoose.split(' ');
  var bLooseSplit = bLoose.split(' ');
  var differentWords = [];
  var i = aLooseSplit.length - 1;
  var index;
  while (i >= 0) {
  	index = bLooseSplit.indexOf(aLooseSplit[i]);
		if (index === -1) {
			differentWords.push(aLooseSplit[i]);
		}
    while (index > -1) {
      bLooseSplit.splice(index, 1);
    	index = bLooseSplit.indexOf(aLooseSplit[i]);
    }
    i -= 1;
  }
	i = bLooseSplit.length - 1;
	while (i >= 0) {
		index = aLooseSplit.indexOf(bLooseSplit[i]);
		if (index === -1 && differentWords.indexOf(bLooseSplit[i]) === -1) {
			differentWords.push(bLooseSplit[i]);
		}
    while (index > -1) {
      aLooseSplit.splice(index, 1);
    	index = aLooseSplit.indexOf(bLooseSplit[i]);
    }
    i -= 1;
	}
	return differentWords;
};
