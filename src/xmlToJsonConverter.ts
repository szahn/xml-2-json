import {SaxesParser} from 'saxes';

function parseXml(xml){

  return new Promise((res, rej) => {
      let _root = null, _path = null, _id = 0;

      const parser = new SaxesParser({position: true});

      parser.onerror = (e) => console.error(e);

      parser.onclosetag = () => _path.pop();

      parser.onend = () => res(_root);

      parser.ontext = (t) => {
        if (!_path || !_path.length) return;
        _path[_path.length - 1].value +=t;
      };

      parser.onopentag = node => {
          try{
              const {name, attributes} = node;
          
              const el = {
                  id: ++_id,
                  name: name,
                  children: [],
                  value : '',
                  attributes: []
              };

              for (const key of Object.keys(attributes)) {
                  el.attributes.push({name: key, value: attributes[key]});
              }

              if (!_root) {
                  _root = el;
                  _path = [_root];
              }
              else{
                  _path[_path.length - 1].children.push(el);
                  _path.push(el);
              }
          }
          catch (err){
              rej(new Error(`Error in ${parser.line}:${parser.column}:${parser.position}: ${err}`));
          }
      };
      
          
      parser.write(xml).close();

  });
}

function toJson(root) {
    const traverse = (src) => {

      const isSingle = !src.children || !src.children.length;
      const hasAttrs = src.attributes && src.attributes.length;

      if (isSingle && !hasAttrs) {
        return src.value;
      }

      const objResult : any = {};

      if (hasAttrs) {      
        const attrs = src.attributes;
        for(var i = attrs.length - 1; i >= 0; i--) {
          const propName = attrs[i].name;
          objResult[propName] = attrs[i].value;
        }
      }

      if (isSingle){
        objResult.value = src.value;
        return objResult;
      }
    
      for (let child of src.children) { 
        const {name} = child;
        if (name in objResult) {
          continue;
        }
  
        let siblings = src.children.filter(eachChild => eachChild.id !== child.id && eachChild.name === name);

        const childResult = traverse(child);
        objResult[name] = (siblings.length) ? [childResult, ...siblings.map(sibling => traverse(sibling))] : childResult;        
      }
  
      return objResult;        
    };

    return traverse(root);
}

export default async (xml) => toJson(await parseXml(xml));
 