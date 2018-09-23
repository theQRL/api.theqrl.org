# QRL Protocol


## Overview

Our API's protocol data structure is defined in the qrl.proto file found in the source code in our [github repo](https://github.com/theQRL/QRL/blob/master/src/qrl/protos/qrl.proto). Our PublicAPI service lists the functions available in our API. 

## PublicAPI

This service describes the Public API used by clients wallet, cli, etc

| Method Name                                    | Request Type                                 | Response Type                                 | 
| -----------                                    | ------------                                 | -------------                                 | 
| [GetAddressFromPK](#getaddressfrompk)          | [GetAddressFromPKReq](#getaddressfrompkreq)  | [GetAddressFromPKResp](#getaddressfrompkresp)  |  
| [GetAddressState](#getaddressstate)            | [GetAddressStateReq](#getaddressstatereq)    | [GetAddressStateResp](#getaddressstateresp)    |  
| [GetKnownPeers](#getpnownpeers)                | [GetKnownPeersReq](#getknownpeersreq)        | [GetKnownPeersResp](#getknownpeersresp)        | 
| [GetLatestData](#getlatestdata)                | [GetLatestDataReq](#getlatestdatareq)        | [GetLatestDataResp](#getlatestdataresp)        |  
| [GetMessageTxn](#getmessagetxn)                | [MessageTxnReq](#messagetxnreq)              | [TransferCoinsResp](#transfercoinsresp)       |  
| [GetNodeState](#getnodestate)                  | [GetNodeStateReq](#getnodestatereq)          | [GetNodeStateResp](#getnodestateresp)          |  
| [GetObject](#getobject)                        | [GetObjectReq](#getobjectreq)                | [GetObjectResp](#getobjectresp)                | 
| [GetPeersStat](#getpeersstat)                  | [GetPeersStatReq](#getpeersstatreq)          | [GetPeersStatResp](#getpeersstatresp)          |  
| [GetSlaveTxn](#getslavetxn)                    | [SlaveTxnReq](#slavetxnreq)                  | [TransferCoinsResp](#slavetxnresp)             |  
| [GetStats](#getstats)                          | [GetStatsReq](#getstatsreq)                  | [GetStatsResp](#getstatsresp)                  |  
| [GetTokenTxn](#gettokentxn)                    | [TokenTxnReq](#tokentxnreq)                  | [TransferCoinsResp](#tokentxnresp)             |  
| [GetTransferTokenTxn](#gettransfertokentxn)    | [TransferTokenTxnReq](#transfertokentxnreq)  | [TransferCoinsResp](#transfercoinsresp)    |  
| [PushTransaction](#pushtransaction)            | [PushTransactionReq](#pushtransactionreq)    | [PushTransactionResp](#pushtransactionresp)    |  
| [TransferCoins](#transfercoins)                | [TransferCoinsReq](#transfercoinsreq)        | [TransferCoinsResp](#transfercoinsresp)        |  
 


## GetAddressFromPK

### GetAddressFromPKReq

```protouf
message GetAddressFromPKReq {
    bytes pk = 1;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pk | [bytes](#scalar-bytes) |  |  |

### GetAddressFromPKResp

```protouf
message GetAddressFromPKResp {
    bytes address = 1;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#scalar-bytes) |  |  |




## GetAddressState

### GetAddressStateReq

```protouf
message GetAddressStateReq {   
    bytes address = 1; 
}
```
| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#scalar-bytes) |  |  |

### GetAddressStateResp

```protouf
message GetAddressStateResp {
    AddressState state = 1;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [AddressState](#addressstate) |  |  |




## GetKnownPeers

### GetKnownPeersReq

```protouf
message GetKnownPeersReq { }
```

Represents a query to get known peers

### GetKnownPeersResp

```protouf
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




## GetLatestData

### GetLatestDataReq

```protouf
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
| offset | [uint32](#scalar-uint32) |  | Offset in the result list (works backwards in this case) |
| quantity | [uint32](#scalar-uint32) |  | Number of items to retrive. Capped at 100 |

### GetLatestDataResp

```protouf
message GetLatestDataResp {
    repeated BlockHeaderExtended blockheaders = 1;
    repeated TransactionExtended transactions = 2;
    repeated TransactionExtended transactions_unconfirmed = 3;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blockheaders | [BlockHeaderExtended](#scalar-blockheaderextended) | repeated |  |
| transactions | [TransactionExtended](#transactionextended) | repeated |  |
| transactions_unconfirmed | [TransactionExtended](#transactionextended) | repeated |  |




## GetMessageTxn

### MessageTxnReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#scalar-bytes) |  |  |
| message | [bytes](#scalar-bytes) |  |  |
| fee | [uint64](#scalar-uint64) |  |  |
| xmss_pk | [bytes](#scalar-bytes) |  |  |




## GetNodeState 

### GetNodeStateReq

```protouf
message GetNodeStateReq { }
```

Represents a query to get node state

### GetNodeStateResp

```protouf
message GetNodeStateResp {
    NodeInfo info = 1;
}
```

Represents the reply message to node state query

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| info | [NodeInfo](#nodeinfo) |  |  |




## GetObject

### GetObjectReq

```protouf
message GetObjectReq {  bytes query = 1;    }
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [bytes](#scalar-bytes) |  |  |

### GetObjectResp

```protouf
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
| found | [bool](#scalar-bool) |  |  |
| address_state | [AddressState](#addressstate) |  |  |
| transaction | [TransactionExtended](#transactionextended) |  |  |
| block_extended | [BlockExtended](#scalar-blockextended) |  |  |




## GetPeersStat

### GetPeersStatReq

```protouf
message GetPeersStatReq { }
```
Represents a query to get connected peers stat

### GetPeersStatResp

```protouf
message GetPeersStatResp {
    repeated PeerStat peers_stat = 1;
```

Represents the reply message to peers stat query

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peers_stat | [PeerStat](#peerstat) | repeated | PeerState object contains peer_ip, port and peer state information |




## GetSlaveTxn

### SlaveTxnReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#scalar-bytes) |  |  |
| slave_pks | [bytes](#scalar-bytes) | repeated |  |
| access_types | [uint32](#scalar-uint32) | repeated |  |
| fee | [uint64](#scalar-uint64) |  |  |
| xmss_pk | [bytes](#scalar-bytes) |  |  |




## GetStats

### GetStatsReq

```protouf
message GetStatsReq {
    bool include_timeseries = 1;
}
```

Represents a query to get statistics about node

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| include_timeseries | [bool](#scalar-bool) |  | Boolean to define if block timeseries should be included in reply or not |

### GetStatsResp

```protouf
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
| epoch | [uint64](#scalar-uint64) |  | Current epoch |
| uptime_network | [uint64](#scalar-uint64) |  | Indicates uptime in seconds |
| block_last_reward | [uint64](#scalar-uint64) |  | Block reward |
| block_time_mean | [uint64](#scalar-uint64) |  | Blocktime average |
| block_time_sd | [uint64](#scalar-uint64) |  | Blocktime standrad deviation |
| coins_total_supply | [uint64](#scalar-uint64) |  | Total coins supply |
| coins_emitted | [uint64](#scalar-uint64) |  | Total coins emitted |
| block_timeseries | [BlockDataPoint](#scalar-blockdatapoint) | repeated |  |




## GetTokenTxn

### TokenTxnReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#scalar-bytes) |  |  |
| symbol | [bytes](#scalar-bytes) |  |  |
| name | [bytes](#scalar-bytes) |  |  |
| owner | [bytes](#scalar-bytes) |  |  |
| decimals | [uint64](#scalar-uint64) |  |  |
| initial_balances | [AddressAmount](#addressamount) | repeated |  |
| fee | [uint64](#scalar-uint64) |  |  |
| xmss_pk | [bytes](#scalar-bytes) |  |  |



## GetTransferTokenTxn

### TransferTokenTxnReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#scalar-bytes) |  |  |
| addresses_to | [bytes](#scalar-bytes) | repeated |  |
| token_txhash | [bytes](#scalar-bytes) |  |  |
| amounts | [uint64](#scalar-uint64) | repeated |  |
| fee | [uint64](#scalar-uint64) |  |  |
| xmss_pk | [bytes](#scalar-bytes) |  |  |





## PushTransaction

### PushTransactionReq

```protouf
message PushTransactionReq {    Transaction transaction_signed = 1;     }
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| transaction_signed | [Transaction](#transaction) |  |  |

### PushTransactionResp

```protouf
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
| error_description | [string](#scalar-string) |  |  |
| tx_hash | [bytes](#scalar-bytes) |  |  |





## TransferCoins

### TransferCoinsReq

```protouf
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
| master_addr | [bytes](#scalar-bytes) |  | Transaction source address |
| addresses_to | [bytes](#scalar-bytes) | repeated | Transaction destination address |
| amounts | [uint64](#scalar-uint64) | repeated | Amount. It should be expressed in Shor |
| fee | [uint64](#scalar-uint64) |  | Fee. It should be expressed in Shor |
| xmss_pk | [bytes](#scalar-bytes) |  | XMSS Public key |

### TransferCoinsResp

```protouf
message TransferCoinsResp {
    TransactionExtended extended_transaction_unsigned = 1;
}
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| extended_transaction_unsigned | [TransactionExtended](#transactionextended) |  |  |





## AdminAPI

This is a place holder for testing/instrumentation APIs

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|

## AddressAmount

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#scalar-bytes) |  |  |
| amount | [uint64](#scalar-uint64) |  |  |

## AddressList

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses | [bytes](#scalar-bytes) | repeated |  |

## AddressState

```protouf
Enter Python code here
```

```protouf
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
| address | [bytes](#scalar-bytes) |  |  |
| balance | [uint64](#scalar-uint64) |  |  |
| nonce | [uint64](#scalar-uint64) |  | FIXME: Discuss. 32 or 64 bits? |
| ots_bitfield | [bytes](#scalar-bytes) | repeated |  |
| transaction_hashes | [bytes](#scalar-bytes) | repeated |  |
| tokens | [AddressState.TokensEntry](#addressstate.tokensentry) | repeated |  |
| latticePK_list | [LatticePK](#latticepk) | repeated |  |
| slave_pks_access_type | [AddressState.SlavePksAccessTypeEntry](#addressstate.slavepksaccesstypeentry) | repeated |  |
| ots_counter | [uint64](#scalar-uint64) |  |  |


## AddressState.SlavePksAccessTypeEntry

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#scalar-string) |  |  |
| value | [uint32](#scalar-uint32) |  |  |

## AddressState.TokensEntry

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#scalar-string) |  |  |
| value | [uint64](#scalar-uint64) |  |  |

## Block

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#scalar-blockheader) |  |  |
| transactions | [Transaction](#transaction) | repeated |  |
| genesis_balance | [GenesisBalance](#genesisbalance) | repeated | This is only applicable to genesis blocks |

## BlockDataPoint

BlockDataPoint message definition


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| number | [uint64](#scalar-uint64) |  | Block number |
| difficulty | [string](#scalar-string) |  | Block difficulty |
| timestamp | [uint64](#scalar-uint64) |  | Block timestamp |
| time_last | [uint64](#scalar-uint64) |  |  |
| time_movavg | [uint64](#scalar-uint64) |  |  |
| hash_power | [float](#scalar-float) |  | Hash power |
| header_hash | [bytes](#scalar-bytes) |  | Block header hash |
| header_hash_prev | [bytes](#scalar-bytes) |  | Previous block&#39;s header hash |

## BlockExtended

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#scalar-blockheader) |  |  |
| extended_transactions | [TransactionExtended](#transactionextended) | repeated |  |
| genesis_balance | [GenesisBalance](#genesisbalance) | repeated | This is only applicable to genesis blocks |
| size | [uint64](#scalar-uint64) |  |  |

## BlockHeader

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| hash_header | [bytes](#scalar-bytes) |  | Header |
| block_number | [uint64](#scalar-uint64) |  |  |
| timestamp_seconds | [uint64](#scalar-uint64) |  |  |
| hash_header_prev | [bytes](#scalar-bytes) |  |  |
| reward_block | [uint64](#scalar-uint64) |  |  |
| reward_fee | [uint64](#scalar-uint64) |  |  |
| merkle_root | [bytes](#scalar-bytes) |  |  |
| mining_nonce | [uint32](#scalar-uint32) |  |  |
| extra_nonce | [uint64](#scalar-uint64) |  |  |

## BlockHeaderExtended

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#scalar-blockheader) |  |  |
| transaction_count | [TransactionCount](#transactioncount) |  |  |

## BlockHeightData

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#scalar-uint64) |  |  |
| block_headerhash | [bytes](#scalar-bytes) |  |  |
| cumulative_difficulty | [bytes](#scalar-bytes) |  |  |

## BlockMetaData

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_difficulty | [bytes](#scalar-bytes) |  |  |
| cumulative_difficulty | [bytes](#scalar-bytes) |  |  |
| child_headerhashes | [bytes](#scalar-bytes) | repeated |  |
| last_N_headerhashes | [bytes](#scalar-bytes) | repeated | Keeps last N headerhashes, for measurement of timestamp difference |

## BlockMetaDataList

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number_hashes | [BlockMetaData](#scalar-blockmetadata) | repeated |  |

## BlockNumberMapping

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| headerhash | [bytes](#scalar-bytes) |  |  |
| prev_headerhash | [bytes](#scalar-bytes) |  |  |

## Empty

Empty message definition

## EncryptedEphemeralMessage

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| msg_id | [bytes](#scalar-bytes) |  | b&#39;NEW&#39; or PRF |
| ttl | [uint64](#scalar-uint64) |  | Expiry Timestamp in seconds |
| ttr | [uint64](#scalar-uint64) |  | Time to relay |
| channel | [EncryptedEphemeralMessage.Channel](#encryptedephemeralmessage.channel) |  |  |
| nonce | [uint64](#scalar-uint64) |  | nonce |
| payload | [bytes](#scalar-bytes) |  | JSON content, encrypted by aes256_symkey |

## EncryptedEphemeralMessage.Channel

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| enc_aes256_symkey | [bytes](#scalar-bytes) |  | aes256_symkey encrypted by kyber |

## GenesisBalance

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#scalar-bytes) |  | Address is string only here to increase visibility |
| balance | [uint64](#scalar-uint64) |  |  |

## GetBlockReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint64](#scalar-uint64) |  | Indicates the index number in mainchain |
| after_hash | [bytes](#scalar-bytes) |  | request the node that comes after hash |

## GetBlockResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| node_info | [NodeInfo](#nodeinfo) |  |  |
| block | [Block](#scalar-block) |  |  |

## GetLocalAddressesReq

## GetLocalAddressesResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses | [bytes](#scalar-bytes) | repeated |  |

## LRUStateCache

## LatticePK

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| txhash | [bytes](#scalar-bytes) |  |  |
| dilithium_pk | [bytes](#scalar-bytes) |  |  |
| kyber_pk | [bytes](#scalar-bytes) |  |  |

## NodeChainState

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#scalar-uint64) |  |  |
| header_hash | [bytes](#scalar-bytes) |  |  |
| cumulative_difficulty | [bytes](#scalar-bytes) |  |  |
| version | [string](#scalar-string) |  |  |
| timestamp | [uint64](#scalar-uint64) |  |  |

## NodeHeaderHash

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#scalar-uint64) |  |  |
| headerhashes | [bytes](#scalar-bytes) | repeated |  |

## NodeInfo

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| version | [string](#scalar-string) |  |  |
| state | [NodeInfo.State](#nodeinfo.state) |  |  |
| num_connections | [uint32](#scalar-uint32) |  |  |
| num_known_peers | [uint32](#scalar-uint32) |  |  |
| uptime | [uint64](#scalar-uint64) |  | Uptime in seconds |
| block_height | [uint64](#scalar-uint64) |  |  |
| block_last_hash | [bytes](#scalar-bytes) |  |  |
| network_id | [string](#scalar-string) |  |  |

## P2PAcknowledgement

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| bytes_processed | [uint32](#scalar-uint32) |  |  |

## Peer

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ip | [string](#scalar-string) |  |  |

## PeerInfo

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_ip | [bytes](#scalar-bytes) |  |  |
| port | [uint32](#scalar-uint32) |  |  |
| banned_timestamp | [uint32](#scalar-uint32) |  |  |
| credibility | [uint32](#scalar-uint32) |  |  |
| last_connections_timestamp | [uint32](#scalar-uint32) | repeated |  |

## PeerStat

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_ip | [bytes](#scalar-bytes) |  |  |
| port | [uint32](#scalar-uint32) |  |  |
| node_chain_state | [NodeChainState](#nodechainstate) |  |  |

## Peers

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_info_list | [PeerInfo](#peerinfo) | repeated |  |

## StateLoader

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses | [bytes](#scalar-bytes) | repeated |  |
| token_txhash | [bytes](#scalar-bytes) | repeated |  |
| txhash | [bytes](#scalar-bytes) | repeated |  |
| total_coin_supply | [uint64](#scalar-uint64) |  |  |

## StateObjects

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state_loaders | [bytes](#scalar-bytes) | repeated |  |

## StoredPeers

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peers | [Peer](#peer) | repeated |  |

## TokenList

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#scalar-bytes) | repeated |  |

## TokenMetadata

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#scalar-bytes) |  |  |
| transfer_token_tx_hashes | [bytes](#scalar-bytes) | repeated |  |

## Transaction

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#scalar-bytes) |  |  |
| fee | [uint64](#scalar-uint64) |  |  |
| public_key | [bytes](#scalar-bytes) |  |  |
| signature | [bytes](#scalar-bytes) |  |  |
| nonce | [uint64](#scalar-uint64) |  |  |
| transaction_hash | [bytes](#scalar-bytes) |  |  |
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
| addr_to | [bytes](#scalar-bytes) |  |  |
| amount | [uint64](#scalar-uint64) |  |  |

## Transaction.LatticePublicKey

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| kyber_pk | [bytes](#scalar-bytes) |  |  |
| dilithium_pk | [bytes](#scalar-bytes) |  |  |

## Transaction.Message

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| message_hash | [bytes](#scalar-bytes) |  |  |

## Transaction.Slave

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slave_pks | [bytes](#scalar-bytes) | repeated |  |
| access_types | [uint32](#scalar-uint32) | repeated |  |

## Transaction.Token

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| symbol | [bytes](#scalar-bytes) |  |  |
| name | [bytes](#scalar-bytes) |  |  |
| owner | [bytes](#scalar-bytes) |  |  |
| decimals | [uint64](#scalar-uint64) |  |  |
| initial_balances | [AddressAmount](#addressamount) | repeated |  |

## Transaction.Transfer

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addrs_to | [bytes](#scalar-bytes) | repeated |  |
| amounts | [uint64](#scalar-uint64) | repeated |  |

## Transaction.TransferToken

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#scalar-bytes) |  |  |
| addrs_to | [bytes](#scalar-bytes) | repeated |  |
| amounts | [uint64](#scalar-uint64) | repeated |  |

## TransactionCount

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| count | [TransactionCount.CountEntry](#transactioncount.countentry) | repeated |  |

## TransactionCount.CountEntry

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [uint32](#scalar-uint32) |  |  |
| value | [uint32](#scalar-uint32) |  |  |

## TransactionExtended

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#scalar-blockheader) |  |  |
| tx | [Transaction](#transaction) |  |  |
| addr_from | [bytes](#scalar-bytes) |  |  |
| size | [uint64](#scalar-uint64) |  |  |
| timestamp_seconds | [uint64](#scalar-uint64) |  |  |

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