// Alternador de tema (dark / light)
// Persiste a escolha em localStorage e aplica a classe `light` no <body>.

(function(){
  const storageKey = 'theme';
  const toggleId = 'theme-toggle';
  const body = document.body;
  const btn = document.getElementById(toggleId);

  if(!btn) return;

  // Aplica tema baseado no localStorage ou na preferência do sistema
  function applyInitialTheme(){
    const stored = localStorage.getItem(storageKey);
    if(stored === 'light'){
      body.classList.add('light');
      btn.classList.add('is-light');
      btn.setAttribute('aria-pressed','true');
    } else if(stored === 'dark'){
      body.classList.remove('light');
      btn.classList.remove('is-light');
      btn.setAttribute('aria-pressed','false');
    } else {
      // sem valor salvo: usa preferência do sistema
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      if(prefersLight){
        body.classList.add('light');
        btn.classList.add('is-light');
        btn.setAttribute('aria-pressed','true');
      } else {
        body.classList.remove('light');
        btn.classList.remove('is-light');
        btn.setAttribute('aria-pressed','false');
      }
    }
  }

  function toggleTheme(){
    const isLight = body.classList.toggle('light');
    btn.classList.toggle('is-light', isLight);
    if(isLight){
      localStorage.setItem(storageKey,'light');
      btn.setAttribute('aria-pressed','true');
    } else {
      localStorage.setItem(storageKey,'dark');
      btn.setAttribute('aria-pressed','false');
    }
  }

  btn.addEventListener('click', toggleTheme);

  // inicializa
  applyInitialTheme();

  // opcional: escuta mudanças na preferência do sistema e aplica se o usuário não tiver uma escolha explícita
  window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    const stored = localStorage.getItem(storageKey);
    if(!stored){
      if(e.matches){
        body.classList.add('light');
        btn.classList.add('is-light');
        btn.setAttribute('aria-pressed','true');
      } else {
        body.classList.remove('light');
        btn.classList.remove('is-light');
        btn.setAttribute('aria-pressed','false');
      }
    }
  });
})();
