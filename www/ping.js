
var utils = require('cordova/utils'),
	exec = require('cordova/exec'),
	cordova = require('cordova');

class Ping {
	constructor(){
		this.results = null;
	}
	init(options) {
		return new Promise((resolve, reject) =>{
			exec((res) => {
                resolve(res);
            }, (ex) => {
				reject(ex);
            }, 'Ping', 'createInstance', options);
		})
	}
    start() {
        return new Promise((resolve, reject) => {
            exec((result) => {
                let resp;
                try {
					resp = JSON.parse(result);
                }
                catch (ex) {
					resp = result;
                }
                resolve(resp);
            }, (ex) => {
				reject(ex);
            }, 'Ping', 'start', []);
        });
    }
    stop() {
        return new Promise((resolve, reject) => {
            exec((res) => {
                resolve(res);
            }, (ex) => {
                reject(ex);
            }, 'Ping', 'stop', []);
        });
    }
}

module.exports = Ping;
