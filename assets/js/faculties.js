//Get Faculty
let facultyTable = document.getElementById("facultyBody");
let facultyMain = document.getElementById("facultyMain");
let index = 1;

fetch(`${appUrl}/api/faculty/`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(apiData => {
    apiData.forEach((fac) => {
      let newRow = document.createElement("tr");
      newRow.id = fac["_id"]; // Assuming _id is the unique identifier
    
      let noCol = document.createElement("td");
      noCol.textContent = index;
    
      let facCol = document.createElement("td");
      facCol.textContent = fac["faculty"];

      let dirCol = document.createElement("td"); // To hold direction data
      fetch(`${appUrl}/api/faculty/${fac["_id"]}`)
      .then(directionResponse => {
        if (!directionResponse.ok) {
          throw new Error('Network response for direction was not ok');
        }
        return directionResponse.json();
      })
      .then(directionData => {
        console.log('Direction Data:', directionData); // Log directionData to the console

        if (Array.isArray(directionData)) {
          let directionString = directionData.map(item => item.direction).join(', ');

          dirCol.textContent = directionString; // Update the direction column
        } else {
          console.error('Invalid direction data format:', directionData);
        }
      })
      .catch(error => console.error('Error fetching direction data:', error));

      let actionCol = document.createElement("td");
      let actionDiv = document.createElement("div");
      actionDiv.classList.add("flex", "gap-[6px]");

      let imgEdit = document.createElement("img");
      let imgDelete = document.createElement("img");
      imgEdit.src = "../../assets/icon/bx_edit.svg";
      imgDelete.src = "../../assets/icon/delete.svg";

      let modalEditBtn = document.createElement("button");
      modalEditBtn.setAttribute("data-toggle", "modal");
      let id_edit = "#edit_" + fac["_id"];
      modalEditBtn.setAttribute("data-target", id_edit);

      let modalDeleteBtn = document.createElement("button");
      modalDeleteBtn.setAttribute("data-toggle", "modal");
      let id_delete = "#delete_" + fac["_id"];
      modalDeleteBtn.setAttribute("data-target", id_delete);

      modalEditBtn.appendChild(imgEdit);
      modalDeleteBtn.appendChild(imgDelete);

      actionDiv.appendChild(modalEditBtn);
      actionDiv.appendChild(modalDeleteBtn);
      actionCol.appendChild(actionDiv);

      newRow.appendChild(noCol);
      newRow.appendChild(facCol);
      newRow.appendChild(dirCol);
      newRow.appendChild(actionCol);
      facultyTable.appendChild(newRow);
      index += 1; 

      let modalEdit = document.createElement("div");
  modalEdit.innerHTML = `
    <div class="modal fade" id="edit_${fac["_id"]}"" tabindex="-1" role="dialog" aria-labelledby="Label_deny_${fac["_id"]}" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-body">
            <div>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="mt-8">
                <span class="modal-title text-[24px] border-b-4 border-[#2D85C5] pb-2 font-bold" id="exampleModalLabel">Edit Faculty</span>    
                <div class="mt-4">
                    <form> 
                        <div class=" mb-3">
                            <label class="font-bold">Faculty</label> <br/>
                            <input id="facultyInput" class="w-100 border rounded p-2 border-[#2D85C5]" type="text" placeholder="${fac["faculty"]}" />
                        </div>
                        <div>
                        <div class="flex justify-end gap-2 mt-8">
                            <button type="button" class="btn btn-edit-no" data-dismiss="modal">No</button>
                            <button type="button" class="btn btn-edit-yes">Save Changes</button>
                        </div>
                        
                    </form>
                <div>
            </div>
            </div>
            </div>
        </div>
    </div>
    `;

  facultyMain.appendChild(modalEdit);
      // Update Faculty
          let updateButton = modalEdit.querySelector('.btn-edit-yes');
          updateButton.addEventListener('click', () => {
              let facultyId = fac["_id"];
              let facultyInput = modalEdit.querySelector('#facultyInput');
              let updatedFacultyName = facultyInput.value;

              fetch(`${appUrl}/api/admin/faculty/`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${savedData}`
                    },
                  body: JSON.stringify({
                      "facultyId": facultyId,
                      "facultyName": updatedFacultyName
                  })
              })
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return response.json();
              })
              .then(data => {
                  // Handle successful update here (if needed)
                  console.log('Faculty updated successfully:', data);
                  modalEdit.remove(); // Remove the modal from the DOM
              })
              .catch(error => {
                  // Handle errors here
                  console.error('Error updating faculty:', error);
              });
          });

        
  let modalDelete = document.createElement("div");
  modalDelete.innerHTML = `
     <div class="modal fade" id="delete_${fac["_id"]}"" tabindex="-1" role="dialog" aria-labelledby="Label_delete_${fac["_id"]}" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
             <div class="modal-header">
               
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="font-bold">Are you sure you want to remove this data? </p>
                <p>You won’t be able to undo this action</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-deny-no" data-dismiss="modal">No</button>
                <button type="button" class="btn btn-deny-yes">Yes</button>
            </div>
            </div>
        </div>
        </div>
  `;

  facultyMain.appendChild(modalDelete);
      //Delete Faculty
      let deleteButton = modalDelete.querySelector('.btn-deny-yes');
      deleteButton.addEventListener('click', () => {
          let facultyId = fac["_id"];

          fetch(`${appUrl}/api/admin/faculty`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${savedData}`
                },
              body: JSON.stringify({
                  "facultyId": facultyId
              })
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              // Handle successful deletion here (if needed)
              console.log('Data deleted successfully:', data);
              modalDelete.remove(); // Remove the modal from the DOM
          })
          .catch(error => {
              // Handle errors here
              console.error('Error deleting data:', error);
          });
      });

    });
  })
  .catch(error => console.error('Error:', error));

//Create faculty
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('facultyForm');

  form.addEventListener('submit', function (event) {
       event.preventDefault();

      const facultyName = document.getElementById('facultyName').value;

      const data = {
          facultyName: facultyName
      };

      fetch(`${appUrl}/api/admin/faculty`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${savedData}`
            },
          body: JSON.stringify(data),
      })
          .then(response => response.json())
          .then(data => {
              console.log('Success:', data);
              // Optionally, you can close the modal after a successful request
              $('#modalAddFaculty').modal('hide');
          })
          .catch(error => {
              console.error('Error:', error);
          });
    });
});
