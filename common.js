const FALLBACK_NAVBAR_HTML = `<header>
  <nav id="navbar">
    <div class="logo-group">
      <h3 class="logo1"><a href="index.html">Groww</a></h3>
      <h2 class="logo"><a href="index.html">TechPro</a></h2>
    </div>

    <div class="nav-links">
      <div class="dropdown">
        <a href="#" class="dropbtn">Home ▼</a>
        <div class="dropdown-content">
          <a href="index.html">Home 1</a>
          <a href="home2.html">Home 2</a>
        </div>
      </div>

      <a href="about.html">About</a>
      <a href="product.html">Product</a>
      <a href="membership.html">Membership</a>
      <a href="blog.html">Blog</a>
      <a href="FAQ.html">FAQ</a>
      <a href="contact.html">Contact</a>

      <div class="dropdown">
        <a href="#" class="dropbtn">Dashboards ▼</a>
        <div class="dropdown-content">
          <a href="user.html">User</a>
          <a href="admin.html">Admin</a>
        </div>
      </div>

      <div class="btn-group">
        <button class="one" type="button"><a href="signup.html">Sign Up</a></button>
        <button class="two" type="button"><a href="login.html">Log In</a></button>
      </div>
    </div>

    <div class="nav-right">
      <button id="themeToggle" class="toggle-btn" type="button">🌙</button>
      <button id="rtlToggle" class="toggle-btn" type="button">⇄</button>
      <button class="toggle-btn hamburger" id="hamburger" type="button" aria-label="Menu" aria-controls="mobileMenu" aria-expanded="false"></button>
    </div>
  </nav>

  <div class="mobile-menu" id="mobileMenu">
    <div class="dropdown">
      <a href="#" class="dropbtn">Home ▼</a>
      <div class="dropdown-content">
        <a href="index.html">Home 1</a>
        <a href="home2.html">Home 2</a>
      </div>
    </div>

    <a href="about.html">About</a>
    <a href="product.html">Product</a>
    <a href="membership.html">Membership</a>
    <a href="blog.html">Blog</a>
    <a href="FAQ.html">FAQ</a>
    <a href="contact.html">Contact</a>

    <div class="dropdown">
      <a href="#" class="dropbtn">Dashboards ▼</a>
      <div class="dropdown-content">
        <a href="user.html">User</a>
        <a href="admin.html">Admin</a>
      </div>
    </div>

    <button class="one" type="button"><a href="signup.html">Sign Up</a></button>
    <button class="two" type="button"><a href="login.html">Log In</a></button>
  </div>
</header>`;

const FALLBACK_FOOTER_HTML = `<footer class="tech-footer">
  <div class="footer-top">
    <div class="footer-brand">
      <h2><a href="index.html"><span class="footer-logo-groww">Groww</span> <span class="footer-logo-techpro">TechPro</span></a></h2>
      <p>Innovating the future with intelligent, next-gen technologies that empower humans.</p>
      <div class="footer-socials">
        <a href="#">ⓕ</a>
        <a href="#">𝕏</a>
        <a href="#">🅾</a>
        <a href="#">[in]</a>
      </div>
    </div>

    <div class="footer-links-grid">
      <div class="footer-column">
        <h3>Quick Links</h3>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="product.html">Product</a>
        <a href="contact.html">Contact</a>
      </div>

      <div class="footer-column">
        <h3>Products</h3>
        <a href="#">NovaAI Core</a>
        <a href="#">Predict Engine</a>
        <a href="#">Insight Studio</a>
        <a href="#">Neural Automation</a>
      </div>

      <div class="footer-column">
        <h3>Developers</h3>
        <a href="#">API Docs</a>
        <a href="#">Integration Kits</a>
        <a href="#">Dev Console</a>
        <a href="#">Open Source</a>
      </div>

      <div class="footer-column">
        <h3>Company</h3>
        <a href="#">Who We Are</a>
        <a href="#">Careers</a>
        <a href="#">Press</a>
        <a href="#">Partners</a>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <p>© 2025 Groww TechPro. Built for the future. All Rights Reserved.</p>
  </div>
</footer>`;

function loadHeader() {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    fetch('navbar.html')
        .then((response) => {
            if (!response.ok) throw new Error(`Failed to load navbar.html: ${response.status}`);
            return response.text();
        })
        .then((data) => {
            placeholder.innerHTML = data;
            initHeaderScripts();
        })
        .catch(() => {
            placeholder.innerHTML = FALLBACK_NAVBAR_HTML;
            initHeaderScripts();
        });
}

function loadFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    fetch('footer.html')
        .then((response) => {
            if (!response.ok) throw new Error(`Failed to load footer.html: ${response.status}`);
            return response.text();
        })
        .then((data) => {
            placeholder.innerHTML = data;
        })
        .catch(() => {
            placeholder.innerHTML = FALLBACK_FOOTER_HTML;
        });
}

function ensureSharedNavbarStyles() {
    if (document.getElementById('shared-navbar-style')) return;
    const style = document.createElement('style');
    style.id = 'shared-navbar-style';
    style.textContent = `#navbar, #navbar * { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }`;
    document.head.appendChild(style);
}

// Initialize Header Scripts
function initHeaderScripts() {
    ensureSharedNavbarStyles();
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const placeholder = document.getElementById('header-placeholder');
    const headerEl = placeholder ? placeholder.querySelector('header') : document.querySelector('header');

    const syncHeaderSpacer = () => {
        if (!placeholder || !headerEl) return;
        const height = headerEl.getBoundingClientRect().height;
        placeholder.style.height = height ? `${height}px` : '';
    };

    const setMenuOpen = (open) => {
        if (!hamburger || !mobileMenu) return;
        mobileMenu.classList.toggle('active', open);
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            setMenuOpen(!mobileMenu.classList.contains('active'));
        });

        document.addEventListener('click', (e) => {
            if (mobileMenu.contains(e.target)) return;
            if (hamburger.contains(e.target)) return;
            setMenuOpen(false);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        });

        mobileMenu.querySelectorAll('a[href]').forEach((link) => {
            if (link.classList.contains('dropbtn')) return;
            link.addEventListener('click', () => setMenuOpen(false));
        });

        mobileMenu.querySelectorAll('.dropdown .dropbtn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                btn.parentElement.classList.toggle('open');
            });
        });
    }

    // Theme Toggle
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.onclick = () => {
            document.body.classList.toggle("dark-mode");
            themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
            localStorage.setItem('theme', document.body.classList.contains("dark-mode") ? 'dark' : 'light');
        };
        
        // Load saved theme
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = "☀️";
        }
    }

    // RTL Toggle
    const rtlToggle = document.getElementById("rtlToggle");
    if (rtlToggle) {
        rtlToggle.onclick = () => {
            document.body.classList.toggle("rtl");
            localStorage.setItem('rtl', document.body.classList.contains("rtl") ? 'true' : 'false');
        };
        
        // Load saved RTL setting
        if (localStorage.getItem('rtl') === 'true') {
            document.body.classList.add('rtl');
        }
    }

    syncHeaderSpacer();
    window.addEventListener('resize', syncHeaderSpacer);

    const normalizeHref = (rawHref) => {
        const href = (rawHref || '').trim();
        if (!href || href === '#') return '';
        const cleaned = href.replace(/^[.][/]/, '');
        const withoutQuery = cleaned.split('?')[0].split('#')[0];
        return withoutQuery.toLowerCase();
    };

    const current = normalizeHref(location.pathname.split('/').pop() || 'index.html') || 'index.html';
    const allLinks = document.querySelectorAll('.nav-links a[href], .mobile-menu a[href]');

    allLinks.forEach((link) => link.classList.remove('is-active'));

    allLinks.forEach((link) => {
        const href = normalizeHref(link.getAttribute('href'));
        if (!href) return;
        if (href !== current) return;

        link.classList.add('is-active');

        const dropdown = link.closest('.dropdown');
        if (!dropdown) return;

        const dropdownTrigger = dropdown.querySelector(':scope > .dropbtn');
        if (dropdownTrigger) dropdownTrigger.classList.add('is-active');
    });
}

// Auto-load header and footer when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
});
