# 🛍️ React Ürün Listesi Uygulaması

Bu proje, React kullanılarak oluşturulmuş basit bir e-ticaret ürün listesi uygulamasıdır. Bu uygulamada, farklı API'lerden veri çekme, verileri işleme ve kullanıcıya modern bir arayüzde sunma işlemleri gerçekleştirilmiştir.

<div align="center">
  <img 
    src="https://github.com/user-attachments/assets/7d89a77c-d740-4d5e-9ed1-61d6509b412a" 
    alt="Ürün Listesi Arayüzü" 
    style="max-width:80%; border-radius:10px; border:2px solid #e2e8f0; box-shadow: 0 6px 12px rgba(0,0,0,0.1);" 
  />
</div>

## 🎯 Proje Amacı

Bu projede aşağıdaki temel işlemler gerçekleştirilmektedir:
- **Veri Çekme:**  
  FakeStore API'si kullanılarak ürün verileri çekilmekte.
- **Metin Çevirisi:**  
  Ürün başlıkları ve kategori isimleri, MyMemory çeviri API'si kullanılarak İngilizceden Türkçeye çevrilmekte.
- **Döviz Kuru Dönüşümü:**  
  Ürünlerin orijinal USD cinsinden fiyatları, ExchangeRate API'si ile alınan TL kuru kullanılarak Türk Lirası'na dönüştürülmekte.
- **Kullanıcı Deneyimi:**  
  Yükleme (loading) ve hata durumları yönetilmekte, ve çevrilmiş ürün verileri modern bir tasarımla ekranda listelenmektedir.


  ## ✨ Proje Özellikleri
- **Ürün Verilerinin Çekilmesi:**  
   E‑ticaret servisi üzerinden ürün bilgileri dinamik olarak alınır.

- **Çeviri İşlemleri:**  
   Her ürünün `title` ve `category` bilgisi çeviri API’si ile Türkçeye çevrilir.  
   Gelen metinlerdeki gereksiz uyarı mesajları `sanitizeMyMemoryText` fonksiyonu ile temizlenir.

- **Döviz Kuru Entegrasyonu:**  
   Ürün fiyatları, alınan güncel döviz kuru kullanılarak Türk Lirası’na dönüştürülür.

- **Kullanıcı Arayüzü:**  
  Çevrilmiş ürün başlıkları, kategori isimleri ve TL fiyatları grid düzeninde modern bir tasarımla listelenir.

- **Hata ve Yükleme Yönetimi:**  
   API çağrıları sırasında oluşan hata durumları ve yüklenme aşamaları kullanıcıya anlaşılır geri bildirim mesajlarıyla iletilir.


  ## 💻 Kullanılan Teknolojiler
- **React**
- **JavaScript (ES6)**
- **CSS** (Temel stillendirme)






