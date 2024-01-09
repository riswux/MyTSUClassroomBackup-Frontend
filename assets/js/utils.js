function showProfile() {
  let modal = document.getElementById("profileModal");
  if (modal.hasAttribute("hidden")) {
    modal.removeAttribute("hidden");
  } else {
    modal.setAttribute("hidden", "true");
  }
}
