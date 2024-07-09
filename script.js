// Array of phones
const phones = [
    {
        brand: 'Samsung',
        model: 'S20',
        ram: 8,
        rom: 256,
        camera: '20 megapixel',
        price: 15000
    },
    {
        brand: 'Xiomi',
        model: 'note10',
        ram: 4,
        rom: 64,
        camera: '10 megapixel',
        price: 15000
    },
    {
        brand: 'Infinix',
        model: 'z10',
        ram: 2,
        rom: 16,
        camera: '5 megapixel',
        price: 15000
    },
    {
        brand: 'Tecno',
        model: 'spark10',
        ram: 12,
        rom: 512,
        camera: '25 megapixel',
        price: 15000
    },
    {
        brand: 'Iphone',
        model: '14',
        ram: 4,
        rom: 1024,
        camera: '30 megapixel',
        price: 15000
    },
    {
        brand: 'Oppo',
        model: 'F11',
        ram: 8,
        rom: 256,
        camera: '20 megapixel',
        price: 15000
    },
    {
        brand: 'Vivo',
        model: 'y20',
        ram: 4,
        rom: 64,
        camera: '8 megapixel',
        price: 15000
    },
    {
        brand: 'Iphone 13',
        model: 's50',
        ram: 50,
        rom: 1024,
        camera: '60 megapixel',
        price: 300000
    }
];

// Get container to display phones
const div = document.querySelector('.containers');
const cartNotification = document.getElementById('cart-notification');

// Initialize cart array from localStorage or empty array
const cartData = localStorage.getItem('cartItem');
const cartArr = Array.isArray(JSON.parse(cartData)) ? [...JSON.parse(cartData)] : [];

// Render phones on the main page
function renderPhones() {
    div.innerHTML = ''; // Clear existing content
    phones.forEach((phone, index) => {
        div.innerHTML += `
            <div class="phone-card">
                <p><span class="font-bold">Brand:</span> ${phone.brand}</p>
                <p><span class="font-bold">Model:</span> ${phone.model}</p>
                <p><span class="font-bold">RAM:</span> ${phone.ram} GB</p>
                <p><span class="font-bold">ROM:</span> ${phone.rom} GB</p>
                <p><span class="font-bold">Camera:</span> ${phone.camera}</p>
                <p><span class="font-bold">Price:</span> ${phone.price} PKR</p>
                <button onclick='addToCart(${index})' class="add-to-cart-btn">Add to Cart</button>
            </div>
        `;
    });
}

// Function to add phone to cart
function addToCart(index) {
    const selectedPhone = phones[index];
    const cartData = localStorage.getItem('cartItem');
    const cartArr = cartData ? JSON.parse(cartData) : [];

    const existingItem = cartArr.find(item => item.brand === selectedPhone.brand && item.model === selectedPhone.model);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        selectedPhone.quantity = 1;
        cartArr.push(selectedPhone);
    }

    localStorage.setItem('cartItem', JSON.stringify(cartArr));

    // Show notification or feedback
    Swal.fire({
        position: 'middle',
        icon: 'success',
        title: 'Item added to cart successfully',
        showConfirmButton: false,
        timer: 1500
    });

    updateCartIcon(); // Update cart icon or notification in main page
}

// Update cart icon and notification count
function updateCartIcon() {
    const totalItems = cartArr.reduce((total, item) => total + item.quantity, 0);
    cartNotification.textContent = totalItems;
    cartNotification.style.display = 'inline-block'; // Show notification count
    setTimeout(() => {
        cartNotification.style.display = 'none'; // Hide notification count after 1.5 seconds
    }, 1500);
}

// Show notification count
function showNotification(quantity) {
    cartNotification.textContent = quantity;
    cartNotification.style.display = 'inline-block'; // Show notification count
    setTimeout(() => {
        cartNotification.style.display = 'none'; // Hide notification count after 1.5 seconds
    }, 1500);
}

// Initial render of phones
renderPhones();
