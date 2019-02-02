# Explorer API 

The QRL block explorer has been built with an API endpoint to enable an easy way for developers to grab data from the QRL blockchain. This endpoint is limited in scope and may change in future iterations of the explorer.


```
# Default response is in JSON format
# Append /text to the end of any request to get plain text response

https://explorer.theqrl.org/api/{REQUEST}/text
```

<aside class="success">
The Explore endpoint is reached at <a href="https://explorer.theqrl.org/">explorer.theQRL.org</a>. The API response can be either text or json depending on the developers needs. By default JSON is returned, simply append /text to the API query. Far an easy to read output use a browser add-on like Chrome's <a href="https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc">jsonview</a> and browse to the endpoint.
</aside>


## Explorer API Methods

| Method Name | Endpoint | Description | 
| ----------- | ------------ | ------------- | 
| [Block\#](#block_by_number) |  |  |
| [Emission](#emission) | [/api/emission](https://explorer.theqrl.org/api/emission) | Get the total emission of coins to date  |
| [reward](#reward) | [/api/reward](https://explorer.theqrl.org/api/reward) | Get the current payout reward value |
| [rewardshor](#rewardshor) | [/api/rewardshor](https://explorer.theqrl.org/api/rewardshor) | Get the current reward in shor |
| [blockheight](#blockheight) | [/api/blockheight](https://explorer.theqrl.org/api/blockheight) | Get the current blockheight |
| status | [/api/status](https://explorer.theqrl.org/api/status) | Get the status of the network |


## Emission

```shell
# Request

curl -XGET https://explorer.theqrl.org/api/emission

# Response

{
	"found":true,
	"emission":67071768.975257985
}
```

```python
def getEmission():
  import requests
  import json
  request = requests.get("https://explorer.theqrl.org/api/emission")
  response = request.text
  getEmissionResp = json.loads(response)
  jsonResponse = getEmissionResp
  return(jsonResponse)


getEmission()

# Response

{
   'emission': 67071775.286846995, 
   'found': True
}

```

Get the total QRL emission to date.


## Block By Number


Get block details by number. 

## reward

```shell
# Request

curl -XGET https://explorer.theqrl.org/api/reward

# Response

{
	"found":true,
	"reward":6.311586903
}

```

```python
def getReward():
  import requests
  import json
  request = requests.get("https://explorer.theqrl.org/api/reward")
  response = request.text
  getRewardResp = json.loads(response)
  jsonResponse = getRewardResp
  return(jsonResponse)


getReward()

# Response

{
	'reward': 6.311586903, 
	'found': True
}

```

Get the current reward amount.

## rewardshor

```shell
# Request

curl -XGET https://explorer.theqrl.org/api/rewardshor

# Response

{
	"found":true,
	"reward":6311582702
}

```

```python
def getRewardShor():
  import requests
  import json
  request = requests.get("https://explorer.theqrl.org/api/rewardshor")
  response = request.text
  getRewardShorResp = json.loads(response)
  jsonResponse = getRewardShorResp
  return(jsonResponse)


getRewardShor()

# Response

{
   'reward': 6311582702, 
   'found': True
}


```

Get the current reward amount in shor.

## blockheight

```shell
# Request

curl -XGET https://explorer.theqrl.org/api/blockheight

# Response

{
	"found":true,
	"blockheight":319606
}

```

```python
def getBlockheight():
  import requests
  import json
  request = requests.get("https://explorer.theqrl.org/api/blockheight")
  response = request.text
  getBlockheightResp = json.loads(response)
  jsonResponse = getBlockheightResp
  return(jsonResponse)


getBlockheight()

# Response

{
   'blockheight': 319608, 
   'found': True
}

```

Get the current Blockheight.


## status

```shell
# Request

curl -XGET https://explorer.theqrl.org/api/status

# Response

{
	"_id":"r7h7u3ynXc4XPHngw",
	"node_info":
	{
		"version":"1.1.11 python",
		"state":"SYNCED",
		"num_connections":33,
		"num_known_peers":22645,
		"uptime":"1765885",
		"block_height":"319612",
		"block_last_hash":
		{
			"0":239,
			"1":173,
			"2":170,
			"3":80,
			"4":71,
			"5":106,
			"6":233,
			"7":132,
			"8":53,
			"9":240,
			"10":179,
      "11":60,
      "12":30,
      "13":139,
      "14":70,
      "15":140,
      "16":84,
      "17":108,
      "18":204,
      "19":169,
      "20":109,
      "21":244,
      "22":245,
      "23":191,
      "24":39,
      "25":108,
      "26":74,
      "27":179,
      "28":0,
      "29":0,
      "30":0,
      "31":0
    },
    "network_id":"The sleeper must awaken"
  },
  "epoch":"3196",
  "uptime_network":"19019880",
  "block_last_reward":"6311574300",
  "block_time_mean":"60",
  "block_time_sd":"51",
  "coins_total_supply":"105000000",
  "coins_emitted":"67071863648982756",
  "block_timeseries":
  [{
    "number":"318173",
    "difficulty":"2335047113",
    "timestamp":"1548947468",
    "time_last":"142",
    "time_movavg":"52",
    "hash_power":2694285056,
    "header_hash":
    {
      "0":201,
      "1":37,
      "2":128,
      "3":206,
      "4":234,
      "5":73,
      "6":50,
      "7":197,
      "8":19,
      "9":245,
      "10":1,
      "11":247,
      "12":106,
      "13":57,
      "14":73,
      "15":3,
      "16":144,
      "17":180,
      "18":250,
      "19":62,
      "20":173,
      "21":165,
      "22":222,
      "23":218,
      "24":239,
      "25":75,
      "26":30,
      "27":184,
      "28":1,
      "29":0,
      "30":0,
      "31":0
    },

# Truncated Response for clarity

  }]
}

```

```python
def getStatus():
  import requests
  import json
  request = requests.get("https://explorer.theqrl.org/api/status")
  response = request.text
  getStatusResp = json.loads(response)
  jsonResponse = getStatusResp
  #return(jsonResponse)
  return(json.dumps(jsonResponse, indent=4, sort_keys=True))


getStatus()

# Response

{
    "_id": "MHE7CqGAGyQ56ZjMo",
    "block_last_reward": "6311004012",
    "block_time_mean": "60",
    "block_time_sd": "54",
    "block_timeseries": [
        {
            "difficulty": "2502531160",
            "hash_power": 2502531072,
            "header_hash": {
                "0": 230,
                "1": 205,
                "10": 179,
                "11": 244,
                "12": 53,
                "13": 255,
                "14": 225,
                "15": 99,
                "16": 98,
                "17": 58,
                "18": 96,
                "19": 99,
                "2": 30,
                "20": 15,
                "21": 183,
                "22": 7,
                "23": 101,
                "24": 79,
                "25": 64,
                "26": 75,
                "27": 177,
                "28": 0,
                "29": 0,
                "3": 63,
                "30": 0,
                "31": 0,
                "4": 101,
                "5": 136,
                "6": 146,
                "7": 224,
                "8": 222,
                "9": 151
            },
            "header_hash_prev": {
                "0": 113,
                "1": 138,
                "10": 167,
                "11": 119,
                "12": 119,
                "13": 104,
                "14": 165,
                "15": 63,
                "16": 128,
                "17": 91,
                "18": 122,
                "19": 146,
                "2": 90,
                "20": 191,
                "21": 249,
                "22": 227,
                "23": 227,
                "24": 63,
                "25": 196,
                "26": 72,
                "27": 86,
                "28": 0,
                "29": 0,
                "3": 7,
                "30": 0,
                "31": 0,
                "4": 233,
                "5": 221,
                "6": 60,
                "7": 154,
                "8": 137,
                "9": 63
            },
            "number": "318716",
            "time_last": "96",
            "time_movavg": "60",
            "timestamp": "1548979234"
        },

# ~ Truncated for clarity ~
        
        {
            "difficulty": "2336533837",
            "hash_power": 2031768576,
            "header_hash": {
                "0": 54,
                "1": 201,
                "10": 249,
                "11": 239,
                "12": 246,
                "13": 144,
                "14": 132,
                "15": 98,
                "16": 136,
                "17": 84,
                "18": 217,
                "19": 222,
                "2": 251,
                "20": 51,
                "21": 138,
                "22": 235,
                "23": 92,
                "24": 220,
                "25": 101,
                "26": 231,
                "27": 210,
                "28": 0,
                "29": 0,
                "3": 50,
                "30": 0,
                "31": 0,
                "4": 25,
                "5": 231,
                "6": 101,
                "7": 13,
                "8": 210,
                "9": 215
            },
            "header_hash_prev": {
                "0": 108,
                "1": 70,
                "10": 9,
                "11": 182,
                "12": 151,
                "13": 91,
                "14": 4,
                "15": 134,
                "16": 118,
                "17": 191,
                "18": 191,
                "19": 6,
                "2": 227,
                "20": 116,
                "21": 243,
                "22": 156,
                "23": 0,
                "24": 107,
                "25": 103,
                "26": 223,
                "27": 182,
                "28": 1,
                "29": 0,
                "3": 171,
                "30": 0,
                "31": 0,
                "4": 45,
                "5": 72,
                "6": 250,
                "7": 133,
                "8": 37,
                "9": 67
            },
            "number": "320155",
            "time_last": "325",
            "time_movavg": "69",
            "timestamp": "1549066690"
        }
    ],
    "coins_emitted": "67075290678706676",
    "coins_total_supply": "105000000",
    "epoch": "3201",
    "node_info": {
        "block_height": "320155",
        "block_last_hash": {
            "0": 54,
            "1": 201,
            "10": 249,
            "11": 239,
            "12": 246,
            "13": 144,
            "14": 132,
            "15": 98,
            "16": 136,
            "17": 84,
            "18": 217,
            "19": 222,
            "2": 251,
            "20": 51,
            "21": 138,
            "22": 235,
            "23": 92,
            "24": 220,
            "25": 101,
            "26": 231,
            "27": 210,
            "28": 0,
            "29": 0,
            "3": 50,
            "30": 0,
            "31": 0,
            "4": 25,
            "5": 231,
            "6": 101,
            "7": 13,
            "8": 210,
            "9": 215
        },
        "network_id": "The sleeper must awaken",
        "num_connections": 33,
        "num_known_peers": 22649,
        "state": "SYNCED",
        "uptime": "1798331",
        "version": "1.1.11 python"
    },
    "uptime_network": "19052326"
}
```

Get status of the blockchain including node details.



