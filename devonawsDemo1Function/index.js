async function getRegions(region = "us-east-1") {
    console.log(`getting regions`);
    const AWS = require("aws-sdk");
    AWS.config.update({ "region": region });
    const ec2 = new AWS.EC2({ "apiVersion": '2016-11-15' });
    return (await ec2.describeRegions().promise()).Regions.map((regionObject) => {
        return regionObject.RegionName;
    });
}

module.exports.handler = async (event, context, callback) => {
    console.log("starting function");
    const regions = await getRegions();
    callback(null, regions);
};