# QRL Protocol


## Overview

Our API's protocol data structure is defined in the qrl.proto file found in the source code in our [github repo](https://github.com/theQRL/QRL/blob/master/src/qrl/protos/qrl.proto). Our PublicAPI service lists the functions available in our API. 


## PublicAPI


This service describes the Public API used by clients wallet, cli, etc


| Method Name                                    | Request Type                                 | Response Type                                 | 
| -----------                                    | ------------                                 | -------------                                 | 
| [GetNodeState](#getnodestate)                  | [GetNodeStateReq](#getnodestatereq)          | [GetNodeStateResp](#getnodestatereq)          |  
| [GetKnownPeers](#getpnownpeers)                | [GetKnownPeersReq](#getknownpeersreq)        | [GetKnownPeersResp](#getknownpeersreq)        |  
| [GetPeersStat](#getpeersstat)                  | [GetPeersStatReq](#getpeersstatreq)          | [GetPeersStatResp](#getpeersstatreq)          |  
| [GetStats](#getstats)                          | [GetStatsReq](#getstatsreq)                  | [GetStatsResp](#getstatsreq)                  |  
| [GetAddressState](#getaddressstate)            | [GetAddressStateReq](#getaddressstatereq)    | [GetAddressStateResp](#getaddressstatereq)    |  
| [GetObject](#getobject)                        | [GetObjectReq](#getobjectreq)                | [GetObjectResp](#getobjectreq)                | 
| [GetLatestData](#getlatestdata)                | [GetLatestDataReq](#getlatestdatareq)        | [GetLatestDataResp](#getlatestdatareq)        |  
| [PushTransaction](#pushtransaction)            | [PushTransactionReq](#pushtransactionreq)    | [PushTransactionResp](#pushtransactionreq)    |  
| [TransferCoins](#transfercoins)                | [TransferCoinsReq](#transfercoinsreq)        | [TransferCoinsResp](#transfercoinsreq)        |  
| [GetAddressFromPK](#getaddressfrompk)          | [GetAddressFromPKReq](#getaddressfrompkreq)  | [GetAddressFromPKResp](#getaddressfrompkreq)  |  
| [GetMessageTxn](#getmessagetxn)                | [MessageTxnReq](#messagetxnreq)              | [TransferCoinsResp](#transfercoinsresp)       |  
| [GetTokenTxn](#gettokentxn)                    | [TokenTxnReq](#tokentxnreq)                  | [TransferCoinsResp](#tokentxnreq)             |  
| [GetTransferTokenTxn](#gettransfertokentxn)    | [TransferTokenTxnReq](#transfertokentxnreq)  | [TransferCoinsResp](#transfercoinstxnreq1)    |  
| [GetSlaveTxn](#getslavetxn)                    | [SlaveTxnReq](#slavetxnreq)                  | [TransferCoinsResp](#slavetxnreq)             |  

 



## GetNodeState 




### GetNodeStateReq



```javascript
message GetNodeStateReq { }
```

Represents a query to get node state


### GetNodeStateResp



```javascript
message GetNodeStateResp {
    NodeInfo info = 1;
}
```

Represents the reply message to node state query

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| info | [NodeInfo](#nodeinfo) |  |  |









## GetKnownPeers



### GetKnownPeersReq



```javascript
message GetKnownPeersReq { }
```

Represents a query to get known peers


### GetKnownPeersResp


```javascript
message GetKnownPeersResp {
    NodeInfo node_info = 1;
    repeated Peer known_peers = 2;
}
```

Represents the reply message to known peers query

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| node_info | [NodeInfo](#nodeinfo) |  | NodeInfo object containing node state information |
| known_peers | [Peer](#peer) | repeated | List of Peer objects containing peer nodes detailed information |










## GetPeersStat




### GetPeersStatReq



```javascript
message GetPeersStatReq { }
```

Represents a query to get connected peers stat


### GetPeersStatResp



```javascript
message GetPeersStatResp {
    repeated PeerStat peers_stat = 1;
```

Represents the reply message to peers stat query

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peers_stat | [PeerStat](#peerstat) | repeated | PeerState object contains peer_ip, port and peer state information |




## GetStats



### GetStatsReq



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
| node_info | [NodeInfo](#nodeinfo) |  | NodeInfo object containing node state information |
| epoch | [uint64](#uint64) |  | Current epoch |
| uptime_network | [uint64](#uint64) |  | Indicates uptime in seconds |
| block_last_reward | [uint64](#uint64) |  | Block reward |
| block_time_mean | [uint64](#uint64) |  | Blocktime average |
| block_time_sd | [uint64](#uint64) |  | Blocktime standrad deviation |
| coins_total_supply | [uint64](#uint64) |  | Total coins supply |
| coins_emitted | [uint64](#uint64) |  | Total coins emitted |
| block_timeseries | [BlockDataPoint](#blockdatapoint) | repeated |  |




## GetAddressState



### GetAddressStateReq



```javascript
message GetAddressStateReq {   bytes address = 1; }
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |


### GetAddressStateResp



```javascript
message GetAddressStateResp {
    AddressState state = 1;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [AddressState](#addressstate) |  |  |


## GetObject



### GetObjectReq



```javascript
message GetObjectReq {  bytes query = 1;    }
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [bytes](#bytes) |  |  |



### GetObjectResp



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
| address_state | [AddressState](#addressstate) |  |  |
| transaction | [TransactionExtended](#transactionextended) |  |  |
| block_extended | [BlockExtended](#blockextended) |  |  |




## GetLatestData


### GetLatestDataReq



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
| filter | [GetLatestDataReq.Filter](#getlatestdatareq.filter) |  |  |
| offset | [uint32](#uint32) |  | Offset in the result list (works backwards in this case) |
| quantity | [uint32](#uint32) |  | Number of items to retrive. Capped at 100 |


### GetLatestDataResp



```javascript
message GetLatestDataResp {
    repeated BlockHeaderExtended blockheaders = 1;
    repeated TransactionExtended transactions = 2;
    repeated TransactionExtended transactions_unconfirmed = 3;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blockheaders | [BlockHeaderExtended](#blockheaderextended) | repeated |  |
| transactions | [TransactionExtended](#transactionextended) | repeated |  |
| transactions_unconfirmed | [TransactionExtended](#transactionextended) | repeated |  |




## PushTransaction



### PushTransactionReq



```javascript
message PushTransactionReq {    Transaction transaction_signed = 1;     }
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| transaction_signed | [Transaction](#transaction) |  |  |


### PushTransactionResp



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
| error_code | [PushTransactionResp.ResponseCode](#pushtransactionresp.responsecode) |  |  |
| error_description | [string](#string) |  |  |
| tx_hash | [bytes](#bytes) |  |  |



## TransferCoins


### TransferCoinsReq



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


```javascript
message TransferCoinsResp {
    TransactionExtended extended_transaction_unsigned = 1;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| extended_transaction_unsigned | [TransactionExtended](#transactionextended) |  |  |



## GetAddressFromPK


### GetAddressFromPKReq


```javascript
message GetAddressFromPKReq {
    bytes pk = 1;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pk | [bytes](#bytes) |  |  |



### GetAddressFromPKResp



```javascript
message GetAddressFromPKResp {
    bytes address = 1;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |




## GetMessageTxn



### MessageTxnReq






| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| message | [bytes](#bytes) |  |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |









## GetTokenTxn



### TokenTxnReq






| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| symbol | [bytes](#bytes) |  |  |
| name | [bytes](#bytes) |  |  |
| owner | [bytes](#bytes) |  |  |
| decimals | [uint64](#uint64) |  |  |
| initial_balances | [AddressAmount](#addressamount) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |





## GetTransferTokenTxn



### TransferTokenTxnReq






| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| addresses_to | [bytes](#bytes) | repeated |  |
| token_txhash | [bytes](#bytes) |  |  |
| amounts | [uint64](#uint64) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |


### TransferCoinsResp


```javascript
message TransferCoinsResp {
    TransactionExtended extended_transaction_unsigned = 1;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| extended_transaction_unsigned | [TransactionExtended](#transactionextended) |  |  |




## GetSlaveTxn


### SlaveTxnReq






| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| slave_pks | [bytes](#bytes) | repeated |  |
| access_types | [uint32](#uint32) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |





## AdminAPI


This is a place holder for testing/instrumentation APIs

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|


## AddressAmount






| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |
| amount | [uint64](#uint64) |  |  |



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

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |
| balance | [uint64](#uint64) |  |  |
| nonce | [uint64](#uint64) |  | FIXME: Discuss. 32 or 64 bits? |
| ots_bitfield | [bytes](#bytes) | repeated |  |
| transaction_hashes | [bytes](#bytes) | repeated |  |
| tokens | [AddressState.TokensEntry](#addressstate.tokensentry) | repeated |  |
| latticePK_list | [LatticePK](#latticepk) | repeated |  |
| slave_pks_access_type | [AddressState.SlavePksAccessTypeEntry](#addressstate.slavepksaccesstypeentry) | repeated |  |
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



## Block






| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#blockheader) |  |  |
| transactions | [Transaction](#transaction) | repeated |  |
| genesis_balance | [GenesisBalance](#genesisbalance) | repeated | This is only applicable to genesis blocks |

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
| header | [BlockHeader](#blockheader) |  |  |
| extended_transactions | [TransactionExtended](#transactionextended) | repeated |  |
| genesis_balance | [GenesisBalance](#genesisbalance) | repeated | This is only applicable to genesis blocks |
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
| header | [BlockHeader](#blockheader) |  |  |
| transaction_count | [TransactionCount](#transactioncount) |  |  |



## BlockHeightData





| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |
| block_headerhash | [bytes](#bytes) |  |  |
| cumulative_difficulty | [bytes](#bytes) |  |  |







## BlockMetaData





| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_difficulty | [bytes](#bytes) |  |  |
| cumulative_difficulty | [bytes](#bytes) |  |  |
| child_headerhashes | [bytes](#bytes) | repeated |  |
| last_N_headerhashes | [bytes](#bytes) | repeated | Keeps last N headerhashes, for measurement of timestamp difference |




## BlockMetaDataList






| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number_hashes | [BlockMetaData](#blockmetadata) | repeated |  |







## BlockNumberMapping






| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| headerhash | [bytes](#bytes) |  |  |
| prev_headerhash | [bytes](#bytes) |  |  |


## Empty





Empty message definition


## EncryptedEphemeralMessage





| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| msg_id | [bytes](#bytes) |  | b&#39;NEW&#39; or PRF |
| ttl | [uint64](#uint64) |  | Expiry Timestamp in seconds |
| ttr | [uint64](#uint64) |  | Time to relay |
| channel | [EncryptedEphemeralMessage.Channel](#encryptedephemeralmessage.channel) |  |  |
| nonce | [uint64](#uint64) |  | nonce |
| payload | [bytes](#bytes) |  | JSON content, encrypted by aes256_symkey |



## EncryptedEphemeralMessage.Channel





| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| enc_aes256_symkey | [bytes](#bytes) |  | aes256_symkey encrypted by kyber |



## GenesisBalance





| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  | Address is string only here to increase visibility |
| balance | [uint64](#uint64) |  |  |



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
| node_info | [NodeInfo](#nodeinfo) |  |  |
| block | [Block](#block) |  |  |


## GetLocalAddressesReq





## GetLocalAddressesResp





| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses | [bytes](#bytes) | repeated |  |




## LRUStateCache









## LatticePK





| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| txhash | [bytes](#bytes) |  |  |
| dilithium_pk | [bytes](#bytes) |  |  |
| kyber_pk | [bytes](#bytes) |  |  |



## NodeChainState





| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |
| header_hash | [bytes](#bytes) |  |  |
| cumulative_difficulty | [bytes](#bytes) |  |  |
| version | [string](#string) |  |  |
| timestamp | [uint64](#uint64) |  |  |


## NodeHeaderHash





| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |
| headerhashes | [bytes](#bytes) | repeated |  |



## NodeInfo





| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| version | [string](#string) |  |  |
| state | [NodeInfo.State](#nodeinfo.state) |  |  |
| num_connections | [uint32](#uint32) |  |  |
| num_known_peers | [uint32](#uint32) |  |  |
| uptime | [uint64](#uint64) |  | Uptime in seconds |
| block_height | [uint64](#uint64) |  |  |
| block_last_hash | [bytes](#bytes) |  |  |
| network_id | [string](#string) |  |  |





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
| node_chain_state | [NodeChainState](#nodechainstate) |  |  |




## Peers





| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_info_list | [PeerInfo](#peerinfo) | repeated |  |



## StateLoader





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



## StoredPeers





| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peers | [Peer](#peer) | repeated |  |



## TokenList





| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#bytes) | repeated |  |




## TokenMetadata





| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#bytes) |  |  |
| transfer_token_tx_hashes | [bytes](#bytes) | repeated |  |



## Transaction





| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| fee | [uint64](#uint64) |  |  |
| public_key | [bytes](#bytes) |  |  |
| signature | [bytes](#bytes) |  |  |
| nonce | [uint64](#uint64) |  |  |
| transaction_hash | [bytes](#bytes) |  |  |
| transfer | [Transaction.Transfer](#transaction.transfer) |  |  |
| coinbase | [Transaction.CoinBase](#transaction.coinbase) |  |  |
| latticePK | [Transaction.LatticePublicKey](#transaction.latticepublickey) |  |  |
| message | [Transaction.Message](#transaction.message) |  |  |
| token | [Transaction.Token](#transaction.token) |  |  |
| transfer_token | [Transaction.TransferToken](#transaction.transfertoken) |  |  |
| slave | [Transaction.Slave](#transaction.slave) |  |  |



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
| initial_balances | [AddressAmount](#addressamount) | repeated |  |




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
| count | [TransactionCount.CountEntry](#transactioncount.countentry) | repeated |  |



## TransactionCount.CountEntry





| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [uint32](#uint32) |  |  |
| value | [uint32](#uint32) |  |  |



## TransactionExtended





| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#blockheader) |  |  |
| tx | [Transaction](#transaction) |  |  |
| addr_from | [bytes](#bytes) |  |  |
| size | [uint64](#uint64) |  |  |
| timestamp_seconds | [uint64](#uint64) |  |  |




## GetLatestDataReq.Filter




| Name | Number | Description |
| ---- | ------ | ----------- |
| ALL | 0 |  |
| BLOCKHEADERS | 1 |  |
| TRANSACTIONS | 2 |  |
| TRANSACTIONS_UNCONFIRMED | 3 |  |



## NodeInfo.State





| Name | Number | Description |
| ---- | ------ | ----------- |
| UNKNOWN | 0 |  |
| UNSYNCED | 1 |  |
| SYNCING | 2 |  |
| SYNCED | 3 |  |
| FORKED | 4 |  |



## PushTransactionResp.ResponseCode





| Name | Number | Description |
| ---- | ------ | ----------- |
| UNKNOWN | 0 |  |
| ERROR | 1 |  |
| VALIDATION_FAILED | 2 |  |
| SUBMITTED | 3 |  |
