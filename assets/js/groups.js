document.addEventListener('DOMContentLoaded', function() {
    var selectedFacultyId;
    var selectedDirectionId;

    var facultySelectElement = document.querySelector('#facultySelect select');
    var directionSelectElement = document.querySelector('#directionSelect select');

    let groupTable = document.getElementById("groupBody");
    let groupMain = document.getElementById("groupMain");
    groupTable.innerHTML = '';

    facultySelectElement.addEventListener('change', function() {
        selectedFacultyId = this.value;
        directionSelectElement.innerHTML = ''; // Clear previous options
        groupTable.innerHTML = ''; // Clear previous group data

        // Add default option to direction select
        var defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select a direction'; // Change this to your desired default text
        directionSelectElement.appendChild(defaultOption);


        // Fetch and populate direction dropdown based on selected faculty
        fetch(`${appUrl}/api/faculty/${selectedFacultyId}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(function(direction) {
                    var optionElement = document.createElement('option');
                    optionElement.value = direction._id;
                    optionElement.textContent = direction.direction;
                    directionSelectElement.appendChild(optionElement);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    });

    directionSelectElement.addEventListener('change', function() {
        selectedDirectionId = this.value;
        groupTable.innerHTML = ''; // Clear previous group data

        // Make a fetch request to get data for the selected direction
        fetch(`${appUrl}/api/faculty/${selectedFacultyId}`)
            .then(response => response.json())
            .then(data => {
                // Find the selected direction in the data
                var selectedDirection = data.find(direction => direction._id === selectedDirectionId);

                // Check if the selectedDirection was found
                if (selectedDirection) {
                    let i = 1;
                    // Assuming selectedDirection.group is an array of groups
                    selectedDirection.group.forEach(function(group) {
                        let newRow = document.createElement("tr");
                        newRow.id = group["_id"];
                
                        let noCol = document.createElement("td");
                        noCol.textContent = i;
                
                        let groupCol = document.createElement("td");
                        groupCol.textContent = group["groupCode"];
                
                        let actionCol = document.createElement("td");
                        let actionDiv = document.createElement("div");
                        actionDiv.classList.add("flex", "gap-[6px]");
                
                        let imgEdit = document.createElement("img");
                        let imgDelete = document.createElement("img");
                        imgEdit.src = "../../assets/icon/bx_edit.svg";
                        imgDelete.src = "../../assets/icon/delete.svg";
                
                        let modalEditBtn = document.createElement("button");
                        modalEditBtn.setAttribute("data-toggle", "modal");
                        let id_edit = "#edit_group_" + group["_id"];
                        modalEditBtn.setAttribute("data-target", id_edit);
                
                        let modalDeleteBtn = document.createElement("button");
                        modalDeleteBtn.setAttribute("data-toggle", "modal");
                        let id_delete = "#delete_group_" + group["_id"];
                        modalDeleteBtn.setAttribute("data-target", id_delete);
                
                        modalEditBtn.appendChild(imgEdit);
                        modalDeleteBtn.appendChild(imgDelete);
                
                        actionDiv.appendChild(modalEditBtn);
                        actionDiv.appendChild(modalDeleteBtn);
                        actionCol.appendChild(actionDiv);
                
                        newRow.appendChild(noCol);
                        newRow.appendChild(groupCol);
                        newRow.appendChild(actionCol);
                
                        groupTable.appendChild(newRow);
                        i += 1;

                        let modalEdit = document.createElement("div");
                        modalEdit.innerHTML = `
                          <div class="modal fade" id="edit_group_${group["_id"]}"" tabindex="-1" role="dialog" aria-labelledby="Label_deny_${group["_id"]}" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                  <div class="modal-content">
                                  <div class="modal-body">
                                  <div>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                      </button>
                                  </div>
                                  <div class="mt-8">
                                      <span class="modal-title text-[24px] border-b-4 border-[#2D85C5] pb-2 font-bold" id="exampleModalLabel">Edit Group</span>    
                                      <div class="mt-4">
                                          <form> 
                                              <div class=" mb-3">
                                                  <label class="font-bold">Group</label> <br/>
                                                  <input class="w-100 border rounded p-2 border-[#2D85C5]" type="text" id="groupInput" placeholder="${group['groupCode']}"/>
                                                  </div>
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
                          groupMain.appendChild(modalEdit);
                          //Update Group
                          let updateButton = modalEdit.querySelector('.btn-edit-yes');
                          updateButton.addEventListener('click', () => {
                            let groupCode = group["groupCode"];
                            let groupInput = modalEdit.querySelector('#groupInput');
                            let updatedGroupValue = groupInput.value;
                                  
                              fetch(`${appUrl}/api/admin/group`, {
                                  method: 'PUT',
                                  headers: {
                                      'Content-Type': 'application/json',
                                      'Authorization': `Bearer ${savedData}`
                                    },
                                  body: JSON.stringify({
                                      "directionId": selectedDirectionId,
                                      "groupCodeBefore": groupCode,
                                      "groupCodeAfter": updatedGroupValue,
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
                                  console.error('Error updating Direction:', error);
                              });
                          });


                        let modalDelete = document.createElement("div");
                        modalDelete.innerHTML = `
                           <div class="modal fade" id="delete_group_${group["_id"]}"" tabindex="-1" role="dialog" aria-labelledby="Label_delete_${group["_id"]}" aria-hidden="true">
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
                        groupMain.appendChild(modalDelete);
                        // Delete Group
                          let deleteButton = modalDelete.querySelector('.btn-deny-yes');
                          deleteButton.addEventListener('click', () => {
                              let groupCode = group["groupCode"];
      
      
                              fetch(`${appUrl}/api/admin/group`, {
                                  method: 'DELETE',
                                  headers: {
                                      'Content-Type': 'application/json',
                                      'Authorization': `Bearer ${savedData}`
                                    },
                                  body: JSON.stringify({
                                      "directionId": selectedDirection,
                                      "groupCode" : groupCode
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
                                  $('#modalDelete').modal('hide');
                              })
                              .catch(error => {
                                  // Handle errors here
                                  console.error('Error deleting data:', error);
                              });
                          });

                    });
                } else {
                    console.error('Selected direction not found in data');
                }
            })
            .catch(error => console.error('Error fetching group data:', error));
    });

        // Create Directions
        document.getElementById('groupForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting normally
    
            var groupName = document.getElementById('groupName').value;
    
            fetch(`${appUrl}/api/admin/group`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${savedData}`
                },
                body: JSON.stringify({ 
                    "directionId": selectedDirectionId, 
                    "groupCode": groupName 
                })
            })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server
                console.log('Direction created:', data);
                // Close the modal (if needed)
                $('#modalAddGroup').modal('hide');
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });

    // Fetch and populate faculty dropdown
    fetch(`${appUrl}/api/faculty/`)
        .then(response => response.json())
        .then(data => {
            data.forEach(function(faculty) {
                var optionElement = document.createElement('option');
                optionElement.value = faculty._id;
                optionElement.textContent = faculty.faculty;
                facultySelectElement.appendChild(optionElement);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
