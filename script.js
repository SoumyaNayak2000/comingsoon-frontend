document.addEventListener("DOMContentLoaded", () => {

// Fixed end date: October 2, 2024
const fixedEndDate = new Date('2024-10-02T00:00:00');

const saveEndDateToLocalStorage = () => {
    const endDateString = fixedEndDate.toISOString();
    localStorage.setItem('countDownDate', endDateString);
};

const getTargetDate = () => {
    const storedDate = localStorage.getItem('countDownDate');
    if (storedDate) {
        return new Date(storedDate);
    } else {
        saveEndDateToLocalStorage();
        return fixedEndDate;
    }
};

const countDownDate = getTargetDate();

const x = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (distance < 0) {
        clearInterval(x);
        document.querySelector(".time-content").innerHTML = "EXPIRED";
        // Optional: Clear the localStorage entry if you want to reset the countdown
        localStorage.removeItem('countDownDate');
    }
}, 1000);

    document.getElementById('notifyMe').addEventListener('click', () => {
        const email = document.getElementById('email').value;
        if (email) {
            subscribeToNewsletter(email);
        } else {
            showToast("Please enter a valid email address.", "error");
        }
    });

    function subscribeToNewsletter(email) {
        fetch('http://localhost:8080/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Subscription successful') {
                showToast("Thank you for subscribing!", "success");
                document.getElementById('email').value = '';
            } else {
                showToast(data.message || "There was an error. Please try again.", "error");
                document.getElementById('email').value = '';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            showToast("There was an error. Please try again.", "error");
        });
    }

    function showToast(message, type) {
        const toastContainer = document.querySelector('.toast-container') || createToastContainer();
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove());
        }, 3000);
    }

    function createToastContainer() {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
        return toastContainer;
    }
});