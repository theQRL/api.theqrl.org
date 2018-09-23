# Scalar Value Types

| .proto Type | Notes | C++ Type | Java Type | Python Type |
| ----------- | ----- | -------- | --------- | ----------- |
| <a id="scalar-bool">Bool</a> |  | bool | boolean | boolean |
|  <a id="scalar-bytes">Bytes</a> | May contain any arbitrary sequence of bytes. | string | ByteString | str |
| <a id="scalar-double">Double</a> |  | double | double | float |
| <a id="scalar-fixed32">Fixed32</a> | Always four bytes. More efficient than uint32 if values are often greater than 2^28. | uint32 | int | int |
| <a id="scalar-fixed64">Fixed64</a> | Always eight bytes. More efficient than uint64 if values are often greater than 2^56. | uint64 | long | int/long |
| <a id="scalar-float">Float</a> |  | float | float | float |
| <a id="scalar-int32">Int32</a> | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int |
| <a id="scalar-int64">Int64</a> | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long |
| <a id="scalar-sfixed32">sfixed32</a> | Always four bytes. | int32 | int | int |
| <a id="scalar-sfixed64">sfixed64</a> | Always eight bytes. | int64 | long | int/long |
| <a id="scalar-sint32">sint32</a> | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. | int32 | int | int |
| <a id="scalar-sint64">sint64</a> | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long |
| <a id="scalar-string">String</a> | A string must always contain UTF-8 encoded or 7-bit ASCII text. | string | String | str/unicode |
| <a id="scalar-uint32">uint32</a> | Uses variable-length encoding. | uint32 | int | int/long |
| <a id="scalar-uint64">uint64</a> | Uses variable-length encoding. | uint64 | long | int/long |






