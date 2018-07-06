---
title: QRL API

language_tabs: # must be one of https://git.io/vQNgJ
  - python: Python
  - javascript: JavaScript

toc_footers:
  - <a href='httsp://theqrl.org'>TheQRL.org</a>
  - <a href='https://github.com/theqrl'>QRL Github</a>

includes:
  - errors

search: true
---

# QRL Protocol Documentation

> Something here about setting up and running the API. This is from the test.js file

```python
# simple python3 library to allow interaction with remote QRL node using: grpc, xmss, kyber and dilithium, ephemeral

import qrl_pb2, qrl_pb2_grpc
import grpc
from pyqrllib.pyqrllib import bin2hstr, hstr2bin, bin2mnemonic, sha2_256, ucharVector, shake256
from pyqrllib import pyqrllib
from pyqrllib.kyber import Kyber
from pyqrllib.dilithium import Dilithium

from os import urandom


# XMSS via pyqrllib within a class

class Tree():
    def __init__(self, seed=None, height=10):
        if not seed:
            seed = useed()
        if height <3 or height % 2 != 0:            #h=2 or odd -> segfault
            height = 10
        self.seed = seed
        self.hexseed = bin2hstr(self.seed)
        self.mnemonic = bin2mnemonic(self.seed)
        self.xmss = pyqrllib.Xmss(seed=seed, height=height)
        self.PK = self.xmss.getPK()
        self.SK = self.xmss.getSK()
        self.height = self.xmss.getHeight()
        self.signatures = 2**self.height
        self.address = self.xmss.getAddress('Q')

    def set_index(self, index=None):
        if not index or index > 2**self.height:
            return
        self.xmss.setIndex(index)
        return

    def get_index(self):
        return self.xmss.getIndex()

    def remaining(self):
        return self.signatures-self.xmss.getIndex()

    def sign(self, message, index=None):
        if isinstance(message, bytes):                          #if being passed for a tx then it will be bytes already
            return bytes(self.xmss.sign(tuple(message)))
        else:
            return bin2hstr(self.xmss.sign(tuple(message.encode())))

    def verify(self, message, signature, PK):
        return self.xmss.verify(tuple(message.encode()), hstr2bin(signature), PK)

```


```python
Enter Python code here
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

The QRL Protocol documentation is intended to lighten the on-boarding process and get developers up to speed quickly. We want you building into the protocol, not trying to learn how to read it!

This is a work in progress and a such will change over time. Please make sure you are referencing the correct version of code and docs.

here are the various aside options

<aside class="notice">
Nitice! We need to update this section and give good info for setup and usage.
</aside>


<aside class="warning">
Warning! We need to update this section and give good info for setup and usage.
</aside>

<aside class="success">
Success! We need to update this section and give good info for setup and usage.
</aside>






## Functions

Here are some required functions to make the code examples work. 


## getQRLClient()

```python
Enter Python code here
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

> Need to  give tips on usage 

<aside class="notice">
We need to update this section and give good info for setup and usage.
</aside>



## stringToBytes

```python
Enter Python code here
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

> Need to  give tips on usage 

<aside class="notice">
We need to update this section and give good info for setup and usage.
</aside>



## binaryToBytes

```python
Enter Python code here
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

> Need to give tips on usage 

<aside class="notice">
We need to update this section and give good info for setup and usage.
</aside>



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

> Need to give tips on usage 

<aside class="notice">
We need to update this section and give good info for setup and usage.
</aside>




## Connecting to the API

```python
Enter Python code here
```




```javascript
// Connecting to the API
let qrlClient = getQRLClient('127.0.0.1:10002');
```
qrlClient variable defines the API URL with the corresponding port. In the example above, the API is runnign locally on port 10002.

> Need to  give tips on usage 

<aside class="notice">
We need to update this section and give good info for setup and usage.
</aside>





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

> Need to  give tips on usage 

<aside class="notice">
We need to update this section and give good info for setup and usage.
</aside>





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

> Need to  give tips on usage 

<aside class="notice">
We need to update this section and give good info for setup and usage.
</aside>






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

> Need to  give tips on usage 

<aside class="notice">
We need to update this section and give good info for setup and usage.
</aside>







# Addresses

## AddressList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses | [bytes](#bytes) | repeated |  |







## AddressState

```python
Enter Python code here
```


```javascript
testaddress = stringToBytes('01050048a8b31d8dda8a25c5c0d02994fe87e54032ba67910657ade9114d0cdff2eeb5f6285446');
qrlClient.then( function (qrlClient) {
    qrlClient.getAddressState({address : testaddress}, (err, res) => {
        if (err){
            console.log("Error: ", err.message);
            return;
        }
        // res is a GetAddressStateResp object
        console.log(res);
        // the resulting GetAddressStateResp object contains the following attributes
        console.log(res.state);
        console.log(res.state.address);
        console.log(res.state.balance);
        console.log(res.state.nonce);
        console.log(res.state.ots_bitfield);
        console.log(res.state.transaction_hashes);
        console.log(res.state.tokens);
        console.log(res.state.latticePK_list);
        console.log(res.state.slave_pks_access_type);
        console.log(res.state.ots_counter);
    });
});
```
### Test for GetObject for AddressState

getAddressState functions takes a wallet address as input (GetAddressStateReq object) and returns a GetAddressStateResp object.


<aside class="notice">
Results shown here.</aside>


## result

> result property

```python
Enter Python code here
```


```javascript
    it('GetObjectResp has correct *result* property', function(){
        expect(response).to.have.property('result');
        expect(response.result).to.be.a('string');
        expect(response.result).to.equal('address_state');
    });
```


Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
result property

## found property

```python
Enter Python code here
```


```javascript
    it('GetObjectResp has correct *found* property', function(){
        expect(response).to.have.property('found');
        expect(response.found).to.equal(true);
    });
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
result property


## transaction property


```python
Enter Python code here
```


```javascript    
    it('GetObjectResp has correct *transaction* property', function(){
        expect(response).to.have.property('transaction');
        expect(response.transaction).to.equal(null);
    });
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
result property


## block_extended property

```python
Enter Python code here
```


```javascript    
    it('GetObjectResp has correct *block_extended* property', function(){
        expect(response).to.have.property('block_extended');
        expect(response.block_extended).to.equal(null);
    });
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
result property



## address_state property

```python
Enter Python code here
```


```javascript    
    it('GetObjectResp has correct *address_state* property', function(){
        expect(response).to.have.property('address_state');
        expect(response.address_state).to.have.all.keys(['address','balance','nonce','ots_bitfield','transaction_hashes','tokens','latticePK_list','slave_pks_access_type','ots_counter']);
    });
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
result property


## AdressState.address property


```python
Enter Python code here
```


```javascript    
    it('GetObjectResp has correct *AdressState.address* property', function(){
        expect(Buffer.isBuffer(response.address_state.address)).to.equal(true);
        expect(response.address_state.address.length).to.equal(39);
        // check the first three octets values are correct
    });
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
result property


## AdressState.balance property


```python
Enter Python code here
```


```javascript    
    it('GetObjectResp has correct *AdressState.balance* property', function(){
        expect(response.address_state.balance).to.be.a('string');
        expect(parseInt(response.address_state.balance)).to.be.a('number');
        expect(parseInt(response.address_state.balance)).to.be.below(18446744073709551617); // uint64
    });
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
result property


## AdressState.nonce property


```python
Enter Python code here
```


```javascript    
    it('GetObjectResp has correct *AdressState.nonce* property', function(){
        expect(response.address_state.nonce).to.be.a('string');
        expect(parseInt(response.address_state.nonce)).to.be.a('number');
        expect(parseInt(response.address_state.nonce)).to.be.below(18446744073709551617); // uint64
    });
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
result property


## AdressState.ots_counter property

```python
Enter Python code here
```


```javascript    
    it('GetObjectResp has correct *AdressState.ots_counter* property', function(){
        expect(response.address_state.ots_counter).to.be.a('string');
        expect(parseInt(response.address_state.ots_counter)).to.be.a('number');
        expect(parseInt(response.address_state.ots_counter)).to.be.below(18446744073709551617); // uint64
    });
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
result property

## AdressState.ots_bitfield property

```python
Enter Python code here
```


```javascript    
    it('GetObjectResp has correct *AdressState.ots_bitfield* property', function(){
        response.address_state.ots_bitfield.forEach(i => expect(Buffer.isBuffer(i)).to.equal(true));
        response.address_state.ots_bitfield.forEach(i => expect(i.length).to.equal(1));
    });
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
result property


## AdressState.transaction_hashes property

```python
Enter Python code here
```


```javascript    
    it('GetObjectResp has correct *AdressState.transaction_hashes* property', function(){
        response.address_state.transaction_hashes.forEach(i => expect(Buffer.isBuffer(i)).to.equal(true));
        response.address_state.transaction_hashes.forEach(i => expect(i.length).to.equal(32));
    });
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
result property
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
result property


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |
| balance | [uint64](#uint64) |  |  |
| nonce | [uint64](#uint64) |  | FIXME: Discuss. 32 or 64 bits? |
| ots_bitfield | [bytes](#bytes) | repeated |  |
| transaction_hashes | [bytes](#bytes) | repeated |  |
| tokens | [AddressState.TokensEntry](#qrl.AddressState.TokensEntry) | repeated |  |
| latticePK_list | [LatticePK](#qrl.LatticePK) | repeated |  |
| slave_pks_access_type | [AddressState.SlavePksAccessTypeEntry](#qrl.AddressState.SlavePksAccessTypeEntry) | repeated |  |
| ots_counter | [uint64](#uint64) |  |  |







## AddressState.SlavePksAccessTypeEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [uint32](#uint32) |  |  |







## AddressState.TokensEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [uint64](#uint64) |  |  |






# Block



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#qrl.BlockHeader) |  |  |
| transactions | [Transaction](#qrl.Transaction) | repeated |  |
| genesis_balance | [GenesisBalance](#qrl.GenesisBalance) | repeated | This is only applicable to genesis blocks |






## BlockDataPoint
BlockDataPoint message definition


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| number | [uint64](#uint64) |  | Block number |
| difficulty | [string](#string) |  | Block difficulty |
| timestamp | [uint64](#uint64) |  | Block timestamp |
| time_last | [uint64](#uint64) |  |  |
| time_movavg | [uint64](#uint64) |  |  |
| hash_power | [float](#float) |  | Hash power |
| header_hash | [bytes](#bytes) |  | Block header hash |
| header_hash_prev | [bytes](#bytes) |  | Previous block&#39;s header hash |






## BlockExtended



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#qrl.BlockHeader) |  |  |
| extended_transactions | [TransactionExtended](#qrl.TransactionExtended) | repeated |  |
| genesis_balance | [GenesisBalance](#qrl.GenesisBalance) | repeated | This is only applicable to genesis blocks |
| size | [uint64](#uint64) |  |  |







## BlockHeader



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| hash_header | [bytes](#bytes) |  | Header |
| block_number | [uint64](#uint64) |  |  |
| timestamp_seconds | [uint64](#uint64) |  |  |
| hash_header_prev | [bytes](#bytes) |  |  |
| reward_block | [uint64](#uint64) |  |  |
| reward_fee | [uint64](#uint64) |  |  |
| merkle_root | [bytes](#bytes) |  |  |
| mining_nonce | [uint32](#uint32) |  |  |
| extra_nonce | [uint64](#uint64) |  |  |







## BlockHeaderExtended



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#qrl.BlockHeader) |  |  |
| transaction_count | [TransactionCount](#qrl.TransactionCount) |  |  |







## BlockHeightData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |
| block_headerhash | [bytes](#bytes) |  |  |
| cumulative_difficulty | [bytes](#bytes) |  |  |







## BlockMetaData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| is_orphan | [bool](#bool) |  |  |
| block_difficulty | [bytes](#bytes) |  |  |
| cumulative_difficulty | [bytes](#bytes) |  |  |
| child_headerhashes | [bytes](#bytes) | repeated |  |
| last_N_headerhashes | [bytes](#bytes) | repeated | Keeps last N headerhashes, for measurement of timestamp difference |







## BlockMetaDataList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number_hashes | [BlockMetaData](#qrl.BlockMetaData) | repeated |  |







## BlockNumberMapping



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| headerhash | [bytes](#bytes) |  |  |
| prev_headerhash | [bytes](#bytes) |  |  |







# Empty
Empty message definition




# Ephemeral


## EncryptedEphemeralMessage



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| msg_id | [bytes](#bytes) |  | b&#39;NEW&#39; or PRF |
| ttl | [uint64](#uint64) |  | Expiry Timestamp in seconds |
| ttr | [uint64](#uint64) |  | Time to relay |
| channel | [EncryptedEphemeralMessage.Channel](#qrl.EncryptedEphemeralMessage.Channel) |  |  |
| nonce | [uint64](#uint64) |  | nonce |
| payload | [bytes](#bytes) |  | JSON content, encrypted by aes256_symkey |







## EncryptedEphemeralMessage.Channel



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| enc_aes256_symkey | [bytes](#bytes) |  | aes256_symkey encrypted by kyber |







# GenesisBalance



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  | Address is string only here to increase visibility |
| balance | [uint64](#uint64) |  |  |



# Get



## GetAddressFromPKReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pk | [bytes](#bytes) |  |  |







## GetAddressFromPKResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |







## GetAddressStateReq

```python
Enter Python code here
```


```javascript
// Test for GetAddressState
describe('GetAddressState', function() {
    // example wallet address
    testaddress = stringToBytes('01050048a8b31d8dda8a25c5c0d02994fe87e54032ba67910657ade9114d0cdff2eeb5f6285446');
    let response;
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.getAddressState({address : testaddress}, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    response = res;
                    resolve();
                });
            });
        });
    });

    it('GetAddressStateResp has AddressState state property', function(){
        expect(response).to.have.property('state');
    });
    it('GetAddressStateResp.state has correct *address* property', function(){
        expect(response.state).to.have.property('address');
        expect(Buffer.isBuffer(response.state.address)).to.equal(true);
        expect(response.state.address.length).to.equal(39);
    });
    it('GetAddressStateResp.state has correct *balance* property', function(){
        expect(response.state).to.have.property('balance');
        expect(response.state.balance).to.be.a('string');
        expect(parseInt(response.state.balance)).to.be.a('number');
        expect(parseInt(response.state.balance)).to.be.below(18446744073709551617); // uint64
    });
    it('GetAddressStateResp.state has correct *nonce* property', function(){
        expect(response.state).to.have.property('nonce');
        expect(response.state.nonce).to.be.a('string');
        expect(parseInt(response.state.nonce)).to.be.a('number');
        expect(parseInt(response.state.nonce)).to.be.below(18446744073709551617); // uint64
    });
    it('GetAddressStateResp.state has correct *ots_bitfield* property', function(){
        expect(response.state).to.have.property('ots_bitfield');
        response.state.ots_bitfield.forEach(i => expect(Buffer.isBuffer(i)).to.equal(true));
        response.state.ots_bitfield.forEach(i => expect(i.length).to.equal(1));
    });
    it('GetAddressStateResp.state has correct *transaction_hashes* property', function(){
        expect(response.state).to.have.property('transaction_hashes');
        response.state.transaction_hashes.forEach(i => expect(Buffer.isBuffer(i)).to.equal(true));
        response.state.transaction_hashes.forEach(i => expect(i.length).to.equal(32));
    });
    it('GetAddressStateResp.state has correct *tokens* property', function(){
        expect(response.state).to.have.property('tokens');
    });
    it('GetAddressStateResp.state has correct *latticePK_list* property', function(){
        expect(response.state).to.have.property('latticePK_list');
    });
    it('GetAddressStateResp.state has correct *slave_pks_access_type* property', function(){
        expect(response.state).to.have.property('slave_pks_access_type');
    });
    it('GetAddressStateResp.state has correct *ots_counter* property', function(){
        expect(response.state).to.have.property('ots_counter');
        expect(response.state.ots_counter).to.be.a('string');
        expect(parseInt(response.state.ots_counter)).to.be.a('number');
        expect(parseInt(response.state.ots_counter)).to.be.below(18446744073709551617); // uint64
    });

});
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |







## GetAddressStateResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [AddressState](#qrl.AddressState) |  |  |







## GetBlockReq
NOT USED -&gt; RM?


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint64](#uint64) |  | Indicates the index number in mainchain |
| after_hash | [bytes](#bytes) |  | request the node that comes after hash |







## GetBlockResp
NOT USED -&gt; RM?


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| node_info | [NodeInfo](#qrl.NodeInfo) |  |  |
| block | [Block](#qrl.Block) |  |  |







## GetKnownPeersReq

```python
Enter Python code here
```


```javascript
// Test for getKnownPeers
// describe('GetKnownPeers', function() {
//     let response;
//     // call API
//     before(function() {
//         return new Promise((resolve) => {
//             qrlClient.then( function (qrlClient) {
//                 qrlClient.GetKnownPeers({}, (err, res) => {
//                     if (err){
//                         console.log("Error: ", err.message);
//                         return;
//                     }
//                     console.log(res)
//                     response = res;
//                     resolve();
//                 });
//             });
//         });
//     });
// });
```

Represents a query to get known peers







## GetKnownPeersResp

```python
Enter Python code here
```


```javascript
//     it('GetAddressStateResp has AddressState state property', function(){
//         expect(response).to.have.property('state');
//     });
```


Represents the reply message to known peers query


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| node_info | [NodeInfo](#qrl.NodeInfo) |  | NodeInfo object containing node state information |
| known_peers | [Peer](#qrl.Peer) | repeated | List of Peer objects containing peer nodes detailed information |







## GetLatestDataReq

```python
Enter Python code here
```


```javascript
// rpc GetLatestData(GetLatestDataReq) returns (GetLatestDataResp);
describe('GetLatestData - All', function() {
    // example wallet address
    let response;
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.getLatestData({filter:0 , offset: 10, quantity: 20}, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    response = res;
                    resolve();
                });
            });
        });
    });

    it('GetLatestDataResp has correct *blockheaders* property', function(){
        expect(response).to.have.property('blockheaders');
        response.blockheaders.forEach(i => expect(i).to.have.all.keys(['header','transaction_count']));
        response.blockheaders.forEach(i => expect(i.header).to.have.all.keys(['hash_header','block_number','timestamp_seconds','hash_header_prev','reward_block','reward_fee','merkle_root','mining_nonce']));
        response.blockheaders.forEach(i => expect( Buffer.isBuffer(i.header.hash_header)).to.equal(true) );
        response.blockheaders.forEach(i => expect(i.header.hash_header.length).to.equal(32) );
        response.blockheaders.forEach(i => expect(i.header.block_number).to.be.a('string') );
        response.blockheaders.forEach(i => expect(parseInt(i.header.block_number)).to.be.a('number') );
        response.blockheaders.forEach(i => expect(i.header.timestamp_seconds).to.be.a('string') );
        response.blockheaders.forEach(i => expect(parseInt(i.header.timestamp_seconds)).to.be.a('number') );
        response.blockheaders.forEach(i => expect(i.header.reward_block).to.be.a('string') );
        response.blockheaders.forEach(i => expect(parseInt(i.header.reward_block)).to.be.a('number') );
        response.blockheaders.forEach(i => expect(i.header.reward_fee).to.be.a('string') );
        response.blockheaders.forEach(i => expect(parseInt(i.header.reward_fee)).to.be.a('number') );
        response.blockheaders.forEach(i => expect(i.header.mining_nonce).to.be.a('string') );
        response.blockheaders.forEach(i => expect(parseInt(i.header.mining_nonce)).to.be.a('number') );
        response.blockheaders.forEach(i => expect( Buffer.isBuffer(i.header.hash_header_prev)).to.equal(true) );
        response.blockheaders.forEach(i => expect(i.header.hash_header_prev.length).to.equal(32) );
        response.blockheaders.forEach(i => expect( Buffer.isBuffer(i.header.merkle_root)).to.equal(true) );
        response.blockheaders.forEach(i => expect(i.header.merkle_root.length).to.equal(32) );
    });
    it('GetLatestDataResp.blockheaders has correct *transaction_count* property', function(){
        response.blockheaders.forEach(i => expect(i.transaction_count).to.have.all.keys(['count']));
        // TODO: check the transaction counts
    });
    it('GetLatestDataResp has correct *transactions* property', function(){
        expect(response).to.have.property('transactions');
    });
    it('GetLatestDataResp.transactions has correct *header* property', function(){
        response.transactions.forEach(i => expect(i).to.have.all.keys(['header','tx','addr_from','size']));
        response.transactions.forEach(i => expect( Buffer.isBuffer(i.header.hash_header)).to.equal(true) );
        response.transactions.forEach(i => expect(i.header.hash_header.length).to.equal(32) );
        response.transactions.forEach(i => expect(i.header.block_number).to.be.a('string') );
        response.transactions.forEach(i => expect(parseInt(i.header.block_number)).to.be.a('number') );
        response.transactions.forEach(i => expect(i.header.timestamp_seconds).to.be.a('string') );
        response.transactions.forEach(i => expect(parseInt(i.header.timestamp_seconds)).to.be.a('number') );
        response.transactions.forEach(i => expect(i.header.reward_block).to.be.a('string') );
        response.transactions.forEach(i => expect(parseInt(i.header.reward_block)).to.be.a('number') );
        response.transactions.forEach(i => expect(i.header.reward_fee).to.be.a('string') );
        response.transactions.forEach(i => expect(parseInt(i.header.reward_fee)).to.be.a('number') );
        response.transactions.forEach(i => expect(i.header.mining_nonce).to.be.a('string') );
        response.transactions.forEach(i => expect(parseInt(i.header.mining_nonce)).to.be.a('number') );
        response.transactions.forEach(i => expect( Buffer.isBuffer(i.header.hash_header_prev)).to.equal(true) );
        response.transactions.forEach(i => expect(i.header.hash_header_prev.length).to.equal(32) );
        response.transactions.forEach(i => expect( Buffer.isBuffer(i.header.merkle_root)).to.equal(true) );
        response.transactions.forEach(i => expect(i.header.merkle_root.length).to.equal(32) );
    });

    // FIXME: Disabling. Sporadic failures as it is running on public testnet
    // it('GetLatestDataResp.transactions has correct *tx* property', function(){
    //     response.transactions.forEach(i => expect(i.tx).to.have.all.keys(['transactionType','master_addr','fee','public_key','signature','nonce','transaction_hash','transfer','coinbase','latticePK','message','token','transfer_token','slave']));
    //     response.transactions.forEach(i => expect( Buffer.isBuffer(i.tx.master_addr)).to.equal(true) );
    //     // response.transactions.forEach(i => expect(i.tx.master_addr.length).to.equal(39));
    //     response.transactions.forEach(i => expect(i.tx.transaction_hash.length).to.equal(32));
    //     response.transactions.forEach(i => expect(i.tx.transactionType).to.be.a('string') );
    //     response.transactions.forEach(i => expect(i.tx.transactionType).to.equal('transfer') );
    //     response.transactions.forEach(i => expect(i.tx.fee).to.be.a('string') );
    //     response.transactions.forEach(i => expect(parseInt(i.tx.fee)).to.be.a('number') );
    //     response.transactions.forEach(i => expect(i.tx.nonce).to.be.a('string') );
    //     response.transactions.forEach(i => expect(parseInt(i.tx.nonce)).to.be.a('number') );
    //     response.transactions.forEach(i => expect(i.tx.public_key.length).to.equal(67));
    //     response.transactions.forEach(i => expect(i.tx.signature.length).to.equal(2756));
    // });
    it('GetLatestDataResp has correct *transactions_unconfirmed* property', function(){
        expect(response).to.have.property('transactions_unconfirmed');
    });
});
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| filter | [GetLatestDataReq.Filter](#qrl.GetLatestDataReq.Filter) |  |  |
| offset | [uint32](#uint32) |  | Offset in the result list (works backwards in this case) |
| quantity | [uint32](#uint32) |  | Number of items to retrive. Capped at 100 |








## GetLatestDataResp

```python
Enter Python code here
```


```javascript

describe('GetLatestData - TransactionExtended', function() {
    // example wallet address
    let response;
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.getLatestData({filter:0 , offset: 1, quantity: 10}, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    response = res;
                    resolve();
                });
            });
        });
    });

    it('GetLatestDataResp has correct *blockheaders* property', function(){
        expect(response).to.have.property('blockheaders');
    });
    it('GetLatestDataResp has correct *transactions* property', function(){
        expect(response).to.have.property('transactions');
    });
    it('GetLatestDataResp has correct *transactions_unconfirmed* property', function(){
        expect(response).to.have.property('transactions_unconfirmed');
    });
});
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blockheaders | [BlockHeaderExtended](#qrl.BlockHeaderExtended) | repeated |  |
| transactions | [TransactionExtended](#qrl.TransactionExtended) | repeated |  |
| transactions_unconfirmed | [TransactionExtended](#qrl.TransactionExtended) | repeated |  |







## GetLocalAddressesReq








## GetLocalAddressesResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses | [bytes](#bytes) | repeated |  |







## GetNodeStateReq

```python
Enter Python code here
```


```javascript
// Test for GetNodeState
describe('GetNodeState', function() {
    let response;
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.getNodeState({}, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    response = res;
                    resolve();
                });
            });
        });
    });
    it('GetNodeStateResp has NodeInfo *info* property', function(){
        expect(response).to.have.property('info');
    });
    it('GetNodeStateResp.info has correct *state* property', function(){
        expect(response.info).to.have.property('state');
        expect(response.info.state).to.be.a('string');
        expect(response.info.state).to.be.oneOf(['UNKNOWN', 'UNSYNCED', 'SYNCING', 'SYNCED', 'FORKED']);
    });
    it('GetNodeStateResp.info has correct *version* property', function(){
        expect(response.info).to.have.property('version');
        expect(response.info.version).to.be.a('string');
    });
    it('GetNodeStateResp.info has correct *num_connections* property', function(){
        expect(response.info).to.have.property('num_connections');
        expect(response.info.num_connections).to.be.a('number');
        expect(response.info.num_connections).to.be.below(4294967297); // uint32
    });
    it('GetNodeStateResp.info has correct *num_known_peers* property', function(){
        expect(response.info).to.have.property('num_known_peers');
        expect(response.info.num_known_peers).to.be.a('number');
        expect(response.info.num_known_peers).to.be.below(4294967297); // uint32
    });
    it('GetNodeStateResp.info has correct *uptime* property', function(){
        expect(response.info).to.have.property('uptime');
        expect(response.info.uptime).to.be.a('string');
        expect(parseInt(response.info.uptime)).to.be.a('number');
        expect(parseInt(response.info.uptime)).to.be.below(18446744073709551617); // uint64
    });
    it('GetNodeStateResp.info has correct *block_height* property', function(){
        expect(response.info).to.have.property('block_height');
        expect(response.info.block_height).to.be.a('string');
        expect(parseInt(response.info.block_height)).to.be.a('number');
        expect(parseInt(response.info.block_height)).to.be.below(18446744073709551617); // uint64
    });
    it('GetNodeStateResp.info has correct *block_last_hash* property', function(){
        expect(response.info).to.have.property('block_last_hash');
        expect(typeof(response.info.block_last_hash)).to.equal('object');
        expect(Buffer.isBuffer(response.info.block_last_hash)).to.equal(true);
    });
    it('GetNodeStateResp.info has correct *network_id* property', function(){
        expect(response.info).to.have.property('network_id');
        expect(response.info.network_id).to.be.a('string');
    });
});
```

Represents a query to get node state







## GetNodeStateResp


```python
Enter Python code here
```


```javascript

```


Represents the reply message to node state query


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| info | [NodeInfo](#qrl.NodeInfo) |  |  |







## GetObjectReq












| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [bytes](#bytes) |  |  |




## GetObjectResp


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| found | [bool](#bool) |  |  |
| address_state | [AddressState](#qrl.AddressState) |  |  |

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| transaction | [TransactionExtended](#qrl.TransactionExtended) |  |  |

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_extended | [BlockExtended](#qrl.BlockExtended) |  |  |




## GetPeersStatReq
Represents a query to get connected peers stat




## GetPeersStatResp
Represents the reply message to peers stat query


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peers_stat | [PeerStat](#qrl.PeerStat) | repeated | PeerState object contains peer_ip, port and peer state information |







## GetStatsReq
```python
Enter Python code here
```


```javascript
// Test for getStats
describe('GetStats', function() {
    let response;
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.getStats({include_timeseries: true}, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    response = res;
                    resolve();
                });
            });
        });
    });

it('GetStatsResp has NodeInfo *node_info* property', function(){
        expect(response).to.have.property('node_info');
    });
    it('GetStatsResp.node_info has correct *version* property', function(){
        expect(response.node_info).to.have.property('version');
        expect(response.node_info.version).to.be.a('string');
    });
    it('GetStatsResp.node_info has correct *state* property', function(){
        expect(response.node_info).to.have.property('state');
        expect(response.node_info.state).to.be.a('string');
        expect(response.node_info.state).to.be.oneOf(['UNKNOWN', 'UNSYNCED', 'SYNCING', 'SYNCED', 'FORKED']);
    });
    it('GetStatsResp.node_info has correct *num_connections* property', function(){
        expect(response.node_info).to.have.property('num_connections');
        expect(response.node_info.num_connections).to.be.a('number');
        expect(response.node_info.num_connections).to.be.a('number');
        expect(response.node_info.num_connections).to.be.below(4294967297); // uint32
    });
    it('GetStatsResp.node_info has correct *num_known_peers* property', function(){
        expect(response.node_info).to.have.property('num_known_peers');
        expect(response.node_info.num_known_peers).to.be.a('number');
        expect(response.node_info.num_known_peers).to.be.a('number');
        expect(response.node_info.num_known_peers).to.be.below(4294967297); // uint32
    });
    it('GetStatsResp.node_info has correct *uptime* property', function(){
        expect(response.node_info).to.have.property('uptime');
        expect(response.node_info.uptime).to.be.a('string');
        expect(parseInt(response.node_info.uptime)).to.be.a('number');
        expect(parseInt(response.node_info.uptime)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp.node_info has correct *block_height* property', function(){
        expect(response.node_info).to.have.property('block_height');
        expect(response.node_info.block_height).to.be.a('string');
        expect(parseInt(response.node_info.block_height)).to.be.a('number');
        expect(parseInt(response.node_info.block_height)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp.node_info has correct *block_last_hash* property', function(){
        expect(response.node_info).to.have.property('block_last_hash');
        expect(typeof(response.node_info.block_last_hash)).to.equal('object');
        expect(Buffer.isBuffer(response.node_info.block_last_hash)).to.equal(true);
    });
    it('GetStatsResp.node_info has correct *network_id* property', function(){
        expect(response.node_info).to.have.property('network_id');
        expect(response.node_info.network_id).to.be.a('string');
    });
    it('GetStatsResp has correct *epoch* property', function(){
        expect(response).to.have.property('epoch');
        expect(response.epoch).to.be.a('string');
        expect(parseInt(response.epoch)).to.be.a('number');
        expect(parseInt(response.epoch)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp has correct *uptime_network* property', function(){
        expect(response).to.have.property('uptime_network');
        expect(response.uptime_network).to.be.a('string');
        expect(parseInt(response.uptime_network)).to.be.a('number');
        expect(parseInt(response.uptime_network)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp has correct *block_last_reward* property', function(){
        expect(response).to.have.property('block_last_reward');
        expect(response.block_last_reward).to.be.a('string');
        expect(parseInt(response.block_last_reward)).to.be.a('number');
        expect(parseInt(response.block_last_reward)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp has correct *block_time_mean* property', function(){
        expect(response).to.have.property('block_time_mean');
        expect(response.block_time_mean).to.be.a('string');
        expect(parseInt(response.block_time_mean)).to.be.a('number');
        expect(parseInt(response.block_time_mean)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp has correct *block_time_sd* property', function(){
        expect(response).to.have.property('block_time_sd');
        expect(response.block_time_sd).to.be.a('string');
        expect(parseInt(response.block_time_sd)).to.be.a('number');
        expect(parseInt(response.block_time_sd)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp has correct *coins_total_supply* property', function(){
        expect(response).to.have.property('coins_total_supply');
        expect(response.coins_total_supply).to.be.a('string');
        expect(parseInt(response.coins_total_supply)).to.be.a('number');
        expect(parseInt(response.coins_total_supply)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp has correct *coins_emitted* property', function(){
        expect(response).to.have.property('coins_emitted');
        expect(response.coins_emitted).to.be.a('string');
        expect(parseInt(response.coins_emitted)).to.be.a('number');
        expect(parseInt(response.coins_emitted)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp has correct *block_timeseries* property', function(){
        expect(response).to.have.property('block_timeseries');
        expect(typeof(response.block_timeseries)).to.equal('object');
        response.block_timeseries.forEach(i => expect(i).to.have.all.keys(['number','difficulty','timestamp','time_last','time_movavg','hash_power','header_hash','header_hash_prev']));
        // Difficulty should be a number
        response.block_timeseries.forEach(i => expect(i.difficulty).to.be.a('string'));
    });
    it('GetStatsResp has correct *block_timeseries.number* property: is a uint64', function(){
        response.block_timeseries.forEach(i => expect(i.number).to.be.a('string'));
        response.block_timeseries.forEach(i => expect(parseInt(i.number)).to.be.a('number'));
        response.block_timeseries.forEach(i => expect(parseInt(i.number)).to.be.below(18446744073709551617));
    });
    it('GetStatsResp has correct *block_timeseries.timestamp* property: is a uint64', function(){
        response.block_timeseries.forEach(i => expect(i.timestamp).to.be.a('string'));
        response.block_timeseries.forEach(i => expect(parseInt(i.timestamp)).to.be.a('number'));
        response.block_timeseries.forEach(i => expect(parseInt(i.timestamp)).to.be.below(18446744073709551617));
    });
    it('GetStatsResp has correct *block_timeseries.time_last* property: is a uint64', function(){
        response.block_timeseries.forEach(i => expect(i.time_last).to.be.a('string'));
        response.block_timeseries.forEach(i => expect(parseInt(i.time_last)).to.be.a('number'));
        response.block_timeseries.forEach(i => expect(parseInt(i.time_last)).to.be.below(18446744073709551617));
    });
    it('GetStatsResp has correct *block_timeseries.time_movavg* property: is a uint64', function(){
        response.block_timeseries.forEach(i => expect(i.time_movavg).to.be.a('string'));
        response.block_timeseries.forEach(i => expect(parseInt(i.time_movavg)).to.be.a('number'));
        response.block_timeseries.forEach(i => expect(parseInt(i.time_movavg)).to.be.below(18446744073709551617));
    });
    it('GetStatsResp has correct *block_timeseries.hash_power* property: is a number', function(){
        response.block_timeseries.forEach(i => expect(i.hash_power).to.be.a('number'));
        response.block_timeseries.forEach(i => expect(parseFloat(i.hash_power)).to.be.a('number'));
    });
    it('GetStatsResp has correct *block_timeseries.header_hash* property: is a Buffer composed of 32 octets', function(){
        response.block_timeseries.forEach(i => expect(Buffer.isBuffer(i.header_hash)).to.equal(true));
        response.block_timeseries.forEach(i => expect(i.header_hash.length).to.equal(32));
    });
    it('GetStatsResp has correct *block_timeseries.header_hash_prev* property: is a Buffer composed of 32 octets', function(){
        response.block_timeseries.forEach(i => expect(Buffer.isBuffer(i.header_hash_prev)).to.equal(true));
        response.block_timeseries.forEach(i => expect(i.header_hash_prev.length).to.equal(32));
    });
 });

```


Represents a query to get statistics about node


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| include_timeseries | [bool](#bool) |  | Boolean to define if block timeseries should be included in reply or not |







## GetStatsResp

```python
Enter Python code here
```


```javascript
```
Represents the reply message to get statistics about node


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| node_info | [NodeInfo](#qrl.NodeInfo) |  | NodeInfo object containing node state information |
| epoch | [uint64](#uint64) |  | Current epoch |
| uptime_network | [uint64](#uint64) |  | Indicates uptime in seconds |
| block_last_reward | [uint64](#uint64) |  | Block reward |
| block_time_mean | [uint64](#uint64) |  | Blocktime average |
| block_time_sd | [uint64](#uint64) |  | Blocktime standrad deviation |
| coins_total_supply | [uint64](#uint64) |  | Total coins supply |
| coins_emitted | [uint64](#uint64) |  | Total coins emitted |
| block_timeseries | [BlockDataPoint](#qrl.BlockDataPoint) | repeated |  |







# LRUStateCache








# LatticePK



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| txhash | [bytes](#bytes) |  |  |
| dilithium_pk | [bytes](#bytes) |  |  |
| kyber_pk | [bytes](#bytes) |  |  |







## LatticePublicKeyTxnReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| kyber_pk | [bytes](#bytes) |  |  |
| dilithium_pk | [bytes](#bytes) |  |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |






# MessageTxnReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| message | [bytes](#bytes) |  |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |








# NodeChainState



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |
| header_hash | [bytes](#bytes) |  |  |
| cumulative_difficulty | [bytes](#bytes) |  |  |
| timestamp | [uint64](#uint64) |  |  |




# Node


## NodeHeaderHash



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |
| headerhashes | [bytes](#bytes) | repeated |  |







## NodeInfo



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| version | [string](#string) |  |  |
| state | [NodeInfo.State](#qrl.NodeInfo.State) |  |  |
| num_connections | [uint32](#uint32) |  |  |
| num_known_peers | [uint32](#uint32) |  |  |
| uptime | [uint64](#uint64) |  | Uptime in seconds |
| block_height | [uint64](#uint64) |  |  |
| block_last_hash | [bytes](#bytes) |  |  |
| network_id | [string](#string) |  |  |




# P2P


## P2PAcknowledgement



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| bytes_processed | [uint32](#uint32) |  |  |







## Peer



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ip | [string](#string) |  |  |







## PeerInfo



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_ip | [bytes](#bytes) |  |  |
| port | [uint32](#uint32) |  |  |
| banned_timestamp | [uint32](#uint32) |  |  |
| credibility | [uint32](#uint32) |  |  |
| last_connections_timestamp | [uint32](#uint32) | repeated |  |







## PeerStat



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_ip | [bytes](#bytes) |  |  |
| port | [uint32](#uint32) |  |  |
| node_chain_state | [NodeChainState](#qrl.NodeChainState) |  |  |







## Peers



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_info_list | [PeerInfo](#qrl.PeerInfo) | repeated |  |







# PushTransactionReq

```python
Enter Python code here
```


```javascript

// pushTransaction call
// describe('PushTransaction - TransferCoins', function() {
//     // this.timeout(50000);
//     let response;
//     // call API
//     before(function() {
//         this.enableTimeouts(false)
//         return new Promise((resolve) => {
//             qrlClient.then( function (qrlClient) {
//                 // generating a new wallet
//                 let i
//                 const randomBytes = require('crypto').randomBytes(48)
//                 const randomSeed = new qrllib.VectorUChar()
//                 for (i = 0; i < 48; i += 1) {
//                     randomSeed.push_back(randomBytes[i])
//                 }
//                 // Generate XMSS object
//                 XMSS_OBJECT = new qrllib.Xmss(randomSeed, 10)
//                 // stringToBytes(testfromxmsspk);
//                 xmss_pk = stringToBytes(qrllib.bin2hstr(XMSS_OBJECT.getPK()))
//
//                 qrlClient.transferCoins({addresses_to: testtoaddress_bytes, amounts: 10000000000, fee:1000000, xmss_pk: xmss_pk}, (err, res) => {
//
//                     if (err){
//                         console.log("Error: ", err.message);
//                         return;
//                     }
//                     console.log("Sending API call")
//                     const tx = res;
//
//                     // code from the wallet (@scottdonaldau)
//                     const xmss_pk = XMSS_OBJECT.getPK()
//                     const thisAddressBytes = XMSS_OBJECT.getAddress()
//                     XMSS_OBJECT.setIndex(12)
//
//                     console.log("Preparing tx to sign...")
//                     // Concatenate Uint8Arrays
//                     let concatenatedArrays = concatenateTypedArrays(Uint8Array, tx.extended_transaction_unsigned.addr_from, toBigendianUint64BytesUnsigned(tx.extended_transaction_unsigned.tx.fee))
//                     // Now append all recipient (outputs) to concatenatedArrays
//                     const addrsToRaw = tx.extended_transaction_unsigned.tx.transfer.addrs_to
//                     const amountsRaw = tx.extended_transaction_unsigned.tx.transfer.amounts
//                     for (var i = 0; i < addrsToRaw.length; i++) {
//                         concatenatedArrays = concatenateTypedArrays(Uint8Array,concatenatedArrays,addrsToRaw[i]) // Add address
//                         concatenatedArrays = concatenateTypedArrays(Uint8Array,concatenatedArrays,toBigendianUint64BytesUnsigned(amountsRaw[i])) // Add amount
//                     }
//                     // Convert Uint8Array to VectorUChar
//                     const hashableBytes = new qrllib.VectorUChar()
//                     for (i = 0; i < concatenatedArrays.length; i += 1) {
//                         hashableBytes.push_back(concatenatedArrays[i])
//                     }
//                     // Create sha256 sum of concatenatedarray
//                     let shaSum = qrllib.sha2_256(hashableBytes)
//                     // Sign the sha sum
//                     tx.extended_transaction_unsigned.tx.signature = binaryToBytes(XMSS_OBJECT.sign(shaSum))
//                     // Calculate transaction hash
//                     let txnHashConcat = concatenateTypedArrays(Uint8Array,binaryToBytes(shaSum),tx.extended_transaction_unsigned.tx.signature,binaryToBytes(XMSS_OBJECT.getPK()))
//
//                     const txnHashableBytes = new qrllib.VectorUChar()
//                     for (i = 0; i < txnHashConcat.length; i += 1) {
//                         txnHashableBytes.push_back(txnHashConcat[i])
//                     }
//
//                     let txnHash = qrllib.bin2hstr(qrllib.sha2_256(txnHashableBytes))
//
//                     // transferCoins returns a TransferCoinsResp, one needs to get the Transaction out and sign it
//                     const confirmTxn = { transaction_signed: res.extended_transaction_unsigned.tx }
//                     // confirmTxn.transaction_signed.master_addr = testfromaddress_bytes;
//                     confirmTxn.transaction_signed.fee = tx.extended_transaction_unsigned.tx.fee
//                     confirmTxn.transaction_signed.public_key = xmss_pk
//                     confirmTxn.transaction_signed.signature = binaryToBytes(XMSS_OBJECT.sign(shaSum))
//                     confirmTxn.transaction_signed.nonce = 12
//                     confirmTxn.transaction_signed.transaction_hash = txnHash
//                     confirmTxn.transaction_signed.transfer.addrs_to = tx.extended_transaction_unsigned.tx.transfer.addrs_to
//                     confirmTxn.transaction_signed.transfer.amounts = tx.extended_transaction_unsigned.tx.transfer.amounts
//
//                     // pushTransaction API call
//                     qrlClient.pushTransaction(confirmTxn, (err, res2) => {
//                         if (err){
//                             console.log("Error: ", err.message);
//                             return;
//                         }
//                         console.log("RES2 : ", res2)
//                         response = res2;
//                         resolve(response);
//                     });
//                 });
//             });
//         });
//     });
//
//     it('PushTransactionResp has correct *error_code* property', function(){
//         expect(response).to.have.property('error_code');
//     });
// });
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| transaction_signed | [Transaction](#qrl.Transaction) |  |  |







## PushTransactionResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| error_code | [PushTransactionResp.ResponseCode](#qrl.PushTransactionResp.ResponseCode) |  |  |
| error_description | [string](#string) |  |  |
| tx_hash | [bytes](#bytes) |  |  |







# SlaveTxnReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| slave_pks | [bytes](#bytes) | repeated |  |
| access_types | [uint32](#uint32) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |







# StateLoader



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses | [bytes](#bytes) | repeated |  |
| token_txhash | [bytes](#bytes) | repeated |  |
| txhash | [bytes](#bytes) | repeated |  |
| total_coin_supply | [uint64](#uint64) |  |  |







## StateObjects



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state_loaders | [bytes](#bytes) | repeated |  |







# StoredPeers



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peers | [Peer](#qrl.Peer) | repeated |  |




# Token


## TokenList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#bytes) | repeated |  |







## TokenMetadata



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#bytes) |  |  |
| transfer_token_tx_hashes | [bytes](#bytes) | repeated |  |







## TokenTxnReq

###GetTokenTxn

```python
Enter Python code here
```


```javascript


describe('GetTokenTxn', function() {
    let response;
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.getTokenTxn({master_addr: testfromaddress_bytes, symbol:"JSTEST", name:"JSTEST", owner:"Q0105006d232eb403a0248f9d4c0476c06a7d7a1d0425420df2dd915b7fb46cf7da132699c27b93", decimals:10, initial_balances: {address: testtoaddress_bytes, amount: 10000000000} ,fee:1000000, xmss_pk: testfromxmsspk_bytes}, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    response = res;
                    resolve();
                });
            });
        });
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *addr_from* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('addr_from');
        expect(Buffer.from(response.extended_transaction_unsigned.addr_from).toString('hex')).to.equal(testfromaddress);
    });
    it('TransferCoinsResp has correct *extended_transaction_unsigned* property', function(){
        expect(response).to.have.property('extended_transaction_unsigned');
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *header* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('header');
        expect(response.extended_transaction_unsigned.header).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *tx* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('tx');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transactionType* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transactionType');
        expect(response.extended_transaction_unsigned.tx.transactionType).to.equal('token');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *master_addr* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('master_addr');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.master_addr)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.master_addr.length).to.equal(39);
        expect(Buffer.from(response.extended_transaction_unsigned.tx.master_addr).toString('hex')).to.equal(testfromaddress);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *fee* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('fee');
        expect(response.extended_transaction_unsigned.tx.fee).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.tx.fee)).to.be.a('number');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *public_key* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('public_key');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.public_key)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.public_key.length).to.equal(67);
        expect(Buffer.from(response.extended_transaction_unsigned.tx.public_key).toString('hex')).to.equal(testfromxmsspk);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *signature* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('signature');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.signature)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.signature.length).to.equal(0);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *nonce* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('nonce');
        expect(response.extended_transaction_unsigned.tx.nonce).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.tx.nonce)).to.be.a('number');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transaction_hash* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transaction_hash');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.transaction_hash)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.transaction_hash.length).to.equal(0);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transactionType* transfer', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *coinbase* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('coinbase');
        expect(response.extended_transaction_unsigned.tx.coinbase).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *latticePK* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('latticePK');
        expect(response.extended_transaction_unsigned.tx.latticePK).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *message* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('message');
        expect(response.extended_transaction_unsigned.tx.message).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *token* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('token');
        expect(response.extended_transaction_unsigned.tx.token).to.have.all.keys(['symbol','name','owner','decimals','initial_balances']);
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.token.symbol)).to.equal(true);
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.token.name)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.token.decimals).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.tx.token.decimals)).to.be.a('number');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.token.owner)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.token.owner.length).to.equal(59);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transfer_token* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer_token');
        expect(response.extended_transaction_unsigned.tx.transfer_token).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *slave* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('slave');
        expect(response.extended_transaction_unsigned.tx.slave).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transfer* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer');
        expect(response.extended_transaction_unsigned.tx.transfer).to.equal(null);

    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *addr_from* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('addr_from');
        expect(response.extended_transaction_unsigned.addr_from.length).to.equal(39);
        expect(Buffer.from(response.extended_transaction_unsigned.addr_from).toString('hex')).to.equal(testfromaddress);
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *size* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('size');
        expect(response.extended_transaction_unsigned.size).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.size)).to.be.a('number');
    });
});
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| symbol | [bytes](#bytes) |  |  |
| name | [bytes](#bytes) |  |  |
| owner | [bytes](#bytes) |  |  |
| decimals | [uint64](#uint64) |  |  |
| initial_balances | [AddressAmount](#qrl.AddressAmount) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |







# Transaction



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| fee | [uint64](#uint64) |  |  |
| public_key | [bytes](#bytes) |  |  |
| signature | [bytes](#bytes) |  |  |
| nonce | [uint64](#uint64) |  |  |
| transaction_hash | [bytes](#bytes) |  |  |
| transfer | [Transaction.Transfer](#qrl.Transaction.Transfer) |  |  |
| coinbase | [Transaction.CoinBase](#qrl.Transaction.CoinBase) |  |  |
| latticePK | [Transaction.LatticePublicKey](#qrl.Transaction.LatticePublicKey) |  |  |
| message | [Transaction.Message](#qrl.Transaction.Message) |  |  |
| token | [Transaction.Token](#qrl.Transaction.Token) |  |  |
| transfer_token | [Transaction.TransferToken](#qrl.Transaction.TransferToken) |  |  |
| slave | [Transaction.Slave](#qrl.Transaction.Slave) |  |  |







## Transaction.CoinBase



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addr_to | [bytes](#bytes) |  |  |
| amount | [uint64](#uint64) |  |  |







## Transaction.LatticePublicKey



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| kyber_pk | [bytes](#bytes) |  |  |
| dilithium_pk | [bytes](#bytes) |  |  |







## Transaction.Message



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| message_hash | [bytes](#bytes) |  |  |







## Transaction.Slave



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slave_pks | [bytes](#bytes) | repeated |  |
| access_types | [uint32](#uint32) | repeated |  |







## Transaction.Token



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| symbol | [bytes](#bytes) |  |  |
| name | [bytes](#bytes) |  |  |
| owner | [bytes](#bytes) |  |  |
| decimals | [uint64](#uint64) |  |  |
| initial_balances | [AddressAmount](#qrl.AddressAmount) | repeated |  |







## Transaction.Transfer



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addrs_to | [bytes](#bytes) | repeated |  |
| amounts | [uint64](#uint64) | repeated |  |







## Transaction.TransferToken



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#bytes) |  |  |
| addrs_to | [bytes](#bytes) | repeated |  |
| amounts | [uint64](#uint64) | repeated |  |







## TransactionCount



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| count | [TransactionCount.CountEntry](#qrl.TransactionCount.CountEntry) | repeated |  |







## TransactionCount.CountEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [uint32](#uint32) |  |  |
| value | [uint32](#uint32) |  |  |







## TransactionExtended

```python
Enter Python code here
```


```javascript
// Test for GetObject for TransactionExtended
describe('GetObject - TransactionExtended', function() {
    // example wallet address
    let response;
    testtx = stringToBytes('010600e62ec20b7397949a132f7e6efa80ba3fe1e94af646e50035f1db1a5985734fff11284143');
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.getObject({query : testtx }, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    response = res;
                    resolve();
                });
            });
        });
    });

    it('GetObjectResp has correct *result* property', function(){
        expect(response).to.have.property('result');
        expect(response.result).to.equal('address_state');
    });
    it('GetObjectResp has correct *found* property', function(){
        expect(response).to.have.property('found');
        expect(response.found).to.equal(true);
    });
    it('GetObjectResp has correct *transaction* property', function(){
        expect(response).to.have.property('transaction');
        expect(response.transaction).to.equal(null);
    });
    it('GetObjectResp has correct *block_extended* property', function(){
        expect(response).to.have.property('block_extended');
        expect(response.block_extended).to.equal(null);
    });
    it('GetObjectResp has correct *address_state* property', function(){
        expect(response).to.have.property('address_state');
        expect(response.address_state).to.have.all.keys(['address','balance','nonce','ots_bitfield','transaction_hashes','tokens','latticePK_list','slave_pks_access_type','ots_counter']);
    });
    it('GetObjectResp has correct *AdressState.address* property', function(){
        expect(Buffer.isBuffer(response.address_state.address)).to.equal(true);
        expect(response.address_state.address.length).to.equal(39);
        // check the first three octets values are correct
    });
    it('GetObjectResp has correct *AdressState.balance* property', function(){
        expect(response.address_state.balance).to.be.a('string');
        expect(parseInt(response.address_state.balance)).to.be.a('number');
        expect(parseInt(response.address_state.balance)).to.be.below(18446744073709551617); // uint64
    });
    it('GetObjectResp has correct *AdressState.nonce* property', function(){
        expect(response.address_state.nonce).to.be.a('string');
        expect(parseInt(response.address_state.nonce)).to.be.a('number');
        expect(parseInt(response.address_state.nonce)).to.be.below(18446744073709551617); // uint64
    });
    it('GetObjectResp has correct *AdressState.ots_counter* property', function(){
        expect(response.address_state.ots_counter).to.be.a('string');
        expect(parseInt(response.address_state.ots_counter)).to.be.a('number');
        expect(parseInt(response.address_state.ots_counter)).to.be.below(18446744073709551617); // uint64
    });
    it('GetObjectResp has correct *AdressState.ots_bitfield* property', function(){
        response.address_state.ots_bitfield.forEach(i => expect(Buffer.isBuffer(i)).to.equal(true));
        response.address_state.ots_bitfield.forEach(i => expect(i.length).to.equal(1));
    });
    it('GetObjectResp has correct *AdressState.transaction_hashes* property', function(){
        response.address_state.transaction_hashes.forEach(i => expect(Buffer.isBuffer(i)).to.equal(true));
        response.address_state.transaction_hashes.forEach(i => expect(i.length).to.equal(32));
    });
});
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#qrl.BlockHeader) |  |  |
| tx | [Transaction](#qrl.Transaction) |  |  |
| addr_from | [bytes](#bytes) |  |  |
| size | [uint64](#uint64) |  |  |
| timestamp_seconds | [uint64](#uint64) |  |  |




# TransferCoins


## TransferCoinsReq

```python
Enter Python code here
```


```javascript

let transaction_unsigned;
// rpc TransferCoins (TransferCoinsReq) returns (TransferCoinsResp);
describe('TransferCoins', function() {
    let response;
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.transferCoins({master_addr: testfromaddress_bytes, addresses_to: testtoaddress_bytes, amounts: 100, fee:0.001, xmss_pk: testfromxmsspk_bytes}, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    transaction_unsigned = res.extended_transaction_unsigned.tx;
                    response = res;
                    resolve();
                });
            });
        });
    });

    it('TransferCoinsResp has correct *extended_transaction_unsigned* property', function(){
        expect(response).to.have.property('extended_transaction_unsigned');
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *header* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('header');
        expect(response.extended_transaction_unsigned.header).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *tx* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('tx');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transactionType* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transactionType');
        expect(response.extended_transaction_unsigned.tx.transactionType).to.equal('transfer');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *master_addr* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('master_addr');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.master_addr)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.master_addr.length).to.equal(39);
        expect(Buffer.from(response.extended_transaction_unsigned.tx.master_addr).toString('hex')).to.equal(testfromaddress);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *fee* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('fee');
        expect(response.extended_transaction_unsigned.tx.fee).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.tx.fee)).to.be.a('number');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *public_key* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('public_key');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.public_key)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.public_key.length).to.equal(67);
        expect(Buffer.from(response.extended_transaction_unsigned.tx.public_key).toString('hex')).to.equal(testfromxmsspk);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *signature* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('signature');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.signature)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.signature.length).to.equal(0);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *nonce* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('nonce');
        expect(response.extended_transaction_unsigned.tx.nonce).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.tx.nonce)).to.be.a('number');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transaction_hash* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transaction_hash');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.transaction_hash)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.transaction_hash.length).to.equal(0);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transactionType* transfer', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *coinbase* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('coinbase');
        expect(response.extended_transaction_unsigned.tx.coinbase).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *latticePK* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('latticePK');
        expect(response.extended_transaction_unsigned.tx.latticePK).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *message* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('message');
        expect(response.extended_transaction_unsigned.tx.message).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *token* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('token');
        expect(response.extended_transaction_unsigned.tx.token).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transfer_token* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer_token');
        expect(response.extended_transaction_unsigned.tx.transfer_token).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *slave* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('slave');
        expect(response.extended_transaction_unsigned.tx.slave).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transfer* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer');
        expect(response.extended_transaction_unsigned.tx.transfer).to.have.all.keys(['addrs_to','amounts'])
        response.extended_transaction_unsigned.tx.transfer.addrs_to.forEach(i => expect(Buffer.isBuffer(i)).to.equal(true) );
        response.extended_transaction_unsigned.tx.transfer.addrs_to.forEach(i => expect(i.length).to.equal(39) );
        response.extended_transaction_unsigned.tx.transfer.amounts.forEach(i => expect(i).to.be.a('string') );
        response.extended_transaction_unsigned.tx.transfer.amounts.forEach(i => expect(parseInt(i)).to.be.a('number') );

    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *addr_from* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('addr_from');
        expect(response.extended_transaction_unsigned.addr_from.length).to.equal(39);
        expect(Buffer.from(response.extended_transaction_unsigned.addr_from).toString('hex')).to.equal(testfromaddress);
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *size* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('size');
        expect(response.extended_transaction_unsigned.size).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.size)).to.be.a('number');
    });
});
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  | Transaction source address |
| addresses_to | [bytes](#bytes) | repeated | Transaction destination address |
| amounts | [uint64](#uint64) | repeated | Amount. It should be expressed in Shor |
| fee | [uint64](#uint64) |  | Fee. It should be expressed in Shor |
| xmss_pk | [bytes](#bytes) |  | XMSS Public key |







## TransferCoinsResp

```python
Enter Python code here
```


```javascript
describe('GetTransferTokenTxn', function() {
    let response;
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.getTransferTokenTxn({master_addr: testfromaddress_bytes, addresses_to: testtoaddress_bytes, amounts: 100, fee:0.001, xmss_pk: testfromxmsspk_bytes }, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    response = res;
                    resolve();
                });
            });
        });
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *addr_from* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('addr_from');
        expect(Buffer.from(response.extended_transaction_unsigned.addr_from).toString('hex')).to.equal(testfromaddress);
    });
    it('TransferCoinsResp has correct *extended_transaction_unsigned* property', function(){
        expect(response).to.have.property('extended_transaction_unsigned');
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *header* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('header');
        expect(response.extended_transaction_unsigned.header).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *tx* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('tx');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transactionType* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transactionType');
        expect(response.extended_transaction_unsigned.tx.transactionType).to.equal('transfer_token');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *master_addr* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('master_addr');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.master_addr)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.master_addr.length).to.equal(39);
        expect(Buffer.from(response.extended_transaction_unsigned.tx.master_addr).toString('hex')).to.equal(testfromaddress);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *fee* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('fee');
        expect(response.extended_transaction_unsigned.tx.fee).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.tx.fee)).to.be.a('number');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *public_key* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('public_key');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.public_key)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.public_key.length).to.equal(67);
        expect(Buffer.from(response.extended_transaction_unsigned.tx.public_key).toString('hex')).to.equal(testfromxmsspk);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *signature* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('signature');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.signature)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.signature.length).to.equal(0);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *nonce* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('nonce');
        expect(response.extended_transaction_unsigned.tx.nonce).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.tx.nonce)).to.be.a('number');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transaction_hash* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transaction_hash');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.transaction_hash)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.transaction_hash.length).to.equal(0);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transactionType* transfer', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *coinbase* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('coinbase');
        expect(response.extended_transaction_unsigned.tx.coinbase).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *latticePK* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('latticePK');
        expect(response.extended_transaction_unsigned.tx.latticePK).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *message* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('message');
        expect(response.extended_transaction_unsigned.tx.message).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *token* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('token');
        expect(response.extended_transaction_unsigned.tx.message).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transfer_token* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer_token');
        expect(response.extended_transaction_unsigned.tx.transfer_token).to.have.all.keys(['token_txhash','addrs_to','amounts']);
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.transfer_token.token_txhash)).to.equal(true);
        expect(typeof(response.extended_transaction_unsigned.tx.transfer_token.addrs_to)).to.equal('object');
        response.extended_transaction_unsigned.tx.transfer_token.addrs_to.forEach(i => expect(Buffer.isBuffer(i)).to.equal(true));
        response.extended_transaction_unsigned.tx.transfer_token.addrs_to.forEach(i => expect(i.length).to.equal(39));
        response.extended_transaction_unsigned.tx.transfer_token.amounts.forEach(i => expect(i).to.be.a('string'));
        response.extended_transaction_unsigned.tx.transfer_token.amounts.forEach(i => expect(parseInt(i)).to.be.a('number'));
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *slave* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('slave');
        expect(response.extended_transaction_unsigned.tx.slave).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transfer* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer');
        expect(response.extended_transaction_unsigned.tx.transfer).to.equal(null);

    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *addr_from* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('addr_from');
        expect(response.extended_transaction_unsigned.addr_from.length).to.equal(39);
        expect(Buffer.from(response.extended_transaction_unsigned.addr_from).toString('hex')).to.equal(testfromaddress);
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *size* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('size');
        expect(response.extended_transaction_unsigned.size).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.size)).to.be.a('number');
    });

});
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| extended_transaction_unsigned | [TransactionExtended](#qrl.TransactionExtended) |  |  |







## TransferTokenTxnReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| addresses_to | [bytes](#bytes) | repeated |  |
| token_txhash | [bytes](#bytes) |  |  |
| amounts | [uint64](#uint64) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |





 



# GetLatestDataReq.Filter


| Name | Number | Description |
| ---- | ------ | ----------- |
| ALL | 0 |  |
| BLOCKHEADERS | 1 |  |
| TRANSACTIONS | 2 |  |
| TRANSACTIONS_UNCONFIRMED | 3 |  |




# NodeInfo.State


| Name | Number | Description |
| ---- | ------ | ----------- |
| UNKNOWN | 0 |  |
| UNSYNCED | 1 |  |
| SYNCING | 2 |  |
| SYNCED | 3 |  |
| FORKED | 4 |  |




# PushTransactionResp.ResponseCode


| Name | Number | Description |
| ---- | ------ | ----------- |
| UNKNOWN | 0 |  |
| ERROR | 1 |  |
| VALIDATION_FAILED | 2 |  |
| SUBMITTED | 3 |  |


 

 



# AdminAPI
This is a place holder for testing/instrumentation APIs

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|



# PublicAPI
This service describes the Public API used by clients (wallet/cli/etc)

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetNodeState | [GetNodeStateReq](#qrl.GetNodeStateReq) | [GetNodeStateResp](#qrl.GetNodeStateReq) |  |
| GetKnownPeers | [GetKnownPeersReq](#qrl.GetKnownPeersReq) | [GetKnownPeersResp](#qrl.GetKnownPeersReq) |  |
| GetPeersStat | [GetPeersStatReq](#qrl.GetPeersStatReq) | [GetPeersStatResp](#qrl.GetPeersStatReq) |  |
| GetStats | [GetStatsReq](#qrl.GetStatsReq) | [GetStatsResp](#qrl.GetStatsReq) |  |
| GetAddressState | [GetAddressStateReq](#qrl.GetAddressStateReq) | [GetAddressStateResp](#qrl.GetAddressStateReq) |  |
| GetObject | [GetObjectReq](#qrl.GetObjectReq) | [GetObjectResp](#qrl.GetObjectReq) |  |
| GetLatestData | [GetLatestDataReq](#qrl.GetLatestDataReq) | [GetLatestDataResp](#qrl.GetLatestDataReq) |  |
| TransferCoins | [TransferCoinsReq](#qrl.TransferCoinsReq) | [TransferCoinsResp](#qrl.TransferCoinsReq) |  |
| PushTransaction | [PushTransactionReq](#qrl.PushTransactionReq) | [PushTransactionResp](#qrl.PushTransactionReq) |  |
| GetMessageTxn | [MessageTxnReq](#qrl.MessageTxnReq) | [TransferCoinsResp](#qrl.MessageTxnReq) |  |
| GetTokenTxn | [TokenTxnReq](#qrl.TokenTxnReq) | [TransferCoinsResp](#qrl.TokenTxnReq) |  |
| GetTransferTokenTxn | [TransferTokenTxnReq](#qrl.TransferTokenTxnReq) | [TransferCoinsResp](#qrl.TransferTokenTxnReq) |  |
| GetSlaveTxn | [SlaveTxnReq](#qrl.SlaveTxnReq) | [TransferCoinsResp](#qrl.SlaveTxnReq) |  |
| GetLatticePublicKeyTxn | [LatticePublicKeyTxnReq](#qrl.LatticePublicKeyTxnReq) | [TransferCoinsResp](#qrl.LatticePublicKeyTxnReq) |  |
| GetAddressFromPK | [GetAddressFromPKReq](#qrl.GetAddressFromPKReq) | [GetAddressFromPKResp](#qrl.GetAddressFromPKReq) |  |

 




# qrlbase.proto




## GetNodeInfoReq








## GetNodeInfoResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| version | [string](#string) |  |  |
| grpcProto | [string](#string) |  |  |





 

 

 



## Base


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetNodeInfo | [GetNodeInfoReq](#qrl.GetNodeInfoReq) | [GetNodeInfoResp](#qrl.GetNodeInfoReq) |  |

 




# qrllegacy.proto




## BKData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| mrData | [MRData](#qrl.MRData) |  |  |
| block | [Block](#qrl.Block) |  |  |







## FBData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint64](#uint64) |  |  |







## LegacyMessage
Adding old code to refactor while keeping things working


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| func_name | [LegacyMessage.FuncName](#qrl.LegacyMessage.FuncName) |  |  |
| noData | [NoData](#qrl.NoData) |  |  |
| veData | [VEData](#qrl.VEData) |  |  |
| plData | [PLData](#qrl.PLData) |  |  |
| pongData | [PONGData](#qrl.PONGData) |  |  |
| mrData | [MRData](#qrl.MRData) |  |  |
| block | [Block](#qrl.Block) |  |  |
| fbData | [FBData](#qrl.FBData) |  |  |
| pbData | [PBData](#qrl.PBData) |  |  |
| bhData | [BlockHeightData](#qrl.BlockHeightData) |  |  |
| txData | [Transaction](#qrl.Transaction) |  |  |
| mtData | [Transaction](#qrl.Transaction) |  |  |
| tkData | [Transaction](#qrl.Transaction) |  |  |
| ttData | [Transaction](#qrl.Transaction) |  |  |
| ltData | [Transaction](#qrl.Transaction) |  |  |
| slData | [Transaction](#qrl.Transaction) |  |  |
| ephData | [EncryptedEphemeralMessage](#qrl.EncryptedEphemeralMessage) |  |  |
| syncData | [SYNCData](#qrl.SYNCData) |  |  |
| chainStateData | [NodeChainState](#qrl.NodeChainState) |  |  |
| nodeHeaderHash | [NodeHeaderHash](#qrl.NodeHeaderHash) |  |  |
| p2pAckData | [P2PAcknowledgement](#qrl.P2PAcknowledgement) |  |  |







## MRData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| hash | [bytes](#bytes) |  | FIXME: rename this to block_headerhash |
| type | [LegacyMessage.FuncName](#qrl.LegacyMessage.FuncName) |  | FIXME: type/string what is this |
| stake_selector | [bytes](#bytes) |  |  |
| block_number | [uint64](#uint64) |  |  |
| prev_headerhash | [bytes](#bytes) |  |  |
| reveal_hash | [bytes](#bytes) |  |  |







## NoData








## PBData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block | [Block](#qrl.Block) |  |  |







## PLData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_ips | [string](#string) | repeated |  |
| public_port | [uint32](#uint32) |  |  |







## PONGData



## SYNCData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [string](#string) |  |  |




## VEData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| version | [string](#string) |  |  |
| genesis_prev_hash | [bytes](#bytes) |  |  |
| rate_limit | [uint64](#uint64) |  |  |




## LegacyMessage.FuncName


| Name | Number | Description |
| ---- | ------ | ----------- |
| VE | 0 | Version |
| PL | 1 | Peers List |
| PONG | 2 | Pong TODO: Obsolete |
| MR | 3 | Message received |
| SFM | 4 | Send Full Message |
| BK | 5 | Block |
| FB | 6 | Fetch request for block |
| PB | 7 | Push Block |
| BH | 8 | Block Height |
| TX | 9 | Transfer Transaction |
| LT | 10 | Lattice Transaction |
| EPH | 11 | Ephemeral |
| MT | 12 | Message Transaction |
| TK | 13 | Token Transaction |
| TT | 14 | Transfer Token Transaction |
| SL | 15 | Slave Transaction |
| SYNC | 16 | Add into synced list, if the node replies |
| CHAINSTATE | 17 | Chain State |
| HEADERHASHES | 18 |  |
| P2P_ACK | 19 | P2P Acknowledgement |

# qrlmining.proto


## GetBlockMiningCompatibleReq


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#uint64) |  | Used for getlastblockheader and getblockheaderbyheight

if height = 0, this means getlastblockheader |




## GetBlockMiningCompatibleResp


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blockheader | [BlockHeader](#qrl.BlockHeader) |  |  |
| blockmetadata | [BlockMetaData](#qrl.BlockMetaData) |  |  |







## GetBlockToMineReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| wallet_address | [bytes](#bytes) |  |  |







## GetBlockToMineResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blocktemplate_blob | [string](#string) |  | max length 112 bytes, otherwise xmr-stak will hiccup |
| difficulty | [uint64](#uint64) |  | difficulty that the new block should meet |
| height | [uint64](#uint64) |  |  |
| reserved_offset | [uint32](#uint32) |  |  |







## GetLastBlockHeaderReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#uint64) |  |  |



## GetLastBlockHeaderResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| difficulty | [uint64](#uint64) |  |  |
| height | [uint64](#uint64) |  |  |
| timestamp | [uint64](#uint64) |  |  |
| reward | [uint64](#uint64) |  |  |
| hash | [string](#string) |  |  |
| depth | [uint64](#uint64) |  |  |



## SubmitMinedBlockReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blob | [bytes](#bytes) |  | blocktemplate_blob with the correct nonce |


## SubmitMinedBlockResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| error | [bool](#bool) |  | It seems there are no special fields for success/error reporting, does gRPC automatically give me something? |


## MiningAPI


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetBlockMiningCompatible | [GetBlockMiningCompatibleReq](#qrl.GetBlockMiningCompatibleReq) | [GetBlockMiningCompatibleResp](#qrl.GetBlockMiningCompatibleReq) |  |
| GetLastBlockHeader | [GetLastBlockHeaderReq](#qrl.GetLastBlockHeaderReq) | [GetLastBlockHeaderResp](#qrl.GetLastBlockHeaderReq) |  |
| GetBlockToMine | [GetBlockToMineReq](#qrl.GetBlockToMineReq) | [GetBlockToMineResp](#qrl.GetBlockToMineReq) |  |
| SubmitMinedBlock | [SubmitMinedBlockReq](#qrl.SubmitMinedBlockReq) | [SubmitMinedBlockResp](#qrl.SubmitMinedBlockReq) |  |


# Scalar Value Types

| .proto Type | Notes | C++ Type | Java Type | Python Type |
| ----------- | ----- | -------- | --------- | ----------- |
| <a name="double" /> double |  | double | double | float |
| <a name="float" /> float |  | float | float | float |
| <a name="int32" /> int32 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int |
| <a name="int64" /> int64 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long |
| <a name="uint32" /> uint32 | Uses variable-length encoding. | uint32 | int | int/long |
| <a name="uint64" /> uint64 | Uses variable-length encoding. | uint64 | long | int/long |
| <a name="sint32" /> sint32 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. | int32 | int | int |
| <a name="sint64" /> sint64 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long |
| <a name="fixed32" /> fixed32 | Always four bytes. More efficient than uint32 if values are often greater than 2^28. | uint32 | int | int |
| <a name="fixed64" /> fixed64 | Always eight bytes. More efficient than uint64 if values are often greater than 2^56. | uint64 | long | int/long |
| <a name="sfixed32" /> sfixed32 | Always four bytes. | int32 | int | int |
| <a name="sfixed64" /> sfixed64 | Always eight bytes. | int64 | long | int/long |
| <a name="bool" /> bool |  | bool | boolean | boolean |
| <a name="string" /> string | A string must always contain UTF-8 encoded or 7-bit ASCII text. | string | String | str/unicode |
| <a name="bytes" /> bytes | May contain any arbitrary sequence of bytes. | string | ByteString | str |

