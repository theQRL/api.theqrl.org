
let grpc = require('grpc');
let temp = require('temp').track();
let fs = require("fs-extra");
let qrllib = require('./node_modules/qrllib/build/libjsqrl.js');
var assert = require('assert');
var expect = require('chai').expect

async function fetchRemoteProto(nodeAddr) {
    let protoDescriptor = grpc.load('qrlbase.proto');
    let client = new protoDescriptor.qrl.Base(nodeAddr, grpc.credentials.createInsecure());

    return new Promise( (resolve) => {
        client.getNodeInfo({}, function (err, nodeInfo) {
            if (err) {
                throw err;
            }
            let requiredFile = '/tmp/google/protobuf/timestamp.proto';
            if (!fs.existsSync(requiredFile))
            {
                fs.ensureDirSync('/tmp/google/protobuf');
                fs.copySync('timestamp.proto', requiredFile, { overwrite : true });
            }
            temp.open('proto', (err, info) => {
                if (!err) {
                    fs.write(info.fd, nodeInfo.grpcProto);
                    fs.close(info.fd, function () {
                        let remoteProtoDescriptor = grpc.load(info.path);
                        resolve(remoteProtoDescriptor);
                    });
                }
            });
        });
    });
}

async function getQRLClient(nodeAddr) {
    return new Promise(resolve => {
        const remoteProto = fetchRemoteProto(nodeAddr);
        remoteProto.then(function (remoteProto) {
            let client = new remoteProto.qrl.PublicAPI(nodeAddr, grpc.credentials.createInsecure());
            resolve(client);
        });
    });
}

// StringToBytes from QRLLIB
stringToBytes = (convertMe) => {
  // Convert String to Binary First
  const thisBinary = qrllib.hstr2bin(convertMe)
  // Now convert to Bytes
  return binaryToBytes(thisBinary)
}

// Convert Binary object to Bytes
binaryToBytes = (convertMe) => {
  // Convert Binary to Bytes
  const thisBytes = new Uint8Array(convertMe.size())
  for (let i = 0; i < convertMe.size(); i += 1) {
    thisBytes[i] = convertMe.get(i)
  }
  return thisBytes
}


function toBuffer(ab) {
  const buffer = Buffer.from(ab)
  return buffer
}

// Connecting to the API
// TODO: The IP should change to something running locally for tests_old
// let qrlClient = getQRLClient('104.251.219.215:9009');
let qrlClient = getQRLClient('127.0.0.1:10002');
// let qrlClient = getQRLClient('127.0.0.1:9009');


// Concatenates multiple typed arrays into one.
concatenateTypedArrays = (resultConstructor, ...arrays) => {
    let totalLength = 0
    for (let arr of arrays) {
      totalLength += arr.length
    }
    let result = new resultConstructor(totalLength)
    let offset = 0
    for (let arr of arrays) {
      result.set(arr, offset)
      offset += arr.length
    }
    return result
}


// Take input and convert to unsigned uint64 bigendian bytes
toBigendianUint64BytesUnsigned = (input) => {
  if(!Number.isInteger(input)) {
    input = parseInt(input)
  }

  const byteArray = [0, 0, 0, 0, 0, 0, 0, 0]

  for ( let index = 0; index < byteArray.length; index ++ ) {
    const byte = input & 0xff
    byteArray[index] = byte
    input = (input - byte) / 256
  }

  byteArray.reverse()

  const result = new Uint8Array(byteArray)
  return result
}




// initiating the test wallets to use
var testfromaddress = '01050058bb3f8cb66fd90d0347478e5bdf3a475e82cfc5fe5dc276500ca21531e6edaf3d2d0f7e'
var testfromxmsspk = '0105007e41c011a706c8edd8d1a2f18d558d14311917cd549b3edae07775b12d6640ef35ea0d4dd47fc36e2bc6d5aa5f6ef7582fcf6b8a564ea0ff3af3b42af05cbac9'
var testtoaddress = '0105003e32fcbcdcaf09485272f1aa1c1e318daaa8cf7cd03bacf7cfceeddf936bb88efe1e4d21'
var testfromaddress_bytes = stringToBytes(testfromaddress);
var testfromxmsspk_bytes = stringToBytes(testfromxmsspk);
var testtoaddress_bytes = stringToBytes(testtoaddress);


// Test for GetNodeState
describe('GetNodeState', function() {
    let response;
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.getNodeState({}, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    response = res;
                    resolve();
                });
            });
        });
    });
    it('GetNodeStateResp has NodeInfo *info* property', function(){
        expect(response).to.have.property('info');
    });
    it('GetNodeStateResp.info has correct *state* property', function(){
        expect(response.info).to.have.property('state');
        expect(response.info.state).to.be.a('string');
        expect(response.info.state).to.be.oneOf(['UNKNOWN', 'UNSYNCED', 'SYNCING', 'SYNCED', 'FORKED']);
    });
    it('GetNodeStateResp.info has correct *version* property', function(){
        expect(response.info).to.have.property('version');
        expect(response.info.version).to.be.a('string');
    });
    it('GetNodeStateResp.info has correct *num_connections* property', function(){
        expect(response.info).to.have.property('num_connections');
        expect(response.info.num_connections).to.be.a('number');
        expect(response.info.num_connections).to.be.below(4294967297); // uint32
    });
    it('GetNodeStateResp.info has correct *num_known_peers* property', function(){
        expect(response.info).to.have.property('num_known_peers');
        expect(response.info.num_known_peers).to.be.a('number');
        expect(response.info.num_known_peers).to.be.below(4294967297); // uint32
    });
    it('GetNodeStateResp.info has correct *uptime* property', function(){
        expect(response.info).to.have.property('uptime');
        expect(response.info.uptime).to.be.a('string');
        expect(parseInt(response.info.uptime)).to.be.a('number');
        expect(parseInt(response.info.uptime)).to.be.below(18446744073709551617); // uint64
    });
    it('GetNodeStateResp.info has correct *block_height* property', function(){
        expect(response.info).to.have.property('block_height');
        expect(response.info.block_height).to.be.a('string');
        expect(parseInt(response.info.block_height)).to.be.a('number');
        expect(parseInt(response.info.block_height)).to.be.below(18446744073709551617); // uint64
    });
    it('GetNodeStateResp.info has correct *block_last_hash* property', function(){
        expect(response.info).to.have.property('block_last_hash');
        expect(typeof(response.info.block_last_hash)).to.equal('object');
        expect(Buffer.isBuffer(response.info.block_last_hash)).to.equal(true);
    });
    it('GetNodeStateResp.info has correct *network_id* property', function(){
        expect(response.info).to.have.property('network_id');
        expect(response.info.network_id).to.be.a('string');
    });
});


// Test for getKnownPeers
// describe('GetKnownPeers', function() {
//     let response;
//     // call API
//     before(function() {
//         return new Promise((resolve) => {
//             qrlClient.then( function (qrlClient) {
//                 qrlClient.GetKnownPeers({}, (err, res) => {
//                     if (err){
//                         console.log("Error: ", err.message);
//                         return;
//                     }
//                     console.log(res)
//                     response = res;
//                     resolve();
//                 });
//             });
//         });
//     });
//
//     it('GetAddressStateResp has AddressState state property', function(){
//         expect(response).to.have.property('state');
//     });
// });



// Test for getStats
describe('GetStats', function() {
    let response;
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.getStats({include_timeseries: true}, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    response = res;
                    console.log(response)
                    resolve();
                });
            });
        });
    });
    it('GetStatsResp has NodeInfo *node_info* property', function(){
        expect(response).to.have.property('node_info');
    });
    it('GetStatsResp.node_info has correct *version* property', function(){
        expect(response.node_info).to.have.property('version');
        expect(response.node_info.version).to.be.a('string');
    });
    it('GetStatsResp.node_info has correct *state* property', function(){
        expect(response.node_info).to.have.property('state');
        expect(response.node_info.state).to.be.a('string');
        expect(response.node_info.state).to.be.oneOf(['UNKNOWN', 'UNSYNCED', 'SYNCING', 'SYNCED', 'FORKED']);
    });
    it('GetStatsResp.node_info has correct *num_connections* property', function(){
        expect(response.node_info).to.have.property('num_connections');
        expect(response.node_info.num_connections).to.be.a('number');
        expect(response.node_info.num_connections).to.be.a('number');
        expect(response.node_info.num_connections).to.be.below(4294967297); // uint32
    });
    it('GetStatsResp.node_info has correct *num_known_peers* property', function(){
        expect(response.node_info).to.have.property('num_known_peers');
        expect(response.node_info.num_known_peers).to.be.a('number');
        expect(response.node_info.num_known_peers).to.be.a('number');
        expect(response.node_info.num_known_peers).to.be.below(4294967297); // uint32
    });
    it('GetStatsResp.node_info has correct *uptime* property', function(){
        expect(response.node_info).to.have.property('uptime');
        expect(response.node_info.uptime).to.be.a('string');
        expect(parseInt(response.node_info.uptime)).to.be.a('number');
        expect(parseInt(response.node_info.uptime)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp.node_info has correct *block_height* property', function(){
        expect(response.node_info).to.have.property('block_height');
        expect(response.node_info.block_height).to.be.a('string');
        expect(parseInt(response.node_info.block_height)).to.be.a('number');
        expect(parseInt(response.node_info.block_height)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp.node_info has correct *block_last_hash* property', function(){
        expect(response.node_info).to.have.property('block_last_hash');
        expect(typeof(response.node_info.block_last_hash)).to.equal('object');
        expect(Buffer.isBuffer(response.node_info.block_last_hash)).to.equal(true);
    });
    it('GetStatsResp.node_info has correct *network_id* property', function(){
        expect(response.node_info).to.have.property('network_id');
        expect(response.node_info.network_id).to.be.a('string');
    });
    it('GetStatsResp has correct *epoch* property', function(){
        expect(response).to.have.property('epoch');
        expect(response.epoch).to.be.a('string');
        expect(parseInt(response.epoch)).to.be.a('number');
        expect(parseInt(response.epoch)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp has correct *uptime_network* property', function(){
        expect(response).to.have.property('uptime_network');
        expect(response.uptime_network).to.be.a('string');
        expect(parseInt(response.uptime_network)).to.be.a('number');
        expect(parseInt(response.uptime_network)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp has correct *block_last_reward* property', function(){
        expect(response).to.have.property('block_last_reward');
        expect(response.block_last_reward).to.be.a('string');
        expect(parseInt(response.block_last_reward)).to.be.a('number');
        expect(parseInt(response.block_last_reward)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp has correct *block_time_mean* property', function(){
        expect(response).to.have.property('block_time_mean');
        expect(response.block_time_mean).to.be.a('string');
        expect(parseInt(response.block_time_mean)).to.be.a('number');
        expect(parseInt(response.block_time_mean)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp has correct *block_time_sd* property', function(){
        expect(response).to.have.property('block_time_sd');
        expect(response.block_time_sd).to.be.a('string');
        expect(parseInt(response.block_time_sd)).to.be.a('number');
        expect(parseInt(response.block_time_sd)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp has correct *coins_total_supply* property', function(){
        expect(response).to.have.property('coins_total_supply');
        expect(response.coins_total_supply).to.be.a('string');
        expect(parseInt(response.coins_total_supply)).to.be.a('number');
        expect(parseInt(response.coins_total_supply)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp has correct *coins_emitted* property', function(){
        expect(response).to.have.property('coins_emitted');
        expect(response.coins_emitted).to.be.a('string');
        expect(parseInt(response.coins_emitted)).to.be.a('number');
        expect(parseInt(response.coins_emitted)).to.be.below(18446744073709551617); // uint64
    });
    it('GetStatsResp has correct *block_timeseries* property', function(){
        expect(response).to.have.property('block_timeseries');
        expect(typeof(response.block_timeseries)).to.equal('object');
        response.block_timeseries.forEach(i => expect(i).to.have.all.keys(['number','difficulty','timestamp','time_last','time_movavg','hash_power','header_hash','header_hash_prev']));
        // Difficulty should be a number
        response.block_timeseries.forEach(i => expect(i.difficulty).to.be.a('string'));
    });
    it('GetStatsResp has correct *block_timeseries.number* property: is a uint64', function(){
        response.block_timeseries.forEach(i => expect(i.number).to.be.a('string'));
        response.block_timeseries.forEach(i => expect(parseInt(i.number)).to.be.a('number'));
        response.block_timeseries.forEach(i => expect(parseInt(i.number)).to.be.below(18446744073709551617));
    });
    it('GetStatsResp has correct *block_timeseries.timestamp* property: is a uint64', function(){
        response.block_timeseries.forEach(i => expect(i.timestamp).to.be.a('string'));
        response.block_timeseries.forEach(i => expect(parseInt(i.timestamp)).to.be.a('number'));
        response.block_timeseries.forEach(i => expect(parseInt(i.timestamp)).to.be.below(18446744073709551617));
    });
    it('GetStatsResp has correct *block_timeseries.time_last* property: is a uint64', function(){
        response.block_timeseries.forEach(i => expect(i.time_last).to.be.a('string'));
        response.block_timeseries.forEach(i => expect(parseInt(i.time_last)).to.be.a('number'));
        response.block_timeseries.forEach(i => expect(parseInt(i.time_last)).to.be.below(18446744073709551617));
    });
    it('GetStatsResp has correct *block_timeseries.time_movavg* property: is a uint64', function(){
        response.block_timeseries.forEach(i => expect(i.time_movavg).to.be.a('string'));
        response.block_timeseries.forEach(i => expect(parseInt(i.time_movavg)).to.be.a('number'));
        response.block_timeseries.forEach(i => expect(parseInt(i.time_movavg)).to.be.below(18446744073709551617));
    });
    it('GetStatsResp has correct *block_timeseries.hash_power* property: is a number', function(){
        response.block_timeseries.forEach(i => expect(i.hash_power).to.be.a('number'));
        response.block_timeseries.forEach(i => expect(parseFloat(i.hash_power)).to.be.a('number'));
    });
    it('GetStatsResp has correct *block_timeseries.header_hash* property: is a Buffer composed of 32 octets', function(){
        response.block_timeseries.forEach(i => expect(Buffer.isBuffer(i.header_hash)).to.equal(true));
        response.block_timeseries.forEach(i => expect(i.header_hash.length).to.equal(32));
    });
    it('GetStatsResp has correct *block_timeseries.header_hash_prev* property: is a Buffer composed of 32 octets', function(){
        response.block_timeseries.forEach(i => expect(Buffer.isBuffer(i.header_hash_prev)).to.equal(true));
        response.block_timeseries.forEach(i => expect(i).to.satisfy(function(x){ return x.header_hash_prev.length === 32 || x.number === '0' }));
    });
});



// Test for GetObject for AddressState
describe('GetObject - AddressState', function() {
    // example wallet address
    let response;
    // testaddress = stringToBytes('01050048a8b31d8dda8a25c5c0d02994fe87e54032ba67910657ade9114d0cdff2eeb5f6285446');
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.getObject({query : testfromaddress_bytes }, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    response = res;
                    resolve();
                });
            });
        });
    });
    it('GetObjectResp has correct *result* property', function(){
        expect(response).to.have.property('result');
        expect(response.result).to.be.a('string');
        expect(response.result).to.equal('address_state');
    });
    it('GetObjectResp has correct *found* property', function(){
        expect(response).to.have.property('found');
        expect(response.found).to.equal(true);
    });
    it('GetObjectResp has correct *transaction* property', function(){
        expect(response).to.have.property('transaction');
        expect(response.transaction).to.equal(null);
    });
    it('GetObjectResp has correct *block_extended* property', function(){
        expect(response).to.have.property('block_extended');
        expect(response.block_extended).to.equal(null);
    });
    it('GetObjectResp has correct *address_state* property', function(){
        expect(response).to.have.property('address_state');
        expect(response.address_state).to.have.all.keys(['address','balance','nonce','ots_bitfield','transaction_hashes','tokens','latticePK_list','slave_pks_access_type','ots_counter']);
    });
    it('GetObjectResp has correct *AdressState.address* property', function(){
        expect(Buffer.isBuffer(response.address_state.address)).to.equal(true);
        expect(response.address_state.address.length).to.equal(39);
        // check the first three octets values are correct
    });
    it('GetObjectResp has correct *AdressState.balance* property', function(){
        expect(response.address_state.balance).to.be.a('string');
        expect(parseInt(response.address_state.balance)).to.be.a('number');
        expect(parseInt(response.address_state.balance)).to.be.below(18446744073709551617); // uint64
        expect(parseInt(response.address_state.balance)).to.be.at.least(1000); // uint64
    });
    it('GetObjectResp has correct *AdressState.nonce* property', function(){
        expect(response.address_state.nonce).to.be.a('string');
        expect(parseInt(response.address_state.nonce)).to.be.a('number');
        expect(parseInt(response.address_state.nonce)).to.be.below(18446744073709551617); // uint64
    });
    it('GetObjectResp has correct *AdressState.ots_counter* property', function(){
        expect(response.address_state.ots_counter).to.be.a('string');
        expect(parseInt(response.address_state.ots_counter)).to.be.a('number');
        expect(parseInt(response.address_state.ots_counter)).to.be.below(18446744073709551617); // uint64
    });
    it('GetObjectResp has correct *AdressState.ots_bitfield* property', function(){
        response.address_state.ots_bitfield.forEach(i => expect(Buffer.isBuffer(i)).to.equal(true));
        response.address_state.ots_bitfield.forEach(i => expect(i.length).to.equal(1));
    });
    it('GetObjectResp has correct *AdressState.transaction_hashes* property', function(){
        response.address_state.transaction_hashes.forEach(i => expect(Buffer.isBuffer(i)).to.equal(true));
        response.address_state.transaction_hashes.forEach(i => expect(i.length).to.equal(32));
    });

});


// Test for GetObject for TransactionExtended
describe('GetObject - TransactionExtended', function() {
    // example wallet address
    let response;
    testtx = stringToBytes('010600e62ec20b7397949a132f7e6efa80ba3fe1e94af646e50035f1db1a5985734fff11284143');
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.getObject({query : testtx }, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    response = res;
                    resolve();
                });
            });
        });
    });

    it('GetObjectResp has correct *result* property', function(){
        expect(response).to.have.property('result');
        expect(response.result).to.equal('address_state');
    });
    it('GetObjectResp has correct *found* property', function(){
        expect(response).to.have.property('found');
        expect(response.found).to.equal(true);
    });
    it('GetObjectResp has correct *transaction* property', function(){
        expect(response).to.have.property('transaction');
        expect(response.transaction).to.equal(null);
    });
    it('GetObjectResp has correct *block_extended* property', function(){
        expect(response).to.have.property('block_extended');
        expect(response.block_extended).to.equal(null);
    });
    it('GetObjectResp has correct *address_state* property', function(){
        expect(response).to.have.property('address_state');
        expect(response.address_state).to.have.all.keys(['address','balance','nonce','ots_bitfield','transaction_hashes','tokens','latticePK_list','slave_pks_access_type','ots_counter']);
    });
    it('GetObjectResp has correct *AdressState.address* property', function(){
        expect(Buffer.isBuffer(response.address_state.address)).to.equal(true);
        expect(response.address_state.address.length).to.equal(39);
        // check the first three octets values are correct
    });
    it('GetObjectResp has correct *AdressState.balance* property', function(){
        expect(response.address_state.balance).to.be.a('string');
        expect(parseInt(response.address_state.balance)).to.be.a('number');
        expect(parseInt(response.address_state.balance)).to.be.below(18446744073709551617); // uint64
    });
    it('GetObjectResp has correct *AdressState.nonce* property', function(){
        expect(response.address_state.nonce).to.be.a('string');
        expect(parseInt(response.address_state.nonce)).to.be.a('number');
        expect(parseInt(response.address_state.nonce)).to.be.below(18446744073709551617); // uint64
    });
    it('GetObjectResp has correct *AdressState.ots_counter* property', function(){
        expect(response.address_state.ots_counter).to.be.a('string');
        expect(parseInt(response.address_state.ots_counter)).to.be.a('number');
        expect(parseInt(response.address_state.ots_counter)).to.be.below(18446744073709551617); // uint64
    });
    it('GetObjectResp has correct *AdressState.ots_bitfield* property', function(){
        response.address_state.ots_bitfield.forEach(i => expect(Buffer.isBuffer(i)).to.equal(true));
        response.address_state.ots_bitfield.forEach(i => expect(i.length).to.equal(1));
    });
    it('GetObjectResp has correct *AdressState.transaction_hashes* property', function(){
        response.address_state.transaction_hashes.forEach(i => expect(Buffer.isBuffer(i)).to.equal(true));
        response.address_state.transaction_hashes.forEach(i => expect(i.length).to.equal(32));
    });
});


// Test for GetAddressState
describe('GetAddressState', function() {
    // example wallet address
    testaddress = stringToBytes('01050048a8b31d8dda8a25c5c0d02994fe87e54032ba67910657ade9114d0cdff2eeb5f6285446');
    let response;
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.getAddressState({address : testaddress}, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    response = res;
                    resolve();
                });
            });
        });
    });

    it('GetAddressStateResp has AddressState state property', function(){
        expect(response).to.have.property('state');
    });
    it('GetAddressStateResp.state has correct *address* property', function(){
        expect(response.state).to.have.property('address');
        expect(Buffer.isBuffer(response.state.address)).to.equal(true);
        expect(response.state.address.length).to.equal(39);
    });
    it('GetAddressStateResp.state has correct *balance* property', function(){
        expect(response.state).to.have.property('balance');
        expect(response.state.balance).to.be.a('string');
        expect(parseInt(response.state.balance)).to.be.a('number');
        expect(parseInt(response.state.balance)).to.be.below(18446744073709551617); // uint64
    });
    it('GetAddressStateResp.state has correct *nonce* property', function(){
        expect(response.state).to.have.property('nonce');
        expect(response.state.nonce).to.be.a('string');
        expect(parseInt(response.state.nonce)).to.be.a('number');
        expect(parseInt(response.state.nonce)).to.be.below(18446744073709551617); // uint64
    });
    it('GetAddressStateResp.state has correct *ots_bitfield* property', function(){
        expect(response.state).to.have.property('ots_bitfield');
        response.state.ots_bitfield.forEach(i => expect(Buffer.isBuffer(i)).to.equal(true));
        response.state.ots_bitfield.forEach(i => expect(i.length).to.equal(1));
    });
    it('GetAddressStateResp.state has correct *transaction_hashes* property', function(){
        expect(response.state).to.have.property('transaction_hashes');
        response.state.transaction_hashes.forEach(i => expect(Buffer.isBuffer(i)).to.equal(true));
        response.state.transaction_hashes.forEach(i => expect(i.length).to.equal(32));
    });
    it('GetAddressStateResp.state has correct *tokens* property', function(){
        expect(response.state).to.have.property('tokens');
    });
    it('GetAddressStateResp.state has correct *latticePK_list* property', function(){
        expect(response.state).to.have.property('latticePK_list');
    });
    it('GetAddressStateResp.state has correct *slave_pks_access_type* property', function(){
        expect(response.state).to.have.property('slave_pks_access_type');
    });
    it('GetAddressStateResp.state has correct *ots_counter* property', function(){
        expect(response.state).to.have.property('ots_counter');
        expect(response.state.ots_counter).to.be.a('string');
        expect(parseInt(response.state.ots_counter)).to.be.a('number');
        expect(parseInt(response.state.ots_counter)).to.be.below(18446744073709551617); // uint64
    });

});


// rpc GetLatestData(GetLatestDataReq) returns (GetLatestDataResp);
describe('GetLatestData - All', function() {
    // example wallet address
    let response;
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.getLatestData({filter:0 , offset: 10, quantity: 20}, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    response = res;
                    resolve();
                });
            });
        });
    });

    it('GetLatestDataResp has correct *blockheaders* property', function(){
        expect(response).to.have.property('blockheaders');
        response.blockheaders.forEach(i => expect(i).to.have.all.keys(['header','transaction_count']));
        response.blockheaders.forEach(i => expect(i.header).to.have.all.keys(['hash_header','block_number','timestamp_seconds','hash_header_prev','reward_block','reward_fee','merkle_root','mining_nonce','extra_nonce']));
        response.blockheaders.forEach(i => expect( Buffer.isBuffer(i.header.hash_header)).to.equal(true) );
        response.blockheaders.forEach(i => expect(i.header.hash_header.length).to.equal(32) );
        response.blockheaders.forEach(i => expect(i.header.block_number).to.be.a('string') );
        response.blockheaders.forEach(i => expect(parseInt(i.header.block_number)).to.be.a('number') );
        response.blockheaders.forEach(i => expect(i.header.timestamp_seconds).to.be.a('string') );
        response.blockheaders.forEach(i => expect(parseInt(i.header.timestamp_seconds)).to.be.a('number') );
        response.blockheaders.forEach(i => expect(i.header.reward_block).to.be.a('string') );
        response.blockheaders.forEach(i => expect(parseInt(i.header.reward_block)).to.be.a('number') );
        response.blockheaders.forEach(i => expect(i.header.reward_fee).to.be.a('string') );
        response.blockheaders.forEach(i => expect(parseInt(i.header.reward_fee)).to.be.a('number') );
        response.blockheaders.forEach(i => expect(i.header.mining_nonce).to.be.a('number') );
        response.blockheaders.forEach(i => expect(parseInt(i.header.mining_nonce)).to.be.a('number') );
        response.blockheaders.forEach(i => expect(i.header.extra_nonce).to.be.a('string') );
        response.blockheaders.forEach(i => expect(parseInt(i.header.extra_nonce)).to.be.a('number') );
        response.blockheaders.forEach(i => expect( Buffer.isBuffer(i.header.hash_header_prev)).to.equal(true) );
        response.blockheaders.forEach(i => expect(i.header.hash_header_prev.length).to.equal(32) );
        response.blockheaders.forEach(i => expect( Buffer.isBuffer(i.header.merkle_root)).to.equal(true) );
        response.blockheaders.forEach(i => expect(i.header.merkle_root.length).to.equal(32) );
    });
    it('GetLatestDataResp.blockheaders has correct *transaction_count* property', function(){
        response.blockheaders.forEach(i => expect(i.transaction_count).to.have.all.keys(['count']));
        // TODO: check the transaction counts
    });
    it('GetLatestDataResp has correct *transactions* property', function(){
        expect(response).to.have.property('transactions');
    });
    it('GetLatestDataResp.transactions has correct *header* property', function(){
        response.transactions.forEach(i => expect(i).to.have.all.keys(['header','tx','addr_from','size']));
        response.transactions.forEach(i => expect( Buffer.isBuffer(i.header.hash_header)).to.equal(true) );
        response.transactions.forEach(i => expect(i.header.hash_header.length).to.equal(32) );
        response.transactions.forEach(i => expect(i.header.block_number).to.be.a('string') );
        response.transactions.forEach(i => expect(parseInt(i.header.block_number)).to.be.a('number') );
        response.transactions.forEach(i => expect(i.header.timestamp_seconds).to.be.a('string') );
        response.transactions.forEach(i => expect(parseInt(i.header.timestamp_seconds)).to.be.a('number') );
        response.transactions.forEach(i => expect(i.header.reward_block).to.be.a('string') );
        response.transactions.forEach(i => expect(parseInt(i.header.reward_block)).to.be.a('number') );
        response.transactions.forEach(i => expect(i.header.reward_fee).to.be.a('string') );
        response.transactions.forEach(i => expect(parseInt(i.header.reward_fee)).to.be.a('number') );
        response.transactions.forEach(i => expect(i.header.mining_nonce).to.be.a('string') );
        response.transactions.forEach(i => expect(parseInt(i.header.mining_nonce)).to.be.a('number') );
        response.transactions.forEach(i => expect( Buffer.isBuffer(i.header.hash_header_prev)).to.equal(true) );
        response.transactions.forEach(i => expect(i.header.hash_header_prev.length).to.equal(32) );
        response.transactions.forEach(i => expect( Buffer.isBuffer(i.header.merkle_root)).to.equal(true) );
        response.transactions.forEach(i => expect(i.header.merkle_root.length).to.equal(32) );
    });

    // FIXME: Disabling. Sporadic failures as it is running on public testnet
    // it('GetLatestDataResp.transactions has correct *tx* property', function(){
    //     response.transactions.forEach(i => expect(i.tx).to.have.all.keys(['transactionType','master_addr','fee','public_key','signature','nonce','transaction_hash','transfer','coinbase','latticePK','message','token','transfer_token','slave']));
    //     response.transactions.forEach(i => expect( Buffer.isBuffer(i.tx.master_addr)).to.equal(true) );
    //     // response.transactions.forEach(i => expect(i.tx.master_addr.length).to.equal(39));
    //     response.transactions.forEach(i => expect(i.tx.transaction_hash.length).to.equal(32));
    //     response.transactions.forEach(i => expect(i.tx.transactionType).to.be.a('string') );
    //     response.transactions.forEach(i => expect(i.tx.transactionType).to.equal('transfer') );
    //     response.transactions.forEach(i => expect(i.tx.fee).to.be.a('string') );
    //     response.transactions.forEach(i => expect(parseInt(i.tx.fee)).to.be.a('number') );
    //     response.transactions.forEach(i => expect(i.tx.nonce).to.be.a('string') );
    //     response.transactions.forEach(i => expect(parseInt(i.tx.nonce)).to.be.a('number') );
    //     response.transactions.forEach(i => expect(i.tx.public_key.length).to.equal(67));
    //     response.transactions.forEach(i => expect(i.tx.signature.length).to.equal(2756));
    // });
    it('GetLatestDataResp has correct *transactions_unconfirmed* property', function(){
        expect(response).to.have.property('transactions_unconfirmed');
    });
});


describe('GetLatestData - TransactionExtended', function() {
    // example wallet address
    let response;
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.getLatestData({filter:0 , offset: 1, quantity: 10}, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    response = res;
                    resolve();
                });
            });
        });
    });

    it('GetLatestDataResp has correct *blockheaders* property', function(){
        expect(response).to.have.property('blockheaders');
    });
    it('GetLatestDataResp has correct *transactions* property', function(){
        expect(response).to.have.property('transactions');
    });
    it('GetLatestDataResp has correct *transactions_unconfirmed* property', function(){
        expect(response).to.have.property('transactions_unconfirmed');
    });
});


let transaction_unsigned;
// rpc TransferCoins (TransferCoinsReq) returns (TransferCoinsResp);
describe('TransferCoins', function() {
    let response;
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.transferCoins({master_addr: testfromaddress_bytes, addresses_to: testtoaddress_bytes, amounts: 100, fee:0.001, xmss_pk: testfromxmsspk_bytes}, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    transaction_unsigned = res.extended_transaction_unsigned.tx;
                    response = res;
                    resolve();
                });
            });
        });
    });

    it('TransferCoinsResp has correct *extended_transaction_unsigned* property', function(){
        expect(response).to.have.property('extended_transaction_unsigned');
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *header* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('header');
        expect(response.extended_transaction_unsigned.header).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *tx* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('tx');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transactionType* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transactionType');
        expect(response.extended_transaction_unsigned.tx.transactionType).to.equal('transfer');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *master_addr* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('master_addr');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.master_addr)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.master_addr.length).to.equal(39);
        expect(Buffer.from(response.extended_transaction_unsigned.tx.master_addr).toString('hex')).to.equal(testfromaddress);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *fee* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('fee');
        expect(response.extended_transaction_unsigned.tx.fee).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.tx.fee)).to.be.a('number');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *public_key* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('public_key');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.public_key)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.public_key.length).to.equal(67);
        expect(Buffer.from(response.extended_transaction_unsigned.tx.public_key).toString('hex')).to.equal(testfromxmsspk);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *signature* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('signature');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.signature)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.signature.length).to.equal(0);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *nonce* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('nonce');
        expect(response.extended_transaction_unsigned.tx.nonce).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.tx.nonce)).to.be.a('number');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transaction_hash* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transaction_hash');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.transaction_hash)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.transaction_hash.length).to.equal(0);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transactionType* transfer', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *coinbase* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('coinbase');
        expect(response.extended_transaction_unsigned.tx.coinbase).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *latticePK* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('latticePK');
        expect(response.extended_transaction_unsigned.tx.latticePK).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *message* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('message');
        expect(response.extended_transaction_unsigned.tx.message).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *token* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('token');
        expect(response.extended_transaction_unsigned.tx.token).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transfer_token* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer_token');
        expect(response.extended_transaction_unsigned.tx.transfer_token).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *slave* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('slave');
        expect(response.extended_transaction_unsigned.tx.slave).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transfer* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer');
        expect(response.extended_transaction_unsigned.tx.transfer).to.have.all.keys(['addrs_to','amounts'])
        response.extended_transaction_unsigned.tx.transfer.addrs_to.forEach(i => expect(Buffer.isBuffer(i)).to.equal(true) );
        response.extended_transaction_unsigned.tx.transfer.addrs_to.forEach(i => expect(i.length).to.equal(39) );
        response.extended_transaction_unsigned.tx.transfer.amounts.forEach(i => expect(i).to.be.a('string') );
        response.extended_transaction_unsigned.tx.transfer.amounts.forEach(i => expect(parseInt(i)).to.be.a('number') );

    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *addr_from* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('addr_from');
        expect(response.extended_transaction_unsigned.addr_from.length).to.equal(39);
        expect(Buffer.from(response.extended_transaction_unsigned.addr_from).toString('hex')).to.equal(testfromaddress);
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *size* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('size');
        expect(response.extended_transaction_unsigned.size).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.size)).to.be.a('number');
    });
});



// pushTransaction call
// describe('PushTransaction - TransferCoins', function() {
//     // this.timeout(50000);
//     let response;
//     // call API
//     before(function() {
//         this.enableTimeouts(false)
//         return new Promise((resolve) => {
//             qrlClient.then( function (qrlClient) {
//                 // generating a new wallet
//                 let i
//                 const randomBytes = require('crypto').randomBytes(48)
//                 const randomSeed = new qrllib.VectorUChar()
//                 for (i = 0; i < 48; i += 1) {
//                     randomSeed.push_back(randomBytes[i])
//                 }
//                 // Generate XMSS object
//                 XMSS_OBJECT = new qrllib.Xmss(randomSeed, 10)
//                 // stringToBytes(testfromxmsspk);
//                 xmss_pk = stringToBytes(qrllib.bin2hstr(XMSS_OBJECT.getPK()))
//
//                 qrlClient.transferCoins({addresses_to: testtoaddress_bytes, amounts: 10000000000, fee:1000000, xmss_pk: xmss_pk}, (err, res) => {
//
//                     if (err){
//                         console.log("Error: ", err.message);
//                         return;
//                     }
//                     console.log("Sending API call")
//                     const tx = res;
//
//                     // code from the wallet (@scottdonaldau)
//                     const xmss_pk = XMSS_OBJECT.getPK()
//                     const thisAddressBytes = XMSS_OBJECT.getAddress()
//                     XMSS_OBJECT.setIndex(12)
//
//                     console.log("Preparing tx to sign...")
//                     // Concatenate Uint8Arrays
//                     let concatenatedArrays = concatenateTypedArrays(Uint8Array, tx.extended_transaction_unsigned.addr_from, toBigendianUint64BytesUnsigned(tx.extended_transaction_unsigned.tx.fee))
//                     // Now append all recipient (outputs) to concatenatedArrays
//                     const addrsToRaw = tx.extended_transaction_unsigned.tx.transfer.addrs_to
//                     const amountsRaw = tx.extended_transaction_unsigned.tx.transfer.amounts
//                     for (var i = 0; i < addrsToRaw.length; i++) {
//                         concatenatedArrays = concatenateTypedArrays(Uint8Array,concatenatedArrays,addrsToRaw[i]) // Add address
//                         concatenatedArrays = concatenateTypedArrays(Uint8Array,concatenatedArrays,toBigendianUint64BytesUnsigned(amountsRaw[i])) // Add amount
//                     }
//                     // Convert Uint8Array to VectorUChar
//                     const hashableBytes = new qrllib.VectorUChar()
//                     for (i = 0; i < concatenatedArrays.length; i += 1) {
//                         hashableBytes.push_back(concatenatedArrays[i])
//                     }
//                     // Create sha256 sum of concatenatedarray
//                     let shaSum = qrllib.sha2_256(hashableBytes)
//                     // Sign the sha sum
//                     tx.extended_transaction_unsigned.tx.signature = binaryToBytes(XMSS_OBJECT.sign(shaSum))
//                     // Calculate transaction hash
//                     let txnHashConcat = concatenateTypedArrays(Uint8Array,binaryToBytes(shaSum),tx.extended_transaction_unsigned.tx.signature,binaryToBytes(XMSS_OBJECT.getPK()))
//
//                     const txnHashableBytes = new qrllib.VectorUChar()
//                     for (i = 0; i < txnHashConcat.length; i += 1) {
//                         txnHashableBytes.push_back(txnHashConcat[i])
//                     }
//
//                     let txnHash = qrllib.bin2hstr(qrllib.sha2_256(txnHashableBytes))
//
//                     // transferCoins returns a TransferCoinsResp, one needs to get the Transaction out and sign it
//                     const confirmTxn = { transaction_signed: res.extended_transaction_unsigned.tx }
//                     // confirmTxn.transaction_signed.master_addr = testfromaddress_bytes;
//                     confirmTxn.transaction_signed.fee = tx.extended_transaction_unsigned.tx.fee
//                     confirmTxn.transaction_signed.public_key = xmss_pk
//                     confirmTxn.transaction_signed.signature = binaryToBytes(XMSS_OBJECT.sign(shaSum))
//                     confirmTxn.transaction_signed.nonce = 12
//                     confirmTxn.transaction_signed.transaction_hash = txnHash
//                     confirmTxn.transaction_signed.transfer.addrs_to = tx.extended_transaction_unsigned.tx.transfer.addrs_to
//                     confirmTxn.transaction_signed.transfer.amounts = tx.extended_transaction_unsigned.tx.transfer.amounts
//
//                     // pushTransaction API call
//                     qrlClient.pushTransaction(confirmTxn, (err, res2) => {
//                         if (err){
//                             console.log("Error: ", err.message);
//                             return;
//                         }
//                         console.log("RES2 : ", res2)
//                         response = res2;
//                         resolve(response);
//                     });
//                 });
//             });
//         });
//     });
//
//     it('PushTransactionResp has correct *error_code* property', function(){
//         expect(response).to.have.property('error_code');
//     });
// });





describe('GetTokenTxn', function() {
    let response;
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.getTokenTxn({master_addr: testfromaddress_bytes, symbol:"JSTEST", name:"JSTEST", owner:"Q0105006d232eb403a0248f9d4c0476c06a7d7a1d0425420df2dd915b7fb46cf7da132699c27b93", decimals:10, initial_balances: {address: testtoaddress_bytes, amount: 10000000000} ,fee:1000000, xmss_pk: testfromxmsspk_bytes}, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    response = res;
                    resolve();
                });
            });
        });
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *addr_from* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('addr_from');
        expect(Buffer.from(response.extended_transaction_unsigned.addr_from).toString('hex')).to.equal(testfromaddress);
    });
    it('TransferCoinsResp has correct *extended_transaction_unsigned* property', function(){
        expect(response).to.have.property('extended_transaction_unsigned');
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *header* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('header');
        expect(response.extended_transaction_unsigned.header).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *tx* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('tx');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transactionType* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transactionType');
        expect(response.extended_transaction_unsigned.tx.transactionType).to.equal('token');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *master_addr* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('master_addr');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.master_addr)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.master_addr.length).to.equal(39);
        expect(Buffer.from(response.extended_transaction_unsigned.tx.master_addr).toString('hex')).to.equal(testfromaddress);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *fee* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('fee');
        expect(response.extended_transaction_unsigned.tx.fee).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.tx.fee)).to.be.a('number');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *public_key* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('public_key');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.public_key)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.public_key.length).to.equal(67);
        expect(Buffer.from(response.extended_transaction_unsigned.tx.public_key).toString('hex')).to.equal(testfromxmsspk);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *signature* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('signature');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.signature)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.signature.length).to.equal(0);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *nonce* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('nonce');
        expect(response.extended_transaction_unsigned.tx.nonce).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.tx.nonce)).to.be.a('number');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transaction_hash* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transaction_hash');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.transaction_hash)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.transaction_hash.length).to.equal(0);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transactionType* transfer', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *coinbase* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('coinbase');
        expect(response.extended_transaction_unsigned.tx.coinbase).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *latticePK* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('latticePK');
        expect(response.extended_transaction_unsigned.tx.latticePK).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *message* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('message');
        expect(response.extended_transaction_unsigned.tx.message).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *token* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('token');
        expect(response.extended_transaction_unsigned.tx.token).to.have.all.keys(['symbol','name','owner','decimals','initial_balances']);
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.token.symbol)).to.equal(true);
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.token.name)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.token.decimals).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.tx.token.decimals)).to.be.a('number');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.token.owner)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.token.owner.length).to.equal(59);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transfer_token* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer_token');
        expect(response.extended_transaction_unsigned.tx.transfer_token).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *slave* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('slave');
        expect(response.extended_transaction_unsigned.tx.slave).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transfer* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer');
        expect(response.extended_transaction_unsigned.tx.transfer).to.equal(null);

    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *addr_from* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('addr_from');
        expect(response.extended_transaction_unsigned.addr_from.length).to.equal(39);
        expect(Buffer.from(response.extended_transaction_unsigned.addr_from).toString('hex')).to.equal(testfromaddress);
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *size* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('size');
        expect(response.extended_transaction_unsigned.size).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.size)).to.be.a('number');
    });
});




describe('GetTransferTokenTxn', function() {
    let response;
    // call API
    before(function() {
        return new Promise((resolve) => {
            qrlClient.then( function (qrlClient) {
                qrlClient.getTransferTokenTxn({master_addr: testfromaddress_bytes, addresses_to: testtoaddress_bytes, amounts: 100, fee:0.001, xmss_pk: testfromxmsspk_bytes }, (err, res) => {
                    if (err){
                        console.log("Error: ", err.message);
                        return;
                    }
                    response = res;
                    resolve();
                });
            });
        });
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *addr_from* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('addr_from');
        expect(Buffer.from(response.extended_transaction_unsigned.addr_from).toString('hex')).to.equal(testfromaddress);
    });
    it('TransferCoinsResp has correct *extended_transaction_unsigned* property', function(){
        expect(response).to.have.property('extended_transaction_unsigned');
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *header* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('header');
        expect(response.extended_transaction_unsigned.header).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *tx* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('tx');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transactionType* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transactionType');
        expect(response.extended_transaction_unsigned.tx.transactionType).to.equal('transfer_token');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *master_addr* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('master_addr');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.master_addr)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.master_addr.length).to.equal(39);
        expect(Buffer.from(response.extended_transaction_unsigned.tx.master_addr).toString('hex')).to.equal(testfromaddress);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *fee* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('fee');
        expect(response.extended_transaction_unsigned.tx.fee).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.tx.fee)).to.be.a('number');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *public_key* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('public_key');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.public_key)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.public_key.length).to.equal(67);
        expect(Buffer.from(response.extended_transaction_unsigned.tx.public_key).toString('hex')).to.equal(testfromxmsspk);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *signature* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('signature');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.signature)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.signature.length).to.equal(0);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *nonce* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('nonce');
        expect(response.extended_transaction_unsigned.tx.nonce).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.tx.nonce)).to.be.a('number');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transaction_hash* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transaction_hash');
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.transaction_hash)).to.equal(true);
        expect(response.extended_transaction_unsigned.tx.transaction_hash.length).to.equal(0);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transactionType* transfer', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer');
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *coinbase* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('coinbase');
        expect(response.extended_transaction_unsigned.tx.coinbase).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *latticePK* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('latticePK');
        expect(response.extended_transaction_unsigned.tx.latticePK).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *message* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('message');
        expect(response.extended_transaction_unsigned.tx.message).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *token* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('token');
        expect(response.extended_transaction_unsigned.tx.message).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transfer_token* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer_token');
        expect(response.extended_transaction_unsigned.tx.transfer_token).to.have.all.keys(['token_txhash','addrs_to','amounts']);
        expect(Buffer.isBuffer(response.extended_transaction_unsigned.tx.transfer_token.token_txhash)).to.equal(true);
        expect(typeof(response.extended_transaction_unsigned.tx.transfer_token.addrs_to)).to.equal('object');
        response.extended_transaction_unsigned.tx.transfer_token.addrs_to.forEach(i => expect(Buffer.isBuffer(i)).to.equal(true));
        response.extended_transaction_unsigned.tx.transfer_token.addrs_to.forEach(i => expect(i.length).to.equal(39));
        response.extended_transaction_unsigned.tx.transfer_token.amounts.forEach(i => expect(i).to.be.a('string'));
        response.extended_transaction_unsigned.tx.transfer_token.amounts.forEach(i => expect(parseInt(i)).to.be.a('number'));
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *slave* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('slave');
        expect(response.extended_transaction_unsigned.tx.slave).to.equal(null);
    });
    it('TransferCoinsResp.extended_transaction_unsigned.tx has correct *transfer* property', function(){
        expect(response.extended_transaction_unsigned.tx).to.have.property('transfer');
        expect(response.extended_transaction_unsigned.tx.transfer).to.equal(null);

    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *addr_from* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('addr_from');
        expect(response.extended_transaction_unsigned.addr_from.length).to.equal(39);
        expect(Buffer.from(response.extended_transaction_unsigned.addr_from).toString('hex')).to.equal(testfromaddress);
    });
    it('TransferCoinsResp.extended_transaction_unsigned has correct *size* property', function(){
        expect(response.extended_transaction_unsigned).to.have.property('size');
        expect(response.extended_transaction_unsigned.size).to.be.a('string');
        expect(parseInt(response.extended_transaction_unsigned.size)).to.be.a('number');
    });

});
