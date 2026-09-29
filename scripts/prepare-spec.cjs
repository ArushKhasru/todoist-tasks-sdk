const fs = require('node:fs');
const source = JSON.parse(fs.readFileSync('specs/todoist.upstream.json','utf8'));
const paths = Object.fromEntries(['/api/v1/tasks','/api/v1/tasks/{task_id}'].map(p=>[p,source.paths[p]]));
const schemas = {};
function collect(value) {
 if (!value || typeof value !== 'object') return;
 if (typeof value.$ref === 'string') {
  const prefix = '#/components/schemas/';
  if (!value.$ref.startsWith(prefix)) throw new Error('Unexpected reference '+value.$ref);
  const name = value.$ref.slice(prefix.length);
  if (!(name in schemas)) { schemas[name] = source.components.schemas[name]; if (!schemas[name]) throw new Error('Missing '+name); collect(schemas[name]); }
 }
 for (const item of Object.values(value)) collect(item);
}
collect(paths);
const spec = {openapi:source.openapi,info:{title:'Todoist Tasks',version:source.info.version,description:'Unofficial task-only SDK assessment. Source: https://developer.todoist.com/openapi.json. Not created by, affiliated with, or supported by Todoist.'},servers:source.servers,security:[{bearerAuth:[]}],paths,components:{schemas,securitySchemes:{bearerAuth:{type:'http',scheme:'bearer'}}}};
fs.writeFileSync('specs/todoist.tasks.json',JSON.stringify(spec,null,2)+'\n');
console.log(JSON.stringify({paths:Object.keys(paths),schemas:Object.keys(schemas),operations:Object.values(paths).flatMap(p=>Object.keys(p))},null,2));
