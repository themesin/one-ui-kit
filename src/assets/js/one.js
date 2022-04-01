$.extend({
  TI: {
    init: function () {
      $(function () {
        $('[data-toggle="tooltip"]').tooltip();

        $('[data-toggle="popover"]').each(function () {
          var _color = $(this).data("color");

          if (typeof _color === "undefined") {
            $(this).popover();
          } else {
            $(this).popover({
              template:
                '<div class="popover popover-color popover-' +
                _color +
                '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
            });
          }
        });

        $(".toast").toast({
          autohide: false,
        });
        $(".toast").toast("show");
      });
    },

    components: {
      forms: function () {
        $(function () {
          $(".form-control").on("input", function () {
            if ($(this).is(":invalid")) {
              $(this)
                .parent(".input-group")
                .find(".input-group-text")
                .addClass("is-invalid");
              $(this)
                .parent(".input-group")
                .find(".input-group-text")
                .removeClass("is-valid");
            }

            if ($(this).is(":valid")) {
              $(this)
                .parent(".input-group")
                .find(".input-group-text")
                .addClass("is-valid");
              $(this)
                .parent(".input-group")
                .find(".input-group-text")
                .removeClass("is-invalid");
            }
          });

          $(".form-control").on("focus", function () {
            $(this).parent(".input-group").addClass("input-group-focus");

            $.TI.formControlValidation($(this));
          });

          $(".form-control").on("blur", function () {
            $(this).parent(".input-group").removeClass("input-group-focus");

            $.TI.formControlValidation($(this));
          });
        });
      },
    },

    formControlValidation: function (elem) {
      elem
        .parent(".input-group")
        .find(".input-group-text")
        .removeClass("is-valid");
      elem
        .parent(".input-group")
        .find(".input-group-text")
        .removeClass("is-invalid");

      if (elem.hasClass("is-invalid") || elem.is(":invalid")) {
        elem
          .parent(".input-group")
          .find(".input-group-text")
          .addClass("is-invalid");
      }

      if (elem.hasClass("is-valid") || elem.is(":valid")) {
        elem
          .parent(".input-group")
          .find(".input-group-text")
          .addClass("is-valid");
      }
    },

    getNavHeight: function () {
      var elemHeight = document.querySelector("header nav:first-child") || 100;

      if (elemHeight) {
        return document
          .querySelector("header nav:first-child")
          .getBoundingClientRect().height;
      }

      return elemHeight;
    },

    enableSmoothScroll: function () {
      $(".js-smooth-scroll").on("click", function (event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash.substring(1);

          window.scroll({
            top: document.getElementById(hash).offsetTop - $.TI.getNavHeight(),
            left: 0,
            behavior: "smooth",
          });
        }
      });
    },

    docs: function () {
      document
        .querySelectorAll(".js-html-code pre code")
        .forEach(function (element) {
          element.innerHTML = element.innerHTML
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
        });
    },
  },
});

$.TI.init();
$.TI.components.forms();
$.TI.docs();
$.TI.enableSmoothScroll();

$(function () {
  // for form validation demo

  var forms = document.getElementsByClassName("needs-validation");

  var validation = Array.prototype.filter.call(forms, function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();

          if (
            $(this).find(".input-group-text").hasClass("is-valid") === false
          ) {
            $(this).find(".input-group-text").addClass("is-invalid");
          }
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
});
