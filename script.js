const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const galleries = { smiles: [1,2,3,4,5,6,7,11], visits: [8,9,10] };
for (const [id, photos] of Object.entries(galleries)) {
  const gallery = document.getElementById(id);
  const track = gallery.querySelector('.track');
  const group = document.createElement('div');
  group.className = 'group';
  photos.forEach((number, i) => {
    const img = document.createElement('img');
    img.src = `assets/foto-${number}.jpg`;
    img.alt = id === 'smiles' ? `Fotografía de sonrisa compartida por Dental del Real ${i + 1}` : `Visita a la clínica Dental del Real ${i + 1}`;
    img.width = id === 'smiles' ? 300 : 230;
    img.height = id === 'smiles' ? 310 : 300;
    img.loading = id === 'smiles' && i < 2 ? 'eager' : 'lazy';
    img.decoding = 'async';
    group.append(img);
  });
  track.append(group);
  const duplicate = group.cloneNode(true);
  duplicate.setAttribute('aria-hidden', 'true');
  duplicate.querySelectorAll('img').forEach(img => img.alt = '');
  track.append(duplicate);
}
document.querySelectorAll('.motion-toggle').forEach(button => {
  const gallery = document.getElementById(button.dataset.gallery);
  button.addEventListener('click', () => {
    const paused = gallery.classList.toggle('paused');
    button.setAttribute('aria-pressed', String(paused));
    button.innerHTML = paused ? 'Reanudar galería <span aria-hidden="true">▷</span>' : 'Pausar galería <span aria-hidden="true">Ⅱ</span>';
  });
});
function syncMotionPreference() {
  document.querySelectorAll('.motion-toggle').forEach(button => button.hidden = reducedMotion.matches);
}
reducedMotion.addEventListener('change', syncMotionPreference);
syncMotionPreference();
// Appointment link stays beside the clinic's existing social contacts.
const booking=document.createElement('a');
booking.href='https://www.doctoralia.com.mx/perfil/jose-francisco-del-real-garcia';
booking.target='_blank';booking.rel='noopener noreferrer';booking.className='doctoralia';
booking.setAttribute('aria-label','Agendar cita en Doctoralia');booking.title='Agendar cita en Doctoralia';
booking.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-13 5 3 3 5-5"/></svg><span>Doctoralia</span>';
document.querySelector('.socials').append(booking);
const card=document.querySelector('.card');
card.addEventListener('pointermove',event=>{
 if(reducedMotion.matches||event.pointerType!=='mouse')return;
 const box=card.getBoundingClientRect();
 card.style.setProperty('--light-x',`${(event.clientX-box.left)/box.width*100}%`);
 card.style.setProperty('--light-y',`${(event.clientY-box.top)/box.height*100}%`);
});
card.addEventListener('pointerleave',()=>{card.style.removeProperty('--light-x');card.style.removeProperty('--light-y');});
const entranceObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
 if(entry.isIntersecting){entry.target.classList.add('entered');entranceObserver.unobserve(entry.target);}
}),{threshold:.08});
document.querySelectorAll('.gallery-section,.services,.location').forEach(section=>{section.classList.add('entrance');entranceObserver.observe(section);});
