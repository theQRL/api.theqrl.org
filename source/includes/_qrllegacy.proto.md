# qrllegacy.proto


## BKData

```python
   
```

```javascript
   
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| mrData | [MRData](#mrdata) |  |  |
| block | [Block](#block) |  |  |

## FBData

```python
   
```

```javascript
   
```

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint64](#uint64) |  |  |

## LegacyMessage

```python
   
```

```javascript
   
```

Adding old code to refactor while keeping things working


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| func_name | [LegacyMessage.FuncName](#legacymessage.funcname) |  |  |
| noData | [NoData](#nodata) |  |  |
| veData | [VEData](#vedata) |  |  |
| plData | [PLData](#pldata) |  |  |
| pongData | [PONGData](#pongdata) |  |  |
| mrData | [MRData](#mrdata) |  |  |
| block | [Block](#block) |  |  |
| fbData | [FBData](#fbdata) |  |  |
| pbData | [PBData](#pbdata) |  |  |
| bhData | [BlockHeightData](#blockheightdata) |  |  |
| txData | [Transaction](#transaction) |  |  |
| mtData | [Transaction](#transaction) |  |  |
| tkData | [Transaction](#transaction) |  |  |
| ttData | [Transaction](#transaction) |  |  |
| ltData | [Transaction](#transaction) |  |  |
| slData | [Transaction](#transaction) |  |  |
| ephData | [EncryptedEphemeralMessage](#encryptedephemeralmessage) |  |  |
| syncData | [SYNCData](#syncdata) |  |  |
| chainStateData | [NodeChainState](#nodechainstate) |  |  |
| nodeHeaderHash | [NodeHeaderHash](#nodeheaderhash) |  |  |
| p2pAckData | [P2PAcknowledgement](#p2packnowledgement) |  |  |




## MRData

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| hash | [bytes](#bytes) |  | FIXME: rename this to block_headerhash |
| type | [LegacyMessage.FuncName](#legacymessage.funcname) |  | FIXME: type/string what is this |
| stake_selector | [bytes](#bytes) |  |  |
| block_number | [uint64](#uint64) |  |  |
| prev_headerhash | [bytes](#bytes) |  |  |
| reveal_hash | [bytes](#bytes) |  |  |




## NoData

```python
   
```

```javascript
   
```


## PBData

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| block | [Block](#block) |  |  |



## PLData

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| peer_ips | [string](#string) | repeated |  |
| public_port | [uint32](#uint32) |  |  |



## PONGData

```python
   
```

```javascript
   
```


## SYNCData

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [string](#string) |  |  |


## VEData

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| version | [string](#string) |  |  |
| genesis_prev_hash | [bytes](#bytes) |  |  |
| rate_limit | [uint64](#uint64) |  |  |



## LegacyMessage.FuncName

```python
   
```

```javascript
   
```


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

