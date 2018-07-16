---
title: QRL API

language_tabs: # must be one of https://git.io/vQNgJ
  - javascript: JavaScript
  - python: Python

toc_footers:
  - <a href='https://github.com/theqrl'>QRL Github</a> 
  - <a href='https://theqrl.org'>TheQRL.org - Main Site</a>
  - <a href='https://docs.theqrl.org'>Docs.TheQRL.org - Documentation</a>


includes:
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



# qrl.proto


Our API's protocol data structure is defined in the qrl.proto file found in the source code in our [github repo](https://github.com/theQRL/QRL/blob/master/src/qrl/protos/qrl.proto). Our PublicAPI service lists the functions available in our API. 

<a name="PublicAPI"/>

## PublicAPI

```python
```

```javascript
   
```


This service describes the Public API used by clients (wallet/cli/etc)

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| [GetNodeState](#GetNodeState) | [GetNodeStateReq](#GetNodeStateReq) | [GetNodeStateResp](#GetNodeStateReq) | Represents a query to get node state |
| GetKnownPeers | [GetKnownPeersReq](#GetKnownPeersReq) | [GetKnownPeersResp](#GetKnownPeersReq) |  |
| GetPeersStat | [GetPeersStatReq](#GetPeersStatReq) | [GetPeersStatResp](#GetPeersStatReq) |  |
| GetStats | [GetStatsReq](#GetStatsReq) | [GetStatsResp](#GetStatsReq) |  |
| GetAddressState | [GetAddressStateReq](#GetAddressStateReq) | [GetAddressStateResp](#GetAddressStateReq) |  |
| GetObject | [GetObjectReq](#GetObjectReq) | [GetObjectResp](#GetObjectReq) |  |
| GetLatestData | [GetLatestDataReq](#GetLatestDataReq) | [GetLatestDataResp](#GetLatestDataReq) |  |
| PushTransaction | [PushTransactionReq](#PushTransactionReq) | [PushTransactionResp](#PushTransactionReq) |  |
| TransferCoins | [TransferCoinsReq](#TransferCoinsReq) | [TransferCoinsResp](#TransferCoinsReq) |  |
| GetAddressFromPK | [GetAddressFromPKReq](#GetAddressFromPKReq) | [GetAddressFromPKResp](#GetAddressFromPKReq) |  |
| GetMessageTxn | [MessageTxnReq](#MessageTxnReq) | [TransferCoinsResp](#MessageTxnReq) |  |
| GetTokenTxn | [TokenTxnReq](#TokenTxnReq) | [TransferCoinsResp](#TokenTxnReq) |  |
| GetTransferTokenTxn | [TransferTokenTxnReq](#TransferTokenTxnReq) | [TransferCoinsResp](#TransferTokenTxnReq) |  |
| GetSlaveTxn | [SlaveTxnReq](#SlaveTxnReq) | [TransferCoinsResp](#SlaveTxnReq) |  |

 
<a name="GetNodeState"/>

## GetNodeState 

<a name="GetNodeStateReq"/>

### GetNodeStateReq

```python
   
```

```javascript
message GetNodeStateReq { }
```
Represents a query to get node state



<a name="GetNodeStateResp"/>


### GetNodeStateResp

```python
   
```
```javascript
message GetNodeStateResp {
    NodeInfo info = 1;
}
```
Represents the reply message to node state query

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| info | [NodeInfo](#NodeInfo) |  |  |



<a name="GetKnownPeersReq"/>

## GetKnownPeersReq


```python
   
```

```javascript
message GetKnownPeersReq { }
```

Represents a query to get known peers

<a name="GetKnownPeersResp"/>

## GetKnownPeersResp

```python
   
```

```javascript
message GetKnownPeersResp {
    NodeInfo node_info = 1;
    repeated Peer known_peers = 2;
}
```


Represents the reply message to known peers query


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| node_info | [NodeInfo](#NodeInfo) |  | NodeInfo object containing node state information |
| known_peers | [Peer](#Peer) | repeated | List of Peer objects containing peer nodes detailed information |


<a name="GetPeersStatReq"/>

## GetPeersStatReq

```python
   
```
```javascript
message GetPeersStatReq { }
```
Represents a query to get connected peers stat

<a name="GetPeersStatResp"/>

## GetPeersStatResp

```python
   
```
```javascript
message GetPeersStatResp {
    repeated PeerStat peers_stat = 1;
```

Represents the reply message to peers stat query

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peers_stat | [PeerStat](#PeerStat) | repeated | PeerState object contains peer_ip, port and peer state information |




<a name="GetStatsReq"/>


## GetStatsReq

```python
   
```
```javascript
message GetStatsReq {
    bool include_timeseries = 1;
}
```

Represents a query to get statistics about node

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| include_timeseries | [bool](#bool) |  | Boolean to define if block timeseries should be included in reply or not |

<a name="GetStatsResp"/>


## GetStatsResp

```python
   
```
```javascript
message GetStatsResp {
    NodeInfo node_info = 1;                 // NodeInfo object containing node state information
    uint64 epoch = 2;                       // Current epoch
    uint64 uptime_network = 3;              // Indicates uptime in seconds

    uint64 block_last_reward = 4;           // Block reward
    uint64 block_time_mean = 5;             // Blocktime average
    uint64 block_time_sd = 6;               // Blocktime standrad deviation

    uint64 coins_total_supply = 7;          // Total coins supply
    uint64 coins_emitted = 8;               // Total coins emitted

    repeated BlockDataPoint block_timeseries = 9;
}
```
Represents the reply message to get statistics about node

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| node_info | [NodeInfo](#NodeInfo) |  | NodeInfo object containing node state information |
| epoch | [uint64](#uint64) |  | Current epoch |
| uptime_network | [uint64](#uint64) |  | Indicates uptime in seconds |
| block_last_reward | [uint64](#uint64) |  | Block reward |
| block_time_mean | [uint64](#uint64) |  | Blocktime average |
| block_time_sd | [uint64](#uint64) |  | Blocktime standrad deviation |
| coins_total_supply | [uint64](#uint64) |  | Total coins supply |
| coins_emitted | [uint64](#uint64) |  | Total coins emitted |
| block_timeseries | [BlockDataPoint](#BlockDataPoint) | repeated |  |





<a name="GetAddressStateReq"/>


## GetAddressStateReq

```python
   
```

```javascript
message GetAddressStateReq {   bytes address = 1; }
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |

<a name="GetAddressStateResp"/>

## GetAddressStateResp

```python
   
```

```javascript
message GetAddressStateResp {
    AddressState state = 1;
}
```
| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [AddressState](#AddressState) |  |  |




<a name="GetObjectReq"/>


## GetObjectReq

```python
   
```

```javascript
message GetObjectReq {  bytes query = 1;    }
```
| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [bytes](#bytes) |  |  |


<a name="GetObjectResp"/>

## GetObjectResp

```python
   
```

```javascript
message GetObjectResp {
    bool found = 1;
    oneof result {
        AddressState address_state = 2;
        TransactionExtended transaction = 3;
        BlockExtended block_extended = 4;
    }
}
```
| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| found | [bool](#bool) |  |  |
| address_state | [AddressState](#AddressState) |  |  |
| transaction | [TransactionExtended](#TransactionExtended) |  |  |
| block_extended | [BlockExtended](#BlockExtended) |  |  |





<a name="GetLatestDataReq"/>

## GetLatestDataReq

```python
   
```

```javascript
message GetLatestDataReq {
    enum Filter {
        ALL = 0;
        BLOCKHEADERS = 1;
        TRANSACTIONS = 2;
        TRANSACTIONS_UNCONFIRMED = 3;
    }
    Filter filter = 1;
    uint32 offset = 2;                      // Offset in the result list (works backwards in this case)
    uint32 quantity = 3;                    // Number of items to retrive. Capped at 100
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| filter | [GetLatestDataReq.Filter](#GetLatestDataReq.Filter) |  |  |
| offset | [uint32](#uint32) |  | Offset in the result list (works backwards in this case) |
| quantity | [uint32](#uint32) |  | Number of items to retrive. Capped at 100 |

<a name="GetLatestDataResp"/>

## GetLatestDataResp

```python
   
```

```javascript
message GetLatestDataResp {
    repeated BlockHeaderExtended blockheaders = 1;
    repeated TransactionExtended transactions = 2;
    repeated TransactionExtended transactions_unconfirmed = 3;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blockheaders | [BlockHeaderExtended](#BlockHeaderExtended) | repeated |  |
| transactions | [TransactionExtended](#TransactionExtended) | repeated |  |
| transactions_unconfirmed | [TransactionExtended](#TransactionExtended) | repeated |  |


<a name="PushTransactionReq"/>


## PushTransactionReq

```python
   
```
```javascript
message PushTransactionReq {    Transaction transaction_signed = 1;     }
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| transaction_signed | [Transaction](#Transaction) |  |  |

<a name="PushTransactionResp"/>

## PushTransactionResp

```python
   
```
```javascript
message PushTransactionResp {
    enum ResponseCode {
        UNKNOWN = 0;
        ERROR = 1;
        VALIDATION_FAILED = 2;
        SUBMITTED = 3;
    }

    ResponseCode error_code = 1;
    string error_description = 2;
    bytes tx_hash = 3;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| error_code | [PushTransactionResp.ResponseCode](#PushTransactionResp.ResponseCode) |  |  |
| error_description | [string](#string) |  |  |
| tx_hash | [bytes](#bytes) |  |  |


<a name="TransferCoinsReq"/>


## TransferCoinsReq

```python
   
```

```javascript
message TransferCoinsReq {
    bytes master_addr = 1;                 // Transaction source address
    repeated bytes addresses_to = 2;                   // Transaction destination address
    repeated uint64 amounts = 3;                      // Amount. It should be expressed in Shor
    uint64 fee = 4;                         // Fee. It should be expressed in Shor
    bytes xmss_pk = 5;                      // XMSS Public key
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  | Transaction source address |
| addresses_to | [bytes](#bytes) | repeated | Transaction destination address |
| amounts | [uint64](#uint64) | repeated | Amount. It should be expressed in Shor |
| fee | [uint64](#uint64) |  | Fee. It should be expressed in Shor |
| xmss_pk | [bytes](#bytes) |  | XMSS Public key |

<a name="TransferCoinsResp"/>

## TransferCoinsResp

```python
   
```
```javascript
message TransferCoinsResp {
    TransactionExtended extended_transaction_unsigned = 1;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| extended_transaction_unsigned | [TransactionExtended](#TransactionExtended) |  |  |


<a name="GetAddressFromPKReq"/>


## GetAddressFromPKReq

```python
   
```
```javascript
message GetAddressFromPKReq {
    bytes pk = 1;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pk | [bytes](#bytes) |  |  |


<a name="GetAddressFromPKResp"/>

## GetAddressFromPKResp

```python
   
```
```javascript
message GetAddressFromPKResp {
    bytes address = 1;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |


<a name="MessageTxnReq"/>


## MessageTxnReq

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| message | [bytes](#bytes) |  |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |


<a name="TokenTxnReq"/>

## TokenTxnReq

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| symbol | [bytes](#bytes) |  |  |
| name | [bytes](#bytes) |  |  |
| owner | [bytes](#bytes) |  |  |
| decimals | [uint64](#uint64) |  |  |
| initial_balances | [AddressAmount](#AddressAmount) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |


<a name="TransferTokenTxnReq"/>

## TransferTokenTxnReq

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| addresses_to | [bytes](#bytes) | repeated |  |
| token_txhash | [bytes](#bytes) |  |  |
| amounts | [uint64](#uint64) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |



<a name="SlaveTxnReq"/>

## SlaveTxnReq

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| slave_pks | [bytes](#bytes) | repeated |  |
| access_types | [uint32](#uint32) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |













<a name="MiningAPI"/>


## MiningAPI

```python
   
```

```javascript
   
```

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetBlockMiningCompatible | [GetBlockMiningCompatibleReq](#GetBlockMiningCompatibleReq) | [GetBlockMiningCompatibleResp](#GetBlockMiningCompatibleReq) |  |
| GetLastBlockHeader | [GetLastBlockHeaderReq](#GetLastBlockHeaderReq) | [GetLastBlockHeaderResp](#GetLastBlockHeaderReq) |  |
| GetBlockToMine | [GetBlockToMineReq](#GetBlockToMineReq) | [GetBlockToMineResp](#GetBlockToMineReq) |  |
| SubmitMinedBlock | [SubmitMinedBlockReq](#SubmitMinedBlockReq) | [SubmitMinedBlockResp](#SubmitMinedBlockReq) |  |

 


<a name="AdminAPI"/>

## AdminAPI


This is a place holder for testing/instrumentation APIs

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|










































<a name="AddressAmount"/>

## AddressAmount

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |
| amount | [uint64](#uint64) |  |  |





<a name="AddressList"/>


## AddressList

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses | [bytes](#bytes) | repeated |  |





<a name="AddressState"/>


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
| tokens | [AddressState.TokensEntry](#AddressState.TokensEntry) | repeated |  |
| latticePK_list | [LatticePK](#LatticePK) | repeated |  |
| slave_pks_access_type | [AddressState.SlavePksAccessTypeEntry](#AddressState.SlavePksAccessTypeEntry) | repeated |  |
| ots_counter | [uint64](#uint64) |  |  |






<a name="AddressState.SlavePksAccessTypeEntry"/>

## AddressState.SlavePksAccessTypeEntry

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [uint32](#uint32) |  |  |






<a name="AddressState.TokensEntry"/>

## AddressState.TokensEntry

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [uint64](#uint64) |  |  |





<a name="Block"/>


## Block

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#BlockHeader) |  |  |
| transactions | [Transaction](#Transaction) | repeated |  |
| genesis_balance | [GenesisBalance](#GenesisBalance) | repeated | This is only applicable to genesis blocks |






<a name="BlockDataPoint"/>

## BlockDataPoint

```python
   
```

```javascript
   
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





<a name="BlockExtended"/>


## BlockExtended

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#BlockHeader) |  |  |
| extended_transactions | [TransactionExtended](#TransactionExtended) | repeated |  |
| genesis_balance | [GenesisBalance](#GenesisBalance) | repeated | This is only applicable to genesis blocks |
| size | [uint64](#uint64) |  |  |





<a name="BlockHeader"/>


## BlockHeader

```python
   
```

```javascript
   
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





<a name="BlockHeaderExtended"/>


## BlockHeaderExtended

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#BlockHeader) |  |  |
| transaction_count | [TransactionCount](#TransactionCount) |  |  |






<a name="BlockHeightData"/>

## BlockHeightData

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |
| block_headerhash | [bytes](#bytes) |  |  |
| cumulative_difficulty | [bytes](#bytes) |  |  |





<a name="BlockMetaData"/>


## BlockMetaData

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_difficulty | [bytes](#bytes) |  |  |
| cumulative_difficulty | [bytes](#bytes) |  |  |
| child_headerhashes | [bytes](#bytes) | repeated |  |
| last_N_headerhashes | [bytes](#bytes) | repeated | Keeps last N headerhashes, for measurement of timestamp difference |






<a name="BlockMetaDataList"/>

## BlockMetaDataList

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number_hashes | [BlockMetaData](#BlockMetaData) | repeated |  |






<a name="BlockNumberMapping"/>

## BlockNumberMapping

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| headerhash | [bytes](#bytes) |  |  |
| prev_headerhash | [bytes](#bytes) |  |  |





<a name="Empty"/>


## Empty

```python
   
```

```javascript
   
```


Empty message definition





<a name="EncryptedEphemeralMessage"/>


## EncryptedEphemeralMessage

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| msg_id | [bytes](#bytes) |  | b&#39;NEW&#39; or PRF |
| ttl | [uint64](#uint64) |  | Expiry Timestamp in seconds |
| ttr | [uint64](#uint64) |  | Time to relay |
| channel | [EncryptedEphemeralMessage.Channel](#EncryptedEphemeralMessage.Channel) |  |  |
| nonce | [uint64](#uint64) |  | nonce |
| payload | [bytes](#bytes) |  | JSON content, encrypted by aes256_symkey |





<a name="EncryptedEphemeralMessage.Channel"/>


## EncryptedEphemeralMessage.Channel

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| enc_aes256_symkey | [bytes](#bytes) |  | aes256_symkey encrypted by kyber |





<a name="GenesisBalance"/>


## GenesisBalance

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  | Address is string only here to increase visibility |
| balance | [uint64](#uint64) |  |  |

















<a name="GetBlockReq"/>


## GetBlockReq

```python
   
```

```javascript
   
```


NOT USED -&gt; RM?


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint64](#uint64) |  | Indicates the index number in mainchain |
| after_hash | [bytes](#bytes) |  | request the node that comes after hash |





<a name="GetBlockResp"/>


## GetBlockResp

```python
   
```

```javascript
   
```


NOT USED -&gt; RM?


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| node_info | [NodeInfo](#NodeInfo) |  |  |
| block | [Block](#Block) |  |  |













<a name="GetLocalAddressesReq"/>



## GetLocalAddressesReq

```python
   
```

```javascript
   
```






<a name="GetLocalAddressesResp"/>

## GetLocalAddressesResp

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses | [bytes](#bytes) | repeated |  |
































<a name="LRUStateCache"/>


## LRUStateCache



```python
   
```

```javascript
   
```



<a name="LatticePK"/>


## LatticePK

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| txhash | [bytes](#bytes) |  |  |
| dilithium_pk | [bytes](#bytes) |  |  |
| kyber_pk | [bytes](#bytes) |  |  |








<a name="NodeChainState"/>



## NodeChainState

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |
| header_hash | [bytes](#bytes) |  |  |
| cumulative_difficulty | [bytes](#bytes) |  |  |
| version | [string](#string) |  |  |
| timestamp | [uint64](#uint64) |  |  |




<a name="NodeHeaderHash"/>



## NodeHeaderHash

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |
| headerhashes | [bytes](#bytes) | repeated |  |



<a name="NodeInfo"/>




## NodeInfo

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| version | [string](#string) |  |  |
| state | [NodeInfo.State](#NodeInfo.State) |  |  |
| num_connections | [uint32](#uint32) |  |  |
| num_known_peers | [uint32](#uint32) |  |  |
| uptime | [uint64](#uint64) |  | Uptime in seconds |
| block_height | [uint64](#uint64) |  |  |
| block_last_hash | [bytes](#bytes) |  |  |
| network_id | [string](#string) |  |  |





<a name="P2PAcknowledgement"/>


## P2PAcknowledgement

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| bytes_processed | [uint32](#uint32) |  |  |





<a name="Peer"/>


## Peer

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ip | [string](#string) |  |  |






<a name="PeerInfo"/>

## PeerInfo

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_ip | [bytes](#bytes) |  |  |
| port | [uint32](#uint32) |  |  |
| banned_timestamp | [uint32](#uint32) |  |  |
| credibility | [uint32](#uint32) |  |  |
| last_connections_timestamp | [uint32](#uint32) | repeated |  |





<a name="PeerStat"/>


## PeerStat

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_ip | [bytes](#bytes) |  |  |
| port | [uint32](#uint32) |  |  |
| node_chain_state | [NodeChainState](#NodeChainState) |  |  |





<a name="Peers"/>


## Peers

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_info_list | [PeerInfo](#PeerInfo) | repeated |  |







<a name="StateLoader"/>


## StateLoader

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses | [bytes](#bytes) | repeated |  |
| token_txhash | [bytes](#bytes) | repeated |  |
| txhash | [bytes](#bytes) | repeated |  |
| total_coin_supply | [uint64](#uint64) |  |  |





<a name="StateObjects"/>


## StateObjects

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state_loaders | [bytes](#bytes) | repeated |  |





<a name="StoredPeers"/>


## StoredPeers

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peers | [Peer](#Peer) | repeated |  |




<a name="TokenList"/>



## TokenList

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#bytes) | repeated |  |





<a name="TokenMetadata"/>


## TokenMetadata

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#bytes) |  |  |
| transfer_token_tx_hashes | [bytes](#bytes) | repeated |  |











<a name="Transaction"/>


## Transaction

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| fee | [uint64](#uint64) |  |  |
| public_key | [bytes](#bytes) |  |  |
| signature | [bytes](#bytes) |  |  |
| nonce | [uint64](#uint64) |  |  |
| transaction_hash | [bytes](#bytes) |  |  |
| transfer | [Transaction.Transfer](#Transaction.Transfer) |  |  |
| coinbase | [Transaction.CoinBase](#Transaction.CoinBase) |  |  |
| latticePK | [Transaction.LatticePublicKey](#Transaction.LatticePublicKey) |  |  |
| message | [Transaction.Message](#Transaction.Message) |  |  |
| token | [Transaction.Token](#Transaction.Token) |  |  |
| transfer_token | [Transaction.TransferToken](#Transaction.TransferToken) |  |  |
| slave | [Transaction.Slave](#Transaction.Slave) |  |  |






<a name="Transaction.CoinBase"/>

## Transaction.CoinBase

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addr_to | [bytes](#bytes) |  |  |
| amount | [uint64](#uint64) |  |  |





<a name="Transaction.LatticePublicKey"/>


## Transaction.LatticePublicKey

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| kyber_pk | [bytes](#bytes) |  |  |
| dilithium_pk | [bytes](#bytes) |  |  |






<a name="Transaction.Message"/>

## Transaction.Message

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| message_hash | [bytes](#bytes) |  |  |






<a name="Transaction.Slave"/>

## Transaction.Slave

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slave_pks | [bytes](#bytes) | repeated |  |
| access_types | [uint32](#uint32) | repeated |  |






<a name="Transaction.Token"/>

## Transaction.Token

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| symbol | [bytes](#bytes) |  |  |
| name | [bytes](#bytes) |  |  |
| owner | [bytes](#bytes) |  |  |
| decimals | [uint64](#uint64) |  |  |
| initial_balances | [AddressAmount](#AddressAmount) | repeated |  |





<a name="Transaction.Transfer"/>


## Transaction.Transfer

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addrs_to | [bytes](#bytes) | repeated |  |
| amounts | [uint64](#uint64) | repeated |  |



<a name="Transaction.TransferToken"/>


## Transaction.TransferToken

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#bytes) |  |  |
| addrs_to | [bytes](#bytes) | repeated |  |
| amounts | [uint64](#uint64) | repeated |  |





<a name="TransactionCount"/>


## TransactionCount

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| count | [TransactionCount.CountEntry](#TransactionCount.CountEntry) | repeated |  |



<a name="TransactionCount.CountEntry"/>


## TransactionCount.CountEntry

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [uint32](#uint32) |  |  |
| value | [uint32](#uint32) |  |  |



<a name="TransactionExtended"/>


## TransactionExtended

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#BlockHeader) |  |  |
| tx | [Transaction](#Transaction) |  |  |
| addr_from | [bytes](#bytes) |  |  |
| size | [uint64](#uint64) |  |  |
| timestamp_seconds | [uint64](#uint64) |  |  |








<a name="GetLatestDataReq.Filter"/>


## GetLatestDataReq.Filter

```python
   
```

```javascript
   
```

| Name | Number | Description |
| ---- | ------ | ----------- |
| ALL | 0 |  |
| BLOCKHEADERS | 1 |  |
| TRANSACTIONS | 2 |  |
| TRANSACTIONS_UNCONFIRMED | 3 |  |


<a name="NodeInfo.State"/>


## NodeInfo.State

```python
   
```

```javascript
   
```


| Name | Number | Description |
| ---- | ------ | ----------- |
| UNKNOWN | 0 |  |
| UNSYNCED | 1 |  |
| SYNCING | 2 |  |
| SYNCED | 3 |  |
| FORKED | 4 |  |



<a name="PushTransactionResp.ResponseCode"/>

## PushTransactionResp.ResponseCode

```python
   
```

```javascript
   
```


| Name | Number | Description |
| ---- | ------ | ----------- |
| UNKNOWN | 0 |  |
| ERROR | 1 |  |
| VALIDATION_FAILED | 2 |  |
| SUBMITTED | 3 |  |







<a name="qrlbase.proto"/>

# qrlbase.proto



<a name="GetNodeInfoReq"/>

## GetNodeInfoReq


```python
   
```

```javascript
   
```

<a name="GetNodeInfoResp"/>


## GetNodeInfoResp

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| version | [string](#string) |  |  |
| grpcProto | [string](#string) |  |  |

<a name="Base"/>


## Base

```python
   
```

```javascript
   
```


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetNodeInfo | [GetNodeInfoReq](#GetNodeInfoReq) | [GetNodeInfoResp](#GetNodeInfoReq) |  |

 


<a name="qrldebug.proto"/>
  

# qrldebug.proto



<a name="GetFullStateReq"/>

## GetFullStateReq



```python
   
```

```javascript
   
```

<a name="GetFullStateResp"/>

## GetFullStateResp

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| coinbase_state | [AddressState](#AddressState) |  |  |
| addresses_state | [AddressState](#AddressState) | repeated |  |




<a name="DebugAPI"/>

## DebugAPI

```python
   
```

```javascript
   
```


This service describes the Debug API used for debugging

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetFullState | [GetFullStateReq](#GetFullStateReq) | [GetFullStateResp](#GetFullStateReq) |  |

 

   
<a name="qrllegacy.proto"/>

# qrllegacy.proto


<a name="BKData"/>


## BKData

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| mrData | [MRData](#MRData) |  |  |
| block | [Block](#Block) |  |  |


<a name="FBData"/>

## FBData

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint64](#uint64) |  |  |


<a name="LegacyMessage"/>

## LegacyMessage

```python
   
```

```javascript
   
```


Adding old code to refactor while keeping things working


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| func_name | [LegacyMessage.FuncName](#LegacyMessage.FuncName) |  |  |
| noData | [NoData](#NoData) |  |  |
| veData | [VEData](#VEData) |  |  |
| plData | [PLData](#PLData) |  |  |
| pongData | [PONGData](#PONGData) |  |  |
| mrData | [MRData](#MRData) |  |  |
| block | [Block](#Block) |  |  |
| fbData | [FBData](#FBData) |  |  |
| pbData | [PBData](#PBData) |  |  |
| bhData | [BlockHeightData](#BlockHeightData) |  |  |
| txData | [Transaction](#Transaction) |  |  |
| mtData | [Transaction](#Transaction) |  |  |
| tkData | [Transaction](#Transaction) |  |  |
| ttData | [Transaction](#Transaction) |  |  |
| ltData | [Transaction](#Transaction) |  |  |
| slData | [Transaction](#Transaction) |  |  |
| ephData | [EncryptedEphemeralMessage](#EncryptedEphemeralMessage) |  |  |
| syncData | [SYNCData](#SYNCData) |  |  |
| chainStateData | [NodeChainState](#NodeChainState) |  |  |
| nodeHeaderHash | [NodeHeaderHash](#NodeHeaderHash) |  |  |
| p2pAckData | [P2PAcknowledgement](#P2PAcknowledgement) |  |  |



<a name="MRData"/>

## MRData

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| hash | [bytes](#bytes) |  | FIXME: rename this to block_headerhash |
| type | [LegacyMessage.FuncName](#LegacyMessage.FuncName) |  | FIXME: type/string what is this |
| stake_selector | [bytes](#bytes) |  |  |
| block_number | [uint64](#uint64) |  |  |
| prev_headerhash | [bytes](#bytes) |  |  |
| reveal_hash | [bytes](#bytes) |  |  |



<a name="NoData"/>

## NoData

```python
   
```

```javascript
   
```

<a name="PBData"/>

## PBData

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block | [Block](#Block) |  |  |


<a name="PLData"/>

## PLData

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_ips | [string](#string) | repeated |  |
| public_port | [uint32](#uint32) |  |  |



<a name="PONGData"/>

## PONGData

```python
   
```

```javascript
   
```


<a name="SYNCData"/>


## SYNCData

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [string](#string) |  |  |



<a name="VEData"/>

## VEData

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| version | [string](#string) |  |  |
| genesis_prev_hash | [bytes](#bytes) |  |  |
| rate_limit | [uint64](#uint64) |  |  |



<a name="LegacyMessage.FuncName"/>

## LegacyMessage.FuncName

```python
   
```

```javascript
   
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




   
<a name="qrlmining.proto"/>

# qrlmining.proto


<a name="GetBlockMiningCompatibleReq"/>

## GetBlockMiningCompatibleReq

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#uint64) |  | Used for getlastblockheader and getblockheaderbyheight

if height = 0, this means getlastblockheader |



<a name="GetBlockMiningCompatibleResp"/>

## GetBlockMiningCompatibleResp

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blockheader | [BlockHeader](#BlockHeader) |  |  |
| blockmetadata | [BlockMetaData](#BlockMetaData) |  |  |



<a name="GetBlockToMineReq"/>

## GetBlockToMineReq

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| wallet_address | [bytes](#bytes) |  |  |



<a name="GetBlockToMineResp"/>

## GetBlockToMineResp

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blocktemplate_blob | [string](#string) |  | max length 112 bytes, otherwise xmr-stak will hiccup |
| difficulty | [uint64](#uint64) |  | difficulty that the new block should meet |
| height | [uint64](#uint64) |  |  |
| reserved_offset | [uint32](#uint32) |  |  |



<a name="GetLastBlockHeaderReq"/>

## GetLastBlockHeaderReq

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#uint64) |  |  |

<a name="GetLastBlockHeaderResp"/>


## GetLastBlockHeaderResp

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| difficulty | [uint64](#uint64) |  |  |
| height | [uint64](#uint64) |  |  |
| timestamp | [uint64](#uint64) |  |  |
| reward | [uint64](#uint64) |  |  |
| hash | [string](#string) |  |  |
| depth | [uint64](#uint64) |  |  |



<a name="SubmitMinedBlockReq"/>

## SubmitMinedBlockReq

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blob | [bytes](#bytes) |  | blocktemplate_blob with the correct nonce |




<a name="SubmitMinedBlockResp"/>

## SubmitMinedBlockResp

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| error | [bool](#bool) |  | It seems there are no special fields for success/error reporting, does gRPC automatically give me something? |






<a name="qrlstateinfo.proto"/>

# qrlstateinfo.proto

<a name="ForkState"/>

## ForkState

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| initiator_headerhash | [bytes](#bytes) |  | Stores the headerhash of the block initiated the fork recovery |
| fork_point_headerhash | [bytes](#bytes) |  | Stores the headerhash of the block after which forked happened |
| old_mainchain_hash_path | [bytes](#bytes) | repeated | Stores the hash path of old main chain which needs to be played |
| new_mainchain_hash_path | [bytes](#bytes) | repeated | if the fork recovery fails

Alternate chain hash path which is eligible to become mainchain |



<a name="LastTransactions"/>

## LastTransactions

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tx_metadata | [TransactionMetadata](#TransactionMetadata) | repeated |  |



<a name="TransactionMetadata"/>

## TransactionMetadata

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| transaction | [Transaction](#Transaction) |  |  |
| block_number | [uint64](#uint64) |  |  |
| timestamp | [uint64](#uint64) |  |  |



<a name="ScalarValueTypes"/>

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
