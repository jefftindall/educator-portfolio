(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value.trim();
      var email = form.querySelector('[name="email"]').value.trim();
      var message = form.querySelector('[name="message"]').value.trim();
      var subject = encodeURIComponent("Message from educator portfolio");
      var body = encodeURIComponent(
        "Name: " + name + "\nEmail: " + email + "\n\n" + message
      );
      window.location.href =
        "mailto:tiff@tifftindall.com?subject=" + subject + "&body=" + body;
    });
  }
})();
