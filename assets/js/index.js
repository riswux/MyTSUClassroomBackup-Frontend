let avatarImg = document.getElementById("avatarImg");
let selectedText = document.getElementById("selectedImgText");
avatarImg.addEventListener("change", function () {
  let fileName = "";
  if (this.files && this.files.length > 0) {
    fileName = this.files[0].name;
    selectedText.innerHTML = fileName;
  }
});

// Role Selection

let studentLabel = document.getElementById("studentLabel");

let studentImgPath = [
  "../../assets/img/student-colored.svg",
  "../../assets/img/student.svg",
];

let teacherLabel = document.getElementById("teacherLabel");

let teacherImgPath = [
  "../../assets/img/teacher-colored.svg",
  "../../assets/img/teacher.svg",
];

let isStudentSelected = false;
let isTeacherSelected = false;

let studentTag = document.getElementById("studentTag");
let teacherTag = document.getElementById("teacherTag");

studentLabel.addEventListener("click", function () {
  let teacherImg = teacherLabel.querySelector("img");
  let studentImg = studentLabel.querySelector("img");
  console.log(studentImg.src);

  if (!isStudentSelected) {
    studentImg.src = studentImgPath[0];
    teacherImg.src = teacherImgPath[1];

    studentTag.classList.add("selected-role");
    teacherTag.classList.remove("selected-role");

    isTeacherSelected = isStudentSelected;
    isStudentSelected = !isStudentSelected;
  } else if (isTeacherSelected) {
    studentImg.src = studentImgPath[1];
    studentTag.classList.remove("selected-role");
  }

  console.log(isTeacherSelected);
  console.log(isStudentSelected);
});

teacherLabel.addEventListener("click", function () {
  let teacherImg = teacherLabel.querySelector("img");
  let studentImg = studentLabel.querySelector("img");
  console.log(teacherImg.src);

  if (!isTeacherSelected) {
    teacherImg.src = teacherImgPath[0];
    studentImg.src = studentImgPath[1];

    teacherTag.classList.add("selected-role");
    studentTag.classList.remove("selected-role");

    isStudentSelected = isTeacherSelected;
    isTeacherSelected = !isTeacherSelected;
  } else if (isStudentSelected) {
    teacherImg.src = teacherImgPath[1];
    teacherTag.classList.remove("selected-role");
  }

  console.log(isTeacherSelected);
  console.log(isStudentSelected);
});

let ctnPrevNext = document.getElementById("ctnPrevNext");
let nextBtn = document.getElementById("btnNext");
let prevBtn = document.getElementById("btnPrev");

let cntRegForm = 0;

let registerForm = [
  "nameRegForm",
  "birthRegForm",
  "emailRegForm",
  "phoneRegForm",
  "avatarRegForm",
  "roleRegForm",
  "detailRegForm",
  "confirmRegForm",
];

if (cntRegForm == 0) {
  prevBtn.classList.add("hidden");
  ctnPrevNext.classList.remove("justify-between");
  ctnPrevNext.classList.add("justify-end");
} else if (cntRegForm == registerForm.length) {
  nextBtn.classList.add("hidden");
} else {
  prevBtn.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  ctnPrevNext.classList.add("justify-between");
}

nextBtn.addEventListener("click", function () {
  let currentShownForm = document.getElementById(registerForm[cntRegForm]);
  currentShownForm.classList.add("hidden");
  if (registerForm[cntRegForm] == "roleRegForm") {
    if (isStudentSelected) {
      cntRegForm += 1;
      let details = document.getElementById("grOne");
      details.required = true;
    } else if (isTeacherSelected) {
      cntRegForm += 2;
    }
  } else cntRegForm += 1;
  let nextShownForm = document.getElementById(registerForm[cntRegForm]);
  nextShownForm.classList.remove("hidden");

  if (cntRegForm == 0) {
    prevBtn.classList.add("hidden");
    ctnPrevNext.classList.remove("justify-between");
    ctnPrevNext.classList.add("justify-end");
  } else if (cntRegForm == registerForm.length - 1) {
    nextBtn.classList.add("hidden");
  } else {
    prevBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    ctnPrevNext.classList.add("justify-between");
  }
});

prevBtn.addEventListener("click", function () {
  let currentShownForm = document.getElementById(registerForm[cntRegForm]);
  currentShownForm.classList.add("hidden");
  if (registerForm[cntRegForm] == "confirmRegForm" && isTeacherSelected) {
    cntRegForm -= 2;
  } else cntRegForm -= 1;
  let prevShownForm = document.getElementById(registerForm[cntRegForm]);
  prevShownForm.classList.remove("hidden");

  if (cntRegForm == 0) {
    prevBtn.classList.add("hidden");
    ctnPrevNext.classList.remove("justify-between");
    ctnPrevNext.classList.add("justify-end");
  } else if (cntRegForm == registerForm.length - 1) {
    nextBtn.classList.add("hidden");
  } else {
    prevBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    ctnPrevNext.classList.add("justify-between");
  }
});

let listFormFormat = [
  "name",
  "birthdate",
  "email",
  "phone_num",
  "avatar",
  "role",
  "group",
];

let studentDetailsFormat = ["grade", "faculty", "discipline"];

// Submit Register
function registFormSubmit(event) {
  event.preventDefault();
  
  let birthDateInput = document.getElementById('birthDate');
  let birthDateString = birthDateInput.value;
  let birthDate = new Date(birthDateString);
  let birthDateInMilliseconds = birthDate.getTime();
  
  let formData = new FormData(document.getElementById("registerForm"));
  formData.set('birthDate', birthDateInMilliseconds);
  
  fetch(`${appUrl}/api/register`, {
    method: 'POST',
    body: formData,
  })
  .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          throw new Error(`Registration failed: ${response.statusText}`);
      }
  })
  .then(data => {
      console.log('Registration successful:', data);
      window.location.href = "./register_land.html";
  })
  .catch(error => {
      console.error('Error during registration:', error.message);
  });
}
