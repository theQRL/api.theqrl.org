# QRL Debug Protocol


## DebugAPI

This service describes the Debug API used for debugging

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetFullState | [GetFullStateReq](#getfullstatereq) | [GetFullStateResp](#getfullstatereq) |  |

## GetFullStateReq

## GetFullStateResp

| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| coinbase_state | [AddressState](#addressstate) |  |  |
| addresses_state | [AddressState](#addressstate) | repeated |  |