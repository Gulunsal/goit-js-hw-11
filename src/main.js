import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"
import SimpleLightbox from "simplelightbox"
import "simplelightbox/dist/simple-lightbox.min.css"

// Pixabay API detayları
const API_KEY = '46156340-afe2d6dd24e461f249d973066' // API anahtarım 
const BASE_URL = 'https://pixabay.com/api/'

// Modal ve Loader öğelerini güvenli bir şekilde al
const modal = document.getElementById('image-modal')
const modalImg = document.getElementById('modal-img')
const closeModal = document.getElementsByClassName('close')[0]
const loader = document.getElementById('loader') // Loader'ı al
const gallery = document.getElementById('gallery')

// SimpleLightbox örneğini başlat
let lightbox = new SimpleLightbox('.gallery-item')

// Modal öğelerinin varlığını kontrol edelim
if (!modal || !modalImg || !closeModal || !loader) {
  console.error("Modal veya loader öğeleri bulunamadı. Lütfen HTML yapınızı kontrol edin.");
}

// Form gönderimi için event listener ekle
document.getElementById('search-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Sayfanın yeniden yüklenmesini engeller
  const query = document.getElementById('query').value.trim() // Arama terimi al

  if (query) {
    fetchImages(query) // Eğer arama terimi varsa API'den görüntüleri getir
  } else {
    iziToast.error({ message: "Lütfen bir arama terimi girin!" }) // Eğer boşsa uyarı ver
  }
})

// API'den veri alma işlemi
async function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;

  loader.style.display = 'block' // Loader'ı göster

  try {
    const response = await fetch(url) // API'ye istek gönder
    if (!response.ok) {
      throw new Error(`API yanıtı başarısız oldu: ${response.status}`)
    }

    const data = await response.json() // Yanıtı JSON'a dönüştür
    if (data.hits.length === 0) {
      iziToast.error({ message: "Sorry, there are no images matching your search query. Please try again!" });
      loader.style.display = 'none' // Loader'ı gizle
      return; // Eğer sonuç yoksa hata mesajı göster ve işlemi durdur
    }

    displayImages(data.hits) // Eğer sonuç varsa görselleri göster
  } catch (error) {
    iziToast.error({ message: "Görseller alınırken bir hata oluştu. Lütfen tekrar deneyin." });
    console.error("API Hatası:", error);
  } finally {
    loader.style.display = 'none' // İş tamamlandığında loader'ı gizle
  }
}

// Görselleri sayfada gösterme işlemi
function displayImages(images) {
  gallery.innerHTML = '' // Galeriyi temizle

  const galleryItems = images.map(image => {
    return `
      <a href="${image.largeImageURL}" class="gallery-item">
        <div class="image-card">
          <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" />
          <div class="image-info">
            <p><strong>Beğeniler:</strong> ${image.likes}</p>
            <p><strong>Görüntüleme:</strong> ${image.views}</p>
            <p><strong>Yorumlar:</strong> ${image.comments}</p>
            <p><strong>İndirmeler:</strong> ${image.downloads}</p>
          </div>
        </div>
      </a>
    `;
  }).join('')

  gallery.innerHTML = galleryItems; // Yeni sonuçları DOM'a ekle

  lightbox.refresh() // SimpleLightbox'ı güncelle ve yeni öğeleri tanı
}

// Modal penceresini kapatmak için X işaretine tıklama
closeModal.onclick = function() {
  modal.style.display = 'none'
}

// Modal dışına tıklayınca kapatma
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none'
  }
}
