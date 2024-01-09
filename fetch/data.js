var groupData;

// Function to populate the "Faculty" dropdown
function getFaculties() {
  const selectElement = document.getElementById('facForm');

  // Fetch the list of faculties
  fetch(`${appUrl}/api/faculty`)
      .then(response => response.json())
      .then(data => {
          data.forEach(faculty => {
              const option = document.createElement('option');
              option.value = faculty._id;
              option.textContent = faculty.faculty;
              selectElement.appendChild(option);
          });
      })
      .catch(error => console.error('Error fetching faculties:', error));
}

// Fungsi untuk mendapatkan daftar arah pendidikan dari endpoint
function getEducationDirections() {
  const facultyId = document.getElementById("facForm").value;
  const educationDirectionDropdown = document.getElementById("direForm");

  // Bersihkan opsi sebelum memuat data baru
  educationDirectionDropdown.innerHTML =
    "<option disabled selected>Education Direction</option>";

  if (facultyId) {
    fetch(`${appUrl}/api/faculty/${facultyId}`)
      .then((response) => response.json())
      .then((data) => {
        groupData = data;
        data.forEach((direction) => {
          const option = document.createElement("option");
          option.value = direction._id;
          option.text = direction.direction;
          educationDirectionDropdown.appendChild(option);
        });
      });
  }
}

// Fungsi untuk mendapatkan daftar grup dari arah pendidikan yang dipilih
function getGroups() {
  const educationDirectionId = document.getElementById("direForm").value;
  const groupDropdown = document.getElementById("groupForm");

  // Bersihkan opsi sebelum memuat data baru
  groupDropdown.innerHTML = "<option disabled selected>Group</option>";
  console.log(groupData);
  if (educationDirectionId) {
    const selectedDirection = groupData.find(
      (d) => d._id === educationDirectionId
    );
    console.log(selectedDirection);
    selectedDirection.group.forEach((group) => {
      const option = document.createElement("option");
      option.value = group.groupCode;
      option.text = group.groupCode;
      groupDropdown.appendChild(option);
    });
  }
}

// Memanggil fungsi untuk mendapatkan daftar fakultas saat halaman dimuat
document.addEventListener("DOMContentLoaded", getFaculties);