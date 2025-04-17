import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [translatedProducts, setTranslatedProducts] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Ürün verileri alınamadı.");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Ürün verileri alınamadı: " + err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        if (!response.ok) {
          throw new Error("Döviz kuru alınamadı.");
        }
        const data = await response.json();

        if (data && data.rates && data.rates.TRY) {
          setExchangeRate(data.rates.TRY);
        } else {
          throw new Error("TL kuru bulunamadı.");
        }
      } catch (err) {
        setError("Döviz kuru alınamadı: " + err.message);
        setLoading(false);
      }
    };
    fetchExchangeRate();
  }, []);


  useEffect(() => {
    const translateAll = async () => {

      if (products.length > 0 && exchangeRate) {
        try {
          const allTranslated = await Promise.all(
            products.map(async (product) => {
           
              const encodedTitle = encodeURIComponent(product.title);
              const titleRes = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodedTitle}&langpair=en|tr&mt=1&onlyprivate=0&de=test@test.com`
              );
              const titleData = await titleRes.json();
           
              let rawTitle = titleData?.responseData?.translatedText || product.title;

            
              rawTitle = sanitizeMyMemoryText(rawTitle, product.title);

            
              const encodedCategory = encodeURIComponent(product.category);
              const categoryRes = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodedCategory}&langpair=en|tr&mt=1&onlyprivate=0&de=test@test.com`
              );
              const categoryData = await categoryRes.json();
              let rawCategory = categoryData?.responseData?.translatedText || product.category;

            
              rawCategory = sanitizeMyMemoryText(rawCategory, product.category);

             
              const priceTL = (product.price * exchangeRate).toFixed(2);

              return {
                ...product,
                translatedTitle: rawTitle,
                translatedCategory: rawCategory,
                priceTL,
              };
            })
          );

          setTranslatedProducts(allTranslated);
          setLoading(false);
        } catch (err) {
          setError("Çeviri başarısız: " + err.message);
          setLoading(false);
        }
      }
    };
    translateAll();
  }, [products, exchangeRate]);



  const sanitizeMyMemoryText = (translatedText, fallback) => {

    const disclaimers = [
      "UYARI", 
      "TÜM HAKLARI", 
      "ALL RIGHTS",
      "AÇIKLAMA",
      "DISCLAI",
      "SORUMLULUK"
    ];

    let cleaned = translatedText;


    for (let d of disclaimers) {
      if (cleaned.toUpperCase().includes(d)) {
    
        const idx = cleaned.toUpperCase().indexOf(d);
        cleaned = cleaned.substring(0, idx).trim();

       
        if (!cleaned) {
          return fallback;
        }
      }
    }

  
    return cleaned;
  };

 
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        🔄 Ürünler Yükleniyor, Lütfen Bekleyiniz...
      </div>
    );
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  
  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "40px", fontSize: "36px", color: "#333" }}>
        🛍️ Ürün Listesi
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "30px",
        }}
      >
        {translatedProducts.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.2s",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "120px", height: "150px", objectFit: "contain", marginBottom: "20px" }}
            />
            <h2 style={{ fontSize: "18px", marginBottom: "10px", color: "#222", textAlign: "center" }}>
              {product.translatedTitle}
            </h2>
            <p style={{ fontSize: "14px", marginBottom: "5px", color: "#777" }}>
              <strong>Kategori:</strong> {product.translatedCategory}
            </p>
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "#28a745" }}>
              {product.priceTL} TL
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
