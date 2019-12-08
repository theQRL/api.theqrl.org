
# Automatic Wallet API

> The automatic functions have been developed to assist the automatic integration of addresses into large commercial systems. This simplifies programming by allowing an address to be used for an almost infinite number of signatures. You no longer need to validate and track the state of an address, as the system handles this for you.

This service describes the Wallet API automatic functions. This is intended to simplify the programmatic interaction with the QRL wallet and will allow further development with automated services.

<aside class="success">
The <code>WalletAPI</code> and <code>Wallet Daemon</code> now include automatic slave key transactions and lockout management. When using these automatic features, the wallet functionality has been increased dramatically. The last 5 slave keys are not automatically consumed, slave trees are automatically generated when you get close to running out. This creates an almost infinite amount OTS keys for a given master address!
</aside>

## Auto Wallet Getting Started

Using the functions defined below you will have, automatic OTS key management, automatic slave tree generation, and additional OTS usage protection saving 5 OTS keys from being used by the automated system.  

See the [WalletAPI](#wallet-api) section for installation and additional instructions of the daemon. 

## Automatic WalletAPI Methods

> Additional methods are available by using the [walletAPI](#wallet-api). 

| Method Name | Request Type | Response Type | 
| ----------- | ------------ | ------------- | 
| [AddNewAddressWithSlaves](#addnewaddresswithslaves) | [AddNewAddressWithSlavesReq](#addnewaddresswithslavesreq) | [AddNewAddressResp](#addnewaddressresp) | 
| [RelayMessageTxnBySlave](#relaymessagetxnbyslave) | [RelayMessageTxnBySlaveReq](#relaymessagetxnbyslavereq) | [RelayTxnResp](#relaytxnresp) |
| [RelaySlaveTxnBySlave](#relayslavetxnbyslave) | [RelaySlaveTxnBySlaveReq](#relayslavetxnbyslavereq) | [RelayTxnResp](#relaytxnresp) |
| [RelayTokenTxnBySlave](#relaytokentxnbyslave) | [RelayTokenTxnBySlaveReq](#relaytokentxnbyslavereq) | [RelayTxnResp](#relaytxnresp) |
| [RelayTransferTxnBySlave](#relaytransfertxnbyslave) | [RelayTransferTxnBySlaveReq](#relaytransfertxnbyslavereq) | [RelayTxnResp](#relaytxnresp) |
| [RelayTransferTokenTxnBySlave](#relaytransfertokentxnbyslave) | [RelayTransferTokenTxnBySlaveReq](#relaytransfertokentxnbyslavereq) | [RelayTxnResp](#relaytxnresp) |

## AddNewAddressWithSlaves

> Use this function to add wallets in an automated system with slave trees automatically generated. This will automatically re-generate new slave trees when the current OTS trees are used, giving nearly infinite transactions per address.

```shell
# AddNewAddressWithSlaves Request
curl -XPOST http://127.0.0.1:5359/api/AddNewAddressWithSlaves


# AddNewAddressWithSlaves Response
{"address":"Q01050064972e6af06b1073172d7e7b27f3d437d4f50ec1587f491e18d545c249ec3a6e484dfe17"}


## AddNewAddressWithSlaves Request
curl -XPOST http://127.0.0.1:5359/api/AddNewAddressWithSlaves -d '
{
  "height": 10,
  "number_of_slaves": 100
}'

# AddNewAddressWithSlaves Response
{"address":"Q010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781"}
```

```python
def addNewAddressWithSlaves(height, number_of_slaves, hash_function):
  import requests
  import json
  payload = {'height': height, 'number_of_slaves': number_of_slaves, 'hash_function': hash_function}
  QRLrequest = requests.post("http://127.0.0.1:5359/api/AddNewAddressWithSlaves", json=payload)
  response = QRLrequest.text
  addNewAddressWithSlavesResp = json.loads(response)
  jsonResponse = addNewAddressWithSlavesResp
  return(jsonResponse)

# Add address with height 18, and 100 slaves using sha2_256
addNewAddressWithSlaves(10, 100, "sha2_256")

# Response

{'address': 'Q00050097a8a01a5269f570ff3c3914aaff0cf0a8e9869804c9190768fe123a6b547cc739a9558d'}

```

Adds new randomly generated address to the wallet with slaves. This function is intended to be automated for high volume transaction accounts for multiple users. 

<aside class="success">
When the OTS available count reaches less than 100, the API will automatically re-generate new slave trees and broadcast to the network. 
<br>
The API will not allow the last 5 OTS to be used for the given address.
</aside>

By default the command without any options will add or create a wallet at \~/.qrl/walletd.json with the height of 10, 3 slave trees, using the shake128 hash_function.

**Request**

| **Parameter** | **Type** | **Description** | **Default** |
| --- | --- | --- | --- |
| height | [UInt64](#scalar-uint64) | Height of the newly generated XMSS tree (Min 8) | 10
| number_of_slaves | [UInt64](#scalar-uint64) | Number of slaves to be generated (Max 100) | 3 |
| hash_function | [String](#scalar-string) | Hash function for XMSS. Possible values are shake128, shake256, sha2_256. | shake128 |

**Response**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| code | [UInt32](#scalar-uint32) | Error Code. Only appears if any exception is triggered. |
| error | [String](#scalar-string) | Error Message. Only appears if any exception is triggered. |
| address | [String](#scalar-string) | Return the newly added QRL address |


## RelayMessageTxnBySlave


> Use this to relay a message on the network using a slave OTS key. The address must have slave trees, and have been created using the [AddNewAddressWithSlaves](#addnewaddresswithslaves) or this will fail.
 
```shell
# RelayMessageTxnBySlave Request

curl -XPOST http://127.0.0.1:5359/api/RelayMessageTxnBySlave -d '
{
  "message": "Hello World!!!",
  "fee": 1000000000,
  "master_address": "Q010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781"
}'

# RelayMessageTxnBySlave Response

{
  "tx":{
    "master_addr":"Q010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781",
    "fee":"1000000000",
    "public_key":"0105003e5b1733a685fdd5b88759b76ec638f3a621ab59bce5b8ccc32e14369177c6043fde8e602478b5ccdb015fe017eafe284a3a5b5677c17481562f02de4a4cbb33",
    "signature":"00000011785cd11a4b8f5e32aa66659b3f4c8c65ff18ce42f8845eace12ae001e93760ba3dc5112108050c7fc93300dda2f6e39128244746c419375b450e1244db8a990af046903126b141736546a3118c980a24bd89b6d28afd77afc3bbd0c38a9bc01f0b8739d23ea0aa5b547006559f3f3a3b7447878283aff74b644dcfcd75a172e09cfcec409cbda9abae86503635a902a48f9570cc0deba5d9dcf0cfbb0d637ea6f6dd0475039b542dfe53d6e803316b87fab469cba5373652a782b154c787b5c98436664cda2187e1cdf0fb222496ed95b81a7c50960a374ebc3fcf406dfadb728f51c7f9c352f1c6c297ce4269df52b5a4a83a4d97dedbfd40a6f4e2007347a953531a1ef57eee7886e15e4afa9a44565fd162c1e3783f42adbac0eee4424ed65a8f2411d850fb1e6c5474b832187a9f0c306a6673c26118652d0abd4467267ec4bb35ad29762e4d07135fe2d8f0b47c7d17f3d6584c6ee0f9a3287cbd5332925e4ee5d7200d0bcce7efbc39dff775e43ca19defa0b7e8ab0d9d109a17625de3dd040b14d19f161de6cba3f2324427bbfb37c66081fabbe06d981e761811fc3908fdcb5c0b8e64f2d8d71ad5499cf48db035f7a5b27d001f87afa1a5e44e56b5a10bec606c42120f5fa4d4525683c9b1b00afce289801177c0abf37e70e7e738cda929bcd57cda550cd69323c23add0e034630980f6c64692190dc95cb001b03519268bd8a75a213f1ffd1afb6c6489fab96ab179e32aed11ed5ebdb578751ee364db49982281c9aa4502332dc93f7e85d31e063ae1291038a80b9dff4770e867ae7c29093614330692f16c8655eb0583b0a45ca6496075214bd40fd83b19ab87c3c037a9595993a9c5923dd98b562301f0ed1c1df499c5bc110800dac0ae1cd7adee943fc1da2bac692c1950b3fc77be5ce62fb0b88c81efb1fa48c48a942606e88f8ba8bfee944d17558b68116e03cd64f1a560ad9043aca099de95127d7313b3e3360724b3e51bd5bf50909b86e18b9b5d37e3b9f1ebb7e011b3fdeff324d0daca8a8509eefca0c8b939accbe3df69dc02384706ed36bb43b3805e9cb75cf3ae4769aa546a0a18ee51135e670005e02563a139eacd6a17af48ceb413ae10df875462b2cbb1f8e37d218b9a9f7912ec1b94feca578604ca5029529d64f4822149a897bb1f53cf79312b7eb16f8f36502bcf26f4da0dc22eed0e250fa21789eb3ae11a708899fba46b8879ec424cf84905c797bd29f70d0c84545930948031bb95214a8c9b9efc55a854022c18354a2356917a960b119f49722d911361fd49ad1365f5421d0e9ee307c265b765e2b416d3a36ab80a4f4c3092890c72df553b854d670a8e51a2e7d025bf879936d8afc64fe2eec1dff5e9f9433d0eb516b767e00cb96dffd5fb72995c3c7c84ed27e940c5f6add2af217dfebd55f745f49abaedb5a428ec70aeaf43338ea1bb88f08a2772ec6dc7f0188b5a2fa878e394619d94bbf715acb5535bed55ddf631ffd828c6f1591333f49dea00ede24a9abd393c736ae74c086f99c5c78bec4d346a37bb59a01367bd1a1883557daacbed07e20305952566f4b8acb01a871f12490493b49a037270858993783474426bcabf10790dfa92f359a87a5d77aa0f495fbbaff7078871da62a1002323e86bfa326de13ee7f11388f8da56dc05b52613203641cf6637cc35459c11a92328f59599e43cad700e2ac67326c7858632d3cbcf8683677699c1f00eba29cd87e7350bf7873c47188e370c010085efccf87221eea4c95e85d83b670f62acdd70e238166da92938650410430b80b95d202b928c197f2db69fad8cbc8d231fc7d4aa1125fce48fdc775b3f2f8c959cfe724e21079c120c2510180fad517fc6ddb2df7bb50998b71eb23d4e8c0ad67e3d56dade8078d6ff7c4a4cd1470ec38cf47e2f217b22358ce09eaee3a19a20efffbf3db2694bb579b393a5bea02f764f4e37cf6f26b010b625f87749acd0774efd3baa494a548ace0348cf05bcf98b5cefdbaa61b19b2e24c365db9eec57c101741b11e7ca18f9e685dfb5ce690acaa06cb84b5f5b547a9dfc3b11448e1fe55340bc2aebff997043c260629aff15feb04f5951949a095ec2f4d7071af250fce6483c7c6a31b2c8bf788251defe8893112933f92d7d7f23785236cb26593783040c592059825224649bcef1c36726d7c0208a8b6c058e3e4a28cb0857bc018bc7b4b7b671b2d75af044b1e741c977e07ebcfedf8333cda809934367ca5cba285d7fb1052d752c53d65dd845acdffeecc536179b72e6d408a866d9af2c0b36992bfe3229daea4bc32b40f0d5383ac7bbae919355e1276fe660b71133bc20b41a2a2678750fdfb2a26e458b73596e4f4c8cb731260d4ad0dbed4807a0a41bef28b0380783a572e17e4fbed601d7d6fdca0deb7f78c9e050b0fa23ebfbd90f4bf102e00039dad8d5062c3fd459692ff24344cc8c6a211cf1472562578dfc8b9f208a7e601ce78922c97ea480ca9a37c8ba2aa2d232a73173a703c7026782a8206b32ad6b90ec99278108e45fe551f602c20f7f78682d5e7a252035fe0430b4114ad7aef63eda0d7b50b60b6b0b5b273c577b2f0bb0337849a96f1858e3c52e21c80b7e37d7a5479f6f621aa62c4bd1fd3dbfca36bdd2f50dc06c757b88d6b74ab55428a251657b1aa7dfd9ead47f74688a194db3843de7dff0e0057820eca877b62a0687c765adf5931d685edf23755a42aead73d8ece2b2660fb3f8098dad5f157407e4067fc2a5c8fbd128191821f8221865d7d94df47d9b304c886718398e389ed3af2f39ccd755ba332be6fd0b14f2cfce06cd4fa7fb97e14fbb4e34563f70b6744b22b8b29afef94d78b7de8a73992eb8f3892fdb58b54ff7c17e066c5d6f6e16156b9f9afb8c5bfbe5d12fa60e4bbfa618c19e9b97e29a7ffba7cf16fd1ac05ae76be69e4d92090210d43123024aed6f175b59571c9f39f484a6208ec31bf522712b85c2eff33b1fc526478232bc68e44dcdb8fa95485c021b0104b330458ec1816eb5bf92f389dbafafdc87c38c84b15238d4b9d3407a7368ef7e14bd070b1320ed6c7181093f0aca400c320f930d90571c27ca0d6d71c559471d8c20ad6cf2a1c9381c9f57754696dc39685609cee743509e34771a2c81ce922068d2f394fa6343d3a537c24e61f5817eac6fd5f373bf00d73bb049cde9bca02639653231affe3d848df0081981df1b4bc115c42643626b31bbfacb27b5dbbcf818f3507d6a25dd5502c82b9468ccab58834e2951c9b9ba2dc0afea5d0449c18f42f6721bd979d25bf5aff85110f0fbc8d24c02dc71c63a99146b17517083fa005d36f8f12069005c871318e0057507a58caaab24538120b1b9384d7f0140ed92999c0bbdd3395dbbb69eaf6d7020e9dbf59d27ad390ee65881814487938cf59e12c4a072f76e363a3291b8d4a68b3c62c29bba0dcc49d9695e786dd0e5e750c7ddb9eecf77559da6d80206541d4905cf02d17eb9b35fde6169a6d4d6fbe",
    "transaction_hash":"73558b2dc301ab599bb1a8718de5140b6bc0ae6b921387fa2690055c769e7a8b",
    "signer_addr":"Q010500f088acc8eca008c7b9a1407076f413996777d12a802e9fd86e7d36f658275c8ae15ca6c2",
    "message":{
      "message_hash":"Hello World!!!"
    }
  }
}
```

```python
def relayMessageTxnBySlave(message, fee, master_address):
  import requests
  import json
  payload = {'message': message, 'fee': fee, 'master_address': master_address }
  QRLrequest = requests.post("http://127.0.0.1:5359/api/RelayMessageTxnBySlave", json=payload)
  response = QRLrequest.text
  relayMessageTxnBySlaveResp = json.loads(response)
  jsonResponse = relayMessageTxnBySlaveResp
  return(jsonResponse)


relayMessageTxn("Hello World!!!", 1000000000, "Q010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781")


```

Creates the signed message transaction using one of the slaves and relay it to the network. Master Address must exist into wallet. Address must have slave trees defined and relayed to use.

<aside class="success"> 
This call will relay a slave transaction if the remaining slave OTS key are less than 100, creating a new slave tree to use after the OTS is consumed.
</aside>

**Request**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| message | [String](#scalar-string) | String Message of maximum 80 bytes. |
| fee | [UInt64](#scalar-uint64) | Transaction Fee in Shor |
| master\_address | [String](#scalar-string) | QRL address whose slave will be signing the transaction. QRL Address must exist into wallet. |

**Response**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| code | [UInt32](#scalar-uint32) | Error Code. Only appears if any exception is triggered. |
| error | [String](#scalar-string) | Error Message. Only appears if any exception is triggered. |
| tx  | [Transaction](#scalar-transaction) | Return the transaction that has been relayed to the network. |

## RelaySlaveTxnBySlave

> Use this to send a transaction from an address using slave trees created with AddNewAddressWithSlaves. If there are no slave trees in the address, this will fail.

```shell
# RelaySlaveTxnBySlave Request

curl -XPOST http://127.0.0.1:5359/api/RelaySlaveTxnBySlave -d '
{
  "slave_pks": ["AQYAPYdez4/TrVmOUecaVLlpZnn1a+ltrfzMPCtQnhZzBtBxEEmp4/Qk199XQs0NMRcttHJ3JSI4qs5XSxEUKbXzWQ=="],
  "access_types": [0],
  "fee": 100000,
  "master_address": "Q010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781"
}'
```

**Response**

```shell
# RelaySlaveTxnBySlave Response

{
  "tx":{
    "master_addr":"Q010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781",
    "fee":"100000",
    "public_key":"0105003e5b1733a685fdd5b88759b76ec638f3a621ab59bce5b8ccc32e14369177c6043fde8e602478b5ccdb015fe017eafe284a3a5b5677c17481562f02de4a4cbb33",
    "signature":"00000014f8448144f1e575370b72fbdee58fd8ec227d7fbbf220bec50821f71a4711bb9105b622148fdaf67d0f0e41c7b33a5b55bef47db0c148414b9cd7e5ddf806e32cdb1b63c4f20f1d56e0b714a60917f6e60a14e6ed3aebd372880dded467df04e5b1a75c3bf9bc70629f116c4c4c45af3961a0f0836f626c0ba5c734027d14e3e024fdf0d334d7415a2612d9e5a2d6dc574d5df73b5d390218a4e9ae9e21197120feeb39c89cb446dac2a0fe56f1656a7a7da6e7c7742fabb5392dcf14071e830e57e5f546926184aedc7a9d03807add2fcaf6b8504e884e7030679e2585d30479d445e0c77010fbf749d57d4fdc80a912558a75c55a898ac4609240ae0372699ab91c50bd5854ff00dcfad0504e2b8197cea87704452cef5b8c4f967ba5b9cb386fc0be2cb6af415e0246ff0e700a910a5d5d97df66f16de8730065f660aa9bb9072b2ed4d7482dad9f22f368dc97353dcd178f9bfadea395fbbd3661b4ec92e4356a43854cf11c556e64c331d2829607f6029fe7d28ce6504bece9f58dbb6761b7c4163d0d5bb59397fbab406cf5a422c80f48b12ba2b5e536e235c8b2e5fe3611fccb2f40af09d58e626179e1af918389b8e070de863fce73dd28c70d98422fbf414e19130a8e91f8b295e631b4d8cd6d6a6c93c6196e5aa7e7c1b1d652d4e3961c93ca77ab41724a1c557280464915395b08149e83fae572b1e1a66bf2f3f8681e31132d094fcb925f16a3f98da5f31e6ca28e51024adc4212f9f8a32a57def382bca91662541ab409bb3a74e8efa923a9a32df4d01076d1993aeca6c6e78209ca6d0e45917876ac8778d996d0ba3d8d834f7aee4e3ab525147c6172510c1cbbca31762fbd2a9dfb54dc6d21d34b0af9b5d25bd4236cf706cbd8742dd66a56bd530b29b8357e74ed67b83789999812594cf09c58b320b9b5f6b021f80cf7716a378a52558fb63a30455291b293f84cb95e541d964d991cf5b7c910cad428998a9f616b50f92f7ced6eb3475c152a20653fda3f72217894b018732164a2e63b396b5954eae2f64f8480a1432a647dcf6c695b6960d585a839268fc704fc4c0d777f05631b2971889e363e1fe1cb7021f52badcac1df9fcb68170bf54d1f5579e09396821b3ad0465504fb3687c9d2b1dd53b9c6e550f94691f44e26e6b1581421a00afcef003fd7d8a24f88ef25f7bf0197ca044d966a6ff24087d1fee96f6e2da53202aa04ee33eaf983bed668bc0d76cf0017b3c5e15718566978bb8245b6734ebd85ae1ffdda1f2e10e35ea5080fa91a9fe210e6a3bc42daf91727ceaecf9e32f26f872e5e5f56a25c5921cd4df7ebdf6da31b064f3d51fbbd71286d2876e14436f7aa0226d67b9715d49a4276c4818684baccedfb044f984d5b77d9948428060d2507a3eb7759da74195909c31d336377a7759958db781b7d77c1891b54f01f45de5ef0ed72e1e92c5aae12f6169ad0e0b021476f0ae3fd927c9cfc120a9bfe310f56aab3bd61fc7d8ba213dc7bf3cd9cf199351ef7b9038229d165ca596243345ad6d512a13b180678e4fd5ee03d58736be7ca423988d62cacb0a437ecb6d07a1ae1ea9362d2f012b2ab676c459207aaf54faa8aad2f10e7b2499f7aae42011ebf33e07de02ccb62936a01c8b62eaf0653be9a41a9e901df9a8435ae1b08400b6886f1be73009213768f39b67975c4495e6ba31b5d733369702962b043124feecf5a85cbc64e07d508bb6ba1167d8c8cd50d7bbd0c00a435e317d896d521fc481c4118b95e7dc7c10648eb3cfacb63777af0878bc5ff96422ad2ded5edac61caf0b4919148306a9c31ce85c3ccd68b5cdaee98682961289a379e04e246307d00bf0019e394e39b716ca2df2965ecb4c31181c5f8f07e3111211bcacdb8d09c5bf3424069d337d8dbb3979dac20ac49a669d818d9dabff91ee6c30c0a46d6242d690eed29d51ee44aeb52168b2292dab4ad216e5dd0d08ee21f47aba18c88d6685f2867d3f20b8553f62d394b0820248caa31ed234927d7860d4b7ee66d00df0cea1cf2c1227c32aec4f1340653b408211137412e58f316aea9ee39dd3b4f2095bf317264cadf9946d154deb0dca4a701877fdbdd4150e32516599c006fb4a5b4f331cd231646d2b657c4a465f9807a17b784dbe1023545411755c168e66f76bf4fc66fdd7790aa336dd83b2ec11b97b485888bba2a0b1a08cee0ca33ae0caf578056ff2fe6d1a289e54ee2385bec11eb28ae2657fa9acf8f6f932b763176b58a5f9c5455f5dafbe6506175772a8b4c49fce5bb22ad8669671dcb408636d9c32c4d6322dae88b76f40957cf5d378ec39f9449cfb39ba62dfd875cfb67c051e2d6cbf90579ecc12a2657003e2525ef2f837e1073de32d29c0faf96427c9a21d4311c7a2a28cb53100355e3c0438c65a1e8a792f089230bf9d65fd6263e4d9f1adc4356aad992a9a741cd85da4f048295f31e6e30ef9b14dccdbc28e9f18231964c7a78edd8e11bd09e0b5743fff53eb842bfdf8e131682533a89cc60ac51d58f31de4693170ef785f081177ac721e20163e4f0fffc35c28e37f30637fea9eccefdf8274f12461191d9b24e1147d6f8e3f8ed940f8980db0151d6c41c5af8ef8f8537cbcf979d075711cd15601b4bea640efecdcedb74acdb33d56c223b79cf157563b48b24456d1b02c5c6f15b23153eb25f01a15b14c5db41b92fc38c9756f9e71a8148060bac4ec57238ab4b24d073fa9ed452d428db18321e45c798e4cfbff459b29a61f3cae2caa7a9f196d1f488756f295bac15ae2013fa73fd480d3fb8b7d261b524345de0ca2707af04267ca5da7dc23fecce6ad9cebdd4e9fffc696e4cf8fa8347d5024ffd19f912adffb34c4271cf040679ac6bcaf646e12cf02bb31e368af862d3d2950f258dd5202618382f6834a528471c6e4aed56ff86228ef232eb3c3eb289f195a0c1e06d428cf2e8d578054b49aff22528aad0a5d523b38b430b31d5cd00104459bf8f2842200a05d8c77b4b15f0eab85e1668a237d9566ebfd5cb4f6b87c16c7f3741d768758df780ded570ca83e6ff24f2b24a73ed68dd996866f7658275fbe12e399051dae617fcedaf4b8c3f09364e29f3ff7c7a2e1c1fc2a4de9569d1500daf84d0bd5ee672b693f0903c0a8c3c75918b4c8dbfb7ff185d314dec5fb3cec8c9ddc3abd3b9df5a4826c71f2ae5bcdadbd7164661ca02639653231affe3d848df0081981df1b4bc115c42643626b31bbfacb27b5dbbcf818f3507d6a25dd5502c82b9468ccab58834e2951c9b9ba2dc0afea5d0449c18f42f6721bd979d25bf5aff85110f0fbc8d24c02dc71c63a99146b17517083fa005d36f8f12069005c871318e0057507a58caaab24538120b1b9384d7f0140ed92999c0bbdd3395dbbb69eaf6d7020e9dbf59d27ad390ee65881814487938cf59e12c4a072f76e363a3291b8d4a68b3c62c29bba0dcc49d9695e786dd0e5e750c7ddb9eecf77559da6d80206541d4905cf02d17eb9b35fde6169a6d4d6fbe",
    "transaction_hash":"8bbd0a7870518890c6ac8800dd0fdcae35c091e70a00dfc5dc3752c27ae1da21",
    "signer_addr":"Q010500f088acc8eca008c7b9a1407076f413996777d12a802e9fd86e7d36f658275c8ae15ca6c2",
    "slave":{
      "slave_pks":[
        "0106003d875ecf8fd3ad598e51e71a54b9696679f56be96dadfccc3c2b509e167306d0711049a9e3f424d7df5742cd0d31172db47277252238aace574b111429b5f359"
      ],
      "access_types":[
        0
      ]
    }
  }
}
```

Creates the signed slave transaction using one of the slave OTS keys and relays it to the network. Master Address must exist into wallet. It may relay a slave transaction if the remaining slave OTS key are less than 100.

**Request**


| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| slave\_pks | [Bytes](#scalar-bytes) | List of Base64 encoded Public Keys which are allowed to act as slave |
| access\_types | [UInt64](#scalar-uint64) | Current supported access\_type is 0 |
| fee | [UInt64](#scalar-uint64) | Transaction Fee in Shor |
| master\_address | [String](#scalar-string) | QRL address whose slave will be signing the transaction. QRL Address must exist into wallet. |

**Response**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| code | [UInt32](#scalar-uint32) | Error Code. Only appears if any exception is triggered. |
| error | [String](#scalar-string) | Error Message. Only appears if any exception is triggered. |
| tx  | [Transaction](#scalar-transaction) | Return the transaction that has been relayed to the network. |



## RelayTokenTxnBySlave

> Use to relay a slave token transaction using the automatic slave tree system. This will only work for addresses created with the AddNewAddressWithSlaves call if the address does not contain any slave trees, this will fail


```shell
#  RelayTokenTxnBySlave Request
curl -XPOST http://127.0.0.1:5359/api/RelayTokenTxnBySlave -d '
{
  "symbol": "TEST",
  "name": "TEST TOKEN",
  "owner": "Q010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781",
  "decimals": 5,
  "addresses": ["Q010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781", "Q01060091aabafdc9569f4ddec95cbfbc5f10f871187777aabe375f16384dbfd7d3ba6922e566c9"],
  "amounts": [100000, 100000],
  "fee": 1000000000,
  "master_address": "Q010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781"
}'
```

```shell
 # RelayTokenTxnBySlave Response
{
  "tx":{
    "master_addr":"Q010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781",
    "fee":"1000000000",
    "public_key":"0105003e5b1733a685fdd5b88759b76ec638f3a621ab59bce5b8ccc32e14369177c6043fde8e602478b5ccdb015fe017eafe284a3a5b5677c17481562f02de4a4cbb33",
    "signature":"00000012717f2482d16625e71108084f182be46e41c873614bb566b2d280d07fae12e6bbfa8cc5366f60f5cd646bcf608eb2ebf445f67246a8923c126249b7f41e32c7ec9be78791d422b80b787c64690cd4214efb0db2b07d5c948d4218f59c49a87720e64156453a50d04be186d4d6301204dc3b8f0e86a2d949cae2511466c0db9d78b76191b78d733b43bccf5b145ec49e84328e25f8f6d8f6e742564335b58a3f0489a6082d2dfbcb5cd4c48dabb262e4717aeb63aaae0907cabc070132692e49b7b681724cd301f9385633d62bc43b5deb556cfaa8f69647d9a8d52c8ff7eb8633273e674a3d1c3c34df7d57335a615763e5b350a0760606cb203247a8f7929f1c4f8e92e10606ca47d240df4223982769d554709b035510811b33266ae9318ad55c42030f980f2ba7502d50581ea2ebf73b31ce7fd05c3460954233e769724df3ea1894c385cc3a5b72c92f5eb6362c690b8b7a2fc83d10d92cb787936a6c0565248f8c21f0bd3baff5fe0d31b5e59f90887a18e6d00263d638ee70ad4ff6e05014bd7d754f059a2489571ab4f89d10caa49af15fae075590e23983bb8261a239bc3ec33b09cba2076476199ec56083284deb6a16c4cbd489c9a1816a9680cdee7338c5024f4d7cac8233d47e5571ac5556caf7cffbd478b5323578a7539d53e8361458e1f4603c865bc98f27d54c52ccd309a843870fef54cc84def34dcb4223f0ee3c8b6a9811a6e48114ed0ddd52af545bd1fa51e9c128c6e9b4117cb95674786263a5f28d02c012dfc485b70fa79ee9fa4eb7d96f97057da972adc874abff8aa17123ab5cdfa459493a3056e3c0336ad111e6d9d43ee00dc264363f880078f0b48f7f5690c559b2f08e52247baa8dd2c6b2b381b1c483a3138ee7a23e5ec132931099895865a238bc0c6aa083a4dc73100f671fda948c3e685cabccd73678d2134c8a94ab979ec52d79ea473ef8dede125efeb8ee3218df151438c1776fb20506fb9e1185660acad990d1be32949d4629f06a4534b2cade9d4f2c10a424f494c757a6fd5e378c8dea57996dbc8a3bc615fbfced82bd6c32481769451ea1aa933a7a782a9435b35560742950bffce5d4c59ed6d3fdb885210582b409e3659a2ff04d00efcf097326a7c55caaaf72aa6dda008aa5a56873f051d0d08051bbd70c4b7f153dfbcbd7c180686c063c3e4a9b25fabcb34858a9c80d9cbf3cb83b40880495d58112fddeefaaf755c5e4500845832c5bfc0a3b5e0e1d523a309cecb46a2e1f0de31406f8a58d961102676a9fe1a3b9f0bf10272773938e29a48abec27472e8e7f2e048e910552db8afbd72872ede5164184161ea132c267139e59aa6af67ceeb7fd4c2e655437261ff4aa8c6892ab50021966542889d72cabaef3fa3437a779b872cc74f0131db637ff1b2abecebddadd17832656c06ef4f681d3fbf9920ff892f585f4fd28512b5ea23bf34702a6b1385a25640a018af0827a5ddeb3c07dc6efcf0e51a2295d80b21757f6d2fc56b877163d749415c4e9a17400929b985b5d3c9a7f0bfe61ea348a86d29a2672b9aed3986ff196b13031999a9b848cb32be9b50e3abf5910aedfae0d4422c8c8a1d8e1a63f24c51d13b753ad9a77d581c3af43a969b3aa27adb24f292d2d2590fb6f4973aa3ab4c655b2b13f8a77c37a70a773ed5712080b7431fe67f396486cfacbc23b763faab266e8edc59bbcaef23796d96ad47923369363d7ac264dbd75ff7adf5378463efb44984f21ce71ac7f42769c98383ffa1be9798d5ccd57a5f148086f64ba8cf956b2856e6504e68a389aae6f1b98a09b3975f094a2471f615498ed5c97113b17a8dac775a58c02186ea2c962579861834dd36593d100c241694fdf29847e84496f41b06a1214445db2e4051f666425d1e0f842755b03937966ac2f93d6429982c237633444be335418737f92c5a314bf4cc9a4c5cd24927e494e5cf298df6350d304427fdbe4a029b7638ad79ad45330b5a17199454eb1a50c2932c0bc5df0a291dc744cd3c7d352fa4c5313b77f137ac3ce05587038593f87d2ba1c7d8fb8519dc40fbd04aa515e6302bfb21c1512be940ce5254e2d97c05608bf5ceb270f3512c2229934512f420e9a8e927deb4afcc9bff263713def77bd1c88ee76e1195637015a58089a490833e72dc9709ec069f9c097d42206456686dc85e1763a9428c63c1e54df6bef6ca72f61b9431d73b9b6732e8b69a06cb34cdd3d0bd30df91c323a330af783c0aad6f7c9e50f3def432399c83428596b695aa6b9e51424cbd4c2a902884c2e64d315dfe44d4ef5a5eb5ca99ca876cbec5036588ed3ec885fa67c0c045167b8d0bb71b901da54c369da54ada50e4f33ca331528ae5179c3e2d24dd26244624089de65a14be824deb9dcfbb38230c88c0c0b5795666c9756ab6d856c80a0560cbf78836b463ca3181d091b252b56c08a6db1020b0149f6f692d52faa222058b01f2f8436c79ce04366fa4a2f5af908038dcb7de62ece74280c76a83d482c2c68704b0a5da1d48b9a24959ba7bfaa6c045b45780ca2435785e3e9c12d312039e85ea00bf7011fb8a70d61608a07b4345c01bb1856c5d71101e0611476c15ab0239a45e5522507fc83987efc99e5ecf3eea3a54eb619460d078e3b7e32064a7d4750ba7c47e56232857c60fcc51980c93f90ed392071970a3e0d991763485133426c5d3172353b49a768fd9598a219657391797dc7aa5d57a79af3a4bbacc153d1b11fc5ee71551a3b8e4b2d7feee33335fec1d40398067093a99cddf5607f768bf6b3019031e6684655fa34fc345d2cdd7f31507435bed903b3885f4af4c0afbe124ed61a6ddcb5570536ade517322f54f0c23b5402f0b499fb68ab763393e8ab455fb46e7b51055e0d50fd4aebc00c9c054f042bd3053111f8aca01440261651d52a753a9692739866d07877c338e00d6b917ef66a7ee095f3e87ce22e52e06344c9d80663fa87a10db212864a7c7a96e3f3b986c1e751161985558186f1d3632d34719f2fd1d1ab658d0e1e8f07b88d92179b6484371d78982fc82020302ca7fe436dd06d1265ccd937854d22c15b35c71830c7a36c4da4afa7cafc20ed210b6c9c68c2532a69cdeadbec68438febc2abca5a0dee5d9fac1977b5de378454461d9e922068d2f394fa6343d3a537c24e61f5817eac6fd5f373bf00d73bb049cde9bca02639653231affe3d848df0081981df1b4bc115c42643626b31bbfacb27b5dbbcf818f3507d6a25dd5502c82b9468ccab58834e2951c9b9ba2dc0afea5d0449c18f42f6721bd979d25bf5aff85110f0fbc8d24c02dc71c63a99146b17517083fa005d36f8f12069005c871318e0057507a58caaab24538120b1b9384d7f0140ed92999c0bbdd3395dbbb69eaf6d7020e9dbf59d27ad390ee65881814487938cf59e12c4a072f76e363a3291b8d4a68b3c62c29bba0dcc49d9695e786dd0e5e750c7ddb9eecf77559da6d80206541d4905cf02d17eb9b35fde6169a6d4d6fbe",
    "transaction_hash":"0e4d2eecba891334f78ff8f1eb0885af348a9b029e88f873e8eb05021273cb4c",
    "signer_addr":"Q010500f088acc8eca008c7b9a1407076f413996777d12a802e9fd86e7d36f658275c8ae15ca6c2",
    "token":{
      "symbol":"TEST",
      "name":"TEST TOKEN",
      "owner":"Q010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781",
      "decimals":"5",
      "initial_balances":[
        {
          "address":"010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781",
          "amount":"100000"
        },
        {
          "address":"01060091aabafdc9569f4ddec95cbfbc5f10f871187777aabe375f16384dbfd7d3ba6922e566c9",
          "amount":"100000"
        }
      ]
    }
  }
}
```

```python
def relayTokenTxnBySlave(symbol, name, owner, decimals, addresses, amounts, fee, master_address):
  import requests
  import json
  payload = {'symbol': symbol, 'name': name, 'owner': owner, 'decimals': decimals, 'addresses': '['addresses']', 'amounts' '['amounts']' , 'fee' fee, 'master_address' master_address }
  QRLrequest = requests.post("http://127.0.0.1:5359/api/RelayTokenTxnBySlave", json=payload)
  response = QRLrequest.text
  relayTokenTxnBySlaveResp = json.loads(response)
  jsonResponse = relayTokenTxnBySlaveResp
  return(jsonResponse)

relayTokenTxnBySlave(symbol, name, owner, decimals, addresses, amounts, fee, master_address)
```

Creates the signed token transaction using one of the slave and relay it to the network. Master Address must exist into wallet. It may relay a slave transaction if the remaining slave OTS key are less than 100.

**Request**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| symbol | [String](#scalar-string) | Symbol of the token |
| name | [String](#scalar-string) | Name of the token |
| owner | [String](#scalar-string) | QRL Address of the token owner |
| decimals | [UInt64](#scalar-uint64) | Maximum supported decimals |
| addresses | [String](#scalar-string) | List of address to whom initial token will be assigned |
| amounts | [UInt64](#scalar-uint64) | List of amounts of token to be assigned to addresses. Must be in same order as of addresses |
| fee | [UInt64](#scalar-uint64) | Transaction Fee in Shor |
| master\_address | [String](#scalar-string) | QRL address whose slave will be signing the transaction. QRL Address must exist into wallet. |

**Response**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| code | [UInt32](#scalar-uint32) | Error Code. Only appears if any exception is triggered. |
| error | [String](#scalar-string) | Error Message. Only appears if any exception is triggered. |
| tx  | [Transaction](#scalar-transaction) | Return the transaction that has been relayed to the network. |


## RelayTransferTxnBySlave

> Use to relay a transfer using the slave tree created automatically. This will only work for addresses created with the AddNewAddressWithSlaves call using slave trees, if the address contains no slaves this will fail.

```shell
# RelayTransferTxnBySlave Request

curl -XPOST http://127.0.0.1:5359/api/RelayTransferTxnBySlave -d '
{
  "addresses_to": ["Q01050065b6caa35f315ae595d3a3bd4f619b18905d5354b87ec96d04bb8becaf826904371490cd", "Q0105003a35ea0d30b1dc12ebc27bd75aa8823f97c621c36e5ef6f615050573eb0afb6dda7a2575"],
  "amounts": [1000000000, 10000000000],
  "fee": 1000000000,
  "master_address": "Q010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781"
}'
```

```shell
# RelayTransferTxnBySlave Response

{
  "tx":{
    "master_addr":"Q010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781",
    "fee":"1000000000",
    "public_key":"0105003e5b1733a685fdd5b88759b76ec638f3a621ab59bce5b8ccc32e14369177c6043fde8e602478b5ccdb015fe017eafe284a3a5b5677c17481562f02de4a4cbb33",
    "signature":"000000100fecc31e9a6c8b238f6dc322f0c3a11c4498f800314508d7dd2f570e536456f94dfb1aa3e11e5775b80ea03ef9d0906f607b145d6f9e7e457292561615b064854f0e67efa603845a953579901378f7115471da316f110d1e073ce5e915e5aec23006fabc4f45a5d6db545e685db6e5ea8354c8ae2c570a29ab2282731e22866375d28279cfe43c7ec111a13db2863879019bd96a80df138dbe34543c10944abe66a0fbeb47dad990b9c4ec7168d5ba458efc8d80e3290eaf6ecbd8239bfb1e8f8902f62571b60529ff88d019290c078479c9a11c228b28e9f5271feaeed6562f2f0e06bd0d7cd88bfc798b7024ab13ed135a6077a8b8cc6fcf257fd8d1ff8d57e61cdc72a14cb91e1bf53a07d8e0550fef74d4847dbba802d8fd106e34253e7de4cf94567e60444caebedb057a1dc90710cbaeff6b48374611150292021d726c6052b0aa15697b513ef8aaf4cadc0f159f04ca4fc8abe806fa57dddb95ce24ce02fb53e50e8b6d348c6ca9b520a4557a9c0a5c1d59256194e911ba408ee46ab0bd30b75b3a9b78ffc0d8cf5370f250c59f2686a23c6b0e0eb0a336f8f5aac23d5de846e3d7474a4126bd9d9878044ee764cf6e96821e72c230d744a8b070509ab63171d28dcf13ea657c3903e25bf66d6544f53c74ccb872f3d8cc51fd118f97b89df6837f969a7b3ec1d8bff327d57334f8e42be1ec94c6ad53df97888777b84ad7c2a302bec98b3b861be46df27c07aeee240666ef001cf512c0277dbcbd9f353882e1b0c4a811aae12379dc3fe99b125a0501bd08f5d7f24a9e8995a9b385567ef291b44ed7980602c5d551e1739783bddf109355b8a036cb15964946a5ae94e1d5f04587d0398c10e1bcc4e7a7f3ba7680d00b87d2897724bbe40fe6a74b1bad35eb11699b4821011a2250132ac7cc112e7df770d336783804ae669a5979a0da784ed6fd82998f59862fdbd85dee8b66b4a6c7d154505159282355afed6155a9270d6954ae719f746fb062620ebef8fd27760a7d8ca88e958faed4f9c0a33b1040c87d5bf0f2fd0003a79383b8777eb19fe836f8b3ae548041cd2ee1537baa8ac5ef0e479952c92538ad1a5a5c56e8c44d82c2a494a121270a1f2fe2af8cc7b6a9c3e4cc26540d914ddad92521566331b6b66479bf2329f3f4ea1decee1981da8fac4b93f85d6ae5fb1552aed472f877afca90b0ca0cc23e0d84cd13b6adaea60d29ae88c37828dd4614838de0a4cc3f8a8ca9a7cd1717094ab3b9853d4ed7cad491a308d5277a7e2a926d854d6e80f230a4fe086d7b78eeadafe24dc56b46670f0d32f82cc545f4fcbc1dc5782ad7666ae0f16cf74181593e8b3300bbcd73705c3299cc33ff87faa85716c11b559ced652843a5b27a5c75d1e321d29ed2797ce03567c0b83c3d615528b57034e2853356bd8d81fa16f476714d4930c23f62ba6c8ef0f49d9623316c9df2c0eeac35458d69307ca4804406d4575ce969ed1cfd6071a37c7133193b6bc798bd7be51b98f29b20972c6953c24f476a32bca664e8064c2b117c36dcf95694c5eaf1dbd81edc190aea921a98e7bc3bcadb5853323e7b9fd4a7c605edc49cdd84cab22f30cb202cbbd138e5ae9fa49d2494f8da4c59be51cd716006b43623b187afb1f56ff747e4dad08a71c7f9268ce79db92b7f409e1f9ad5f25d5483081f2bc96fcb7142466d7784a65f842e45bb1315032990b848d3ead3fb76a31ee9adfd74f9bb61071f7ea8cf13fa7d88f09aba79cf2c574ea90ad7d37262dac6fcdbd4fcce5adea945639e8be476c0954b1e1f58ca95e1b0e476d73e7dd339a67cac735bb5dbd7c1380529d723a52e159ffcc675932c2c01491033c581a4ba8f9452ce6f99631e5f607d66ddc4f8d5bb18395b343ef65becc72abc77f653eb96dc63b343a0e1b348b35acfd94196e641b05ef523a3adcfb608da04d6cae4e761ae23410fe2dc4bf6279024ca410673f2daaff8ca9eb524d98bf2033052236f0026dc7bef89e00d0471bf21643b7f2a36d3819af2405e8d58a858134435e3cee542c074cce037d81e88417034a399b3b79b913d22a35a2b0242aa33eacce72e754316f316f481098fa3feb54441dba48848a8717062ccc7549fbef2f593e029dabf039e4a82e8168b8d3fbfe7b91cf53e91c230f958320479137165d7308f0e331e3cce2690f5dd12662880672b98c662c92de845d63dd759f648cba3e62f93fb7e1a61f518f8843edcf2b63da60f10ba68f755ad2557a711c7ec0bce9a545001356b076fa20108299a54da1c517ca3063c44a88e82e2ec5c19561f995f5d50e1953dae2788c2c053eb53d38965811917b32e99f4c148659d069a9233eefdac517ca9798e0e8e5ec42604ab522fa2b8614204fd343f7a083a2e528c2ee53a05d664932357196790781744cc912a9b16b80ff773bd2ab47a990d6530cf640b33b4f3281ad6b004092abee5025dcf0996949ebe5ca63159904fe0e9814567a3af1b7113641d2df11dd429d8ed59b21e48dbd1c6f6d38d3100515d5f2d9c4581fb70a62699ff232a06ff63db74c07e69cfb2eeb704764ef5669ecf85b2ad562a124c2d499ed4949326251b42021492b379a6d3f53740533cd19d17d67a7d793999c7f3c1b230f7e330b0cfe9275895afe31bec7b956156bd33c77fa4039a62c915055183ce6c9755b61401bb51e6140614ed4c61beb1594eaa186572e733c9bab1eb063ef8db03ac65aee39f402f7409f09d86775e8f164201e50fa50609394efee73924b658a60265454aecec9eeb8dbce4c4da6c08b2ece79abcb7292f452700897129dc27e3ab7eba17701f6d0317187ced481dc604090a3cc78dba57b009adb56e9b1a3dfd9ae27a9e17fe134d3f9c6d53c15f88dad245e94470eb8d6247b4d2bb76477654b2df925cc29dd85a465f5d768d5cf3ac7574e3c64f276e78f91cc1c9b24cba3ead365933df85a47878a89a210150bd4fd2efb5bbcd65820c8c2dccd2dbe58814c54757126a9b689dd9e0aa540cc2f42017b9d9ad4841996c0ed412c5685b7cd14f07bf86de965c7739b43034e32cbc0d753db916a2a1d4de43a943f5b660597eefe74764af427fca8b0d65f87a56b41d2e9471d8c20ad6cf2a1c9381c9f57754696dc39685609cee743509e34771a2c81ce922068d2f394fa6343d3a537c24e61f5817eac6fd5f373bf00d73bb049cde9bca02639653231affe3d848df0081981df1b4bc115c42643626b31bbfacb27b5dbbcf818f3507d6a25dd5502c82b9468ccab58834e2951c9b9ba2dc0afea5d0449c18f42f6721bd979d25bf5aff85110f0fbc8d24c02dc71c63a99146b17517083fa005d36f8f12069005c871318e0057507a58caaab24538120b1b9384d7f0140ed92999c0bbdd3395dbbb69eaf6d7020e9dbf59d27ad390ee65881814487938cf59e12c4a072f76e363a3291b8d4a68b3c62c29bba0dcc49d9695e786dd0e5e750c7ddb9eecf77559da6d80206541d4905cf02d17eb9b35fde6169a6d4d6fbe",
    "transaction_hash":"cba7da14acff68efa78fe2e890746d052866af3bdad2af2c87e72456173d0e15",
    "signer_addr":"Q010500f088acc8eca008c7b9a1407076f413996777d12a802e9fd86e7d36f658275c8ae15ca6c2",
    "transfer":{
      "addrs_to":[
        "Q01050065b6caa35f315ae595d3a3bd4f619b18905d5354b87ec96d04bb8becaf826904371490cd",
        "Q0105003a35ea0d30b1dc12ebc27bd75aa8823f97c621c36e5ef6f615050573eb0afb6dda7a2575"
      ],
      "amounts":[
        "1000000000",
        "10000000000"
      ]
    }
  }
}
```

```python
def relayTransferTxnBySlave(addresses_to, amounts, fee, master_address,):
  import requests
  import json
  payload = {'addresses_to': '['addresses_to']', 'amounts' '['amounts']' , 'fee' fee, 'master_address' master_address }
  QRLrequest = requests.post("http://127.0.0.1:5359/api/RelayTransferTxnBySlave", json=payload)
  response = QRLrequest.text
  relayTransferTxnBySlaveResp = json.loads(response)
  jsonResponse = relayTransferTxnBySlaveResp
  return(jsonResponse)

relayTransferTxnBySlave('"Q01050065b6caa35f315ae595d3a3bd4f619b18905d5354b87ec96d04bb8becaf826904371490cd", "Q0105003a35ea0d30b1dc12ebc27bd75aa8823f97c621c36e5ef6f615050573eb0afb6dda7a2575"', '1000000000, 10000000000', 1000000000, "Q010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781")  
```


Creates the signed transfer transaction using one of the slaves and relay it to the network. Master Address must exist into wallet. It may relay a slave transaction if the remaining slave OTS key are less than 100. 

**Request**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| addresses\_to | [String](#scalar-string) | List of receiver&#39;s address |
| amounts | [UInt64](#scalar-uint64) | List of amounts in Shor to be received by receiver. Must be in same order as of addresses\_to |
| fee | [UInt64](#scalar-uint64) | Transaction Fee in Shor |
| master\_address | [String](#scalar-string) | QRL address whose slave will be signing the transaction. QRL Address must exist into wallet. |

**Response**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| code | [UInt32](#scalar-uint32) | Error Code. Only appears if any exception is triggered. |
| error | [String](#scalar-string) | Error Message. Only appears if any exception is triggered. |
| tx  | [Transaction](#scalar-transaction) | Return the transaction that has been relayed to the network. |

## RelayTransferTokenTxnBySlave

> This will only work for addresses created with the AddNewAddressWithSlaves call

```shell
# RelayTransferTokenTxnBySlave Request

curl -XPOST http://127.0.0.1:5359/api/RelayTransferTokenTxnBySlave -d '
{
  "addresses_to": ["Q01060091aabafdc9569f4ddec95cbfbc5f10f871187777aabe375f16384dbfd7d3ba6922e566c9"],
  "amounts": [10000],
  "token_txhash": "0e4d2eecba891334f78ff8f1eb0885af348a9b029e88f873e8eb05021273cb4c",
  "fee": 100000,
  "master_address": "Q010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781"
}'
```

```shell
# RelayTransferTokenTxnBySlave Response
{
  "tx":{
    "master_addr":"Q010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781",
    "fee":"100000",
    "public_key":"0105003e5b1733a685fdd5b88759b76ec638f3a621ab59bce5b8ccc32e14369177c6043fde8e602478b5ccdb015fe017eafe284a3a5b5677c17481562f02de4a4cbb33",
    "signature":"00000013a9cb168f6df95f63a80cfc3d585724042150e4ff15aa7446944c7cb6af32f3a04b2c4885c7e81192e2e9165f5694834b68e77db9441a7f8554d22fa2cd0d061daa0540546516b844804e28297ad96e8da1cbb4e02ae2ce6584f4e135e5b5c58515ff56978e0eb4377ad5bc601f303507b509507f678e0b42efae4822984f06e5697d039d3e6b53f43800d179ba2f79133977c92690d2cef39d3e19d996a41e9ad13efe645dbc518797139583b5d1b93f26ca1a9c38762ea8df634a6eb57d2f0778deb97b461333ea6dae2d85e57b82514caea803ab26d255cfced6e72191f3bdffae96f50acd4ab279eeeae0acb020319019558f8f0dddef425750129aff93718872d52c956670b997f3688dee64f044c28754a6aa69f4c8faa1df4224f112bd9924557ca4cb66f62cf33f525d4b96af09b626d2eb16c7867ed73e9107d74ba1de18879324d76b9956049c6b206e2b9c22e31501cdb9324a786ca80e1dabc11f1faa60af2a9c6c0b6e922645d937bb537a497aaa3e23f345056383bf9e215db17355ba15690afd1b244e06fab41617397d1e40cd0e1b15d257d89c164b42e0a0db9f747155cbecdbb2eb1395de33240e9e27f60ca8efbc74ed9688506902d164a19504f263bb6fc5e53ec1b39636567e27b051bbdd374ac3cc13e923cc89f8b585db135029c8b01fa2dde770537bc3be9bb74902e2e9a3c4ec4b28624ebd7c0e291ecd96408d68235e9846106b9ed7c6d1112e7965437d05a2b8f08b75a4d970dd7432ec6d08dfcad722bb976971e498d46cdfb433e6636906c22915cedac7c1460ef65637bfb087d8e2c59e0b9822095010de891360d256edca57ea5bb9a7226750b644165384bf556af6476fe4fa25d984f48525fec4aa36420cbdacfb01b01bc6cf91424e6bccd7a96ea2eb86c5563809c76aafd7a4c57759f0cd50f1dc77c40eba301b221dcf9d92b93d32f6febf3a1a7db318d7b3b01c3e0f3fe216d6f8d329c815b2a2d2d7a97f02fd1d27a0925c3a036ea90b7781247db04b9c6830483823f4ae46c7a1506161c296179cf1db9a822b5246a34c2df1ccc4c61f8c5d23682ba1de2b0de4800f979531b44868a10f79da611fae4267e123083387ef2017f08775bda7de50adf6dae5b247f5b98caf21bad8b3f3fdacbbcc90557e6f049d6c721b29ae233d025369ebdaff5d3eb5aa472110e486bbdb853aaf1f69bc7783cffb8978008962af66df9dd03faf0500a23ebb2dba8e8c73be06dc53a3571ee67eb35dab5e08b6fc51a0fac910a7d9bf4023c79a973ac7a93425ed5c07ecdd0d9858162f9f1197dfa2ad40d6ebf5e0c3779c18eac4ce66568ef2c25a355452332956c4421fc0480bc24dc5804e3c3999ae77d7b2b986b4f081b1b145de88ca05614e383990931166e464dab71e41b2140d5723d3159e34932971e6c0a54f7df4b71ec273e0d7aaf1fdaff8f97c0b4bf6ff5579c42acb5abb0e11b14daf6a6a32a3a3c475d63363115a399bf10e720ba8bf2b76a3becb1fd61163da25148bb8bc25b658984bcef87e48224d6f182537cb98b6ff7af9583893e1888dcd18e32acbee0d4abd3c6863251c0417dd8631fb85a45e07dfb75cd769c8ed97209305a22640599f1c443db22c4c83d1fc86c8a5837e041be78632f7c2c1f65d2e6a2c503dc0287c95b3fac1560ae4814b1f045de06d5284aa1d8d54375d1bd6d23b7094dc9106549040fe84c3f351debb90a78f9f117aea31b63c7b32d46c32bfb5d5b3311ecc1dac8206bc8da74e731497ebad7402805edf6899e8978a29ea59f86688732eccd09cf3332b36446626a99b4f79e627a09986a606be1a21824cb836d03fbd8b63da1ad5426ee6fc6ea03a0e62c5613709ce2b92bef362f577bbe03ced7059bd35735ca5706a49b7e4764c4d357d7b0c3812d5e1d2887514514eb82050d157c41d74d66931bc95d926933f44ec2462ee01d2dea93b72cc9942615668dbb6c02451a68abeab3044713d7e2ed8ad70b3a10356677437b97f71fd8a62afacb249ee331c0446bac9f2dd9993d834dd152470048d10e88484d57c89c1fdc399bfe7f0774fddcf8be00cf7e97e911e46f6ef458f947334662185b22569c9006195ca571748821f637263317027c784f3b11b58adb1f8974fd770ff2b5fb83176707bc734c6987339e01d2ce46b8807daf4c43ebb34b1923bc81a76d26a9e14eea4cc42ca1063520c40851c52ad781b4f0b86bc036f772aaa050ae26b27955751ea45c4111be26b6e73f5b1b393d4a1dc9270e61972c4ac79f2629f1bd333ae624ae707002e5090cc32bc70792a4bcd258e6c0001e66e27de7f3dcaac93ad19d20a35186435dca87f8c1c668fc3c188dc306764d4700f1eaf75d5ca32b3f10e9b1c9b24f4acbaf03e32a16093a748501bb117e4a0948cf2f379bff8127f06f83e6b607d8536e73c32da42d45935e5fb44063f6bbd2d7604d6e46c8a09411d5b123b784a3f4651222207e0b171dd9da79d4dd880ef615785ba553e79d5418aa8833e78cce007897b65447cc6b17075d15a024fb17bc96a3e9616746738908ae570575d514dfd421bfb8280d495af20477ee5a462e8729b99f34019d4cd5262bc9ddaa5cda59987509337d877c94323469d83d7986c0d03ca3e9932ea5fc0a619e1e5d4048661791a49875af87db1399479dafe00fbdbf52a121fc92b0898f65430d3d0f1fd80e26398ac591cbba6daa0dc36ec7303c7e58c0744010b912bb5a26ac32a4966cb2c9487e6e77f8dd7f968a8e596835740cbd73723748aed5e827d870008ae1fbab191fe364bb870371bf2c4fa56cbb108e19273b39a96628059e9aae8eeb89e7a488eb5a89bb052b7fa227088ca13b55e9d51e3a562b5f2dbe0a2643d47fae8313862a69e14979c30ef1c46e5f541ba28e2eaa4455f183a35522ec12b29b2ff227c55b027f7dd48f71211a9a37e833a878aa2576cc660c2768e4207bf6605f45aa5e9fcbd8ce59beb2866cde3a3c8fdb378aca5c870fd1baa1f5848293a88995c9ae08db4e62594a53fb87814ac9f7df1cad2ff599ca80d289b38f8d175baa4e1a5d2cd4b1c0fbdd42fdb60e1263edc1e63dd72f79906e5e72dd8d27cebc68c2532a69cdeadbec68438febc2abca5a0dee5d9fac1977b5de378454461d9e922068d2f394fa6343d3a537c24e61f5817eac6fd5f373bf00d73bb049cde9bca02639653231affe3d848df0081981df1b4bc115c42643626b31bbfacb27b5dbbcf818f3507d6a25dd5502c82b9468ccab58834e2951c9b9ba2dc0afea5d0449c18f42f6721bd979d25bf5aff85110f0fbc8d24c02dc71c63a99146b17517083fa005d36f8f12069005c871318e0057507a58caaab24538120b1b9384d7f0140ed92999c0bbdd3395dbbb69eaf6d7020e9dbf59d27ad390ee65881814487938cf59e12c4a072f76e363a3291b8d4a68b3c62c29bba0dcc49d9695e786dd0e5e750c7ddb9eecf77559da6d80206541d4905cf02d17eb9b35fde6169a6d4d6fbe",
    "transaction_hash":"f5e51dd2a68b09c4bcb414637de4e12e33e6da6376b2b2adeb9117a306697e09",
    "signer_addr":"Q010500f088acc8eca008c7b9a1407076f413996777d12a802e9fd86e7d36f658275c8ae15ca6c2",
    "transfer_token":{
      "token_txhash":"0e4d2eecba891334f78ff8f1eb0885af348a9b029e88f873e8eb05021273cb4c",
      "addrs_to":[
        "Q01060091aabafdc9569f4ddec95cbfbc5f10f871187777aabe375f16384dbfd7d3ba6922e566c9"
      ],
      "amounts":[
        "10000"
      ]
    }
  }
}
```

```python
def relayTransferTokenTxnBySlave(addresses_to, amounts, token_txhash, fee, master_address):
  import requests
  import json
  a = json.dumps(addresses_to)
  am = json.dumps(amounts)
  tt = token_txhash
  f = fee
  w = signer_address
  o = ots_index
  p = {'addresses_to': '['addresses_to']', 'amounts': '['amounts']', 'token_txhash': token_txhash, 'fee': fee, 'master_address': master_address}
  r = requests.post("http://127.0.0.1:5359/api/RelayTransferTokenTxnBySlave", json=p)
  y = r.text
  relayTokenTxResp = json.loads(y)
  resp = relayTokenTxResp
  return(resp)
  pass


relayTransferTokenTxnBySlave("Q01060091aabafdc9569f4ddec95cbfbc5f10f871187777aabe375f16384dbfd7d3ba6922e566c9", "10000", "0e4d2eecba891334f78ff8f1eb0885af348a9b029e88f873e8eb05021273cb4c", 100000, "Q010500aba127bfb010f63334fc772be860a8cfb4706d5d4c91b51d7fe1988bef4ce46db7974781")

```


Creates the signed transfer token transaction using one of the slave and relay it to the network. Master Address must exist into wallet. It may relay a slave transaction if the remaining slave OTS key are less than 100.

**Request**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| token\_txhash | [String](#scalar-string) | Token transaction hash is the transaction hash by which the token has been created. This is used to uniquely identify each created token in QRL network. |
| addresses\_to | [String](#scalar-string) | List of receiver&#39;s address |
| amounts | [UInt64](#scalar-uint64) | List of Amounts to be received by receiver. Must be in same order as of addresses\_to |
| fee | [UInt64](#scalar-uint64) | Transaction Fee in Shor |
| master\_address | [String](#scalar-string) | QRL address whose slave will be signing the transaction. QRL Address must exist into wallet. |

**Response**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| code | [UInt32](#scalar-uint32) | Error Code. Only appears if any exception is triggered. |
| error | [String](#scalar-string) | Error Message. Only appears if any exception is triggered. |
| tx  | [Transaction](#scalar-transaction) | Return the transaction that has been relayed to the network. |

