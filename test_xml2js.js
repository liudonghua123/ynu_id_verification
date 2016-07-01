/**
 * Created by liudonghua on 2016-06-29.
 */

var fs = require('fs'),
    xml2js = require('xml2js'),
    util = require('util');

var parser = new xml2js.Parser();
var builder = new xml2js.Builder();

var xml = fs.readFileSync(__dirname + '/data/test_input.xml');
xml_object = null;

parser.parseString(xml, function (err, result) {
    if(err) {
        console.log("Error in parseString!");
        process.exit(1);
    }
    xml_object = result;
    console.log(util.inspect(result, false, null));
    json_object = JSON.stringify(result);
    console.log("json_object: %s", json_object)

    result_object = {RTN_PERSON: {ERR_ID: 'OK', ERR_MSG: '', RTN_PERSON_INFO_LIST: {}}};
    RTN_PERSON_INFO = [];
    xml_object.PERSON.PERSON_INFO_LIST[0].PERSON_INFO.forEach(function(person_info) {
        RTN_PERSON_INFO.push({SORT_ID: person_info.SORT_ID[0], PERSON_TYPE: "OK"})
    });
    result_object.RTN_PERSON.RTN_PERSON_INFO_LIST.RTN_PERSON_INFO = RTN_PERSON_INFO;

    var return_xml = builder.buildObject(result_object);
    console.info("return_xml: %s", return_xml)
})

