function $(selector){
  var querySelectorAll = document.querySelectorAll.bind(document);
  return Array.prototype.slice.apply(querySelectorAll(selector));
}

$.ready = document.addEventListener.bind(document, 'DOMContentLoaded');

function dataAttrMapper(dataAttrName){
  return function(map, template){
    var name  = template.getAttribute('data-' + dataAttrName);
    map[name] = template;
    map.names.push(name);
    return map;
  };
}

function NodeMap(){ this.names = []; }

$.ready(function(){
  var sparseNodes = $('layout[data-template]').reduce(dataAttrMapper('template'), new NodeMap());
  var templates   = $('template[data-name]'  ).reduce(dataAttrMapper('name'    ), new NodeMap());


  sparseNodes.names.forEach(function(name){
    var container     = sparseNodes[name];
    var shadowRoot    = container.createShadowRoot();
    var template      = templates[name];
    var templateClone = document.importNode(template.content, true);

    shadowRoot.appendChild(templateClone);
  });
});
