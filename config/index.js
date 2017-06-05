var config = require('./config');

module.exports = {
	connDB: () => {
		return 'mongodb://' + config.usr + ':' + config.pwd + '@ds163301.mlab.com:63301/nodetodosample';
	}
}