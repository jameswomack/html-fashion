var querySelectorAll = document.querySelectorAll.bind(document);


function $(selector){
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


$.ready(function(){
  var sparseNodes = $('[data-template]'    ).reduce(dataAttrMapper('template'), {names:[]});
  var templates   = $('template[data-name]').reduce(dataAttrMapper('name'    ), {names:[]});


  sparseNodes.names.forEach(function(name){
    var shadowRoot    = sparseNodes[name].createShadowRoot();
    var template      = templates[name];
    var templateClone = document.importNode(template.content, true);

    shadowRoot.appendChild(templateClone);
  });
});
