(() => {
  function initCustomerCare() {
    if (document.querySelector(".mv-customer-care")) return;

    const footer = document.querySelector("footer");
    if (!footer) return;

    const support = document.createElement("div");
    support.className = "mv-customer-care";
    support.innerHTML = `
      <div class="mv-care-heading">CUSTOMER CARE</div>
      <a href="https://wa.me/917548883966?text=Hello%20MANNVASAM%2C%20I%20need%20assistance."
         target="_blank" rel="noopener noreferrer">
        WhatsApp Support
      </a>
      <a href="tel:+917548883966">Call: +91 75488 83966</a>
      <a href="mailto:mannvasam.info@gmail.com">Email Support</a>
    `;

    const copyright = footer.querySelector(":scope > span");
    if (copyright) {
      footer.insertBefore(support, copyright);
    } else {
      footer.appendChild(support);
    }

    const floating = document.createElement("a");
    floating.className = "mv-care-floating";
    floating.href = "https://wa.me/917548883966?text=Hello%20MANNVASAM%2C%20I%20need%20assistance.";
    floating.target = "_blank";
    floating.rel = "noopener noreferrer";
    floating.setAttribute("aria-label", "Chat with MANNVASAM Customer Care on WhatsApp");
    floating.innerHTML = '<span class="mv-care-icon">✆</span><span>Customer Care</span>';
    document.body.appendChild(floating);

    const style = document.createElement("style");
    style.textContent = `
      .mv-customer-care {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 190px;
        font-size: 13px;
      }
      .mv-care-heading {
        color: #d4ad68;
        font-family: Georgia, serif;
        letter-spacing: 2px;
        font-size: 12px;
        margin-bottom: 4px;
      }
      .mv-customer-care a {
        color: #e9e4d7;
        text-decoration: none;
        transition: color .25s ease;
      }
      .mv-customer-care a:hover {
        color: #d4ad68;
      }
      .mv-care-floating {
        position: fixed;
        right: 24px;
        bottom: 95px;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 13px 19px;
        border-radius: 40px;
        background: #1f6b43;
        color: white;
        text-decoration: none;
        font: 600 13px Arial, sans-serif;
        box-shadow: 0 8px 28px #0004;
        transition: transform .3s ease, box-shadow .3s ease;
      }
      .mv-care-floating:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px #0005;
      }
      .mv-care-icon {
        font-size: 21px;
      }
      @media(max-width:600px) {
        .mv-care-floating {
          right: 14px;
          bottom: 85px;
          padding: 12px 15px;
        }
        .mv-customer-care {
          margin: 12px 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCustomerCare, { once: true });
  } else {
    initCustomerCare();
  }
})();
