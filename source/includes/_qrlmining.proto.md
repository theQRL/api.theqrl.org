# qrlmining.proto



<a name="MiningAPI"/>


## MiningAPI

```python
   
```

```javascript
   
```

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| [GetBlockMiningCompatible](#GetBlockMiningCompatible) | [GetBlockMiningCompatibleReq](#GetBlockMiningCompatibleReq) | [GetBlockMiningCompatibleResp](#GetBlockMiningCompatibleReq) |  |
| [GetLastBlockHeader](#GetLastBlockHeader) | [GetLastBlockHeaderReq](#GetLastBlockHeaderReq) | [GetLastBlockHeaderResp](#GetLastBlockHeaderReq) |  |
| [GetBlockToMine](#GetBlockToMine) | [GetBlockToMineReq](#GetBlockToMineReq) | [GetBlockToMineResp](#GetBlockToMineReq) |  |
| [SubmitMinedBlock](#SubmitMinedBlock) | [SubmitMinedBlockReq](#SubmitMinedBlockReq) | [SubmitMinedBlockResp](#SubmitMinedBlockReq) |  |

 
<a name="GetBlockMiningCompatible"/>

## GetBlockMiningCompatible



<a name="GetBlockMiningCompatibleReq"/>

### GetBlockMiningCompatibleReq

```python
   
```

```javascript
   
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#uint64) |  | Used for getlastblockheader and getblockheaderbyheight if height = 0, this means getlastblockheader |


<a name="GetBlockMiningCompatibleResp"/>

### GetBlockMiningCompatibleResp

```python
   
```

```javascript
   
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| blockheader | [BlockHeader](#BlockHeader) |  |  |
| blockmetadata | [BlockMetaData](#BlockMetaData) |  |  |





## GetLastBlockHeader

<a name="GetLastBlockHeaderReq"/>

### GetLastBlockHeaderReq

```python
   
```

```javascript
   
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| height | [uint64](#uint64) |  |  |

<a name="GetLastBlockHeaderResp"/>


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


<a name="GetBlockToMine"/>

## GetBlockToMine



<a name="GetBlockToMineReq"/>

### GetBlockToMineReq

```python
   
```

```javascript
   
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| wallet_address | [bytes](#bytes) |  |  |


<a name="GetBlockToMineResp"/>

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






<a name="SubmitMinedBlock"/>

## SubmitMinedBlock





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
