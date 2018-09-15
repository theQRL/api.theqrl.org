# QRL State Info Protocol

## ForkState


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| initiator_headerhash | [bytes](#bytes) |  | Stores the headerhash of the block initiated the fork recovery |
| fork_point_headerhash | [bytes](#bytes) |  | Stores the headerhash of the block after which forked happened |
| old_mainchain_hash_path | [bytes](#bytes) | repeated | Stores the hash path of old main chain which needs to be played |
| new_mainchain_hash_path | [bytes](#bytes) | repeated | if the fork recovery fails

Alternate chain hash path which is eligible to become mainchain |


## LastTransactions

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| tx_metadata | [TransactionMetadata](#transactionmetadata) | repeated |  |


## TransactionMetadata


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| transaction | [Transaction](#transaction) |  |  |
| block_number | [uint64](#uint64) |  |  |
| timestamp | [uint64](#uint64) |  |  |
