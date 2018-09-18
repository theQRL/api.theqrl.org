# qrlwallet.proto


## AddAddressFromSeedReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| seed | [string](#string) |  | Seed can be either hexseed or mnemonic |


## AddAddressFromSeedResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| address | [string](#string) |  |  |


## AddressFromPKReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pk | [string](#string) |  | Private Key |


## AddressFromPKResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| address | [string](#string) |  |  |


## AddNewAddressReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#uint64) |  | Seed can be either hexseed or mnemonic |
| hash_function | [string](#string) |  |  |


## AddNewAddressResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| address | [string](#string) |  |  |


## AddNewAddressWithSlavesReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#uint64) |  | Height of Master Address |
| number_of_slaves | [uint64](#uint64) |  |  |
| hash_function | [string](#string) |  |  |



## BalanceReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#string) |  |  |


## BalanceResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| balance | [uint64](#uint64) |  |  |



## BlockByNumberReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |



## BlockReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header_hash | [string](#string) |  |  |



## BlockResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| block | [PlainBlock](#PlainBlock) |  |  |




## ChangePassphraseReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| oldPassphrase | [string](#string) |  |  |
| newPassphrase | [string](#string) |  |  |


## ChangePassphraseResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |


## CoinBase

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addr_to | [string](#string) |  |  |
| amount | [uint64](#uint64) |  |  |



## EncryptWalletReq


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| passphrase | [string](#string) |  |  |


## EncryptWalletResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |


## GetRecoverySeedsReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#string) |  |  |


## GetRecoverySeedsResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| hexseed | [string](#string) |  |  |
| mnemonic | [string](#string) |  |  |



## GetWalletInfoReq



## GetWalletInfoResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| version | [uint32](#uint32) |  |  |
| address_count | [uint64](#uint64) |  |  |
| is_encrypted | [bool](#bool) |  |  |


## HeightReq

## HeightResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| height | [uint64](#uint64) |  |  |


## LatticePublicKey

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| kyber_pk | [string](#string) |  |  |
| dilithium_pk | [string](#string) |  |  |



## ListAddressesReq

## ListAddressesResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| addresses | [string](#string) | repeated |  |


## LockWalletReq

## LockWalletResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |


## Message

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| message_hash | [string](#string) |  |  |


## NodeInfoReq


## NodeInfoResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| version | [string](#string) |  |  |
| num_connections | [string](#string) |  |  |
| num_known_peers | [string](#string) |  |  |
| uptime | [uint64](#uint64) |  | Uptime in seconds |
| block_height | [uint64](#uint64) |  |  |
| block_last_hash | [string](#string) |  |  |
| network_id | [string](#string) |  |  |


## OTSReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#string) |  |  |


## OTSResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| ots_bitfield | [bytes](#bytes) | repeated |  |
| next_unused_ots_index | [uint64](#uint64) |  |  |

## PlainAddressAmount

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#string) |  |  |    
| amount | [uint64](#uint64) |  |  |  

## PlainGenesisBalance

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#string) |  |  |    
| amount |  [uint64](#uint64) |  |  |    

## PlainBlock

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [PlainBlockHeader](#PlainBlockHeader) |  |  |    
| transactions | [PlainTransaction](#PlainTransaction) | repeated |  |  
| genesis_balance | [PlainGenesisBalance](#PlainGenesisBalance) | repeated |  |  


## PlainBlockHeader

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| hash_header | [string](#string) |  |  |    
| block_number | [uint64](#uint64) |  |  |  
| timestamp_seconds | [uint64](#uint64) |  |  |  
| hash_header_prev | [string](#string) |  |  |  
| reward_block | [uint64](#uint64) |  |  |  
| reward_fee | [uint64](#uint64) |  |  |  
| merkle_root | [string](#string) |  |  |    
| mining_nonce | [uint32](#uint32) |  |  |    
| extra_nonce | [uint64](#uint64) |  |  |    


## PlainTransaction

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [string](#string) |  |  |    
| fee | [uint64](#uint64) |  |  |  
| public_key | [string](#string) |  |  |  
| signature | [string](#string) |  |  |  
| nonce | [uint64](#uint64) |  |  |  
| transaction_hash | [string](#string) |  |  |  
| signer_addr | [string](#string) |  |  |    

### oneof transactionType

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| transfer | [Transfer](#transfer) |  |  |    
| coinbase | [Coinbase](#coinbase) |  |  |  
| latticePK | [LatticePublicKey](#latticepublicKey) | | |
| message | [Message](#message) | | |
| token | [Token](#token) | | |
| transfer_token | [TransferToken](#transfertoken) | | |
| slave | [Slave](#slave) | | |



## RelayMessageTxnReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| message | [string](#string) |  |  |
| fee | [uint64](#uint64) |  |  |
| master_address | [string](#string) |  |  |
| signer_address | [string](#string) |  |  |
| ots_index | [uint64](#uint64) |  |  |


## RelayMessageTxnBySlaveReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| message | [string](#string) |  |  |
| fee | [uint64](#uint64) |  |  |
| master_address | [string](#string) |  |  |


## RelaySlaveTxnBySlaveReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slave_pks | [bytes](#bytes) | repeated |  |
| access_types | [uint32](#uint32) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| master_address | [string](#string) |  |  |




## RelaySlaveTxnReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slave_pks | [bytes](#bytes) | repeated |  |
| access_types | [uint32](#uint32) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| master_address | [string](#string) |  |  |
| signer_address | [string](#string) |  |  |
| ots_index | [uint64](#uint64) |  |  |


## RelayTokenTxnReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| symbol | [string](#string) |  |  |
| name | [string](#string) |  |  |
| owner | [string](#string) |  |  |
| decimals | [uint64](#uint64) |  |  |
| addresses | [string](#string) | repeated |  |
| amounts | [uint64](#uint64) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| master_address | [string](#string) |  |  |
| signer_address | [string](#string) |  |  |
| ots_index | [uint64](#uint64) |  |  |


## RelayTokenTxnBySlaveReq


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| symbol | [string](#string) |  |  |
| name | [string](#string) |  |  |
| owner | [string](#string) |  |  |
| decimals | [uint64](#uint64) |  |  |
| addresses | [string](#string) | repeated |  |
| amounts | [uint64](#uint64) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| master_address | [string](#string) |  |  |



## RelayTransferTokenTxnReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses_to | [string](#string) | repeated |  |
| token_txhash | [string](#string) |  |  |
| amounts | [uint64](#uint64) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| master_address | [string](#string) |  |  |
| signer_address | [string](#string) |  |  |
| ots_index | [uint64](#uint64) |  |  |


## RelayTransferTxnReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses_to | [string](#string) | repeated |  |
| amounts | [uint64](#uint64) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| master_address | [string](#string) |  |  |
| signer_address | [string](#string) |  |  |
| ots_index | [uint64](#uint64) |  |  |


## RelayTransferTxnBySlaveReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses_to | [string](#string) | repeated |  |
| amounts | [uint64](#uint64) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| master_address | [string](#string) |  |  |


## RelayTransferTokenTxnBySlaveReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses_to | [string](#string) | repeated |  |
| token_txhash | [string](#string) |  |  |
| amounts | [uint64](#uint64) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| master_address | [string](#string) |  |  |



## RelayTxnResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| tx | [PlainTransaction](#plaintransaction) |  |  |


## RemoveAddressReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#string) |  |  |


## RemoveAddressResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |


## Slave

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slave_pks | [string](#string) | repeated |  |
| access_types | [uint32](#uint32) | repeated |  |


## Token

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| symbol | [string](#string) |  |  |
| name | [string](#string) |  |  |
| owner | [string](#string) |  |  |
| decimals | [string](#string) |  |  |
| initial_balances | [PlainAddressAmount](#plainaddressamount) | repeated | |


## TransactionReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tx_hash | [string](#string) |  |  |


## TransactionResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| tx | [PlainTransaction](#plaintransaction) |  |  |
| confirmations | [string](#string) |  |  |
| block_number | [uint64](#uint64) | | | 
| block_header_hash | [string](#string) | | |


## TransactionsByAddressReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#string) |  |  |


## TransactionsByAddressResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| mini_transactions | [MiniTransaction](#minitransaction) | repeated |  |
| balance | [uint64](#uint64) |  |  |


## Transfer

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addrs_to | [string](#string) | repeated |  |
| amounts | [uint64](#uint64) | repeated | |


## TransferToken

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [string](#string) |  |  |
| addrs_to | [string](#string) | repeated |  |
| amounts | [uint64](#uint64) | repeated |  |



## UnlockWalletReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| passphrase | [string](#string) |  |  |


## UnlockWalletResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |


## ValidAddressReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#string) |  |  |


## ValidAddressResp


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| valid | [string](#string) |  |  |
