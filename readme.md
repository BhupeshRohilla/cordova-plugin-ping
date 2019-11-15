
**
NOTE:
This repository is forked from: https://github.com/t1st3/cordova-plugin-ping
Changes are made on above repo due to the requirement to abort ping command in between.
Here, only 1 instance of ping process at a time can be started or stopped(abort)
unlike original repo where we can start multiple instances at the same time but cannot
stop any of them in between.
Starting and stopping of multiple instances is also possible but not implemented yet.
If required this feature can be implemented as explained at the top in file src/android/Ping.java
**

# cordova-plugin-ping

[![NPM version](https://img.shields.io/npm/v/cordova-plugin-ping.svg)](https://www.npmjs.org/package/cordova-plugin-ping)

This plugin implements the [`ping` software utility](https://en.wikipedia.org/wiki/Ping_%28networking_utility%29).


## Supported Platforms

- Android


## Installation

> cordova plugin add https://github.com/BhupeshRohilla/cordova-plugin-ping.git

## Usage

This plugin defines a global `Ping` object.
Although the object is in the global scope, it is not available until after the `deviceready` event.

### Ping a domain

> - query : Domain or IP address to ping.
> - timeout : Time to wait for a response, in seconds.
> - retry :  Number of echo requests to send.
> - version : Ping IPv4 or IPv6 address (Ping or Ping6).


```js
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
	startPing();
}

function async startPing(){
	let ipList = [{query: 'www.tiste.org', timeout: 1,retry: 3,version:'v4'}];
	let ping = new Ping();
	// Making instance of ping:
	await ping.init(ipList).then((meg) => {
		console.log(msg);                // msg = "Ping instance created."
	}).catch((err) => {
		console.log(err);                // err = "Error in arguments provided."
	});

	// Starting ping:
	ping.start().then((results) => {
		console.log(results);           // Ping results after completion.
	}).catch((err) => {
		console.log(err);
	});

	// Stoping ping:
	ping.stop().then((msg) => {
		console.log(msg);              // msg = "Ping aborted!"
	}).catch((err) => {
		console.log(err);              // err = "Ping not started." OR Exception.
	});

}
```

## API

### Ping.init

This method takes the following arguments:

* ipList: an array of json objects with parameters : domain to query, retry, timeout and version.

It returns a Promise which can be consumed as shown in above examples.

### Ping.start

This method starts ping and after completion of ping it returns a Promise with ping results in JSON array:

```json
[{
    "response": {
        "status": "success",
        "result": {
            "target": "www.tiste.org",
            "avgRtt": "4.476",
            "maxRtt": "6.348",
            "minRtt": "1.007",
            "pctTransmitted": "3",
            "pctReceived": "3",
            "pctLoss": "0%"
        }
    },
    "request": {
        "query": "www.tiste.org",
        "timeout": "1",
        "retry": "3",
        "version": "v4"
    }
 }]
```
### Ping.stop

It will stop/abort the ping process in the middle and returns a promise with a message.

## License

This project is licensed under the [MIT license](https://opensource.org/licenses/MIT). Check the [license file](https://github.com/t1st3/cordova-plugin-ping/blob/master/license).
