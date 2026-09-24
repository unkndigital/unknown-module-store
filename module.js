"use strict";
const fs=require("fs"),path=require("path"),cp=require("child_process");
function main(action,args,data){
  if(!data||!path.isAbsolute(data)||!fs.lstatSync(data).isDirectory()||fs.lstatSync(data).isSymbolicLink())throw Error("Private module data directory required");
  if(!args||typeof args!=="object"||Array.isArray(args)||Object.keys(args).length)throw Error("Unexpected Store arguments");
  const file=path.join(data,"active.json");
  function active(){try{const s=fs.lstatSync(file);if(!s.isFile()||s.isSymbolicLink()||s.size>256)throw Error("Invalid Store marker");return JSON.parse(fs.readFileSync(file,"utf8")).active===true;}catch(e){if(e.code==="ENOENT")return false;throw e;}}
  if(action==="enable"){const temp=file+"."+process.pid+".tmp";fs.writeFileSync(temp,JSON.stringify({active:true}),{flag:"wx",mode:0o600});fs.renameSync(temp,file);}
  else if(action==="disable"){if(active())fs.unlinkSync(file);}
  else if(action==="reconcile"){if(!active())throw Error("Store activation marker missing");}
  else if(action==="openStore"){
    if(!active())throw Error("Store is disabled");
    const reply=JSON.parse(cp.execFileSync("/usr/bin/luna-send-pub",["-n","1","-w","5000","luna://com.webos.applicationManager/launch",JSON.stringify({id:"org.unknown.core",params:{coreView:"store"}})],{encoding:"utf8",timeout:6000,maxBuffer:16384}));
    if(reply.returnValue===false)throw Error(reply.errorText||"Could not open Unknown Core");
  }else if(!["catalog","status","health"].includes(action))throw Error("Unknown Store action");
  const catalog=JSON.parse(fs.readFileSync(path.join(__dirname,"catalog.json"),"utf8"));
  if(![1,2].includes(catalog.schemaVersion)||!Array.isArray(catalog.apps)||catalog.apps.length>64||catalog.schemaVersion===2&&(!Array.isArray(catalog.modules)||catalog.modules.length>64))throw Error("Invalid catalog");
  return Object.assign({returnValue:true,active:active(),healthy:active(),entries:catalog.apps.length,moduleEntries:(catalog.modules||[]).length},action==="catalog"?{catalog}:{});
}
if(require.main===module){try{process.stdout.write(JSON.stringify(main(process.argv[2],JSON.parse(process.argv[3]||"{}"),process.env.UNKNOWN_MODULE_DATA)));}catch(error){process.stdout.write(JSON.stringify({returnValue:false,errorText:error.message}));process.exitCode=1;}}
module.exports={main};
