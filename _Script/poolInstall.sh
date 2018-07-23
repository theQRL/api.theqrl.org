#/bin/bash

echo "Update... This will take awhile"

apt-get update && apt-get upgrade -y >> /tmp/pool.log


# Get QRL installed

 apt-get -y install swig3.0 python3-dev python3-pip build-essential cmake pkg-config libssl-dev libffi-dev libhwloc-dev libboost-dev >> /tmp/pool.log
echo "Install QRL"

pip3 install -U qrl >> /tmp/pool.log

echo "Create QRL service"

# QRL Service

cat <<EOF > /etc/systemd/system/qrl.service
[Unit]
Description=QRL Node
After=network.target

[Service]
Type=simple
WorkingDirectory=/root
ExecStart=/usr/local/bin/start_qrl --quiet
Restart=always 

[Install]
WantedBy=multi-user.target
EOF

cat <<EOF > /etc/systemd/system/qrlProxy.service
[Unit]
Description=QRL gRPC proxy
Requires=After=qrl.service

[Service]
Type=simple
WorkingDirectory=/root
ExecStart=/usr/bin/nohup /usr/local/bin/qrl_grpc_proxy &>> /tmp/qrl_proxy.log
Restart=always 
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=qqrl_gRPC_proxy

[Install]
WantedBy=multi-user.target
EOF

systemctl enable qrl.service >> /tmp/qrlcall.log
systemctl start qrl |tee -a /tmp/qrlcall.log

sleep 2m

qrl state |tee -a /tmp/qrlcall.log


systemctl enable qrlProxy.service >> /tmp/qrlcall.log



systemctl status qrl |tee -a /tmp/qrlcall.log
qrl state |tee -a /tmp/qrlcall.log



# Setup QRL Config.yml

export HOME=/root
systemctl stop qrl |tee -a /tmp/qrlcall.log

cat <<EOF > /root/.qrl/config.yml
mining_api_enabled: True
public_api_enabled: True
EOF

systemctl start qrl |tee -a /tmp/qrlcall.log

# Pool Setup



echo "Install pool dependencies" |tee -a /tmp/pool.log

apt-get -y install jq build-essential net-tools git sudo wget libssl-dev libboost-all-dev redis-server apache2 >> /tmp/pool.log

echo "Get the pool"
git clone https://github.com/cyyber/node-cryptonote-pool.git /root/pool >> /tmp/pool.log

echo "Website config"
cat <<EOF > /root/pool/website_example/config.js
var api = "http://pool.merkletree.us:8117";
var coinUnits = 1000000000;
var poolHost = "pool.merkletree.us";
var irc = "irc.freenode.net/#monero-pools";
var email = "pool@merkletree.us";
var cryptonatorWidget = ["QRL-BTC", "QRL-USD", "QRL-EUR", "QRL-GBP", "QRL-AUD"];
var easyminerDownload = "https://github.com/zone117x/cryptonote-easy-miner/releases/";
var blockchainExplorer = "https://explorer.theqrl.org/block/";
var transactionExplorer = "https://explorer.theqrl.org/tx/";
EOF

echo "Pool Config"

cat <<EOF > /root/pool/config.json
{
    "coin": "MerkleTree QRL",
    "symbol": "QRL",
    "logging": {
        "files": {
  "level": "info",
  "directory": "logs",
  "flushInterval": 5
        },
        "console": {
  "level": "info",
  "colors": true
        }
    },
    "poolServer": {
        "enabled": true,
        "clusterForks": "auto",
        "poolAddress": "I_GET_UPDATED_LATER_IN_THIS_SCRIPT",
        "blockRefreshInterval": 1000,
        "minerTimeout": 900,
        "ports": [
  {
      "port": 3333,
      "difficulty": 100,
      "desc": "Low end hardware"
  },
  {
      "port": 5555,
      "difficulty": 2000,
      "desc": "Mid range hardware"
  },
  {
      "port": 7777,
      "difficulty": 200000,
      "desc": "High end hardware"
  },
  {
      "port": 8888,
      "difficulty": 10000,
      "desc": "Hidden port",
      "hidden": true
  }
        ],
        "varDiff": {
  "minDiff": 2,
  "maxDiff": 100000,
  "targetTime": 100,
  "retargetTime": 30,
  "variancePercent": 30,
  "maxJump": 100
        },
        "shareTrust": {
  "enabled": true,
  "min": 10,
  "stepDown": 3,
  "threshold": 10,
  "penalty": 30
        },
        "banning": {
  "enabled": true,
  "time": 600,
  "invalidPercent": 25,
  "checkThreshold": 30
        },
        "slushMining": {
  "enabled": false,
  "weight": 300,
  "blockTime": 60,
  "lastBlockCheckRate": 1
        }
    },
    "payments": {
        "enabled": true,
        "interval": 600,
        "maxAddresses": 50,
        "mixin": 3,
        "transferFee": 50000000,
        "minPayment": 100000000000,
        "denomination": 100000000000
    },
    "blockUnlocker": {
        "enabled": true,
        "interval": 30,
        "depth": 80,
        "poolFee": 1,
        "devDonation": 0.0,
        "coreDevDonation": 0.0
    },
    "api": {
        "enabled": true,
        "hashrateWindow": 600,
        "updateInterval": 5,
        "port": 8117,
        "blocks": 30,
        "payments": 30,
        "password": "CHanG3ME_BEforeYoUG3tH@cked"
    },
    "daemon": {
        "host": "127.0.0.1",
        "port": 18090
    },
    "wallet": {
        "host": "127.0.0.1",
        "port": 18090
    },
    "redis": {
        "host": "127.0.0.1",
        "port": 6379,
        "auth": null
    }
}
EOF


# Some exports for python to run
export LC_ALL=C.UTF-8
export LANG=C.UTF-8

echo "Create QRL wallet"

# Create QRL wallet and payment_slaves files
cd /root
/usr/local/bin/qrl wallet_add &>> /tmp/qrlcall.log
echo "Generating slaves"
/usr/local/bin/qrl slave_tx_generate --src 0 --master '' --number_of_slaves 100 --access_type 0 --fee 0 --ots_key_index 0 &>> /tmp/qrlcall.log
echo "Done with Slaves!!!"
echo "Move them to the QRL directory"
mv /root/slaves.json ~/.qrl/payment_slaves.json

echo "Get generated wallet address from qrl wallet file and update pool config.json with it"

WALLET_ADDRESS=`cat /root/wallet.json | jq -r '.addresses[0].address'`
TEMP_JQ_CONTENT=$(jq --arg address "$WALLET_ADDRESS" '.poolServer.poolAddress = "\($address)"' < /root/pool/config.json) 
[[ $? == 0 ]] && echo "$TEMP_JQ_CONTENT" >| /root/pool/config.json

echo "start qrl_grpc_proxy"
systemctl start qrlProxy |tee -a /tmp/qrlcall.log
systemctl status qrlProxy |tee -a /tmp/qrlcall.log


echo "Install pool dependencies"
export NVM_DIR=/usr/local/nvm
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
export NODE_VERSION=0.10.29
/bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION" >> /tmp/pool.log
/bin/bash -c "source $NVM_DIR/nvm.sh && npm config set strict-ssl false" >> /tmp/pool.log
/bin/bash -c "source $NVM_DIR/nvm.sh && cd /root/pool && npm install -g npm@1.3.10 && npm update" >> /tmp/pool.log

echo "Copy website to apache directory"
yes | cp -r /root/pool/website_example/* /var/www/html/

echo "Start QRL Node, gRPC Proxy and Pool"
#screen -S qrlnode -d -m start_qrl
qrl state systemctl |tee -a /tmp/qrlcall.log

ps aux |grep grpc |tee -a /tmp/qrlcall.log
#sleep 20
#screen -S grpc_proxy -d -m qrl_grpc_proxy
#sleep 5
screen -S pool -d -m /bin/bash -c "source $NVM_DIR/nvm.sh && cd /root/pool && node /root/pool/init.js"