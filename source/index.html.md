---
title: QRL API

language_tabs: # must be one of https://git.io/vQNgJ
  - javascript: JavaScript
  - python: Python
  - curl: cURL

toc_footers:
  - <a href='https://github.com/theqrl'>QRL Github</a> 
  - <a href='https://theqrl.org'>TheQRL.org - Main Site</a>
  - <a href='https://docs.theqrl.org'>Docs.TheQRL.org - Documentation</a>
  - <a href='https://discord.gg/DHbZXB8'>Discord Chat</a> 


includes:
  - QRL.proto
  - qrlwallet.proto
  - walletAPI
  - qrlbase.proto
  - qrlstateinfo.proto
  - qrlmining.proto
  - qrldebug.proto
  - qrllegacy.proto
  - ScalarValueTypes
  - errors

search: true

---



# QRL API Documentation

## Introduction


```python
Example Code will be shown here.
```

```javascript
Example will be shown here.
```

The QRL API is organized around [GRPC](https://grpc.io/). GRPC uses [protocol buffers](https://developers.google.com/protocol-buffers/docs/overview) for serializing structured data. 

Every function requires an object as parameter and returns another object as response. Our qrl.proto file lists the different objects as messages in two categories, request (named \*Req) and response (named \*Resp).


<aside class="notice">
This is a work in progress, code may change. Please see the official documentation at <a href="https://docs.theqrl.org">https://docs.theqrl.org</a> or drop a line to <a href="mailto://support@theqrl.org">support@theqrl.org</a>
</aside>


## Basic Connection

```python
**fixme**


ADD INFO HERE!!


**fixme**
```

```javascript
// required libraries
let grpc = require('grpc');
let temp = require('temp').track();
let fs = require("fs-extra");
let qrllib = require('./node_modules/qrllib/build/libjsqrl.js');

async function fetchRemoteProto(nodeAddr) {
    let protoDescriptor = grpc.load('qrlbase.proto');
    let client = new protoDescriptor.qrl.Base(nodeAddr, grpc.credentials.createInsecure());

    return new Promise( (resolve) => {
        client.getNodeInfo({}, function (err, nodeInfo) {
            if (err) {
                throw err;
            }
            // path to the timestamp.proto file
            let requiredFile = '/tmp/google/protobuf/timestamp.proto';
            if (!fs.existsSync(requiredFile))
            {
                fs.ensureDirSync('/tmp/google/protobuf');
                fs.copySync('timestamp.proto', requiredFile, { overwrite : true });
            }
            temp.open('proto', (err, info) => {
                if (!err) {
                    fs.write(info.fd, nodeInfo.grpcProto);
                    fs.close(info.fd, function () {
                        let remoteProtoDescriptor = grpc.load(info.path);
                        resolve(remoteProtoDescriptor);
                    });
                }
            });
        });
    });
}

```

Connecting to the QRL network is simple. Use the examples shown to get started. 


<aside class="notice">
**fixme** There may be some specific details we should be calling out here!
</aside>




## Important information 

**OTS Keys**

> QRL uses XMSS to extend the available OTS keys. You need to be cognizant that you don't run out of available keys in a wallet.

<aside class="warning">
Warning! If you use all OTS keys the remaining funds will be locked. Please see the documentation at <a href="https://docs.theqrl.org/developers/ots/">docs.theqrl.org</a>
</aside>

You may generate a slaves.json file that is an extension of the main wallet, authorized to make transactions for the main wallet address. See the docs for more information [slave.json documentation](https://docs.theqrl.org/wallet/slaves.json/)




 



## Functions

Here are some required functions to make the examples below work. 


## getQRLClient()

```python
Enter Python code here **fixme**
```

```javascript
async function getQRLClient(nodeAddr) {
    return new Promise(resolve => {
        const remoteProto = fetchRemoteProto(nodeAddr);
        remoteProto.then(function (remoteProto) {
            let client = new remoteProto.qrl.PublicAPI(nodeAddr, grpc.credentials.createInsecure());
            resolve(client);
        });
    });
}
```

Connection to the QRL client according to the provide API URL.


## stringToBytes()

```python
Enter Python code here **fixme**
```



```javascript
stringToBytes = (convertMe) => {
  // Convert String to Binary First
  const thisBinary = qrllib.hstr2bin(convertMe)
  // Now convert to Bytes
  return binaryToBytes(thisBinary)
}
```

StringToBytes function converts a string to a byte array. This function requires the hstr2bin function from the qrllib.


## binaryToBytes()

```python
Enter Python code here **fixme**
``` 

```javascript
// Convert Binary object to Bytes
binaryToBytes = (convertMe) => {
  // Convert Binary to Bytes
  const thisBytes = new Uint8Array(convertMe.size())
  for (let i = 0; i < convertMe.size(); i += 1) {
    thisBytes[i] = convertMe.get(i)
  }
  return thisBytes
}
```
binaryToBytes converts a binary to a byte array.



## toBuffer()

```python
Enter Python code here
```

```javascript
function toBuffer(ab) {
  const buffer = Buffer.from(ab)
  return buffer
}
```
toBuffer creates a new Buffer and append the given object to it.



## Connecting to the API

```python
Enter Python code here
```

```javascript
// Connecting to the API
let qrlClient = getQRLClient('127.0.0.1:10002');
```
qrlClient variable defines the API URL with the corresponding port. In the example, the API is running locally on port 10002.



## concatenateTypedArrays()

```python
Enter Python code here
```

```javascript
// Concatenates multiple typed arrays into one.
concatenateTypedArrays = (resultConstructor, ...arrays) => {
    let totalLength = 0
    for (let arr of arrays) {
      totalLength += arr.length
    }
    let result = new resultConstructor(totalLength)
    let offset = 0
    for (let arr of arrays) {
      result.set(arr, offset)
      offset += arr.length
    }
    return result
}
```

concatenateTypedArrays function is necessary for some API function calls that requires a concatenated array (that is signed later on in the code).



## toBigendianUint64BytesUnsigned()

```python
Enter Python code here
```


```javascript
// Take input and convert to unsigned uint64 bigendian bytes
toBigendianUint64BytesUnsigned = (input) => {
  if(!Number.isInteger(input)) {
    input = parseInt(input)
  }

  const byteArray = [0, 0, 0, 0, 0, 0, 0, 0]

  for ( let index = 0; index < byteArray.length; index ++ ) {
    const byte = input & 0xff
    byteArray[index] = byte
    input = (input - byte) / 256
  }

  byteArray.reverse()

  const result = new Uint8Array(byteArray)
  return result
}

```

toBigendianUint64BytesUnsigned takes the provided input and converts to an array of unsigned uint64 bigendian bytes.




## Initiating Test Wallets

```python
Enter Python code here
```


```javascript
// initiating the test wallets to use
var testfromaddress = '0105006d232eb403a0248f9d4c0476c06a7d7a1d0425420df2dd915b7fb46cf7da132699c27b93'
var testfromaddress_bytes = stringToBytes(testfromaddress);

```
Example providing a wallet address (as hex) and the corresponding address as byte using the stringToBytes() function.   










