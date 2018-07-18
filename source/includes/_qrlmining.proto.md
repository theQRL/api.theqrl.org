# qrlmining.proto



<a name="MiningAPI"/>


## MiningAPI

```python
   
```

```javascript
   
```

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| [GetBlockMiningCompatible](#getblockminingcompatible) | [GetBlockMiningCompatibleReq](#getblockminingcompatiblereq) | [GetBlockMiningCompatibleResp](#getblockminingcompatiblereq) |  |
| [GetLastBlockHeader](#getlastblockheader) | [GetLastBlockHeaderReq](#getlastblockheaderreq) | [GetLastBlockHeaderResp](#getlastblockheaderreq) |  |
| [GetBlockToMine](#getblocktomine) | [GetBlockToMineReq](#getblocktominereq) | [GetBlockToMineResp](#getblocktominereq) |  |
| [SubmitMinedBlock](#submitminedblock) | [SubmitMinedBlockReq](#submitminedblockreq) | [SubmitMinedBlockResp](#submitminedblockreq) |  |



## GetBlockMiningCompatible



### GetBlockMiningCompatibleReq

```python
   
```

```javascript
   
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#uint64) |  | Used for getlastblockheader and getblockheaderbyheight if height = 0, this means getlastblockheader |



### GetBlockMiningCompatibleResp

```python
   
```

```javascript
   
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blockheader | [BlockHeader](#blockheader) |  |  |
| blockmetadata | [BlockMetaData](#blockmetadata) |  |  |





## GetLastBlockHeader



### GetLastBlockHeaderReq

```python
   
```

```javascript
   
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#uint64) |  |  |




### GetLastBlockHeaderResp

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



## GetBlockToMine




### GetBlockToMineReq

```python
   
```

```javascript
   
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| wallet_address | [bytes](#bytes) |  |  |



### GetBlockToMineResp

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






## SubmitMinedBlock


## SubmitMinedBlockReq

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blob | [bytes](#bytes) |  | blocktemplate_blob with the correct nonce |


## SubmitMinedBlockResp

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| error | [bool](#bool) |  | It seems there are no special fields for success/error reporting, does gRPC automatically give me something? |
