# QRL.proto


## Overview

Our API's protocol data structure is defined in the qrl.proto file found in the source code in our [github repo](https://github.com/theQRL/QRL/blob/master/src/qrl/protos/qrl.proto). Our PublicAPI service lists the functions available in our API. 


## PublicAPI


```python
# python
```

```javascript
   
```


This service describes the Public API used by clients wallet, cli, etc


| Method Name                                    | Request Type                                 | Response Type                                 | Description |
| -----------                                    | ------------                                 | -------------                                 | ------------|
| [GetNodeState](#GetNodeState)                  | [GetNodeStateReq](#GetNodeStateReq)          | [GetNodeStateResp](#GetNodeStateReq)          |  |
| [GetKnownPeers](#GetKnownPeers)                | [GetKnownPeersReq](#GetKnownPeersReq)        | [GetKnownPeersResp](#GetKnownPeersReq)        |  |
| [GetPeersStat](#GetPeersStat)                  | [GetPeersStatReq](#GetPeersStatReq)          | [GetPeersStatResp](#GetPeersStatReq)          |  |
| [GetStats](#GetStats)                          | [GetStatsReq](#GetStatsReq)                  | [GetStatsResp](#GetStatsReq)                  |  |
| [GetAddressState](#GetAddressState)            | [GetAddressStateReq](#GetAddressStateReq)    | [GetAddressStateResp](#GetAddressStateReq)    |  |
| [GetObject](#GetObject)                        | [GetObjectReq](#GetObjectReq)                | [GetObjectResp](#GetObjectReq)                |  |
| [GetLatestData](#GetLatestData)                | [GetLatestDataReq](#GetLatestDataReq)        | [GetLatestDataResp](#GetLatestDataReq)        |  |
| [PushTransaction](#PushTransaction)            | [PushTransactionReq](#PushTransactionReq)    | [PushTransactionResp](#PushTransactionReq)    |  |
| [TransferCoins](#TransferCoins)                | [TransferCoinsReq](#TransferCoinsReq)        | [TransferCoinsResp](#TransferCoinsReq)        |  |
| [GetAddressFromPK](#GetAddressFromPK)          | [GetAddressFromPKReq](#GetAddressFromPKReq)  | [GetAddressFromPKResp](#GetAddressFromPKReq)  |  |
| [GetMessageTxn](#GetMessageTxn)                | [MessageTxnReq](#MessageTxnReq)              | [TransferCoinsResp](#TransferCoinsResp)       |  |
| [GetTokenTxn](#GetTokenTxn)                    | [TokenTxnReq](#TokenTxnReq)                  | [TransferCoinsResp](#TokenTxnReq)             |  |
| [GetTransferTokenTxn](#GetTransferTokenTxn)    | [TransferTokenTxnReq](#TransferTokenTxnReq)  | [TransferCoinsResp](#TransferCoinsTxnReq1)    |  |
| [GetSlaveTxn](#GetSlaveTxn)                    | [SlaveTxnReq](#SlaveTxnReq)                  | [TransferCoinsResp](#SlaveTxnReq)             |  |

 


<a name="GetNodeState"/>

## GetNodeState 



<a name="GetNodeStateReq"/>

### GetNodeStateReq


```python
# python
```

```javascript
message GetNodeStateReq { }
```

Represents a query to get node state


### GetNodeStateResp

<a name="GetNodeStateResp"/>

```python
# python
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









## GetKnownPeers

<a name="GetKnownPeers"/>


### GetKnownPeersReq

<a name="GetKnownPeersReq"/>

```python
# python
```

```javascript
message GetKnownPeersReq { }
```

Represents a query to get known peers


### GetKnownPeersResp

<a name="GetKnownPeersResp"/>

```python
# python
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










## GetPeersStat

<a name="GetPeersStat"/>



### GetPeersStatReq

<a name="GetPeersStatReq"/>

```python
# python
```

```javascript
message GetPeersStatReq { }
```

Represents a query to get connected peers stat


### GetPeersStatResp

<a name="GetPeersStatResp"/>

```python
# python
```

```javascript
message GetPeersStatResp {
    repeated PeerStat peers_stat = 1;
```

Represents the reply message to peers stat query

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peers_stat | [PeerStat](#PeerStat) | repeated | PeerState object contains peer_ip, port and peer state information |




## GetStats

<a name="GetStats"/>


### GetStatsReq

<a name="GetStatsReq"/>

```python
# python
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


### GetStatsResp

<a name="GetStatsResp"/>

```python
# python
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




## GetAddressState

<a name="GetAddressState"/>


### GetAddressStateReq

<a name="GetAddressStateReq"/>

```python
# python
```

```javascript
message GetAddressStateReq {   bytes address = 1; }
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |


### GetAddressStateResp

<a name="GetAddressStateResp"/>

```python
# python
```

```javascript
message GetAddressStateResp {
    AddressState state = 1;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [AddressState](#AddressState) |  |  |










## GetObject

<a name="GetObjectReq"/>


### GetObjectReq

<a name="GetObjectReq"/>

```python
# python
```

```javascript
message GetObjectReq {  bytes query = 1;    }
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [bytes](#bytes) |  |  |



### GetObjectResp

<a name="GetObjectResp"/>

```python
# python
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




## GetLatestData

<a name="GetLatestData"/>


### GetLatestDataReq

<a name="GetLatestDataReq"/>

```python
# python
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


### GetLatestDataResp

<a name="GetLatestDataResp"/>

```python
# python
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




## PushTransaction

<a name="PushTransaction"/>


### PushTransactionReq

<a name="PushTransactionReq"/>

```python
# python
```

```javascript
message PushTransactionReq {    Transaction transaction_signed = 1;     }
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| transaction_signed | [Transaction](#Transaction) |  |  |


### PushTransactionResp

<a name="PushTransactionResp"/>

```python
# python
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





## TransferCoins

<a name="TransferCoins"/>


### TransferCoinsReq

<a name="TransferCoinsReq"/>

```python
# python
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


### TransferCoinsResp

<a name="TransferCoinsResp"/>

```python
# python
```

```javascript
message TransferCoinsResp {
    TransactionExtended extended_transaction_unsigned = 1;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| extended_transaction_unsigned | [TransactionExtended](#TransactionExtended) |  |  |



## GetAddressFromPK

<a name="GetAddressFromPK"/>



### GetAddressFromPKReq

<a name="GetAddressFromPKReq"/>

```python
# python
```

```javascript
message GetAddressFromPKReq {
    bytes pk = 1;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pk | [bytes](#bytes) |  |  |



### GetAddressFromPKResp

<a name="GetAddressFromPKResp"/>

```python
# python
```

```javascript
message GetAddressFromPKResp {
    bytes address = 1;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |




## GetMessageTxn

<a name="GetMessageTxn"/>


### MessageTxnReq

<a name="MessageTxnReq"/>

```python
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| message | [bytes](#bytes) |  |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |









## GetTokenTxn

<a name="GetTokenTxn"/>


### TokenTxnReq

<a name="TokenTxnReq"/>

```python
# python
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





## GetTransferTokenTxn

<a name="GetTransferTokenTxn"/>


### TransferTokenTxnReq

<a name="TransferTokenTxnReq"/>

```python
# python
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




### TransferCoinsResp

<a name="TransferCoinsTxnReq1"/>

```python
# python
```

```javascript
message TransferCoinsResp {
    TransactionExtended extended_transaction_unsigned = 1;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| extended_transaction_unsigned | [TransactionExtended](#TransactionExtended) |  |  |




## GetSlaveTxn

<a name="GetSlaveTxn"/>


### SlaveTxnReq

<a name="SlaveTxnReq"/>

```python
# python
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





## AdminAPI

<a name="AdminAPI"/>


This is a place holder for testing/instrumentation APIs

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|






## AddressAmount

<a name="AddressAmount"/>

```python
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |
| amount | [uint64](#uint64) |  |  |







## AddressList

<a name="AddressList"/>

```python
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses | [bytes](#bytes) | repeated |  |







## AddressState

<a name="AddressState"/>

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







## AddressState.SlavePksAccessTypeEntry

<a name="AddressState.SlavePksAccessTypeEntry"/>

```python
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [uint32](#uint32) |  |  |







## AddressState.TokensEntry

<a name="AddressState.TokensEntry"/>

```python
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [uint64](#uint64) |  |  |







## Block

<a name="Block"/>

```python
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#BlockHeader) |  |  |
| transactions | [Transaction](#Transaction) | repeated |  |
| genesis_balance | [GenesisBalance](#GenesisBalance) | repeated | This is only applicable to genesis blocks |







## BlockDataPoint

<a name="BlockDataPoint"/>

```python
# python
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







## BlockExtended

<a name="BlockExtended"/>

```python
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#BlockHeader) |  |  |
| extended_transactions | [TransactionExtended](#TransactionExtended) | repeated |  |
| genesis_balance | [GenesisBalance](#GenesisBalance) | repeated | This is only applicable to genesis blocks |
| size | [uint64](#uint64) |  |  |







## BlockHeader

<a name="BlockHeader"/>

```python
# python
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




## BlockHeaderExtended

<a name="BlockHeaderExtended"/>

```python
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#BlockHeader) |  |  |
| transaction_count | [TransactionCount](#TransactionCount) |  |  |



## BlockHeightData

<a name="BlockHeightData"/>

```python
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |
| block_headerhash | [bytes](#bytes) |  |  |
| cumulative_difficulty | [bytes](#bytes) |  |  |







## BlockMetaData

<a name="BlockMetaData"/>

```python
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_difficulty | [bytes](#bytes) |  |  |
| cumulative_difficulty | [bytes](#bytes) |  |  |
| child_headerhashes | [bytes](#bytes) | repeated |  |
| last_N_headerhashes | [bytes](#bytes) | repeated | Keeps last N headerhashes, for measurement of timestamp difference |




## BlockMetaDataList

<a name="BlockMetaDataList"/>

```python
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number_hashes | [BlockMetaData](#BlockMetaData) | repeated |  |







## BlockNumberMapping

<a name="BlockNumberMapping"/>

```python
# python
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
# python
```

```javascript
   
```


Empty message definition





<a name="EncryptedEphemeralMessage"/>


## EncryptedEphemeralMessage

```python
# python
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
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| enc_aes256_symkey | [bytes](#bytes) |  | aes256_symkey encrypted by kyber |





<a name="GenesisBalance"/>


## GenesisBalance

```python
# python
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
# python
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
# python
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
# python
```

```javascript
   
```






<a name="GetLocalAddressesResp"/>

## GetLocalAddressesResp

```python
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses | [bytes](#bytes) | repeated |  |



<a name="LRUStateCache"/>


## LRUStateCache



```python
# python
```

```javascript
   
```



<a name="LatticePK"/>


## LatticePK

```python
# python
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
# python
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
# python
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
# python
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
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| bytes_processed | [uint32](#uint32) |  |  |





<a name="Peer"/>


## Peer

```python
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ip | [string](#string) |  |  |






<a name="PeerInfo"/>

## PeerInfo

```python
# python
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
# python
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
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_info_list | [PeerInfo](#PeerInfo) | repeated |  |







<a name="StateLoader"/>


## StateLoader

```python
# python
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
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state_loaders | [bytes](#bytes) | repeated |  |





<a name="StoredPeers"/>


## StoredPeers

```python
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peers | [Peer](#Peer) | repeated |  |




<a name="TokenList"/>



## TokenList

```python
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#bytes) | repeated |  |





<a name="TokenMetadata"/>


## TokenMetadata

```python
# python
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
# python
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
# python
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
# python
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
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| message_hash | [bytes](#bytes) |  |  |






<a name="Transaction.Slave"/>

## Transaction.Slave

```python
# python
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
# python
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
# python
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
# python
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
# python
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| count | [TransactionCount.CountEntry](#TransactionCount.CountEntry) | repeated |  |



<a name="TransactionCount.CountEntry"/>


## TransactionCount.CountEntry

```python
# python
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
# python
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
# python
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
# python
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
# python
```

```javascript
   
```


| Name | Number | Description |
| ---- | ------ | ----------- |
| UNKNOWN | 0 |  |
| ERROR | 1 |  |
| VALIDATION_FAILED | 2 |  |
| SUBMITTED | 3 |  |




