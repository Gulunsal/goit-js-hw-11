/* empty css                      */import{S as u,i as c}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const f="46156340-afe2d6dd24e461f249d973066",y="https://pixabay.com/api/",i=document.getElementById("image-modal"),g=document.getElementById("modal-img"),m=document.getElementsByClassName("close")[0],a=document.getElementById("loader"),d=document.getElementById("gallery");let p=new u(".gallery-item");(!i||!g||!m||!a)&&console.error("Modal veya loader öğeleri bulunamadı. Lütfen HTML yapınızı kontrol edin.");document.getElementById("search-form").addEventListener("submit",function(n){n.preventDefault();const o=document.getElementById("query").value.trim();o?h(o):c.error({message:"Lütfen bir arama terimi girin!"})});async function h(n){const o=`${y}?key=${f}&q=${encodeURIComponent(n)}&image_type=photo&orientation=horizontal&safesearch=true`;a.style.display="block";try{const e=await fetch(o);if(!e.ok)throw new Error(`API yanıtı başarısız oldu: ${e.status}`);const s=await e.json();if(s.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!"}),a.style.display="none";return}I(s.hits)}catch(e){c.error({message:"Görseller alınırken bir hata oluştu. Lütfen tekrar deneyin."}),console.error("API Hatası:",e)}finally{a.style.display="none"}}function I(n){d.innerHTML="";const o=n.map(e=>`
      <a href="${e.largeImageURL}" class="gallery-item">
        <div class="image-card">
          <img src="${e.webformatURL}" alt="${e.tags}" class="gallery-image" />
          <div class="image-info">
            <p><strong>Beğeniler:</strong> ${e.likes}</p>
            <p><strong>Görüntüleme:</strong> ${e.views}</p>
            <p><strong>Yorumlar:</strong> ${e.comments}</p>
            <p><strong>İndirmeler:</strong> ${e.downloads}</p>
          </div>
        </div>
      </a>
    `).join("");d.innerHTML=o,p.refresh()}m.onclick=function(){i.style.display="none"};window.onclick=function(n){n.target===i&&(i.style.display="none")};
//# sourceMappingURL=index.js.map
