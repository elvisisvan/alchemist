var game = {
    world: $(document.body),
    element: function(c){
      var e = $('<i class='+c+'>');
      e.on('click', game.click);
      c = c[0].toUpperCase() + c.slice(1);
      e.attr('title', c);  
      return e;
    },
    state: 'start',
    fuse: function(){
      if(game.fusion && !$('.'+game.fusion).length) {
        game.world.css({
          'background': 'url('+game.bkg+')'
        });      
        game.fusionE = game.element(game.fusion);
        var e = game.fusionE;
        e.css('opacity', 0);
        game.leftE.css('left', '+=75');
        pos = game.rightE.offset();
        game.rightE.css('left', '-=75');      
        game.world.append(e);
        $('i').addClass('fusion');
        var pos = e.offset();
        e.css({
          top: -pos.top + 10, 
          left: -pos.left + 80
        });
        e.addClass('mid');
        setTimeout(game.show, 1500);      
      } else {      
        game.replace();
        game.clean();
      }
    },
    show: function(){    
      game.replace();    
      game.fusionE.css({
        'opacity': 1,
        'box-shadow': '0 0 50px 25px #abf'
      });
      var p = $('progress').attr('value');
      $('progress').attr('value', ++p);
      setTimeout(game.place, 1500);
    },
    place: function(){
      game.fusionE.removeClass('mid');
      game.fusionE.css('box-shadow', '');
      var pos = game.fusionE.offset();
      game.fusionE.css({top: 0, left: 0});     
      game.clean();
    },
    replace: function(){
      game.leftE.removeClass('left');
      game.leftE.css({top: 0, left: 0});
      game.rightE.removeClass('right');
      game.rightE.css({top: 0, left: 0});
    },
    clean: function(){
      game.world.css('background', '#ddd');
      game.state = 'start';
      $('i').removeClass('fusion');    
      game.world.animate({
        scrollTop: game.world.height()
      }, 'slow');
      game.fusion = 0;
      game.left = 0;    
      game.leftE = 0;
      game.right = 0;     
      game.rightE = 0;
    },
    click: function(){
      var e = $(this), c = e.attr('class');
      switch(game.state){
        case 'start': //first element
          game.world.animate({
            scrollTop: 0
          }, 'slow');
          var pos = e.offset();
          e.css({
            top: -pos.top + 10, 
            left: -pos.left + 10
          });
          e.addClass('left');
          game.left = c;
          game.leftE = e;
          game.state = 'left';      
          break;
        case 'left':  //reset
          if(e.hasClass('left')) {
            game.world.animate({
              scrollTop: e.position().top
            }, 'slow');
            e.removeClass('left');
            e.css({top: 0, left: 0});
            game.state = 'start';
          } else { //second element
            game.world.css('background', '#666');
            e.addClass('right');
            var pos = e.offset();
            e.css({
              top: -pos.top + 10, 
              left: -pos.left + 160
            });
            game.right = c;
            game.rightE = e;
            game.state = 'fusion';
            if(game.combos[game.left] && game.combos[game.left][game.right])          
              game.fusion = game.combos[game.left][game.right];
            else if(game.combos[game.right] && game.combos[game.right][game.left])
              game.fusion = game.combos[game.right][game.left];
            setTimeout(game.fuse, 1500);
          }
          break;     
      }
    },
    load: function(){
      //preload
      var img = new Image();
      game.bkg = 'http://media.giphy.com/media/dnoyd6rMvw29q/giphy.gif';
      img.src = game.bkg;
      //names and tooltips
      $('i').each(function(n){
        var e = $(this), c = e.attr('class');
        c = c[0].toUpperCase() + c.slice(1);
        e.attr('title', c);     
      }).on('click', game.click);
    },
    combos: {
      earth: {
        water: 'swamp',
        air: 'dust',
        fire: 'lava',
        moss: 'grass',
        seed: 'tree',
        weed: 'mushroom',
        energy: 'earthquake'
      },
      fire: {
        air: 'energy',
        dust: 'ash',
        stone: 'metal',
        sand: 'glass',
        clay: 'brick',
        tree: 'coal',
        weed: 'bob',
        energy: 'light'
      },
      water: {
        stone: 'sand',
        air: 'steam',
        fire: 'steam',
        wind: 'storm',
        lava: 'stone',
        life: 'weed',
        energy: 'wave'
      },
      air: {
        lava: 'stone',
        energy: 'wind',  
        steam: 'sky'
      },
      swamp: {
        sand: 'clay',
        energy: 'life',
        weed: 'moss'
      },
      energy: {
        metal: 'electricity'
      },
      life: {
        sand: 'seed',
        bob: 'reggae'
      }
    },
  };
  game.load();