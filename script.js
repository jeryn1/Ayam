// Product Data
const products = [
    {
        id: 1,
        name: "Ayam Karkas",
        price: 35000,
        image: "images/karkas.jpg"
    },
    {
        id: 2,
        name: "Ayam Potong 9",
        price: 38000,
        image: "images/potong9.jpg"
    },
    {
        id: 3,
        name: "Ayam Potong 12",
        price: 40000,
        image: "images/potong12.jpg"
    },
    {
        id: 4,
        name: "Ayam Potong 14",
        price: 42000,
        image: "images/potong14.jpg"
    },
    {
        id: 5,
        name: "Sayap",
        price: 32000,
        image: "images/sayap.jpg"
    },
    {
        id: 6,
        name: "BLD (Breast Fillet)",
        price: 45000,
        image: "images/bld.jpg"
    },
    {
        id: 7,
        name: "Usus",
        price: 28000,
        image: "images/usus.jpg"
    },
    {
        id: 8,
        name: "Ceker",
        price: 30000,
        image: "images/ceker.jpg"
    },
    {
        id: 9,
        name: "Ati",
        price: 25000,
        image: "images/ati.jpg"
    },
    {
        id: 10,
        name: "Paha Bawah",
        price: 33000,
        image: "images/paha-bawah.jpg"
    },
    {
        id: 11,
        name: "Paha Atas",
        price: 34000,
        image: "images/paha-atas.jpg"
    }
];

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID').format(amount);
}

// Render Products
function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">Rp ${formatCurrency(product.price)} / kg</p>
                <button class="btn-order" onclick="openModal(${product.id})">
                    Pesan Sekarang
                </button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Modal Functions
let selectedProduct = null;

function openModal(productId) {
    selectedProduct = products.find(p => p.id === productId);
    
    document.getElementById('modalProductImage').src = selectedProduct.image;
    document.getElementById('modalProductName').textContent = selectedProduct.name;
    document.getElementById('modalProductPrice').textContent = formatCurrency(selectedProduct.price);
    document.getElementById('qty').value = 1;
    updateTotal();
    
    document.getElementById('orderModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
    document.getElementById('orderForm').reset();
}

// Update Total Price
function updateTotal() {
    const qty = parseInt(document.getElementById('qty').value) || 0;
    const total = qty * selectedProduct.price;
    document.getElementById('total').value = 'Rp ' + formatCurrency(total);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    
    // Close modal when clicking X
    document.querySelector('.close').addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('orderModal');
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Update total when qty changes
    document.getElementById('qty').addEventListener('input', updateTotal);
    
    // Handle form submission
    document.getElementById('orderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const qty = document.getElementById('qty').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const total = qty * selectedProduct.price;
        
        // Create WhatsApp message
        const message = `Halo, saya ingin memesan:

*Produk:* ${selectedProduct.name}
*Jumlah:* ${qty} kg
*Harga per kg:* Rp ${formatCurrency(selectedProduct.price)}
*Total:* Rp ${formatCurrency(total)}

*Data Pembeli:*
Nama: ${name}
No. HP: ${phone}
Alamat: ${address}

Terima kasih!`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Open WhatsApp
        const whatsappUrl = `https://wa.me/6281322363337?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        
        closeModal();
    });
});