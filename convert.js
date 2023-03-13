const zlib = require('zlib');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const fs = require('fs');

var converts = [];
function replaceAll(find, replace, str) {
	var find = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	return str.replace(new RegExp(find, 'g'), replace);
}
function pbdx(optt, path, input, say) {
    try {
        fs.writeFileSync(path, "");
    } catch (err) { }
    try {
        fs.unlinkSync(".temp");
    } catch (err) { }
    var dataBuffer = Buffer.from(fs.readFileSync(input, "binary"), "binary");
    var fileHeader = dataBuffer.slice(0, 3);
    var strend = Buffer.from("\0");
    console.log("BDX =>]", fileHeader.toString(), "=>] " + optt);
    var decodedBody = zlib.brotliDecompressSync(dataBuffer.slice(3, Infinity));
    var bdxHeader = decodedBody.slice(0, 4);
    if (bdxHeader.toString() !== "BDX\x00") {
        process.exit(0);
    }
    var secondEnd = decodedBody.indexOf(strend, 5);
    var bdxMaker = decodedBody.slice(4, secondEnd);
    var bdxBody = decodedBody.slice(secondEnd + 1, Infinity);
    var bdxEnd = bdxBody.lastIndexOf(Buffer.from("\x58"));
    bdxBody = bdxBody.slice(0, bdxEnd);
    var runtimeIdPoolUsing = JSON.parse(fs.readFileSync("data/runtimeIds.json", "utf8"));
    var time = new Date().getTime();/////////////

    var blockPool = [];
    var brushPosition = [0, 0, 0];
    var gcmd = [];
    if (optt === "mcfunction") {
        fs.appendFileSync(path, `#Header\nsay Original document: BDX File\nsay ParseTime: ${new Date().toLocaleString()}\nsay BDX File Author: ${bdxMaker.length > 100 ? "Error (Byte Length > 100)" : bdxMaker.toString()}\n\n#Body\n`, "utf8");
    }
    var interval = 0;
    var errors = [];
    var success = true;

    function toMcfunction() {
        var str = "";
        // console.log(gcmd.length);
        for (var i = 0; i < gcmd.length; i++) {
            // console.log(gcmd[i]);
            if (gcmd[i].type === "setblock") {
                str += `setblock ~${gcmd[i].x} ~${gcmd[i].y} ~${gcmd[i].z} ${gcmd[i].block} ${gcmd[i].data}\n`;
            } else if (gcmd[i].type === "say") {
                if (say) {
                    str += `say ${replaceAll("\n", "\n#", gcmd[i].msg)}\n`;
                } else {
                    str += `#${replaceAll("\n", "\n#", gcmd[i].msg)}\n`;
                }
            } else if (gcmd[i].type === "replaceitem") {
                str += `replaceitem block ~${gcmd[i].x} ~${gcmd[i].y} ~${gcmd[i].z} slot.container ${gcmd[i].slotId} ${gcmd[i].item} ${gcmd[i].count} ${gcmd[i].data}\n`;
            }
        }
        fs.appendFileSync(path, str, "utf8");
        // console.log(gcmd, "appended");
        gcmd = [];
        return;
    }
  
    function endConvert() {
        if (optt === "mcfunction") {
            toMcfunction();
        } else {
            toSd(true);
        }
        console.log("===BDX Convert End===");
    }
    !function decode(buf, i) {
        i = 0;
        while (i < buf.length) {
            interval++;
            if (interval % 50 === 0) {
                console.log(`Progress: ${i / buf.length * 100}%`);
            }
            var cmd = buf[i];

            if (cmd === 1) {
                blockPool.push(buf.slice(i + 1, buf.indexOf(strend, i)).toString());
                i = buf.indexOf(strend, i) + 1;
            } else if (cmd === 2) {
                brushPosition[0] += buf.slice(i + 1, i + 3).readUint16BE();
                brushPosition[1] = 0;
                brushPosition[2] = 0;
                i = i + 3;
            } else if (cmd === 3) {
                brushPosition[0]++;
                brushPosition[1] = 0;
                brushPosition[2] = 0;
                i = i + 1;
            } else if (cmd === 4) {
                brushPosition[1] += buf.slice(i + 1, i + 3).readUint16BE();
                brushPosition[2] = 0;
                i = i + 3;
            } else if (cmd === 5) {
                brushPosition[1]++;
                brushPosition[2] = 0;
                i = i + 1;
            } else if (cmd === 6) {
                brushPosition[2] += buf.slice(i + 1, i + 3).readUint16BE();
                i = i + 2;
            } else if (cmd === 7) {
                var blockid = buf.slice(i + 1, i + 3).readUint16BE();
                var blockdata = buf.slice(i + 3, i + 5).readUint16BE();
                gcmd.push({
                    type: "setblock",
                    x: brushPosition[0],
                    y: brushPosition[1],
                    z: brushPosition[2],
                    block: blockPool[blockid],
                    data: blockdata
                });

                i = i + 5;
            } else if (cmd === 8) {
                brushPosition[2]++;
                i = i + 1;
            } else if (cmd === 9) {
                i = i + 1;
            } else if (cmd === 10) {
                brushPosition[0] += buf.slice(i + 1, i + 5).readUint32BE();
                brushPosition[1] = 0;
                brushPosition[2] = 0;
                i = i + 5;
            } else if (cmd === 11) {
                brushPosition[1] += buf.slice(i + 1, i + 5).readUint32BE();
                brushPosition[2] = 0;
                i = i + 5;
            } else if (cmd === 12) {
                brushPosition[3] += buf.slice(i + 1, i + 5).readUint32BE();
                i = i + 5;
            } else if (cmd === 13) {
                i = i + 1;
                console.error(new Error("WARNING: BDump/Import: Use of reserved command\n"));
                errors.push(new Error("WARNING: BDump/Import: Use of reserved command\n"));
                //success = false;
                //i = Infinity;
            } else if (cmd === 14) {
                brushPosition[0]++;
                i = i + 1;
            } else if (cmd === 15) {
                brushPosition[0]--;
                i = i + 1;
            } else if (cmd === 16) {
                brushPosition[1]++;
                i = i + 1;
            } else if (cmd === 17) {
                brushPosition[1]--;
                i = i + 1;
            } else if (cmd === 18) {
                brushPosition[2]++;
                i = i + 1;
            } else if (cmd === 19) {
                brushPosition[2]--;
                i = i + 1;
            } else if (cmd === 20) {
                brushPosition[0] += buf.slice(i + 1, i + 3).readInt16BE();
                i = i + 3;
            } else if (cmd === 21) {
                brushPosition[0] += buf.slice(i + 1, i + 5).readInt32BE();
                i = i + 5;
            } else if (cmd === 22) {
                brushPosition[1] += buf.slice(i + 1, i + 3).readInt16BE();
                i = i + 3;
            } else if (cmd === 23) {
                brushPosition[1] += buf.slice(i + 1, i + 5).readInt32BE();
                i = i + 5;
            } else if (cmd === 24) {
                brushPosition[2] += buf.slice(i + 1, i + 3).readInt16BE();
                i = i + 3;
            } else if (cmd === 25) {
                brushPosition[3] += buf.slice(i + 1, i + 5).readInt32BE();
                i = i + 5;
            } else if (cmd === 26) {
                var mode = buf.slice(i + 1, i + 5).readUInt32BE();
                var firstEnd = buf.indexOf(strend, i + 5);
                var command = buf.slice(i + 5, firstEnd).toString();
                var secondEnd = buf.indexOf(strend, firstEnd + 1);
                var customName = buf.slice(firstEnd + 1, secondEnd).toString();
                var thirdEnd = buf.indexOf(strend, secondEnd + 1);
                var tickdelay = buf.slice(thirdEnd + 1, thirdEnd + 5).readUInt32BE();
                var boolbuf = buf.slice(thirdEnd + 5, thirdEnd + 9);
                var executeOnFirstTick = boolbuf[0] === 1;
                var trackOutput = boolbuf[1] === 1;
                var conditional = boolbuf[2] === 1;
                var needRedstone = boolbuf[3] === 1;
                i = thirdEnd + 9;
                gcmd.push({
                    type: "setblock",
                    x: brushPosition[0],
                    y: brushPosition[1],
                    z: brushPosition[2],
                    block: "command_block",
                    data: 0
                });
                gcmd.push({
                    type: "say",
                    msg: `Unsupported CB, Data>> pos:${brushPosition[0]},${brushPosition[1]},${brushPosition[2]} mode:${mode}, command: ${command}, cName:${customName}, tick:${tickdelay}, executeOnFirstTick:${executeOnFirstTick}, trackOutput:${trackOutput}, conditional:${conditional}, needRedstone:${needRedstone}`
                });
            } else if (cmd === 27) {
                var blcokId = buf.slice(i + 1, i + 3).readUInt16BE();
                var blockData = buf.slice(i + 3, i + 5).readUInt16BE();
                var blcokName = blockPool[blcokId];
                var mode = buf.slice(i + 5, i + 9).readUInt32BE();
                var firstEnd = buf.indexOf(strend, i + 9);
                var command = buf.slice(i + 9, firstEnd);
                var secondEnd = buf.indexOf(strend, firstEnd + 1);
                var customName = buf.slice(firstEnd + 1, secondEnd);
                var thirdEnd = buf.indexOf(strend, secondEnd + 1);
                var tickdelay = buf.slice(thirdEnd + 1, thirdEnd + 5).readUInt32BE();
                var boolbuf = buf.slice(thirdEnd + 5, thirdEnd + 9);
                var executeOnFirstTick = boolbuf[0] === 1;
                var trackOutput = boolbuf[1] === 1;
                var conditional = boolbuf[2] === 1;
                var needRedstone = boolbuf[3] === 1;
                i = thirdEnd + 9;
                gcmd.push({
                    type: "setblock",
                    x: brushPosition[0],
                    y: brushPosition[1],
                    z: brushPosition[2],
                    block: blcokName,
                    data: blockData
                });
                gcmd.push({
                    type: "say",
                    msg: `Unsupported CB, Data>> pos:${brushPosition[0]},${brushPosition[1]},${brushPosition[2]} mode:${mode}, command: ${command}, cName:${customName}, tick:${tickdelay}, executeOnFirstTick:${executeOnFirstTick}, trackOutput:${trackOutput}, conditional:${conditional}, needRedstone:${needRedstone}`
                });
            } else if (cmd === 28) {
                brushPosition[0] += buf.slice(i + 1, i + 2).readInt8();
                i = i + 2;
            } else if (cmd === 29) {
                brushPosition[1] += buf.slice(i + 1, i + 2).readInt8();
                i = i + 2;
            } else if (cmd === 30) {
                // console.log(buf.slice(i + 1, i + 2),buf[i+1]);
                // console.log(buf.slice(i - 5, i + 5));
                brushPosition[2] += buf.slice(i + 1, i + 2).readInt8();
                i = i + 2;
            } else if (cmd === 31) {
                var id = buf.slice(i + 1, i + 2)[0];
                if (id === 117) {
                    JSON.parse(fs.readFileSync("runtimeIds.json", "utf8"));
                }
                i = i + 2;
            } else if (cmd === 32) {

                var runtimeId;
                try {
                    runtimeId = buf.slice(i + 1, i + 3).readUInt16BE();
                    gcmd.push({
                        type: "setblock",
                        x: brushPosition[0],
                        y: brushPosition[1],
                        z: brushPosition[2],
                        block: runtimeIdPoolUsing[runtimeId] ? runtimeIdPoolUsing[runtimeId][0] : "air",
                        data: runtimeIdPoolUsing[runtimeId] ? runtimeIdPoolUsing[runtimeId][1] : 0
                    });
                } catch (err) {
                    if (err) {
                        errors.push(err);
                        console.log(err, i, runtimeId);
                    }
                }
                i = i + 3;
            } else if (cmd === 33) {
                var runtimeId = buf.slice(i + 1, i + 5).readUInt32BE();
                gcmd.push({
                    type: "setblock",
                    x: brushPosition[0],
                    y: brushPosition[1],
                    z: brushPosition[2],
                    block: runtimeIdPoolUsing[runtimeId][0],
                    data: runtimeIdPoolUsing[runtimeId][1]
                });
                i = i + 5;
            } else if (cmd === 34) {
                var runtimeId = buf.slice(i + 1, i + 3).readUInt16BE();
                var mode = buf.slice(i + 3, i + 7).readUInt32BE();
                var firstEnd = buf.indexOf(strend, i + 7);
                var command = buf.slice(i + 7, firstEnd).toString();
                var secondEnd = buf.indexOf(strend, firstEnd + 1);
                var customName = buf.slice(firstEnd + 1, secondEnd).toString();
                var thirdEnd = buf.indexOf(strend, secondEnd + 1);
                var tickdelay = buf.slice(thirdEnd + 1, thirdEnd + 5).readUInt32BE();
                var boolbuf = buf.slice(thirdEnd + 5, thirdEnd + 9);
                var executeOnFirstTick = boolbuf[0] === 1;
                var trackOutput = boolbuf[1] === 1;
                var conditional = boolbuf[2] === 1;
                var needRedstone = boolbuf[3] === 1;
                i = thirdEnd + 9;

                gcmd.push({
                    type: "setblock",
                    x: brushPosition[0],
                    y: brushPosition[1],
                    z: brushPosition[2],
                    block: runtimeIdPoolUsing[runtimeId][0],
                    data: runtimeIdPoolUsing[runtimeId][1]
                });
                gcmd.push({
                    type: "say",
                    msg: `Unsupported CB, Data>> pos:${brushPosition[0]},${brushPosition[1]},${brushPosition[2]} mode:${mode}, command: ${command}, cName:${customName}, tick:${tickdelay}, executeOnFirstTick:${executeOnFirstTick}, trackOutput:${trackOutput}, conditional:${conditional}, needRedstone:${needRedstone}`
                });
            } else if (cmd === 35) {
                var runtimeId = buf.slice(i + 1, i + 5).readUInt32BE();
                var mode = buf.slice(i + 5, i + 9).readUInt32BE();
                var firstEnd = buf.indexOf(strend, i + 9);
                var command = buf.slice(i + 9, firstEnd).toString();
                var secondEnd = buf.indexOf(strend, firstEnd + 1);
                var customName = buf.slice(firstEnd + 1, secondEnd).toString();
                var thirdEnd = buf.indexOf(strend, secondEnd + 1);
                var tickdelay = buf.slice(thirdEnd + 1, thirdEnd + 5).readUInt32BE();
                var boolbuf = buf.slice(thirdEnd + 5, thirdEnd + 9);
                var executeOnFirstTick = boolbuf[0] === 1;
                var trackOutput = boolbuf[1] === 1;
                var conditional = boolbuf[2] === 1;
                var needRedstone = boolbuf[3] === 1;
                i = thirdEnd + 9;

                gcmd.push({
                    type: "setblock",
                    x: brushPosition[0],
                    y: brushPosition[1],
                    z: brushPosition[2],
                    block: runtimeIdPoolUsing[runtimeId][0],
                    data: runtimeIdPoolUsing[runtimeId][1]
                });
                gcmd.push({
                    type: "say",
                    msg: `Unsupported CB, Data>> pos:${brushPosition[0]},${brushPosition[1]},${brushPosition[2]} mode:${mode}, command: ${command}, cName:${customName}, tick:${tickdelay}, executeOnFirstTick:${executeOnFirstTick}, trackOutput:${trackOutput}, conditional:${conditional}, needRedstone:${needRedstone}`
                });
            } else if (cmd === 36) {
                var rdst = buf.slice(i + 1, i + 3);//???
                var mode = buf.slice(i + 3, i + 7).readUInt32BE();
                var firstEnd = buf.indexOf(strend, i + 7);
                var command = buf.slice(i + 7, firstEnd).toString();
                var secondEnd = buf.indexOf(strend, firstEnd + 1);
                var customName = buf.slice(firstEnd + 1, secondEnd).toString();
                var thirdEnd = buf.indexOf(strend, secondEnd + 1);
                var tickdelay = buf.slice(thirdEnd + 1, thirdEnd + 5).readUInt32BE();
                var boolbuf = buf.slice(thirdEnd + 5, thirdEnd + 9);
                var executeOnFirstTick = boolbuf[0] === 1;
                var trackOutput = boolbuf[1] === 1;
                var conditional = boolbuf[2] === 1;
                var needRedstone = boolbuf[3] === 1;
                i = thirdEnd + 9;

                gcmd.push({
                    type: "setblock",
                    x: brushPosition[0],
                    y: brushPosition[1],
                    z: brushPosition[2],
                    block: "command_block",
                    data: rdst
                });
                gcmd.push({
                    type: "say",
                    msg: `Unsupported CB, Data>> pos:${brushPosition[0]},${brushPosition[1]},${brushPosition[2]} mode: ${mode}, command: ${command}, cName:${customName}, tick:${tickdelay}, executeOnFirstTick:${executeOnFirstTick}, trackOutput:${trackOutput}, conditional:${conditional}, needRedstone:${needRedstone}`
                });
            } else if (cmd === 37) {
                var runtimeId = buf.slice(i + 1, i + 3).readUint16BE();
                var slotCount = buf.slice(i + 3, i + 4).readUInt8();
                gcmd.push({
                    type: "setblock",
                    x: brushPosition[0],
                    y: brushPosition[1],
                    z: brushPosition[2],
                    block: runtimeIdPoolUsing[runtimeId][0],
                    data: runtimeIdPoolUsing[runtimeId][1]
                });
                var now = i + 4;
                var slotStr = "";
                for (var r = 0; r < slotCount; r++) {
                    var itemNameEnd = buf.indexOf(strend, now);
                    var itemName = buf.slice(now, itemNameEnd);
                    var count = buf.slice(itemNameEnd + 1, itemNameEnd + 2).readUInt8();
                    var data = buf.slice(itemNameEnd + 2, itemNameEnd + 4).readUInt16BE();
                    var slotId = buf.slice(itemNameEnd + 4, itemNameEnd + 5).readUInt8();
                    now = itemNameEnd + 5;
                    gcmd.push({
                        type: "replaceitem",
                        x: brushPosition[0],
                        y: brushPosition[1],
                        z: brushPosition[2],
                        slotId: slotId,
                        item: itemName,
                        count: count,
                        data: data
                    });
                    slotStr += `\ncSlotId: ${slotId}, Item: ${itemName}(data: ${data}, count:${count})`
                }
                i = now;
            } else if (cmd === 38) {
                var runtimeId = buf.slice(i + 1, i + 5).readUint32BE();
                var slotCount = buf.slice(i + 5, i + 6).readUInt8();
                gcmd.push({
                    type: "setblock",
                    x: brushPosition[0],
                    y: brushPosition[1],
                    z: brushPosition[2],
                    block: runtimeIdPoolUsing[runtimeId][0],
                    data: runtimeIdPoolUsing[runtimeId][1]
                });
                var now = i + 6;
                var slotStr = "";
                for (var r = 0; r < slotCount; r++) {
                    var itemNameEnd = buf.indexOf(strend, now);
                    var itemName = buf.slice(now, itemNameEnd);
                    var count = buf.slice(itemNameEnd + 1, itemNameEnd + 2).readUInt8();
                    var data = buf.slice(itemNameEnd + 2, itemNameEnd + 4).readUInt16BE();
                    var slotId = buf.slice(itemNameEnd + 4, itemNameEnd + 5).readUInt8();
                    now = itemNameEnd + 5;
                    gcmd.push({
                        type: "replaceitem",
                        x: brushPosition[0],
                        y: brushPosition[1],
                        z: brushPosition[2],
                        slotId: slotId,
                        item: itemName,
                        count: count,
                        data: data
                    });
                    slotStr += `\ncSlotId: ${slotId}, Item: ${itemName}(data: ${data}, count:${count})`
                }
                i = now;
            } else if (cmd === 58) {
                return endConvert();
            } else {
                i = i + 1;
            }
            if (i >= buf.length) {
                return endConvert();
            }
            if (gcmd.length >= 10000) {
                // console.log("=====", i);
                if (optt === "mcfunction") {
                    toMcfunction();
                } else {
                    toSd();
                }
            }
        }
    }(bdxBody, 0);




    // console.log("Data Length ==>", bdxBody.length)
    console.log("\n");
    console.log("=========DataList=========");
    console.log("Errors(" + errors.length + ") ==> ", errors);
    console.log("Used Time ==>", (new Date().getTime() - time) / 1000 + "s");
    console.log("Success ==>", success);
    console.log("Output path ==>", path);
}

console.log("请输入文件名");
rl.on("line", (str) => {
    
    var spl = str.split(".");
    var suffixA = str
    var suffixB = spl[0]
    // var len;
    console.log(`${suffixA} ==> ${suffixB}.mcfunction`);

    // len = fs.readFileSync(spl[0]).length;
    // console.log("File length: " + len / 1000 + "kb");
    var outputType = "mcfunction";
    var path = __dirname + "/output/" + spl[0] + ".mcfunction";
    var input = __dirname + "/input/" + str;
    converts.push(str);
    pbdx(outputType, path, input, `true`);
})



