# qrlwallet.proto


## AddAddressFromSeedReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| seed | [string](#scalar-string) |  | Seed can be either hexseed or mnemonic |


## AddAddressFromSeedResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |
| address | [string](#scalar-string) |  |  |


## AddressFromPKReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pk | [string](#scalar-string) |  | Private Key |


## AddressFromPKResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |
| address | [string](#scalar-string) |  |  |


## AddNewAddressReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#scalar-uint64) |  | Seed can be either hexseed or mnemonic |
| hash_function | [string](#scalar-string) |  |  |


## AddNewAddressResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |
| address | [string](#scalar-string) |  |  |


## AddNewAddressWithSlavesReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#scalar-uint64) |  | Height of Master Address |
| number_of_slaves | [uint64](#scalar-uint64) |  |  |
| hash_function | [string](#scalar-string) |  |  |



## BalanceReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#scalar-string) |  |  |


## BalanceResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |
| balance | [uint64](#scalar-uint64) |  |  |



## BlockByNumberReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#scalar-uint64) |  |  |



## BlockReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header_hash | [string](#scalar-string) |  |  |



## BlockResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |
| block | [PlainBlock](#scalar-plainblock) |  |  |




## ChangePassphraseReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| oldPassphrase | [string](#scalar-string) |  |  |
| newPassphrase | [string](#scalar-string) |  |  |


## ChangePassphraseResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |


## CoinBase

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addr_to | [string](#scalar-string) |  |  |
| amount | [uint64](#scalar-uint64) |  |  |



## EncryptWalletReq


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| passphrase | [string](#scalar-string) |  |  |


## EncryptWalletResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |


## GetRecoverySeedsReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#scalar-string) |  |  |


## GetRecoverySeedsResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |
| hexseed | [string](#scalar-string) |  |  |
| mnemonic | [string](#scalar-string) |  |  |



## GetWalletInfoReq



## GetWalletInfoResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |
| version | [uint32](#scalar-uint32) |  |  |
| address_count | [uint64](#scalar-uint64) |  |  |
| is_encrypted | [bool](#scalar-bool) |  |  |


## HeightReq

## HeightResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |
| height | [uint64](#scalar-uint64) |  |  |


## LatticePublicKey

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| kyber_pk | [string](#scalar-string) |  |  |
| dilithium_pk | [string](#scalar-string) |  |  |



## ListAddressesReq

## ListAddressesResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |
| addresses | [string](#scalar-string) | repeated |  |


## LockWalletReq

## LockWalletResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |


## Message

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| message_hash | [string](#scalar-string) |  |  |


## NodeInfoReq


## NodeInfoResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |
| version | [string](#scalar-string) |  |  |
| num_connections | [string](#scalar-string) |  |  |
| num_known_peers | [string](#scalar-string) |  |  |
| uptime | [uint64](#scalar-uint64) |  | Uptime in seconds |
| block_height | [uint64](#scalar-uint64) |  |  |
| block_last_hash | [string](#scalar-string) |  |  |
| network_id | [string](#scalar-string) |  |  |


## OTSReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#scalar-string) |  |  |


## OTSResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |
| ots_bitfield | [bytes](#scalar-bytes) | repeated |  |
| next_unused_ots_index | [uint64](#scalar-uint64) |  |  |

## PlainAddressAmount

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#scalar-string) |  |  |    
| amount | [uint64](#scalar-uint64) |  |  |  

## PlainGenesisBalance

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#scalar-string) |  |  |    
| amount |  [uint64](#scalar-uint64) |  |  |    

## PlainBlock

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [PlainBlockHeader](#scalar-plainblockheader) |  |  |    
| transactions | [PlainTransaction](#scalar-plaintransaction) | repeated |  |  
| genesis_balance | [PlainGenesisBalance](#scalar-plaingenesisbalance) | repeated |  |  


## PlainBlockHeader

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| hash_header | [string](#scalar-string) |  |  |    
| block_number | [uint64](#scalar-uint64) |  |  |  
| timestamp_seconds | [uint64](#scalar-uint64) |  |  |  
| hash_header_prev | [string](#scalar-string) |  |  |  
| reward_block | [uint64](#scalar-uint64) |  |  |  
| reward_fee | [uint64](#scalar-uint64) |  |  |  
| merkle_root | [string](#scalar-string) |  |  |    
| mining_nonce | [uint32](#scalar-uint32) |  |  |    
| extra_nonce | [uint64](#scalar-uint64) |  |  |    


## PlainTransaction

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [string](#scalar-string) |  |  |    
| fee | [uint64](#scalar-uint64) |  |  |  
| public_key | [string](#scalar-string) |  |  |  
| signature | [string](#scalar-string) |  |  |  
| nonce | [uint64](#scalar-uint64) |  |  |  
| transaction_hash | [string](#scalar-string) |  |  |  
| signer_addr | [string](#scalar-string) |  |  |    

### oneof transactionType

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| transfer | [Transfer](#scalar-transfer) |  |  |    
| coinbase | [Coinbase](#scalar-coinbase) |  |  |  
| latticePK | [LatticePublicKey](#scalar-latticepublicKey) | | |
| message | [Message](#scalar-message) | | |
| token | [Token](#scalar-token) | | |
| transfer_token | [TransferToken](#scalar-transfertoken) | | |
| slave | [Slave](#scalar-slave) | | |



## RelayMessageTxnReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| message | [string](#scalar-string) |  |  |
| fee | [uint64](#scalar-uint64) |  |  |
| master_address | [string](#scalar-string) |  |  |
| signer_address | [string](#scalar-string) |  |  |
| ots_index | [uint64](#scalar-uint64) |  |  |


## RelayMessageTxnBySlaveReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| message | [string](#scalar-string) |  |  |
| fee | [uint64](#scalar-uint64) |  |  |
| master_address | [string](#scalar-string) |  |  |


## RelaySlaveTxnBySlaveReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slave_pks | [bytes](#scalar-bytes) | repeated |  |
| access_types | [uint32](#scalar-uint32) | repeated |  |
| fee | [uint64](#scalar-uint64) |  |  |
| master_address | [string](#scalar-string) |  |  |




## RelaySlaveTxnReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slave_pks | [bytes](#scalar-bytes) | repeated |  |
| access_types | [uint32](#scalar-uint32) | repeated |  |
| fee | [uint64](#scalar-uint64) |  |  |
| master_address | [string](#scalar-string) |  |  |
| signer_address | [string](#scalar-string) |  |  |
| ots_index | [uint64](#scalar-uint64) |  |  |


## RelayTokenTxnReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| symbol | [string](#scalar-string) |  |  |
| name | [string](#scalar-string) |  |  |
| owner | [string](#scalar-string) |  |  |
| decimals | [uint64](#scalar-uint64) |  |  |
| addresses | [string](#scalar-string) | repeated |  |
| amounts | [uint64](#scalar-uint64) | repeated |  |
| fee | [uint64](#scalar-uint64) |  |  |
| master_address | [string](#scalar-string) |  |  |
| signer_address | [string](#scalar-string) |  |  |
| ots_index | [uint64](#scalar-uint64) |  |  |


## RelayTokenTxnBySlaveReq


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| symbol | [string](#scalar-string) |  |  |
| name | [string](#scalar-string) |  |  |
| owner | [string](#scalar-string) |  |  |
| decimals | [uint64](#scalar-uint64) |  |  |
| addresses | [string](#scalar-string) | repeated |  |
| amounts | [uint64](#scalar-uint64) | repeated |  |
| fee | [uint64](#scalar-uint64) |  |  |
| master_address | [string](#scalar-string) |  |  |



## RelayTransferTokenTxnReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses_to | [string](#scalar-string) | repeated |  |
| token_txhash | [string](#scalar-string) |  |  |
| amounts | [uint64](#scalar-uint64) | repeated |  |
| fee | [uint64](#scalar-uint64) |  |  |
| master_address | [string](#scalar-string) |  |  |
| signer_address | [string](#scalar-string) |  |  |
| ots_index | [uint64](#scalar-uint64) |  |  |


## RelayTransferTxnReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses_to | [string](#scalar-string) | repeated |  |
| amounts | [uint64](#scalar-uint64) | repeated |  |
| fee | [uint64](#scalar-uint64) |  |  |
| master_address | [string](#scalar-string) |  |  |
| signer_address | [string](#scalar-string) |  |  |
| ots_index | [uint64](#scalar-uint64) |  |  |


## RelayTransferTxnBySlaveReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses_to | [string](#scalar-string) | repeated |  |
| amounts | [uint64](#scalar-uint64) | repeated |  |
| fee | [uint64](#scalar-uint64) |  |  |
| master_address | [string](#scalar-string) |  |  |


## RelayTransferTokenTxnBySlaveReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses_to | [string](#scalar-string) | repeated |  |
| token_txhash | [string](#scalar-string) |  |  |
| amounts | [uint64](#scalar-uint64) | repeated |  |
| fee | [uint64](#scalar-uint64) |  |  |
| master_address | [string](#scalar-string) |  |  |



## RelayTxnResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |
| tx | [PlainTransaction](#scalar-plaintransaction) |  |  |


## RemoveAddressReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#scalar-string) |  |  |


## RemoveAddressResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |


## Slave

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slave_pks | [string](#scalar-string) | repeated |  |
| access_types | [uint32](#scalar-uint32) | repeated |  |


## Token

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| symbol | [string](#scalar-string) |  |  |
| name | [string](#scalar-string) |  |  |
| owner | [string](#scalar-string) |  |  |
| decimals | [string](#scalar-string) |  |  |
| initial_balances | [PlainAddressAmount](#scalar-plainaddressamount) | repeated | |


## TransactionReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tx_hash | [string](#scalar-string) |  |  |


## TransactionResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |
| tx | [PlainTransaction](#scalar-plaintransaction) |  |  |
| confirmations | [string](#scalar-string) |  |  |
| block_number | [uint64](#scalar-uint64) | | | 
| block_header_hash | [string](#scalar-string) | | |


## TransactionsByAddressReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#scalar-string) |  |  |


## TransactionsByAddressResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |
| mini_transactions | [MiniTransaction](#scalar-minitransaction) | repeated |  |
| balance | [uint64](#scalar-uint64) |  |  |


## Transfer

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addrs_to | [string](#scalar-string) | repeated |  |
| amounts | [uint64](#scalar-uint64) | repeated | |


## TransferToken

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [string](#scalar-string) |  |  |
| addrs_to | [string](#scalar-string) | repeated |  |
| amounts | [uint64](#scalar-uint64) | repeated |  |



## UnlockWalletReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| passphrase | [string](#scalar-string) |  |  |


## UnlockWalletResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |


## ValidAddressReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#scalar-string) |  |  |


## ValidAddressResp


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#scalar-uint32) |  |  |
| error | [string](#scalar-string) |  |  |
| valid | [string](#scalar-string) |  |  |
