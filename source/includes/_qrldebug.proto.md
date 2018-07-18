# qrldebug.proto




## GetFullStateReq



```python
   
```

```javascript
   
```


## GetFullStateResp

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| coinbase_state | [AddressState](#addressstate) |  |  |
| addresses_state | [AddressState](#addressstate) | repeated |  |


## DebugAPI

```python
   
```

```javascript
   
```


This service describes the Debug API used for debugging

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetFullState | [GetFullStateReq](#getfullstatereq) | [GetFullStateResp](#getfullstatereq) |  |
