# qrlwallet.proto



## AddAddressFromSeed


### AddAddressFromSeedReq


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| seed | [string](#string) |  |  |


### AddAddressFromSeedResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| address | [string](#string) |  |  |




## AddNewAddress

### AddNewAddressReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#uint64) |  | Seed can be either hexseed or mnemonic |
| hash_function | [string](#string) |  |  |


### AddNewAddressResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| address | [string](#string) |  |  |






## Balance

### BalanceReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#string) |  |  |



### BalanceResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| balance | [uint64](#uint64) |  |  |





## Block 

### BlockByNumberReq


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |


### BlockReq

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header_hash | [string](#string) |  |  |

### BlockResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| block | [Block](#qrl.Block) |  |  |






<a name="qrl.ChangePassphraseReq"/>

### ChangePassphraseReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| oldPassphrase | [string](#string) |  |  |
| newPassphrase | [string](#string) |  |  |






<a name="qrl.ChangePassphraseResp"/>

### ChangePassphraseResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |






<a name="qrl.EncryptWalletReq"/>

### EncryptWalletReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| passphrase | [string](#string) |  |  |






<a name="qrl.EncryptWalletResp"/>

### EncryptWalletResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |






<a name="qrl.GetRecoverySeedsReq"/>

### GetRecoverySeedsReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#string) |  |  |






<a name="qrl.GetRecoverySeedsResp"/>

### GetRecoverySeedsResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| hexseed | [string](#string) |  |  |
| mnemonic | [string](#string) |  |  |






<a name="qrl.GetWalletInfoReq"/>

### GetWalletInfoReq







<a name="qrl.GetWalletInfoResp"/>

### GetWalletInfoResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| version | [uint32](#uint32) |  |  |
| address_count | [uint64](#uint64) |  |  |
| is_encrypted | [bool](#bool) |  |  |






<a name="qrl.HeightReq"/>

### HeightReq







<a name="qrl.HeightResp"/>

### HeightResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| height | [uint64](#uint64) |  |  |






<a name="qrl.ListAddressesReq"/>

### ListAddressesReq







<a name="qrl.ListAddressesResp"/>

### ListAddressesResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| addresses | [string](#string) | repeated |  |






<a name="qrl.LockWalletReq"/>

### LockWalletReq







<a name="qrl.LockWalletResp"/>

### LockWalletResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |






<a name="qrl.OTSReq"/>

### OTSReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#string) |  |  |






<a name="qrl.OTSResp"/>

### OTSResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| ots_bitfield | [bytes](#bytes) | repeated |  |
| next_unused_ots_index | [uint64](#uint64) |  |  |






<a name="qrl.RelayMessageTxnReq"/>

### RelayMessageTxnReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| message | [string](#string) |  |  |
| fee | [uint64](#uint64) |  |  |
| master_address | [string](#string) |  |  |
| signer_address | [string](#string) |  |  |
| ots_index | [uint64](#uint64) |  |  |






<a name="qrl.RelaySlaveTxnReq"/>

### RelaySlaveTxnReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slave_pks | [bytes](#bytes) | repeated |  |
| access_types | [uint32](#uint32) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| master_address | [string](#string) |  |  |
| signer_address | [string](#string) |  |  |
| ots_index | [uint64](#uint64) |  |  |






<a name="qrl.RelayTokenTxnReq"/>

### RelayTokenTxnReq



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






<a name="qrl.RelayTransferTokenTxnReq"/>

### RelayTransferTokenTxnReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses_to | [string](#string) | repeated |  |
| token_txhash | [string](#string) |  |  |
| amounts | [uint64](#uint64) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| master_address | [string](#string) |  |  |
| signer_address | [string](#string) |  |  |
| ots_index | [uint64](#uint64) |  |  |






<a name="qrl.RelayTransferTxnReq"/>

### RelayTransferTxnReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses_to | [string](#string) | repeated |  |
| amounts | [uint64](#uint64) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| master_address | [string](#string) |  |  |
| signer_address | [string](#string) |  |  |
| ots_index | [uint64](#uint64) |  |  |






<a name="qrl.RelayTxnResp"/>

### RelayTxnResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| tx | [Transaction](#qrl.Transaction) |  |  |






<a name="qrl.RemoveAddressReq"/>

### RemoveAddressReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#string) |  |  |






<a name="qrl.RemoveAddressResp"/>

### RemoveAddressResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |






<a name="qrl.TransactionReq"/>

### TransactionReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tx_hash | [string](#string) |  |  |






<a name="qrl.TransactionResp"/>

### TransactionResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| tx | [Transaction](#qrl.Transaction) |  |  |
| confirmations | [uint64](#uint64) |  |  |






<a name="qrl.UnlockWalletReq"/>

### UnlockWalletReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| passphrase | [string](#string) |  |  |






<a name="qrl.UnlockWalletResp"/>

### UnlockWalletResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |





 

 

 


<a name="qrl.WalletAPI"/>

### WalletAPI
This service describes the Wallet API

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| AddNewAddress | [AddNewAddressReq](#qrl.AddNewAddressReq) | [AddNewAddressResp](#qrl.AddNewAddressReq) |  |
| AddAddressFromSeed | [AddAddressFromSeedReq](#qrl.AddAddressFromSeedReq) | [AddAddressFromSeedResp](#qrl.AddAddressFromSeedReq) |  |
| ListAddresses | [ListAddressesReq](#qrl.ListAddressesReq) | [ListAddressesResp](#qrl.ListAddressesReq) |  |
| RemoveAddress | [RemoveAddressReq](#qrl.RemoveAddressReq) | [RemoveAddressResp](#qrl.RemoveAddressReq) |  |
| EncryptWallet | [EncryptWalletReq](#qrl.EncryptWalletReq) | [EncryptWalletResp](#qrl.EncryptWalletReq) |  |
| LockWallet | [LockWalletReq](#qrl.LockWalletReq) | [LockWalletResp](#qrl.LockWalletReq) |  |
| UnlockWallet | [UnlockWalletReq](#qrl.UnlockWalletReq) | [UnlockWalletResp](#qrl.UnlockWalletReq) |  |
| GetRecoverySeeds | [GetRecoverySeedsReq](#qrl.GetRecoverySeedsReq) | [GetRecoverySeedsResp](#qrl.GetRecoverySeedsReq) |  |
| GetWalletInfo | [GetWalletInfoReq](#qrl.GetWalletInfoReq) | [GetWalletInfoResp](#qrl.GetWalletInfoReq) |  |
| RelayTransferTxn | [RelayTransferTxnReq](#qrl.RelayTransferTxnReq) | [RelayTxnResp](#qrl.RelayTransferTxnReq) |  |
| RelayMessageTxn | [RelayMessageTxnReq](#qrl.RelayMessageTxnReq) | [RelayTxnResp](#qrl.RelayMessageTxnReq) |  |
| RelayTokenTxn | [RelayTokenTxnReq](#qrl.RelayTokenTxnReq) | [RelayTxnResp](#qrl.RelayTokenTxnReq) |  |
| RelayTransferTokenTxn | [RelayTransferTokenTxnReq](#qrl.RelayTransferTokenTxnReq) | [RelayTxnResp](#qrl.RelayTransferTokenTxnReq) |  |
| RelaySlaveTxn | [RelaySlaveTxnReq](#qrl.RelaySlaveTxnReq) | [RelayTxnResp](#qrl.RelaySlaveTxnReq) |  |
| ChangePassphrase | [ChangePassphraseReq](#qrl.ChangePassphraseReq) | [ChangePassphraseResp](#qrl.ChangePassphraseReq) |  |
| GetTransaction | [TransactionReq](#qrl.TransactionReq) | [TransactionResp](#qrl.TransactionReq) |  |
| GetBalance | [BalanceReq](#qrl.BalanceReq) | [BalanceResp](#qrl.BalanceReq) |  |
| GetOTS | [OTSReq](#qrl.OTSReq) | [OTSResp](#qrl.OTSReq) |  |
| GetHeight | [HeightReq](#qrl.HeightReq) | [HeightResp](#qrl.HeightReq) |  |
| GetBlock | [BlockReq](#qrl.BlockReq) | [BlockResp](#qrl.BlockReq) |  |
| GetBlockByNumber | [BlockByNumberReq](#qrl.BlockByNumberReq) | [BlockResp](#qrl.BlockByNumberReq) |  |

 