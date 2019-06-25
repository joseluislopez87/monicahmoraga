define(function(require) {

    var ITEM_TEMPLATE = "<article class='item added'><h1 class='font-gamma'>{{number}}</h1><p>{{content}}</p></article>";
    
    var photoTemplate = 
    "<div class=\"item\">\
        <div class=\"animate-box\">\
            <a href=\"images/[filename]\" class=\"image-popup mhm-board-img\" title=\"[title]\">\
                <img src=\"images/[filename]\" alt=\"[title]\">\
            </a>\
            [description]\
        </div>\
    </div>";

    var paragraph_list = [
      "Poi ch'ei posato un poco il corpo lasso, ripresi via per la piaggia diserta, sì che 'l piè fermo sempre era 'l più basso.",
      "Ed ecco, quasi al cominciar de l'erta, una lonza leggiera e presta molto, che di pel macolato era coverta;",
      "e non mi si partia dinanzi al volto, anzi 'mpediva tanto il mio cammino, ch'i' fui per ritornar più volte vòlto.",
      "Temp'era dal principio del mattino, e 'l sol montava 'n sù con quelle stelle ch'eran con lui quando l'amor divino",
      "mosse di prima quelle cose belle; sì ch'a bene sperar m'era cagione di quella fiera a la gaetta pelle"
    ];
  
    var itemCount = 7;
  
    function add_post(mode) {
      var paragraph = paragraph_list.splice(0, 1);
      var content = ITEM_TEMPLATE.replace(/\{\{(\w+)\}\}/g, function (match, g1) {
          switch (g1) {
            case 'number':
              return ++itemCount;
            break;
            case 'content':
              return paragraph;
            break;
          }
      });
      var item = document.createElement('article');
  
      salvattore[mode+'_elements'](grid, [item]);
  
      item.outerHTML = content;
  
      if (!paragraph_list.length) {
        buttonBlock.classList.add('hide');
      }
    }

    function add_images() {
        $.each( photos, function( index, photo ){
            var photoCode = photoTemplate.replace(/\[filename\]/g, photo.filename);
            photoCode = photoCode.replace(/\[title\]/g, (photo.title === undefined ? '' : photo.title));
            if(photo.description !== undefined){
                var descriptionCode = "<div class=\"mhm-desc\">"+photo.description+"</div>"
                photoCode = photoCode.replace(/\[description\]/g,descriptionCode);
            }else{
                photoCode = photoCode.replace(/\[description\]/g,"");
            }
            var item = document.createElement('div');
            salvattore['append_elements'](board, [item]);
            item.outerHTML = photoCode;
            //salvattore.appendElements(board, [photoCode]);
            //board.append(photoCode);
        });
        
      }
  
    function prepend_post (event) {
      add_post('prepend');
    }
  
    function append_post (event) {
      add_post('append');
    }

    function append_image (event) {
        add_post('append');
      }
  
    var salvattore = require('salvattore');
  
    var grid = document.querySelector('.test-grid-b');
    var board = document.querySelector('#mhm-board');
    var prependButton = document.querySelector('.post-prepend');
    var appendButton = document.querySelector('.post-append');
    var buttonBlock = document.querySelector('#js-button-block');
  
    appendButton.addEventListener('click', append_post);
    prependButton.addEventListener('click', prepend_post);
  });