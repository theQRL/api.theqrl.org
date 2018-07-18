# Protocol Documentation
<a name="top"/>

## Table of Contents

- [qrl.proto](#qrl.proto)
    - [AddressAmount](#qrl.AddressAmount)
    - [AddressDescriptor](#qrl.AddressDescriptor)
    - [AddressList](#qrl.AddressList)
    - [AddressState](#qrl.AddressState)
    - [AddressState.SlavePksAccessTypeEntry](#qrl.AddressState.SlavePksAccessTypeEntry)
    - [AddressState.TokensEntry](#qrl.AddressState.TokensEntry)
    - [Block](#qrl.Block)
    - [BlockDataPoint](#qrl.BlockDataPoint)
    - [BlockExtended](#qrl.BlockExtended)
    - [BlockHeader](#qrl.BlockHeader)
    - [BlockHeaderExtended](#qrl.BlockHeaderExtended)
    - [BlockHeightData](#qrl.BlockHeightData)
    - [BlockMetaData](#qrl.BlockMetaData)
    - [BlockMetaDataList](#qrl.BlockMetaDataList)
    - [BlockNumberMapping](#qrl.BlockNumberMapping)
    - [Empty](#qrl.Empty)
    - [EncryptedEphemeralMessage](#qrl.EncryptedEphemeralMessage)
    - [EncryptedEphemeralMessage.Channel](#qrl.EncryptedEphemeralMessage.Channel)
    - [GenesisBalance](#qrl.GenesisBalance)
    - [GetAddressFromPKReq](#qrl.GetAddressFromPKReq)
    - [GetAddressFromPKResp](#qrl.GetAddressFromPKResp)
    - [GetAddressStateReq](#qrl.GetAddressStateReq)
    - [GetAddressStateResp](#qrl.GetAddressStateResp)
    - [GetBalanceReq](#qrl.GetBalanceReq)
    - [GetBalanceResp](#qrl.GetBalanceResp)
    - [GetBlockByNumberReq](#qrl.GetBlockByNumberReq)
    - [GetBlockByNumberResp](#qrl.GetBlockByNumberResp)
    - [GetBlockReq](#qrl.GetBlockReq)
    - [GetBlockResp](#qrl.GetBlockResp)
    - [GetHeightReq](#qrl.GetHeightReq)
    - [GetHeightResp](#qrl.GetHeightResp)
    - [GetKnownPeersReq](#qrl.GetKnownPeersReq)
    - [GetKnownPeersResp](#qrl.GetKnownPeersResp)
    - [GetLatestDataReq](#qrl.GetLatestDataReq)
    - [GetLatestDataResp](#qrl.GetLatestDataResp)
    - [GetLocalAddressesReq](#qrl.GetLocalAddressesReq)
    - [GetLocalAddressesResp](#qrl.GetLocalAddressesResp)
    - [GetNodeStateReq](#qrl.GetNodeStateReq)
    - [GetNodeStateResp](#qrl.GetNodeStateResp)
    - [GetOTSReq](#qrl.GetOTSReq)
    - [GetOTSResp](#qrl.GetOTSResp)
    - [GetObjectReq](#qrl.GetObjectReq)
    - [GetObjectResp](#qrl.GetObjectResp)
    - [GetPeersStatReq](#qrl.GetPeersStatReq)
    - [GetPeersStatResp](#qrl.GetPeersStatResp)
    - [GetStatsReq](#qrl.GetStatsReq)
    - [GetStatsResp](#qrl.GetStatsResp)
    - [GetTransactionReq](#qrl.GetTransactionReq)
    - [GetTransactionResp](#qrl.GetTransactionResp)
    - [LRUStateCache](#qrl.LRUStateCache)
    - [LatticePK](#qrl.LatticePK)
    - [MessageTxnReq](#qrl.MessageTxnReq)
    - [NodeChainState](#qrl.NodeChainState)
    - [NodeHeaderHash](#qrl.NodeHeaderHash)
    - [NodeInfo](#qrl.NodeInfo)
    - [P2PAcknowledgement](#qrl.P2PAcknowledgement)
    - [ParseAddressReq](#qrl.ParseAddressReq)
    - [ParseAddressResp](#qrl.ParseAddressResp)
    - [Peer](#qrl.Peer)
    - [PeerInfo](#qrl.PeerInfo)
    - [PeerStat](#qrl.PeerStat)
    - [Peers](#qrl.Peers)
    - [PushTransactionReq](#qrl.PushTransactionReq)
    - [PushTransactionResp](#qrl.PushTransactionResp)
    - [SlaveTxnReq](#qrl.SlaveTxnReq)
    - [StateLoader](#qrl.StateLoader)
    - [StateObjects](#qrl.StateObjects)
    - [StoredPeers](#qrl.StoredPeers)
    - [TokenList](#qrl.TokenList)
    - [TokenMetadata](#qrl.TokenMetadata)
    - [TokenTxnReq](#qrl.TokenTxnReq)
    - [Transaction](#qrl.Transaction)
    - [Transaction.CoinBase](#qrl.Transaction.CoinBase)
    - [Transaction.LatticePublicKey](#qrl.Transaction.LatticePublicKey)
    - [Transaction.Message](#qrl.Transaction.Message)
    - [Transaction.Slave](#qrl.Transaction.Slave)
    - [Transaction.Token](#qrl.Transaction.Token)
    - [Transaction.Transfer](#qrl.Transaction.Transfer)
    - [Transaction.TransferToken](#qrl.Transaction.TransferToken)
    - [TransactionCount](#qrl.TransactionCount)
    - [TransactionCount.CountEntry](#qrl.TransactionCount.CountEntry)
    - [TransactionExtended](#qrl.TransactionExtended)
    - [TransferCoinsReq](#qrl.TransferCoinsReq)
    - [TransferCoinsResp](#qrl.TransferCoinsResp)
    - [TransferTokenTxnReq](#qrl.TransferTokenTxnReq)
  
    - [GetLatestDataReq.Filter](#qrl.GetLatestDataReq.Filter)
    - [NodeInfo.State](#qrl.NodeInfo.State)
    - [PushTransactionResp.ResponseCode](#qrl.PushTransactionResp.ResponseCode)
  
  
    - [AdminAPI](#qrl.AdminAPI)
    - [PublicAPI](#qrl.PublicAPI)
  

- [qrlbase.proto](#qrlbase.proto)
    - [GetNodeInfoReq](#qrl.GetNodeInfoReq)
    - [GetNodeInfoResp](#qrl.GetNodeInfoResp)
  
  
  
    - [Base](#qrl.Base)
  

- [qrldebug.proto](#qrldebug.proto)
    - [GetFullStateReq](#qrl.GetFullStateReq)
    - [GetFullStateResp](#qrl.GetFullStateResp)
  
  
  
    - [DebugAPI](#qrl.DebugAPI)
  

- [qrllegacy.proto](#qrllegacy.proto)
    - [BKData](#qrl.BKData)
    - [FBData](#qrl.FBData)
    - [LegacyMessage](#qrl.LegacyMessage)
    - [MRData](#qrl.MRData)
    - [NoData](#qrl.NoData)
    - [PBData](#qrl.PBData)
    - [PLData](#qrl.PLData)
    - [PONGData](#qrl.PONGData)
    - [SYNCData](#qrl.SYNCData)
    - [VEData](#qrl.VEData)
  
    - [LegacyMessage.FuncName](#qrl.LegacyMessage.FuncName)
  
  
  

- [qrlmining.proto](#qrlmining.proto)
    - [GetBlockMiningCompatibleReq](#qrl.GetBlockMiningCompatibleReq)
    - [GetBlockMiningCompatibleResp](#qrl.GetBlockMiningCompatibleResp)
    - [GetBlockToMineReq](#qrl.GetBlockToMineReq)
    - [GetBlockToMineResp](#qrl.GetBlockToMineResp)
    - [GetLastBlockHeaderReq](#qrl.GetLastBlockHeaderReq)
    - [GetLastBlockHeaderResp](#qrl.GetLastBlockHeaderResp)
    - [SubmitMinedBlockReq](#qrl.SubmitMinedBlockReq)
    - [SubmitMinedBlockResp](#qrl.SubmitMinedBlockResp)
  
  
  
    - [MiningAPI](#qrl.MiningAPI)
  

- [qrlstateinfo.proto](#qrlstateinfo.proto)
    - [ForkState](#qrl.ForkState)
    - [LastTransactions](#qrl.LastTransactions)
    - [TransactionMetadata](#qrl.TransactionMetadata)
  
  
  
  

- [qrlwallet.proto](#qrlwallet.proto)
    - [AddAddressFromSeedReq](#qrl.AddAddressFromSeedReq)
    - [AddAddressFromSeedResp](#qrl.AddAddressFromSeedResp)
    - [AddNewAddressReq](#qrl.AddNewAddressReq)
    - [AddNewAddressResp](#qrl.AddNewAddressResp)
    - [BalanceReq](#qrl.BalanceReq)
    - [BalanceResp](#qrl.BalanceResp)
    - [BlockByNumberReq](#qrl.BlockByNumberReq)
    - [BlockReq](#qrl.BlockReq)
    - [BlockResp](#qrl.BlockResp)
    - [ChangePassphraseReq](#qrl.ChangePassphraseReq)
    - [ChangePassphraseResp](#qrl.ChangePassphraseResp)
    - [EncryptWalletReq](#qrl.EncryptWalletReq)
    - [EncryptWalletResp](#qrl.EncryptWalletResp)
    - [GetRecoverySeedsReq](#qrl.GetRecoverySeedsReq)
    - [GetRecoverySeedsResp](#qrl.GetRecoverySeedsResp)
    - [GetWalletInfoReq](#qrl.GetWalletInfoReq)
    - [GetWalletInfoResp](#qrl.GetWalletInfoResp)
    - [HeightReq](#qrl.HeightReq)
    - [HeightResp](#qrl.HeightResp)
    - [ListAddressesReq](#qrl.ListAddressesReq)
    - [ListAddressesResp](#qrl.ListAddressesResp)
    - [LockWalletReq](#qrl.LockWalletReq)
    - [LockWalletResp](#qrl.LockWalletResp)
    - [OTSReq](#qrl.OTSReq)
    - [OTSResp](#qrl.OTSResp)
    - [RelayMessageTxnReq](#qrl.RelayMessageTxnReq)
    - [RelaySlaveTxnReq](#qrl.RelaySlaveTxnReq)
    - [RelayTokenTxnReq](#qrl.RelayTokenTxnReq)
    - [RelayTransferTokenTxnReq](#qrl.RelayTransferTokenTxnReq)
    - [RelayTransferTxnReq](#qrl.RelayTransferTxnReq)
    - [RelayTxnResp](#qrl.RelayTxnResp)
    - [RemoveAddressReq](#qrl.RemoveAddressReq)
    - [RemoveAddressResp](#qrl.RemoveAddressResp)
    - [TransactionReq](#qrl.TransactionReq)
    - [TransactionResp](#qrl.TransactionResp)
    - [UnlockWalletReq](#qrl.UnlockWalletReq)
    - [UnlockWalletResp](#qrl.UnlockWalletResp)
  
  
  
    - [WalletAPI](#qrl.WalletAPI)
  

- [Scalar Value Types](#scalar-value-types)



<a name="qrl.proto"/>
<p align="right"><a href="#top">Top</a></p>

## qrl.proto



<a name="qrl.AddressAmount"/>

### AddressAmount



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |
| amount | [uint64](#uint64) |  |  |






<a name="qrl.AddressDescriptor"/>

### AddressDescriptor
3 byte scheme, 0-3 bits = hf, 4-7 = sig scheme, 8-11 = params (inc h), 12-15 addr fmt, 16-23 params2


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| hash_function | [string](#string) |  |  |
| signature_scheme | [string](#string) |  |  |
| tree_height | [uint32](#uint32) |  |  |
| signatures | [uint32](#uint32) |  |  |
| address_format | [string](#string) |  |  |






<a name="qrl.AddressList"/>

### AddressList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses | [bytes](#bytes) | repeated |  |






<a name="qrl.AddressState"/>

### AddressState



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






<a name="qrl.AddressState.SlavePksAccessTypeEntry"/>

### AddressState.SlavePksAccessTypeEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [uint32](#uint32) |  |  |






<a name="qrl.AddressState.TokensEntry"/>

### AddressState.TokensEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [uint64](#uint64) |  |  |






<a name="qrl.Block"/>

### Block



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#qrl.BlockHeader) |  |  |
| transactions | [Transaction](#qrl.Transaction) | repeated |  |
| genesis_balance | [GenesisBalance](#qrl.GenesisBalance) | repeated | This is only applicable to genesis blocks |






<a name="qrl.BlockDataPoint"/>

### BlockDataPoint
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






<a name="qrl.BlockExtended"/>

### BlockExtended



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#qrl.BlockHeader) |  |  |
| extended_transactions | [TransactionExtended](#qrl.TransactionExtended) | repeated |  |
| genesis_balance | [GenesisBalance](#qrl.GenesisBalance) | repeated | This is only applicable to genesis blocks |
| size | [uint64](#uint64) |  |  |






<a name="qrl.BlockHeader"/>

### BlockHeader



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






<a name="qrl.BlockHeaderExtended"/>

### BlockHeaderExtended



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#qrl.BlockHeader) |  |  |
| transaction_count | [TransactionCount](#qrl.TransactionCount) |  |  |






<a name="qrl.BlockHeightData"/>

### BlockHeightData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |
| block_headerhash | [bytes](#bytes) |  |  |
| cumulative_difficulty | [bytes](#bytes) |  |  |






<a name="qrl.BlockMetaData"/>

### BlockMetaData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_difficulty | [bytes](#bytes) |  |  |
| cumulative_difficulty | [bytes](#bytes) |  |  |
| child_headerhashes | [bytes](#bytes) | repeated |  |
| last_N_headerhashes | [bytes](#bytes) | repeated | Keeps last N headerhashes, for measurement of timestamp difference |






<a name="qrl.BlockMetaDataList"/>

### BlockMetaDataList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number_hashes | [BlockMetaData](#qrl.BlockMetaData) | repeated |  |






<a name="qrl.BlockNumberMapping"/>

### BlockNumberMapping



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| headerhash | [bytes](#bytes) |  |  |
| prev_headerhash | [bytes](#bytes) |  |  |






<a name="qrl.Empty"/>

### Empty
Empty message definition






<a name="qrl.EncryptedEphemeralMessage"/>

### EncryptedEphemeralMessage



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| msg_id | [bytes](#bytes) |  | b&#39;NEW&#39; or PRF |
| ttl | [uint64](#uint64) |  | Expiry Timestamp in seconds |
| ttr | [uint64](#uint64) |  | Time to relay |
| channel | [EncryptedEphemeralMessage.Channel](#qrl.EncryptedEphemeralMessage.Channel) |  |  |
| nonce | [uint64](#uint64) |  | nonce |
| payload | [bytes](#bytes) |  | JSON content, encrypted by aes256_symkey |






<a name="qrl.EncryptedEphemeralMessage.Channel"/>

### EncryptedEphemeralMessage.Channel



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| enc_aes256_symkey | [bytes](#bytes) |  | aes256_symkey encrypted by kyber |






<a name="qrl.GenesisBalance"/>

### GenesisBalance



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  | Address is string only here to increase visibility |
| balance | [uint64](#uint64) |  |  |






<a name="qrl.GetAddressFromPKReq"/>

### GetAddressFromPKReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pk | [bytes](#bytes) |  |  |






<a name="qrl.GetAddressFromPKResp"/>

### GetAddressFromPKResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |






<a name="qrl.GetAddressStateReq"/>

### GetAddressStateReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |
| exclude_ots_bitfield | [bool](#bool) |  |  |
| exclude_transaction_hashes | [bool](#bool) |  |  |






<a name="qrl.GetAddressStateResp"/>

### GetAddressStateResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [AddressState](#qrl.AddressState) |  |  |






<a name="qrl.GetBalanceReq"/>

### GetBalanceReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |






<a name="qrl.GetBalanceResp"/>

### GetBalanceResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| balance | [uint64](#uint64) |  |  |






<a name="qrl.GetBlockByNumberReq"/>

### GetBlockByNumberReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |






<a name="qrl.GetBlockByNumberResp"/>

### GetBlockByNumberResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block | [Block](#qrl.Block) |  |  |






<a name="qrl.GetBlockReq"/>

### GetBlockReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header_hash | [bytes](#bytes) |  |  |






<a name="qrl.GetBlockResp"/>

### GetBlockResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block | [Block](#qrl.Block) |  |  |






<a name="qrl.GetHeightReq"/>

### GetHeightReq







<a name="qrl.GetHeightResp"/>

### GetHeightResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#uint64) |  |  |






<a name="qrl.GetKnownPeersReq"/>

### GetKnownPeersReq
Represents a query to get known peers






<a name="qrl.GetKnownPeersResp"/>

### GetKnownPeersResp
Represents the reply message to known peers query


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| node_info | [NodeInfo](#qrl.NodeInfo) |  | NodeInfo object containing node state information |
| known_peers | [Peer](#qrl.Peer) | repeated | List of Peer objects containing peer nodes detailed information |






<a name="qrl.GetLatestDataReq"/>

### GetLatestDataReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| filter | [GetLatestDataReq.Filter](#qrl.GetLatestDataReq.Filter) |  |  |
| offset | [uint32](#uint32) |  | Offset in the result list (works backwards in this case) |
| quantity | [uint32](#uint32) |  | Number of items to retrive. Capped at 100 |






<a name="qrl.GetLatestDataResp"/>

### GetLatestDataResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blockheaders | [BlockHeaderExtended](#qrl.BlockHeaderExtended) | repeated |  |
| transactions | [TransactionExtended](#qrl.TransactionExtended) | repeated |  |
| transactions_unconfirmed | [TransactionExtended](#qrl.TransactionExtended) | repeated |  |






<a name="qrl.GetLocalAddressesReq"/>

### GetLocalAddressesReq







<a name="qrl.GetLocalAddressesResp"/>

### GetLocalAddressesResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses | [bytes](#bytes) | repeated |  |






<a name="qrl.GetNodeStateReq"/>

### GetNodeStateReq
Represents a query to get node state






<a name="qrl.GetNodeStateResp"/>

### GetNodeStateResp
Represents the reply message to node state query


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| info | [NodeInfo](#qrl.NodeInfo) |  |  |






<a name="qrl.GetOTSReq"/>

### GetOTSReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |






<a name="qrl.GetOTSResp"/>

### GetOTSResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ots_bitfield | [bytes](#bytes) | repeated |  |
| next_unused_ots_index | [uint64](#uint64) |  |  |






<a name="qrl.GetObjectReq"/>

### GetObjectReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| query | [bytes](#bytes) |  |  |






<a name="qrl.GetObjectResp"/>

### GetObjectResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| found | [bool](#bool) |  |  |
| address_state | [AddressState](#qrl.AddressState) |  |  |
| transaction | [TransactionExtended](#qrl.TransactionExtended) |  |  |
| block_extended | [BlockExtended](#qrl.BlockExtended) |  |  |






<a name="qrl.GetPeersStatReq"/>

### GetPeersStatReq
Represents a query to get connected peers stat






<a name="qrl.GetPeersStatResp"/>

### GetPeersStatResp
Represents the reply message to peers stat query


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peers_stat | [PeerStat](#qrl.PeerStat) | repeated | PeerState object contains peer_ip, port and peer state information |






<a name="qrl.GetStatsReq"/>

### GetStatsReq
Represents a query to get statistics about node


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| include_timeseries | [bool](#bool) |  | Boolean to define if block timeseries should be included in reply or not |






<a name="qrl.GetStatsResp"/>

### GetStatsResp
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






<a name="qrl.GetTransactionReq"/>

### GetTransactionReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tx_hash | [bytes](#bytes) |  |  |






<a name="qrl.GetTransactionResp"/>

### GetTransactionResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tx | [Transaction](#qrl.Transaction) |  |  |
| confirmations | [uint64](#uint64) |  |  |






<a name="qrl.LRUStateCache"/>

### LRUStateCache







<a name="qrl.LatticePK"/>

### LatticePK



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| txhash | [bytes](#bytes) |  |  |
| dilithium_pk | [bytes](#bytes) |  |  |
| kyber_pk | [bytes](#bytes) |  |  |






<a name="qrl.MessageTxnReq"/>

### MessageTxnReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| message | [bytes](#bytes) |  |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |






<a name="qrl.NodeChainState"/>

### NodeChainState



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |
| header_hash | [bytes](#bytes) |  |  |
| cumulative_difficulty | [bytes](#bytes) |  |  |
| version | [string](#string) |  |  |
| timestamp | [uint64](#uint64) |  |  |






<a name="qrl.NodeHeaderHash"/>

### NodeHeaderHash



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |
| headerhashes | [bytes](#bytes) | repeated |  |






<a name="qrl.NodeInfo"/>

### NodeInfo



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






<a name="qrl.P2PAcknowledgement"/>

### P2PAcknowledgement



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| bytes_processed | [uint32](#uint32) |  |  |






<a name="qrl.ParseAddressReq"/>

### ParseAddressReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [bytes](#bytes) |  |  |






<a name="qrl.ParseAddressResp"/>

### ParseAddressResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| is_valid | [bool](#bool) |  |  |
| desc | [AddressDescriptor](#qrl.AddressDescriptor) |  |  |






<a name="qrl.Peer"/>

### Peer



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ip | [string](#string) |  |  |






<a name="qrl.PeerInfo"/>

### PeerInfo



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_ip | [bytes](#bytes) |  |  |
| port | [uint32](#uint32) |  |  |
| banned_timestamp | [uint32](#uint32) |  |  |
| credibility | [uint32](#uint32) |  |  |
| last_connections_timestamp | [uint32](#uint32) | repeated |  |






<a name="qrl.PeerStat"/>

### PeerStat



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_ip | [bytes](#bytes) |  |  |
| port | [uint32](#uint32) |  |  |
| node_chain_state | [NodeChainState](#qrl.NodeChainState) |  |  |






<a name="qrl.Peers"/>

### Peers



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_info_list | [PeerInfo](#qrl.PeerInfo) | repeated |  |






<a name="qrl.PushTransactionReq"/>

### PushTransactionReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| transaction_signed | [Transaction](#qrl.Transaction) |  |  |






<a name="qrl.PushTransactionResp"/>

### PushTransactionResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| error_code | [PushTransactionResp.ResponseCode](#qrl.PushTransactionResp.ResponseCode) |  |  |
| error_description | [string](#string) |  |  |
| tx_hash | [bytes](#bytes) |  |  |






<a name="qrl.SlaveTxnReq"/>

### SlaveTxnReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| slave_pks | [bytes](#bytes) | repeated |  |
| access_types | [uint32](#uint32) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |






<a name="qrl.StateLoader"/>

### StateLoader



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addresses | [bytes](#bytes) | repeated |  |
| token_txhash | [bytes](#bytes) | repeated |  |
| txhash | [bytes](#bytes) | repeated |  |
| total_coin_supply | [uint64](#uint64) |  |  |






<a name="qrl.StateObjects"/>

### StateObjects



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state_loaders | [bytes](#bytes) | repeated |  |






<a name="qrl.StoredPeers"/>

### StoredPeers



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peers | [Peer](#qrl.Peer) | repeated |  |






<a name="qrl.TokenList"/>

### TokenList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#bytes) | repeated |  |






<a name="qrl.TokenMetadata"/>

### TokenMetadata



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#bytes) |  |  |
| transfer_token_tx_hashes | [bytes](#bytes) | repeated |  |






<a name="qrl.TokenTxnReq"/>

### TokenTxnReq



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






<a name="qrl.Transaction"/>

### Transaction



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






<a name="qrl.Transaction.CoinBase"/>

### Transaction.CoinBase



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addr_to | [bytes](#bytes) |  |  |
| amount | [uint64](#uint64) |  |  |






<a name="qrl.Transaction.LatticePublicKey"/>

### Transaction.LatticePublicKey



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| kyber_pk | [bytes](#bytes) |  |  |
| dilithium_pk | [bytes](#bytes) |  |  |






<a name="qrl.Transaction.Message"/>

### Transaction.Message



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| message_hash | [bytes](#bytes) |  |  |






<a name="qrl.Transaction.Slave"/>

### Transaction.Slave



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slave_pks | [bytes](#bytes) | repeated |  |
| access_types | [uint32](#uint32) | repeated |  |






<a name="qrl.Transaction.Token"/>

### Transaction.Token



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| symbol | [bytes](#bytes) |  |  |
| name | [bytes](#bytes) |  |  |
| owner | [bytes](#bytes) |  |  |
| decimals | [uint64](#uint64) |  |  |
| initial_balances | [AddressAmount](#qrl.AddressAmount) | repeated |  |






<a name="qrl.Transaction.Transfer"/>

### Transaction.Transfer



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| addrs_to | [bytes](#bytes) | repeated |  |
| amounts | [uint64](#uint64) | repeated |  |






<a name="qrl.Transaction.TransferToken"/>

### Transaction.TransferToken



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token_txhash | [bytes](#bytes) |  |  |
| addrs_to | [bytes](#bytes) | repeated |  |
| amounts | [uint64](#uint64) | repeated |  |






<a name="qrl.TransactionCount"/>

### TransactionCount



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| count | [TransactionCount.CountEntry](#qrl.TransactionCount.CountEntry) | repeated |  |






<a name="qrl.TransactionCount.CountEntry"/>

### TransactionCount.CountEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [uint32](#uint32) |  |  |
| value | [uint32](#uint32) |  |  |






<a name="qrl.TransactionExtended"/>

### TransactionExtended



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header | [BlockHeader](#qrl.BlockHeader) |  |  |
| tx | [Transaction](#qrl.Transaction) |  |  |
| addr_from | [bytes](#bytes) |  |  |
| size | [uint64](#uint64) |  |  |
| timestamp_seconds | [uint64](#uint64) |  |  |






<a name="qrl.TransferCoinsReq"/>

### TransferCoinsReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  | Transaction source address |
| addresses_to | [bytes](#bytes) | repeated | Transaction destination address |
| amounts | [uint64](#uint64) | repeated | Amount. It should be expressed in Shor |
| fee | [uint64](#uint64) |  | Fee. It should be expressed in Shor |
| xmss_pk | [bytes](#bytes) |  | XMSS Public key |






<a name="qrl.TransferCoinsResp"/>

### TransferCoinsResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| extended_transaction_unsigned | [TransactionExtended](#qrl.TransactionExtended) |  |  |






<a name="qrl.TransferTokenTxnReq"/>

### TransferTokenTxnReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| master_addr | [bytes](#bytes) |  |  |
| addresses_to | [bytes](#bytes) | repeated |  |
| token_txhash | [bytes](#bytes) |  |  |
| amounts | [uint64](#uint64) | repeated |  |
| fee | [uint64](#uint64) |  |  |
| xmss_pk | [bytes](#bytes) |  |  |





 


<a name="qrl.GetLatestDataReq.Filter"/>

### GetLatestDataReq.Filter


| Name | Number | Description |
| ---- | ------ | ----------- |
| ALL | 0 |  |
| BLOCKHEADERS | 1 |  |
| TRANSACTIONS | 2 |  |
| TRANSACTIONS_UNCONFIRMED | 3 |  |



<a name="qrl.NodeInfo.State"/>

### NodeInfo.State


| Name | Number | Description |
| ---- | ------ | ----------- |
| UNKNOWN | 0 |  |
| UNSYNCED | 1 |  |
| SYNCING | 2 |  |
| SYNCED | 3 |  |
| FORKED | 4 |  |



<a name="qrl.PushTransactionResp.ResponseCode"/>

### PushTransactionResp.ResponseCode


| Name | Number | Description |
| ---- | ------ | ----------- |
| UNKNOWN | 0 |  |
| ERROR | 1 |  |
| VALIDATION_FAILED | 2 |  |
| SUBMITTED | 3 |  |


 

 


<a name="qrl.AdminAPI"/>

### AdminAPI
This is a place holder for testing/instrumentation APIs

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|


<a name="qrl.PublicAPI"/>

### PublicAPI
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
| ParseAddress | [ParseAddressReq](#qrl.ParseAddressReq) | [ParseAddressResp](#qrl.ParseAddressReq) |  |
| GetAddressFromPK | [GetAddressFromPKReq](#qrl.GetAddressFromPKReq) | [GetAddressFromPKResp](#qrl.GetAddressFromPKReq) |  |
| GetMessageTxn | [MessageTxnReq](#qrl.MessageTxnReq) | [TransferCoinsResp](#qrl.MessageTxnReq) |  |
| GetTokenTxn | [TokenTxnReq](#qrl.TokenTxnReq) | [TransferCoinsResp](#qrl.TokenTxnReq) |  |
| GetTransferTokenTxn | [TransferTokenTxnReq](#qrl.TransferTokenTxnReq) | [TransferCoinsResp](#qrl.TransferTokenTxnReq) |  |
| GetSlaveTxn | [SlaveTxnReq](#qrl.SlaveTxnReq) | [TransferCoinsResp](#qrl.SlaveTxnReq) |  |
| GetTransaction | [GetTransactionReq](#qrl.GetTransactionReq) | [GetTransactionResp](#qrl.GetTransactionReq) |  |
| GetBalance | [GetBalanceReq](#qrl.GetBalanceReq) | [GetBalanceResp](#qrl.GetBalanceReq) |  |
| GetOTS | [GetOTSReq](#qrl.GetOTSReq) | [GetOTSResp](#qrl.GetOTSReq) |  |
| GetHeight | [GetHeightReq](#qrl.GetHeightReq) | [GetHeightResp](#qrl.GetHeightReq) |  |
| GetBlock | [GetBlockReq](#qrl.GetBlockReq) | [GetBlockResp](#qrl.GetBlockReq) |  |
| GetBlockByNumber | [GetBlockByNumberReq](#qrl.GetBlockByNumberReq) | [GetBlockByNumberResp](#qrl.GetBlockByNumberReq) |  |

 



<a name="qrlbase.proto"/>
<p align="right"><a href="#top">Top</a></p>

## qrlbase.proto



<a name="qrl.GetNodeInfoReq"/>

### GetNodeInfoReq







<a name="qrl.GetNodeInfoResp"/>

### GetNodeInfoResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| version | [string](#string) |  |  |
| grpcProto | [string](#string) |  |  |





 

 

 


<a name="qrl.Base"/>

### Base


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetNodeInfo | [GetNodeInfoReq](#qrl.GetNodeInfoReq) | [GetNodeInfoResp](#qrl.GetNodeInfoReq) |  |

 



<a name="qrldebug.proto"/>
<p align="right"><a href="#top">Top</a></p>

## qrldebug.proto



<a name="qrl.GetFullStateReq"/>

### GetFullStateReq







<a name="qrl.GetFullStateResp"/>

### GetFullStateResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| coinbase_state | [AddressState](#qrl.AddressState) |  |  |
| addresses_state | [AddressState](#qrl.AddressState) | repeated |  |





 

 

 


<a name="qrl.DebugAPI"/>

### DebugAPI
This service describes the Debug API used for debugging

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetFullState | [GetFullStateReq](#qrl.GetFullStateReq) | [GetFullStateResp](#qrl.GetFullStateReq) |  |

 



<a name="qrllegacy.proto"/>
<p align="right"><a href="#top">Top</a></p>

## qrllegacy.proto



<a name="qrl.BKData"/>

### BKData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| mrData | [MRData](#qrl.MRData) |  |  |
| block | [Block](#qrl.Block) |  |  |






<a name="qrl.FBData"/>

### FBData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint64](#uint64) |  |  |






<a name="qrl.LegacyMessage"/>

### LegacyMessage
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






<a name="qrl.MRData"/>

### MRData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| hash | [bytes](#bytes) |  | FIXME: rename this to block_headerhash |
| type | [LegacyMessage.FuncName](#qrl.LegacyMessage.FuncName) |  | FIXME: type/string what is this |
| stake_selector | [bytes](#bytes) |  |  |
| block_number | [uint64](#uint64) |  |  |
| prev_headerhash | [bytes](#bytes) |  |  |
| reveal_hash | [bytes](#bytes) |  |  |






<a name="qrl.NoData"/>

### NoData







<a name="qrl.PBData"/>

### PBData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block | [Block](#qrl.Block) |  |  |






<a name="qrl.PLData"/>

### PLData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_ips | [string](#string) | repeated |  |
| public_port | [uint32](#uint32) |  |  |






<a name="qrl.PONGData"/>

### PONGData







<a name="qrl.SYNCData"/>

### SYNCData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [string](#string) |  |  |






<a name="qrl.VEData"/>

### VEData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| version | [string](#string) |  |  |
| genesis_prev_hash | [bytes](#bytes) |  |  |
| rate_limit | [uint64](#uint64) |  |  |





 


<a name="qrl.LegacyMessage.FuncName"/>

### LegacyMessage.FuncName


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
<p align="right"><a href="#top">Top</a></p>

## qrlmining.proto



<a name="qrl.GetBlockMiningCompatibleReq"/>

### GetBlockMiningCompatibleReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#uint64) |  | Used for getlastblockheader and getblockheaderbyheight

if height = 0, this means getlastblockheader |






<a name="qrl.GetBlockMiningCompatibleResp"/>

### GetBlockMiningCompatibleResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blockheader | [BlockHeader](#qrl.BlockHeader) |  |  |
| blockmetadata | [BlockMetaData](#qrl.BlockMetaData) |  |  |






<a name="qrl.GetBlockToMineReq"/>

### GetBlockToMineReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| wallet_address | [bytes](#bytes) |  |  |






<a name="qrl.GetBlockToMineResp"/>

### GetBlockToMineResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blocktemplate_blob | [string](#string) |  | max length 112 bytes, otherwise xmr-stak will hiccup |
| difficulty | [uint64](#uint64) |  | difficulty that the new block should meet |
| height | [uint64](#uint64) |  |  |
| reserved_offset | [uint32](#uint32) |  |  |






<a name="qrl.GetLastBlockHeaderReq"/>

### GetLastBlockHeaderReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#uint64) |  |  |






<a name="qrl.GetLastBlockHeaderResp"/>

### GetLastBlockHeaderResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| difficulty | [uint64](#uint64) |  |  |
| height | [uint64](#uint64) |  |  |
| timestamp | [uint64](#uint64) |  |  |
| reward | [uint64](#uint64) |  |  |
| hash | [string](#string) |  |  |
| depth | [uint64](#uint64) |  |  |






<a name="qrl.SubmitMinedBlockReq"/>

### SubmitMinedBlockReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blob | [bytes](#bytes) |  | blocktemplate_blob with the correct nonce |






<a name="qrl.SubmitMinedBlockResp"/>

### SubmitMinedBlockResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| error | [bool](#bool) |  | It seems there are no special fields for success/error reporting, does gRPC automatically give me something? |





 

 

 


<a name="qrl.MiningAPI"/>

### MiningAPI


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetBlockMiningCompatible | [GetBlockMiningCompatibleReq](#qrl.GetBlockMiningCompatibleReq) | [GetBlockMiningCompatibleResp](#qrl.GetBlockMiningCompatibleReq) |  |
| GetLastBlockHeader | [GetLastBlockHeaderReq](#qrl.GetLastBlockHeaderReq) | [GetLastBlockHeaderResp](#qrl.GetLastBlockHeaderReq) |  |
| GetBlockToMine | [GetBlockToMineReq](#qrl.GetBlockToMineReq) | [GetBlockToMineResp](#qrl.GetBlockToMineReq) |  |
| SubmitMinedBlock | [SubmitMinedBlockReq](#qrl.SubmitMinedBlockReq) | [SubmitMinedBlockResp](#qrl.SubmitMinedBlockReq) |  |

 



<a name="qrlstateinfo.proto"/>
<p align="right"><a href="#top">Top</a></p>

## qrlstateinfo.proto



<a name="qrl.ForkState"/>

### ForkState



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| initiator_headerhash | [bytes](#bytes) |  | Stores the headerhash of the block initiated the fork recovery |
| fork_point_headerhash | [bytes](#bytes) |  | Stores the headerhash of the block after which forked happened |
| old_mainchain_hash_path | [bytes](#bytes) | repeated | Stores the hash path of old main chain which needs to be played |
| new_mainchain_hash_path | [bytes](#bytes) | repeated | if the fork recovery fails

Alternate chain hash path which is eligible to become mainchain |






<a name="qrl.LastTransactions"/>

### LastTransactions



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tx_metadata | [TransactionMetadata](#qrl.TransactionMetadata) | repeated |  |






<a name="qrl.TransactionMetadata"/>

### TransactionMetadata



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| transaction | [Transaction](#qrl.Transaction) |  |  |
| block_number | [uint64](#uint64) |  |  |
| timestamp | [uint64](#uint64) |  |  |





 

 

 

 



<a name="qrlwallet.proto"/>
<p align="right"><a href="#top">Top</a></p>

## qrlwallet.proto



<a name="qrl.AddAddressFromSeedReq"/>

### AddAddressFromSeedReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| seed | [string](#string) |  |  |






<a name="qrl.AddAddressFromSeedResp"/>

### AddAddressFromSeedResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| address | [string](#string) |  |  |






<a name="qrl.AddNewAddressReq"/>

### AddNewAddressReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#uint64) |  | Seed can be either hexseed or mnemonic |
| hash_function | [string](#string) |  |  |






<a name="qrl.AddNewAddressResp"/>

### AddNewAddressResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| address | [string](#string) |  |  |






<a name="qrl.BalanceReq"/>

### BalanceReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address | [string](#string) |  |  |






<a name="qrl.BalanceResp"/>

### BalanceResp



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [uint32](#uint32) |  |  |
| error | [string](#string) |  |  |
| balance | [uint64](#uint64) |  |  |






<a name="qrl.BlockByNumberReq"/>

### BlockByNumberReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block_number | [uint64](#uint64) |  |  |






<a name="qrl.BlockReq"/>

### BlockReq



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| header_hash | [string](#string) |  |  |






<a name="qrl.BlockResp"/>

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

 



## Scalar Value Types

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

