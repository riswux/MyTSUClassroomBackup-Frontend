
fetch(`${appUrl}/api/discipline`)
  .then(response => {
    return response.json();
  })
  .then(data => {
    if (Array.isArray(data)) {
      let discTable = document.getElementById("disciplineBody");
      let discMain = document.getElementById("disciplineMain");
      let i = 1;

      data.forEach((disc) => {
        const disciplineId = disc.discipline["_id"];
        const disciplineName = disc.discipline["discipline"];

        let newRow = document.createElement("tr");
        newRow.id = disciplineId;

        let noCol = document.createElement("td");
        noCol.textContent = i;
        
        let discCol = document.createElement("td");
        discCol.textContent = disciplineName;

        let actionCol = document.createElement("td");
        let actionDiv = document.createElement("div");
        actionDiv.classList.add("flex", "gap-[6px]");

        let imgEdit = document.createElement("img");
        let imgSchedule = document.createElement("img");
        let imgDelete = document.createElement("img");
        imgEdit.src = "../../assets/icon/bx_edit.svg";
        imgSchedule.src = "../../assets/icon/schedule.svg";
        imgDelete.src = "../../assets/icon/delete.svg";

        let modalEditBtn = document.createElement("button");
        modalEditBtn.setAttribute("data-toggle", "modal");
        let id_edit = "#edit_disc_" + disciplineId;
        modalEditBtn.setAttribute("data-target", id_edit);
        
        let modalScheduleBtn = document.createElement("button");
        modalScheduleBtn.setAttribute("data-toggle", "modal");
        let id_schedule = "#schedule_disc_" + disciplineId;
        modalScheduleBtn.setAttribute("data-target", id_schedule);

        let modalDeleteBtn = document.createElement("button");
        modalDeleteBtn.setAttribute("data-toggle", "modal");
        let id_delete = "#delete_disc_" + disciplineId;
        modalDeleteBtn.setAttribute("data-target", id_delete);

        modalEditBtn.appendChild(imgEdit);
        modalScheduleBtn.appendChild(imgSchedule);
        modalDeleteBtn.appendChild(imgDelete);

        actionDiv.appendChild(modalEditBtn);
        actionDiv.appendChild(modalScheduleBtn);
        actionDiv.appendChild(modalDeleteBtn);
        actionCol.appendChild(actionDiv);

        newRow.appendChild(noCol);
        newRow.appendChild(discCol);
        newRow.appendChild(actionCol);
        discTable.appendChild(newRow);
        i += 1;

        let buildingRoom = document.getElementById("buildingRoom");
        let online = document.getElementById("online_radio");
        let offline = document.getElementById("offline_radio");
        
        offline.addEventListener("click", () => {
          buildingRoom.classList.remove("hidden");
        });
        
        online.addEventListener("click", () => {
          buildingRoom.classList.add("hidden");
        });

        let modalEdit = document.createElement("div");
        modalEdit.innerHTML = `
        <div class="modal fade" id="edit_disc_${disciplineId}" tabindex="-1" role="dialog" aria-labelledby="Label_deny_${disciplineId}" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <div>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="mt-8">
                      <span class="modal-title text-[24px] border-b-4 border-[#2D85C5] pb-2 font-bold" id="exampleModalLabel">Edit Discipline</span>    
                      <div class="mt-4">
                          <form>
                              <div class=" mb-3">
                                <label class="font-bold">Name</label> <br />
                                <input id="disciplineName_${disciplineId}" class="w-100 border rounded p-2 border-[#2D85C5]" type="text" value="${disciplineName}" required/>
                              </div>
    
                              <div class=" mb-3">
                                <label class="font-bold">Description</label> <br />
                                <textarea id="description_edit_${disciplineId}" class="description_edit" name="description">${disc.discipline["description_htmlContent"]}</textarea>
                              </div>
    
    
                              <div class=" mb-3">
                                <label class="font-bold">Readings & Literature</label> <br />
                                <textarea id="literature_edit_${disciplineId}" class="literature_edit" name="literature">${disc.discipline["readingAndLiterature_htmlContent"]}</textarea>
                              </div>

                              <div id="selectContainer_${disciplineId}">
                                <label class="font-bold">Teacher</label> <br />
                              </div>

                              <span class="cursor-pointer text-blue-500" onclick="addNewInputEdit('${disciplineId}', '${disc.discipline["teacherId"].length}')" style="float: right;">+ add more teacher ...</span> <br />
                              
                              <div id="selectContainerGroup_${disciplineId}">
                                <label class="font-bold">Group</label> <br />
                              </div>

                              <span class="cursor-pointer text-blue-500" onclick="addNewInputEditGroup('${disciplineId}', '${disc.discipline["teacherId"].length}')" style="float: right;">+ add more group ...</span> <br />
                                
                                <div class=" mb-3">
                                  <label class="font-bold">Year</label> <br />
                                  <select id="yearSelected_${disciplineId}" name="teacher" class="w-full border rounded p-2 border-[#2D85C5]">
                                    <option value="2020-2021" ${disc.discipline["year"] === "2020-2021" ? 'selected' : ''}>2020-2021</option>
                                    <option value="2021-2022" ${disc.discipline["year"] === "2021-2022" ? 'selected' : ''}>2021-2022</option>
                                    <option value="2022-2023" ${disc.discipline["year"] === "2022-2023" ? 'selected' : ''}>2022-2023</option>
                                    <option value="2023-2024" ${disc.discipline["year"] === "2023-2024" ? 'selected' : ''}>2023-2024</option>
                                  </select>
                                </div>
      
                                <div class=" mb-3">
                                  <label class="font-bold">Grade</label> <br />
                                  <select id="gradeSelected_${disciplineId}" name="teacher" class="w-full border rounded p-2 border-[#2D85C5]">
                                    <option value="1" ${disc.discipline["grade"] === "1" ? 'selected' : ''}>1</option>
                                    <option value="2" ${disc.discipline["grade"] === "2" ? 'selected' : ''}>2</option>
                                    <option value="3" ${disc.discipline["grade"] === "3" ? 'selected' : ''}>3</option>
                                    <option value="4" ${disc.discipline["grade"] === "4" ? 'selected' : ''}>4</option>
                                  </select>
                                </div>
                                
                            <div class="flex justify-end gap-2 mt-8">
                              <button type="button" class="btn btn-edit-no" data-dismiss="modal">Cancel</button>
                              <button type="button" class="btn btn-edit-yes">Save Changes</button>
                            </div>
                          </form>
                      <div>
                  </div>
                </div>
              </div>
            </div>
          </div>  
          `
          const tinyMceScript = document.createElement("script");
          tinyMceScript.src = "../../node_modules/tinymce/tinymce.min.js"; 
          tinyMceScript.referrerpolicy = "origin";
          document.head.appendChild(tinyMceScript);

          const rteScript = document.createElement("script");
          rteScript.src = "../../assets/js/rte.js"; 
          document.head.appendChild(rteScript);
          
          const teacherScript = document.createElement("script");
          teacherScript.textContent = `
            inputTeacherCountEdit = 0;
            function addNewInputEdit(id, inputTeacherCount) {
              console.log(id);
              console.log(inputTeacherCount);
              if (inputTeacherCountEdit == 0){
                inputTeacherCountEdit = inputTeacherCount;
              }
              console.log(inputTeacherCountEdit);
              var divElement = document.createElement("div");
              divElement.className = "mb-3";
      
              var selectElement = document.createElement("select");
              selectElement.id = "teacherSelected_" + id + "_" + inputTeacherCountEdit;
              selectElement.name = "teacherSelected" + inputTeacherCountEdit;
              selectElement.className = "w-full border rounded p-2 border-[#2D85C5]";
      
              fetch('${appUrl}/api/user?role=teacher')
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return response.json();
              })
              .then(data => {
                selectElement.innerHTML = '<option disabled selected>Choose Teacher</option>';

                data.forEach(teacher => {
                  const option = document.createElement('option');
                  option.value = teacher._id;
                  option.text = teacher.name;
                  selectElement.appendChild(option);
                });
                  
              })
              .catch(error => {
                  console.error('Error fetching data:', error);
              });

              divElement.appendChild(selectElement);
      
              var targetElement = document.querySelector('#edit_disc_' + id + ' .modal-dialog .modal-content .modal-body #selectContainer_' + id);

              targetElement.appendChild(divElement);
      
              inputTeacherCountEdit++
            }
          `; 
          modalEdit.appendChild(teacherScript);
          
          const groupScript = document.createElement("script");
          groupScript.textContent = `
            inputGroupCountEdit = 0;
            function addNewInputEditGroup(id, inputgroupCount) {
              if (inputGroupCountEdit == 0){
                inputGroupCountEdit = inputgroupCount;
              }
              console.log(inputGroupCountEdit);
              var divElement = document.createElement("div");
              divElement.className = "mb-3";
      
              var selectElement = document.createElement("select");
              selectElement.id = "groupSelected_" + id + "_" + inputGroupCountEdit;
              selectElement.name = "groupSelected" + inputGroupCountEdit;
              selectElement.className = "w-full border rounded p-2 border-[#2D85C5]";
      
              fetch('${appUrl}/api/admin/group')
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return response.json();
              })
              .then(data => {
                selectElement.innerHTML = '<option disabled selected>Choose Group</option>';

                data.forEach(groups => {
                  groups.group.forEach(group => {
                    const option = document.createElement('option');
                    option.value = group.groupCode;
                    option.text = group.groupCode;
                    selectElement.appendChild(option);
                  });
                });
                  
              })
              .catch(error => {
                  console.error('Error fetching data:', error);
              });

              divElement.appendChild(selectElement);
      
              var targetElement = document.querySelector('#edit_disc_' + id + ' .modal-dialog .modal-content .modal-body #selectContainerGroup_' + id);

              targetElement.appendChild(divElement);
      
              inputGroupCountEdit++
            }
          `; 
          modalEdit.appendChild(groupScript);
          ;
      
          // Update Discipline
          let updateButton = modalEdit.querySelector('.btn-edit-yes');
          updateButton.addEventListener('click', () => {

              let discip = disciplineId;

              var teacherSelect = document.querySelectorAll(`[id^="teacherSelected_${discip}"]`);
              var teacherSelectValues = [];

              teacherSelect.forEach(function(element) {
                  teacherSelectValues.push(element.value);
              });
              
              var groupSelect = document.querySelectorAll(`[id^="groupSelected_${discip}"]`);
              var groupSelectValues = [];
              
              groupSelect.forEach(function(element) {
                  groupSelectValues.push(parseInt(element.value));
              });

              const NameValue = document.getElementById(`disciplineName_${disciplineId}`).value;
              const yearValue = document.getElementById(`yearSelected_${disciplineId}`).value;
              const gradeValue = document.getElementById(`gradeSelected_${disciplineId}`).value;
              const DescValue = tinymce.get(`description_edit_${disciplineId}`);
              const htmlContentDesc = DescValue.getContent();
              let plainContentDesc = DescValue.getContent({ format: 'text' });
              const literatureValue = tinymce.get(`literature_edit_${disciplineId}`);
              const htmlContentliterature = literatureValue.getContent();
              let plainContentliterature = literatureValue.getContent({ format: 'text' });

              if(!plainContentDesc){
                plainContentDesc = " ";
              }

              if(!plainContentliterature){
                plainContentliterature = " ";
              }

              fetch(`${appUrl}/api/admin/discipline/`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${savedData}`
                  },
                  body: JSON.stringify({
                      "disciplineId": discip,
                      "disciplineName": NameValue,
                      "description_plainContent": plainContentDesc,
                      "description_htmlContent": htmlContentDesc,
                      "year": yearValue,
                      "grade": gradeValue,
                      "readingAndLiterature_plainContent": plainContentliterature,
                      "readingAndLiterature_htmlContent": htmlContentliterature,
                      "groupId": groupSelectValues,
                      "teacherId": teacherSelectValues
                  })
              })
              .then(response => {
                  if (response.status === 401) {
                    alert('Unauthorized access.');
                    window.location.reload();
                  }else if(response.status === 413){
                    alert('File Too Large.');
                  }
                  return response.json();
              })
              .then(data => {
                console.log('Discipline updated successfully:', data);
                modalEdit.remove();
                window.location.reload();
              })
              .catch(error => {
                  // Handle errors here
                  console.error('Error updating discipline:', error);
              });
              inputTeacherCountEdit = 0;
          });

        let modalSchedule = document.createElement("div");
        modalSchedule.innerHTML = `
          <div class="modal fade" id="schedule_disc_${disciplineId}" tabindex="-1" role="dialog" aria-labelledby="Label_deny_${disciplineId}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <div>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="mt-8">
                      <span class="modal-title text-[24px] border-b-4 border-[#2D85C5] pb-2 font-bold" id="exampleModalLabel">Edit Schedule</span>    
                      <div class="mt-4">
                          <form>
                            <div id="seasonRadio" class="mb-3">
                              <label class="font-bold">Season</label> <br />
                              <div class="flex items-center mb-3">
                                <input ${disc.schedule[0]["season"] === "Autumn" ? 'checked' : ''} id="autumn_radio" type="radio" value="Autumn" name="season-radio_${disciplineId}"
                                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="autumn_radio" class="ml-2 mb-0 text-sm text-gray-900 dark:text-gray-300">Autumn</label>
                            </div>
                              
                            <div class="flex items-center mb-4">
                                <input ${disc.schedule[0]["season"] === "Spring" ? 'checked' : ''} id="spring_radio" type="radio" value="Spring" name="season-radio_${disciplineId}"
                                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="spring_radio" class="ml-2 mb-0 text-sm text-gray-900 dark:text-gray-300">Spring</label>
                              </div>
                            </div>

                            <div id="scheduleRadio" class="mb-3">
                              <label class="font-bold">Schedule</label> <br />
                              <div class="flex items-center mb-3">
                                <input ${disc.schedule[0]["method"] === "Online" ? 'checked' : ''} id="online_radio_edit_${disciplineId}" onclick="document.getElementById('buildingRoom_${disciplineId}').hidden = true" type="radio" value="Online" name="schedule-radio_${disciplineId}"
                                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="online_radio_edit" class="ml-2 mb-0 text-sm text-gray-900 dark:text-gray-300">Online</label>
                              </div>
                            
                              <div class="flex items-center mb-4">
                                <input ${disc.schedule[0]["method"] === "Offline" ? 'checked' : ''} id="offline_radio_edit_${disciplineId}" onclick="document.getElementById('buildingRoom_${disciplineId}').hidden = false" type="radio" value="Offline" name="schedule-radio_${disciplineId}"
                                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="offline_radio_edit" class="ml-2 mb-0 text-sm text-gray-900 dark:text-gray-300">Offline</label>
                              </div>
                            </div>
                            

                            <div id="buildingRoom_${disciplineId}" class="ml-3" ${disc.schedule[0]["method"] === "Online" ? 'hidden' : ''}>
                              <div class=" mb-3">
                                <label class="font-bold">Building</label> <br />
                                <input id="buildingNumber_${disciplineId}" class="w-100 border rounded p-2 border-[#2D85C5]" type="text" value="${disc.schedule[0]["building"]}" />
                              </div>

                              <div class=" mb-3">
                                <label class="font-bold">Room</label> <br />
                                <input id="roomNumber_${disciplineId}" class="w-100 border rounded p-2 border-[#2D85C5]" type="text" value="${disc.schedule[0]["room"]}" />
                              </div>
                            </div>

                            <div class=" mb-3">
                              <label class="font-bold">Day of Week</label> <br />
                              <select id="dayofWeek_${disciplineId}" name="teacher" class="w-full border rounded p-2 border-[#2D85C5]">
                                <option value="1" ${disc.schedule[0]["dayOfWeek"] == "1" ? 'selected' : ''}>1</option>
                                <option value="2" ${disc.schedule[0]["dayOfWeek"] == "2" ? 'selected' : ''}>2</option>
                                <option value="3" ${disc.schedule[0]["dayOfWeek"] == "3" ? 'selected' : ''}>3</option>
                                <option value="4" ${disc.schedule[0]["dayOfWeek"] == "4" ? 'selected' : ''}>4</option>
                              </select>
                            </div>

                            <div class=" mb-3">
                              <label class="font-bold">Start Time</label> <br />
                              <input class="w-100 border rounded p-2 border-[#2D85C5]" type="text" id="startTime_${disciplineId}" value="${disc.schedule[0]["startTime"]}" required/>
                            </div>

                            <div class=" mb-3">
                              <label class="font-bold">Finish Time</label> <br />
                              <input class="w-100 border rounded p-2 border-[#2D85C5]" type="text" id="finishTime_${disciplineId}" value="${disc.schedule[0]["finishTime"]}" required />
                            </div>
                                
                            <div class="flex justify-end gap-2 mt-8">
                              <button type="button" class="btn btn-edit-no" data-dismiss="modal">Cancel</button>
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
          discMain.appendChild(modalSchedule);

          // Update Schedule
          let updateButtonSchedule = modalSchedule.querySelector('.btn-edit-yes');
          updateButtonSchedule.addEventListener('click', () => {
            let scheduleId = disc.schedule[0]['_id'];
            const seasonValue = document.querySelector(`input[name="season-radio_${disciplineId}"]:checked`).value;
            const scheduleValue = document.querySelector(`input[name="schedule-radio_${disciplineId}"]:checked`).value;
            const buildingValue = document.getElementById(`buildingNumber_${disciplineId}`).value;
            const roomValue = document.getElementById(`roomNumber_${disciplineId}`).value;
            const dayofWeekValue = document.getElementById(`dayofWeek_${disciplineId}`).value;
            const startTimeValue = document.getElementById(`startTime_${disciplineId}`).value;
            const finishTimeValue = document.getElementById(`finishTime_${disciplineId}`).value;

            fetch(`${appUrl}/api/admin/schedule/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${savedData}`
                },
                body: JSON.stringify({
                  "scheduleId": scheduleId,
                  "season": seasonValue,
                  "method": scheduleValue,
                  "building": buildingValue,
                  "room": roomValue,
                  "dayOfWeek": dayofWeekValue,
                  "startTime": startTimeValue,
                  "finishTime": finishTimeValue
                })
            })
            .then(response => {
                if (response.status === 401) {
                  alert('Unauthorized access.');
                  window.location.reload();
                }
                return response.json();
            })
            .then(data => {
                console.log('Schedule updated successfully:', data);
                modalEdit.remove();
                window.location.reload();
            })
            .catch(error => {
                // Handle errors here
                console.error('Error updating schedule:', error);
            });
          });

        let modalDelete = document.createElement("div");
        modalDelete.innerHTML = `
          <div class="modal fade" id="delete_disc_${disciplineId}"" tabindex="-1" role="dialog" aria-labelledby="Label_delete_${disciplineId}" aria-hidden="true">
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
        discMain.appendChild(modalDelete);
              //Delete displine
              let deleteButton = modalDelete.querySelector('.btn-deny-yes');
              deleteButton.addEventListener('click', () => {
        
                  fetch(`${appUrl}/api/admin/discipline`, {
                      method: 'DELETE',
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${savedData}`
                        },
                      body: JSON.stringify({
                          "disciplineId": disciplineId
                      })
                  })
                  .then(response => {
                      if (response.status === 401) {
                        alert('Unauthorized access.');
                        window.location.reload();
                      }

                      return response.json();
                  })
                  .then(data => {
                      // Handle successful deletion here (if needed)
                      console.log('Data deleted successfully:', data);
                      modalDelete.remove(); // Remove the modal from the DOM
                      window.location.reload();
                  })
                  .catch(error => {
                      // Handle errors here
                      console.error('Error deleting data:', error);
                  });
              });
        
        discMain.appendChild(modalEdit);

        disc.discipline["teacherId"].forEach((id, index) => {
            var divElement = document.createElement("div");
            divElement.className = "mb-3";

            var selectElement = document.createElement("select");
            selectElement.id = `teacherSelected_${disciplineId}_${index}`;
            selectElement.name = "teacherSelected" + index;
            selectElement.className = "w-full border rounded p-2 border-[#2D85C5]";

            try {
              fetch(`${appUrl}/api/user?role=teacher`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                  selectElement.innerHTML = '<option disabled selected>Choose Teacher</option>';

                  data.forEach(teacher => {
                    const option = document.createElement('option');
                    option.value = teacher._id;
                    option.text = teacher.name;
        
                    if (option.value == id) {
                      option.selected = true;
                    }
        
                    selectElement.appendChild(option);
                  });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            } catch (error) {
              console.error('Error fetching data:', error.message);
            }

            divElement.appendChild(selectElement);

            document.getElementById(`selectContainer_${disciplineId}`).appendChild(divElement);
        });
    
        disc.discipline["groupId"].forEach((id, index) => {
            var divElement = document.createElement("div");
            divElement.className = "mb-3";

            var selectElement = document.createElement("select");
            selectElement.id = `groupSelected_${disciplineId}_${index}`;
            selectElement.name = "groupSelected" + index;
            selectElement.className = "w-full border rounded p-2 border-[#2D85C5]";

            try {
              fetch(`${appUrl}/api/admin/group`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                  selectElement.innerHTML = '<option disabled selected>Choose Group</option>';

                  data.forEach(groups => {
                    groups.group.forEach(group => {
                      const option = document.createElement('option');
                      option.value = group.groupCode;
                      option.text = group.groupCode;
                      if (option.value == id) {
                        option.selected = true;
                      }
                      selectElement.appendChild(option);
                    });
                  });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            } catch (error) {
              console.error('Error fetching data:', error.message);
            }

            divElement.appendChild(selectElement);

            document.getElementById(`selectContainerGroup_${disciplineId}`).appendChild(divElement);
        });
      });
    }else{
      console.log('No disciplinary records found.')
    }
  })
  .catch(error => console.error('Error fetching or parsing data:', error));

//Create Discpline
function discplineFormSubmit(event) {
    event.preventDefault();
  
    // Teacher Selected
    const teacherSelect = [];

    for (var i = 0; i < inputTeacherCountCreate; i++) {
        var inputValue = document.getElementById("teacherSelect" + i).value;
        if (inputValue) {
          teacherSelect.push(inputValue);
        }
    }
    
    // Group Selected
    const groupSelect = [];

    for (var i = 0; i < inputGroupCountCreate; i++) {
        var inputValue = document.getElementById("groupSelect" + i).value;
        if (inputValue) {
          groupSelect.push(inputValue);
        }
    }

    const NameValue = document.getElementById('disciplineName').value;
    const yearValue = document.getElementById('yearSelect').value;
    const gradeValue = document.getElementById('gradeSelect').value;
    const seasonValue = document.querySelector('input[name="season-radio"]:checked').value;
    const scheduleValue = document.querySelector('input[name="schedule-radio"]:checked').value;
    const buildingValue = document.getElementById('buildingNumber').value;
    const roomValue = document.getElementById('roomNumber').value;
    const dayofWeekValue = document.getElementById('dayofWeek').value;
    const startTimeValue = document.getElementById('startTime').value;
    const finishTimeValue = document.getElementById('finishTime').value;
    const DescValue = tinymce.get('description');
    const htmlContentDesc = DescValue.getContent();
    let plainContentDesc = DescValue.getContent({ format: 'text' });
    const literatureValue = tinymce.get('literature');
    const htmlContentliterature = literatureValue.getContent();
    let plainContentliterature = literatureValue.getContent({ format: 'text' });

    if(!plainContentDesc){
      plainContentDesc = " ";
    }

    if(!plainContentliterature){
      plainContentliterature = " ";
    }
    // Create an object with the form data
    const formData = {
        "disciplineName": NameValue,
        "description_plainContent": "Test",
        "description_htmlContent": "Test",
        "year": yearValue,
        "grade": gradeValue,
        "readingAndLiterature_plainContent": "Test",
        "readingAndLiterature_htmlContent": "Test",
        "groupId": groupSelect,
        "teacherId": teacherSelect,
        "season": seasonValue,
        "method": scheduleValue,
        "building": buildingValue,
        "room": roomValue,
        "dayOfWeek": dayofWeekValue,
        "startTime": startTimeValue,
        "finishTime": finishTimeValue
    };



  // Convert the object to JSON
  const jsonData = JSON.stringify(formData);

  console.log('Data to be sent:', jsonData);


    // Continue with your fetch request...
    fetch(`${appUrl}/api/admin/discipline`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${savedData}`,
        },
        body: jsonData,
    })
    .then(response => {
        if (response.status === 401) {
          alert('Unauthorized access.');
          window.location.reload();
        }else if(response.status === 413){
          alert('File Too Large.');
        }else if(response.status === 500){
          alert('all required fields must be filled in.');
        }
    })
    .then(data => {
      console.log(data);
      window.location.reload();
    })
    .catch(error => {
        console.error('Error during Discipline:', error.message);
    });
}

// Dropdown Data Teacher
async function fetchTeacherDropdown() {
    const selectElement = document.getElementById('teacherSelect0');

    try {
      const response = await fetch(`${appUrl}/api/user?role=teacher`);
      const data = await response.json();

      selectElement.innerHTML = '<option disabled selected>Choose Teacher</option>';

      data.forEach(teacher => {
        const option = document.createElement('option');
        option.value = teacher._id;
        option.text = teacher.name;
        selectElement.appendChild(option);
      });

    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
}

// Dropdown Data Group
async function fetchGroupDropdown() {
    const selectElement = document.getElementById('groupSelect0');

    try {
      const response = await fetch(`${appUrl}/api/admin/group`);
      const data = await response.json();

      selectElement.innerHTML = '<option disabled selected>Choose Group</option>';

      data.forEach(groups => {
        groups.group.forEach(group => {
          const option = document.createElement('option');
          option.value = group.groupCode;
          option.text = group.groupCode;
          selectElement.appendChild(option);
        });
      });

    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', function () {
  fetchTeacherDropdown();
  fetchGroupDropdown();
});
