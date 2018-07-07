---
title: QRL API

language_tabs: # must be one of https://git.io/vQNgJ
  - javascript: JavaScript
  - python: Python

toc_footers:
  - <a href='https://github.com/theqrl'>QRL Github</a>
  - <a href='https://theqrl.org'>TheQRL.org</a>
  - <a href='https://docs.theqrl.org'>Docs.TheQRL.org</a>


includes:
  - errors

search: true
---


# QRL API Documentation

> Select the language above to suit your needs. 

```python
Example Python Code will be shown here.
```

```javascript
Example JavaScript will be shown here.
```


Use this documentation to build onto the QRL network. This document covers all of the various API calls QRL supports, with some basic code examples. This is intended to lighten the on-boarding process and get developers up to speed with our API.


<aside class="notice">
This is a work in progress, code may change. Please see the official documentation at [https://docs.theqrl.org](https://docs.theqrl.org) or drop a line to [support@theqrl.org](mailto://support@theqrl.org)
</aside>

## Introduction


> **fixme** Some cool fact or link to rpc --> grpc conversion tools?

**fixme** QRL uses gRPC to do things. they are cool things and need to be documented here in a basic way!

<aside class="notice"> **fixme** Fill in this section with a generic explanation of the API and uses!</aside>





## Basic Connection

```python
**fixme**
        self.SK = self.xmss.getSK()
        self.height = self.xmss.getHeight()
        self.signatures = 2**self.height
        self.address = self.xmss.getAddress('Q')
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

Connecting to the QRL network is simple. Use the examples shown to get started. **fixme** There may be some specific details we should be calling out here!


<aside class="notice">
**fixme** Notice! We need to update this section and give good info for setup and usage.
</aside>




## Important information 

**OTS Keys**

> QRL uses XMSS to extend the available OTS keys. You need to be cognizant that you don't run out of available keys in a wallet.

<aside class="warning">
Warning! If you use all OTS keys the remaining funds will be locked. Please see the documentation at <a href="https://docs.theqrl.org/developers/ots/">docs.theqrl.org</a>
</aside>

You are able to generate a slaves file that is basically an extension of the main wallet, authorized to make transactions for the main wallet address. See the docs for more information [docs.theqrl.org](https://docs.theqrl.org/wallet/slaves.json/)



# Functions

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


## stringToBytes

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


## binaryToBytes

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
qrlClient variable defines the API URL with the corresponding port. In the example above, the API is runnign locally on port 10002.



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



# qrl.proto


## AddressAmount

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |
| amount | [uint64](#uint64) |  |  |







## AddressList

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


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

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [uint32](#uint32) |  |  |







## AddressState.TokensEntry

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [uint64](#uint64) |  |  |







## Block

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#qrl.BlockHeader) |  |  |
| transactions | [Transaction](#qrl.Transaction) | repeated |  |
| genesis_balance | [GenesisBalance](#qrl.GenesisBalance) | repeated | This is only applicable to genesis blocks |







## BlockDataPoint

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


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

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#qrl.BlockHeader) |  |  |
| extended_transactions | [TransactionExtended](#qrl.TransactionExtended) | repeated |  |
| genesis_balance | [GenesisBalance](#qrl.GenesisBalance) | repeated | This is only applicable to genesis blocks |
| size | [uint64](#uint64) |  |  |







## BlockHeader

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


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

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#qrl.BlockHeader) |  |  |
| transaction_count | [TransactionCount](#qrl.TransactionCount) |  |  |







## BlockHeightData

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |
| block_headerhash | [bytes](#bytes) |  |  |
| cumulative_difficulty | [bytes](#bytes) |  |  |







## BlockMetaData

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_difficulty | [bytes](#bytes) |  |  |
| cumulative_difficulty | [bytes](#bytes) |  |  |
| child_headerhashes | [bytes](#bytes) | repeated |  |
| last_N_headerhashes | [bytes](#bytes) | repeated | Keeps last N headerhashes, for measurement of timestamp difference |







## BlockMetaDataList

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number_hashes | [BlockMetaData](#qrl.BlockMetaData) | repeated |  |







## BlockNumberMapping

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| headerhash | [bytes](#bytes) |  |  |
| prev_headerhash | [bytes](#bytes) |  |  |







## Empty

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


Empty message definition







## EncryptedEphemeralMessage

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| msg_id | [bytes](#bytes) |  | b&#39;NEW&#39; or PRF |
| ttl | [uint64](#uint64) |  | Expiry Timestamp in seconds |
| ttr | [uint64](#uint64) |  | Time to relay |
| channel | [EncryptedEphemeralMessage.Channel](#qrl.EncryptedEphemeralMessage.Channel) |  |  |
| nonce | [uint64](#uint64) |  | nonce |
| payload | [bytes](#bytes) |  | JSON content, encrypted by aes256_symkey |







## EncryptedEphemeralMessage.Channel

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| enc_aes256_symkey | [bytes](#bytes) |  | aes256_symkey encrypted by kyber |







## GenesisBalance

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  | Address is string only here to increase visibility |
| balance | [uint64](#uint64) |  |  |







## GetAddressFromPKReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pk | [bytes](#bytes) |  |  |







## GetAddressFromPKResp

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |







## GetAddressStateReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |







## GetAddressStateResp

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [AddressState](#qrl.AddressState) |  |  |







## GetBlockReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


NOT USED -&gt; RM?


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint64](#uint64) |  | Indicates the index number in mainchain |
| after_hash | [bytes](#bytes) |  | request the node that comes after hash |







## GetBlockResp

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


NOT USED -&gt; RM?


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| node_info | [NodeInfo](#qrl.NodeInfo) |  |  |
| block | [Block](#qrl.Block) |  |  |







## GetKnownPeersReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


Represents a query to get known peers







## GetKnownPeersResp

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


Represents the reply message to known peers query


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| node_info | [NodeInfo](#qrl.NodeInfo) |  | NodeInfo object containing node state information |
| known_peers | [Peer](#qrl.Peer) | repeated | List of Peer objects containing peer nodes detailed information |







## GetLatestDataReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| filter | [GetLatestDataReq.Filter](#qrl.GetLatestDataReq.Filter) |  |  |
| offset | [uint32](#uint32) |  | Offset in the result list (works backwards in this case) |
| quantity | [uint32](#uint32) |  | Number of items to retrive. Capped at 100 |







## GetLatestDataResp

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blockheaders | [BlockHeaderExtended](#qrl.BlockHeaderExtended) | repeated |  |
| transactions | [TransactionExtended](#qrl.TransactionExtended) | repeated |  |
| transactions_unconfirmed | [TransactionExtended](#qrl.TransactionExtended) | repeated |  |







## GetLocalAddressesReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```







## GetLocalAddressesResp

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses | [bytes](#bytes) | repeated |  |







## GetNodeStateReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


Represents a query to get node state







## GetNodeStateResp

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


Represents the reply message to node state query


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| info | [NodeInfo](#qrl.NodeInfo) |  |  |







## GetObjectReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [bytes](#bytes) |  |  |







## GetObjectResp

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| found | [bool](#bool) |  |  |
| address_state | [AddressState](#qrl.AddressState) |  |  |
| transaction | [TransactionExtended](#qrl.TransactionExtended) |  |  |
| block_extended | [BlockExtended](#qrl.BlockExtended) |  |  |







## GetPeersStatReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


Represents a query to get connected peers stat







## GetPeersStatResp

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


Represents the reply message to peers stat query


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peers_stat | [PeerStat](#qrl.PeerStat) | repeated | PeerState object contains peer_ip, port and peer state information |







## GetStatsReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


Represents a query to get statistics about node


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| include_timeseries | [bool](#bool) |  | Boolean to define if block timeseries should be included in reply or not |







## GetStatsResp

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
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







## LRUStateCache



```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```





## LatticePK

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| txhash | [bytes](#bytes) |  |  |
| dilithium_pk | [bytes](#bytes) |  |  |
| kyber_pk | [bytes](#bytes) |  |  |







## MessageTxnReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| message | [bytes](#bytes) |  |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |







## NodeChainState

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |
| header_hash | [bytes](#bytes) |  |  |
| cumulative_difficulty | [bytes](#bytes) |  |  |
| version | [string](#string) |  |  |
| timestamp | [uint64](#uint64) |  |  |







## NodeHeaderHash

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |
| headerhashes | [bytes](#bytes) | repeated |  |







## NodeInfo

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


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







## P2PAcknowledgement

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| bytes_processed | [uint32](#uint32) |  |  |







## Peer

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ip | [string](#string) |  |  |







## PeerInfo

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_ip | [bytes](#bytes) |  |  |
| port | [uint32](#uint32) |  |  |
| banned_timestamp | [uint32](#uint32) |  |  |
| credibility | [uint32](#uint32) |  |  |
| last_connections_timestamp | [uint32](#uint32) | repeated |  |







## PeerStat

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_ip | [bytes](#bytes) |  |  |
| port | [uint32](#uint32) |  |  |
| node_chain_state | [NodeChainState](#qrl.NodeChainState) |  |  |







## Peers

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_info_list | [PeerInfo](#qrl.PeerInfo) | repeated |  |







## PushTransactionReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| transaction_signed | [Transaction](#qrl.Transaction) |  |  |







## PushTransactionResp

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| error_code | [PushTransactionResp.ResponseCode](#qrl.PushTransactionResp.ResponseCode) |  |  |
| error_description | [string](#string) |  |  |
| tx_hash | [bytes](#bytes) |  |  |







## SlaveTxnReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| slave_pks | [bytes](#bytes) | repeated |  |
| access_types | [uint32](#uint32) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |







## StateLoader

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses | [bytes](#bytes) | repeated |  |
| token_txhash | [bytes](#bytes) | repeated |  |
| txhash | [bytes](#bytes) | repeated |  |
| total_coin_supply | [uint64](#uint64) |  |  |







## StateObjects

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state_loaders | [bytes](#bytes) | repeated |  |







## StoredPeers

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peers | [Peer](#qrl.Peer) | repeated |  |







## TokenList

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#bytes) | repeated |  |







## TokenMetadata

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#bytes) |  |  |
| transfer_token_tx_hashes | [bytes](#bytes) | repeated |  |







## TokenTxnReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
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







## Transaction

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


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

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addr_to | [bytes](#bytes) |  |  |
| amount | [uint64](#uint64) |  |  |







## Transaction.LatticePublicKey

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| kyber_pk | [bytes](#bytes) |  |  |
| dilithium_pk | [bytes](#bytes) |  |  |







## Transaction.Message

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| message_hash | [bytes](#bytes) |  |  |







## Transaction.Slave

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slave_pks | [bytes](#bytes) | repeated |  |
| access_types | [uint32](#uint32) | repeated |  |







## Transaction.Token

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| symbol | [bytes](#bytes) |  |  |
| name | [bytes](#bytes) |  |  |
| owner | [bytes](#bytes) |  |  |
| decimals | [uint64](#uint64) |  |  |
| initial_balances | [AddressAmount](#qrl.AddressAmount) | repeated |  |







## Transaction.Transfer

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addrs_to | [bytes](#bytes) | repeated |  |
| amounts | [uint64](#uint64) | repeated |  |





## Transaction.TransferToken

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#bytes) |  |  |
| addrs_to | [bytes](#bytes) | repeated |  |
| amounts | [uint64](#uint64) | repeated |  |







## TransactionCount

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| count | [TransactionCount.CountEntry](#qrl.TransactionCount.CountEntry) | repeated |  |





## TransactionCount.CountEntry

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [uint32](#uint32) |  |  |
| value | [uint32](#uint32) |  |  |





## TransactionExtended

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#qrl.BlockHeader) |  |  |
| tx | [Transaction](#qrl.Transaction) |  |  |
| addr_from | [bytes](#bytes) |  |  |
| size | [uint64](#uint64) |  |  |
| timestamp_seconds | [uint64](#uint64) |  |  |





## TransferCoinsReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
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
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| extended_transaction_unsigned | [TransactionExtended](#qrl.TransactionExtended) |  |  |



## TransferTokenTxnReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| addresses_to | [bytes](#bytes) | repeated |  |
| token_txhash | [bytes](#bytes) |  |  |
| amounts | [uint64](#uint64) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |



## GetLatestDataReq.Filter

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```

| Name | Number | Description |
| ---- | ------ | ----------- |
| ALL | 0 |  |
| BLOCKHEADERS | 1 |  |
| TRANSACTIONS | 2 |  |
| TRANSACTIONS_UNCONFIRMED | 3 |  |




## NodeInfo.State

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Name | Number | Description |
| ---- | ------ | ----------- |
| UNKNOWN | 0 |  |
| UNSYNCED | 1 |  |
| SYNCING | 2 |  |
| SYNCED | 3 |  |
| FORKED | 4 |  |




## PushTransactionResp.ResponseCode

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Name | Number | Description |
| ---- | ------ | ----------- |
| UNKNOWN | 0 |  |
| ERROR | 1 |  |
| VALIDATION_FAILED | 2 |  |
| SUBMITTED | 3 |  |



## AdminAPI

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


This is a place holder for testing/instrumentation APIs

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|



## PublicAPI

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


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
| PushTransaction | [PushTransactionReq](#qrl.PushTransactionReq) | [PushTransactionResp](#qrl.PushTransactionReq) |  |
| TransferCoins | [TransferCoinsReq](#qrl.TransferCoinsReq) | [TransferCoinsResp](#qrl.TransferCoinsReq) |  |
| GetAddressFromPK | [GetAddressFromPKReq](#qrl.GetAddressFromPKReq) | [GetAddressFromPKResp](#qrl.GetAddressFromPKReq) |  |
| GetMessageTxn | [MessageTxnReq](#qrl.MessageTxnReq) | [TransferCoinsResp](#qrl.MessageTxnReq) |  |
| GetTokenTxn | [TokenTxnReq](#qrl.TokenTxnReq) | [TransferCoinsResp](#qrl.TokenTxnReq) |  |
| GetTransferTokenTxn | [TransferTokenTxnReq](#qrl.TransferTokenTxnReq) | [TransferCoinsResp](#qrl.TransferTokenTxnReq) |  |
| GetSlaveTxn | [SlaveTxnReq](#qrl.SlaveTxnReq) | [TransferCoinsResp](#qrl.SlaveTxnReq) |  |

 

<p align="right"><a href="#top">Top</a></p>

# qrlbase.proto




## GetNodeInfoReq


```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```



## GetNodeInfoResp

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| version | [string](#string) |  |  |
| grpcProto | [string](#string) |  |  |



## Base

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetNodeInfo | [GetNodeInfoReq](#qrl.GetNodeInfoReq) | [GetNodeInfoResp](#qrl.GetNodeInfoReq) |  |

 



<p align="right"><a href="#top">Top</a></p>

# qrldebug.proto




## GetFullStateReq



```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


## GetFullStateResp

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| coinbase_state | [AddressState](#qrl.AddressState) |  |  |
| addresses_state | [AddressState](#qrl.AddressState) | repeated |  |





## DebugAPI

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


This service describes the Debug API used for debugging

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetFullState | [GetFullStateReq](#qrl.GetFullStateReq) | [GetFullStateResp](#qrl.GetFullStateReq) |  |

 

<p align="right"><a href="#top">Top</a></p>

# qrllegacy.proto




## BKData

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| mrData | [MRData](#qrl.MRData) |  |  |
| block | [Block](#qrl.Block) |  |  |




## FBData

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint64](#uint64) |  |  |



## LegacyMessage

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


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

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| hash | [bytes](#bytes) |  | FIXME: rename this to block_headerhash |
| type | [LegacyMessage.FuncName](#qrl.LegacyMessage.FuncName) |  | FIXME: type/string what is this |
| stake_selector | [bytes](#bytes) |  |  |
| block_number | [uint64](#uint64) |  |  |
| prev_headerhash | [bytes](#bytes) |  |  |
| reveal_hash | [bytes](#bytes) |  |  |




## NoData

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


## PBData

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block | [Block](#qrl.Block) |  |  |



## PLData

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_ips | [string](#string) | repeated |  |
| public_port | [uint32](#uint32) |  |  |




## PONGData

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```




## SYNCData

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [string](#string) |  |  |




## VEData

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| version | [string](#string) |  |  |
| genesis_prev_hash | [bytes](#bytes) |  |  |
| rate_limit | [uint64](#uint64) |  |  |




## LegacyMessage.FuncName

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


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




<p align="right"><a href="#top">Top</a></p>

# qrlmining.proto



## GetBlockMiningCompatibleReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#uint64) |  | Used for getlastblockheader and getblockheaderbyheight

if height = 0, this means getlastblockheader |




## GetBlockMiningCompatibleResp

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blockheader | [BlockHeader](#qrl.BlockHeader) |  |  |
| blockmetadata | [BlockMetaData](#qrl.BlockMetaData) |  |  |




## GetBlockToMineReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| wallet_address | [bytes](#bytes) |  |  |




## GetBlockToMineResp

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blocktemplate_blob | [string](#string) |  | max length 112 bytes, otherwise xmr-stak will hiccup |
| difficulty | [uint64](#uint64) |  | difficulty that the new block should meet |
| height | [uint64](#uint64) |  |  |
| reserved_offset | [uint32](#uint32) |  |  |




## GetLastBlockHeaderReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#uint64) |  |  |



## GetLastBlockHeaderResp

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| difficulty | [uint64](#uint64) |  |  |
| height | [uint64](#uint64) |  |  |
| timestamp | [uint64](#uint64) |  |  |
| reward | [uint64](#uint64) |  |  |
| hash | [string](#string) |  |  |
| depth | [uint64](#uint64) |  |  |




## SubmitMinedBlockReq

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blob | [bytes](#bytes) |  | blocktemplate_blob with the correct nonce |





## SubmitMinedBlockResp

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| error | [bool](#bool) |  | It seems there are no special fields for success/error reporting, does gRPC automatically give me something? |




## MiningAPI

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetBlockMiningCompatible | [GetBlockMiningCompatibleReq](#qrl.GetBlockMiningCompatibleReq) | [GetBlockMiningCompatibleResp](#qrl.GetBlockMiningCompatibleReq) |  |
| GetLastBlockHeader | [GetLastBlockHeaderReq](#qrl.GetLastBlockHeaderReq) | [GetLastBlockHeaderResp](#qrl.GetLastBlockHeaderReq) |  |
| GetBlockToMine | [GetBlockToMineReq](#qrl.GetBlockToMineReq) | [GetBlockToMineResp](#qrl.GetBlockToMineReq) |  |
| SubmitMinedBlock | [SubmitMinedBlockReq](#qrl.SubmitMinedBlockReq) | [SubmitMinedBlockResp](#qrl.SubmitMinedBlockReq) |  |

 



<p align="right"><a href="#top">Top</a></p>

# qrlstateinfo.proto


## ForkState

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| initiator_headerhash | [bytes](#bytes) |  | Stores the headerhash of the block initiated the fork recovery |
| fork_point_headerhash | [bytes](#bytes) |  | Stores the headerhash of the block after which forked happened |
| old_mainchain_hash_path | [bytes](#bytes) | repeated | Stores the hash path of old main chain which needs to be played |
| new_mainchain_hash_path | [bytes](#bytes) | repeated | if the fork recovery fails

Alternate chain hash path which is eligible to become mainchain |




## LastTransactions

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tx_metadata | [TransactionMetadata](#qrl.TransactionMetadata) | repeated |  |




## TransactionMetadata

```python
**fixme** Enter Python code here
```

```javascript
**fixme** Enter JAVASCRIPT here
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| transaction | [Transaction](#qrl.Transaction) |  |  |
| block_number | [uint64](#uint64) |  |  |
| timestamp | [uint64](#uint64) |  |  |




# Scalar Value Types

| .proto Type | Notes | C++ Type | Java Type | Python Type |
| ----------- | ----- | -------- | --------- | ----------- |
| | | ncoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int |
| ncoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long |
|  int/long |
| ong | int/long |
| alue. These more efficiently encode negative numbers than regular int32s. | int32 | int | int |
| alue. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long |
| int32 if values are often greater than 2^28. | uint32 | int | int |
| int64 if values are often greater than 2^56. | uint64 | long | int/long |
| | ong |
| | -bit ASCII text. | string | String | str/unicode |
| tring | ByteString | str |

