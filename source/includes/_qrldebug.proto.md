# qrldebug.proto



<a name="GetFullStateReq"/>

## GetFullStateReq



```python
   
```

```javascript
   
```

<a name="GetFullStateResp"/>

## GetFullStateResp

```python
   
```

```javascript
   
```


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| coinbase_state | [AddressState](#AddressState) |  |  |
| addresses_state | [AddressState](#AddressState) | repeated |  |




<a name="DebugAPI"/>

## DebugAPI

```python
   
```

```javascript
   
```


This service describes the Debug API used for debugging

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetFullState | [GetFullStateReq](#GetFullStateReq) | [GetFullStateResp](#GetFullStateReq) |  |
