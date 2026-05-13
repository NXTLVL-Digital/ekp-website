/* Mobile drawer toggle + scroll shadow on nav */
(function(){
  function $(s){return document.querySelector(s)}
  var toggle = $('.menu-toggle');
  var drawer = $('.mobile-drawer');
  var scrim  = $('.scrim');
  var nav    = $('.nav-bar');

  function close(){
    drawer && drawer.classList.remove('open');
    scrim && scrim.classList.remove('open');
    toggle && toggle.classList.remove('open');
    document.body.style.overflow = '';
  }
  function open(){
    drawer && drawer.classList.add('open');
    scrim && scrim.classList.add('open');
    toggle && toggle.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  if (toggle){
    toggle.addEventListener('click', function(e){
      e.preventDefault();
      if (drawer.classList.contains('open')) close(); else open();
    });
  }
  if (scrim) scrim.addEventListener('click', close);
  if (drawer){
    drawer.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', close);
    });
  }
  window.addEventListener('keydown', function(e){
    if (e.key === 'Escape') close();
  });

  /* nav shadow on scroll */
  if (nav){
    var onScroll = function(){
      if (window.scrollY > 8) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }
})();
