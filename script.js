const monthsData = [
    {
        name: "January",
        note: "Starting the year with you...",
        photos: ["https://placehold.co/400x400/png?text=Jan1", "https://placehold.co/400x400/png?text=Jan2", "https://placehold.co/400x400/png?text=Jan3"]
    },
    {
        name: "February",
        note: "The month of love...",
        photos: ["https://placehold.co/400x400/png?text=Feb1", "https://placehold.co/400x400/png?text=Feb2", "https://placehold.co/400x400/png?text=Feb3"]
    },
    {
        name: "March",
        note: "Spring memories...",
        photos: ["https://placehold.co/400x400/png?text=Mar1", "https://placehold.co/400x400/png?text=Mar2", "https://placehold.co/400x400/png?text=Mar3"]
    },
    {
        name: "April",
        note: "Blissful days...",
        photos: ["https://placehold.co/400x400/png?text=Apr1", "https://placehold.co/400x400/png?text=Apr2", "https://placehold.co/400x400/png?text=Apr3"]
    },
    {
        name: "May",
        note: "Sunshine and smiles...",
        photos: ["https://placehold.co/400x400/png?text=May1", "https://placehold.co/400x400/png?text=May2", "https://placehold.co/400x400/png?text=May3"]
    },
    {
        name: "June",
        note: "Halfway through our best year...",
        photos: ["https://placehold.co/400x400/png?text=Jun1", "https://placehold.co/400x400/png?text=Jun2", "https://placehold.co/400x400/png?text=Jun3"]
    },
    {
        name: "July",
        note: "Warm summer nights...",
        photos: ["https://placehold.co/400x400/png?text=Jul1", "https://placehold.co/400x400/png?text=Jul2", "https://placehold.co/400x400/png?text=Jul3"]
    },
    {
        name: "August",
        note: "Adventures together...",
        photos: ["https://placehold.co/400x400/png?text=Aug1", "https://placehold.co/400x400/png?text=Aug2", "https://placehold.co/400x400/png?text=Aug3"]
    },
    {
        name: "September",
        note: "Falling for you all over again...",
        photos: ["https://placehold.co/400x400/png?text=Sep1", "https://placehold.co/400x400/png?text=Sep2", "https://placehold.co/400x400/png?text=Sep3"]
    },
    {
        name: "October",
        note: "Cozy vibes...",
        photos: ["https://placehold.co/400x400/png?text=Oct1", "https://placehold.co/400x400/png?text=Oct2", "https://placehold.co/400x400/png?text=Oct3"]
    },
    {
        name: "November",
        note: "Thankful for you...",
        photos: ["https://placehold.co/400x400/png?text=Nov1", "https://placehold.co/400x400/png?text=Nov2", "https://placehold.co/400x400/png?text=Nov3"]
    },
    {
        name: "December",
        note: "Ending the year on a high note...",
        photos: ["https://placehold.co/400x400/png?text=Dec1", "https://placehold.co/400x400/png?text=Dec2", "https://placehold.co/400x400/png?text=Dec3"]
    }
];

let currentMonthIndex = 0;

// Elements
const landingPage = document.getElementById('landing-page');
const timelinePopup = document.getElementById('timeline-popup');
const startBtn = document.getElementById('start-btn');

const monthNameEl = document.getElementById('month-name');
const monthNoteEl = document.getElementById('month-note');
const photosGridEl = document.getElementById('photos-grid');
const nextBtn = document.getElementById('next-btn');

const letterModal = document.getElementById('letter-modal');
const openEnvelopeBtn = document.getElementById('open-envelope-btn');

// Start Button Interaction
startBtn.addEventListener('click', () => {
    landingPage.style.opacity = 0;
    setTimeout(() => {
        landingPage.classList.add('hidden');
        timelinePopup.classList.remove('hidden');
        loadMonth(0);
    }, 500);
});

// Load Data for Month
function loadMonth(index) {
    const data = monthsData[index];

    // Animate text change
    monthNameEl.style.opacity = 0;
    monthNoteEl.style.opacity = 0;
    photosGridEl.style.opacity = 0;

    setTimeout(() => {
        monthNameEl.textContent = data.name;
        monthNoteEl.textContent = data.note;

        // Clear and rebuild photos
        photosGridEl.innerHTML = '';
        const photoCount = data.photos.length || 3; // Default to 3 if empty

        // Render photos as a stack (Reverse order so first index is on TOP)
        // We render from last to first in DOM order?? 
        // No, absolute positioning: late elements are on top. 
        // So render index 0 last to be on top? 
        // Actually, z-index is easier. Let's render all.

        // Clear logic
        photosGridEl.innerHTML = '';
        const photoCount = data.photos.length || 3;

        // We render index 0 LAST so it sits on top if we rely on DOM order,
        // OR we set z-index. Let's do z-index.
        for (let i = 0; i < photoCount; i++) {
            const div = document.createElement('div');
            div.className = 'photo-placeholder';

            // Image
            if (data.photos[i]) {
                div.style.backgroundImage = `url(${data.photos[i]})`;
            } else {
                div.style.background = `white`; // Fallback
            }

            // Stacking: Index 0 should be highest Z.
            div.style.zIndex = 100 - i;

            // Random tiny rotation for realism
            const randomRot = Math.random() * 6 - 3; // -3 to 3 deg
            div.style.transform = `rotate(${randomRot}deg)`;

            // Add Swipe Logic
            makeSwipeable(div);

            photosGridEl.appendChild(div);
        }

        // Logic for last slide
        if (index === monthsData.length - 1) {
            nextBtn.textContent = 'Open Message ❤️';
        } else {
            nextBtn.textContent = 'Next Month \u2192';
        }

        monthNameEl.style.opacity = 1;
        monthNoteEl.style.opacity = 1;
        photosGridEl.style.opacity = 1;
    }, 300);
}

// Navigation
nextBtn.addEventListener('click', () => {
    if (nextBtn.textContent.includes('Open Message')) {
        // Trigger Letter
        timelinePopup.classList.add('hidden');
        letterModal.classList.remove('hidden');
    } else {
        currentMonthIndex++;
        if (currentMonthIndex < monthsData.length) {
            loadMonth(currentMonthIndex);
        }
    }
});

// Letter Logic (To be enhanced with animation)
openEnvelopeBtn.addEventListener('click', () => {
    const envelope = document.querySelector('.envelope');
    const whatsappBtn = document.getElementById('whatsapp-btn');

    envelope.classList.add('open');
    openEnvelopeBtn.classList.add('hidden');

    // Show WhatsApp button after delay
    setTimeout(() => {
        whatsappBtn.classList.remove('hidden');
        whatsappBtn.classList.add('visible');
    }, 1000);
});

// Swipe Logic Helper
function makeSwipeable(card) {
    let isDragging = false;
    let startX = 0;

    // Mouse & Touch Start
    const onDown = (e) => {
        e.preventDefault(); // Stop default scroll
        isDragging = true;
        startX = (e.clientX || e.touches[0].clientX);
        card.style.transition = 'none';
        card.style.cursor = 'grabbing';
    };

    // Move
    const onMove = (e) => {
        if (!isDragging) return;
        const currentX = (e.clientX || (e.touches ? e.touches[0].clientX : 0));
        const deltaX = currentX - startX;
        const rotate = deltaX * 0.1;
        card.style.transform = `translateX(${deltaX}px) rotate(${rotate}deg)`;
    };

    // End
    const onUp = (e) => {
        if (!isDragging) return;
        isDragging = false;
        card.style.cursor = 'grab';

        // Check computed transform to find distance moved
        const style = window.getComputedStyle(card);
        const matrix = new WebKitCSSMatrix(style.transform);
        const translateX = matrix.m41;

        if (translateX < -100) {
            // Swiped Left -> Fly out
            card.classList.add('swiped-left');
            setTimeout(() => card.remove(), 500);
        } else {
            // Snap back
            card.style.transition = 'transform 0.3s ease';
            card.style.transform = 'rotate(0deg)';
        }
    };

    card.addEventListener('mousedown', onDown);
    card.addEventListener('touchstart', onDown, { passive: false });

    // Use document for move/up to catch drag outside element
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchend', onUp);
}
