// script.js — 交互行为：滚动动画、悬停反馈、导航切换、表单示例
(function(){
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Reveal on scroll using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  },{threshold:0.12});
  reveals.forEach(r=>io.observe(r));

  // Animate meter widths when visible
  const meters = document.querySelectorAll('.meter span');
  const meterObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.width = getComputedStyle(entry.target).getPropertyValue('--val');
      }
    })
  },{threshold:0.2});
  meters.forEach(m=>meterObserver.observe(m));

  // Nav toggle for mobile
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle&&navToggle.addEventListener('click', ()=>{
    if(navLinks.style.display==='flex') navLinks.style.display='none'; else navLinks.style.display='flex';
    navLinks.style.flexDirection='column';
    navLinks.style.gap='8px';
    navLinks.style.background='rgba(255,255,255,0.02)';
    navLinks.style.padding='10px';
    navLinks.style.borderRadius='10px';
  });

  // Small hover feedback for buttons
  document.querySelectorAll('.btn').forEach(b=>{
    b.addEventListener('mouseenter', ()=>b.style.transform='translateY(-3px)');
    b.addEventListener('mouseleave', ()=>b.style.transform='none');
  });

  // Fake form send
  window.sendForm = function(e){
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const name = data.get('name')||'匿名';
    const message = data.get('message')||'';
    // Simple feedback
    alert('感谢 ' + name + '，您的信息已发送（示例）。\n内容：'+message);
    form.reset();
  }
})();
