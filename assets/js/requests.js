// Make a request to the API endpoint
fetch(`${appUrl}/api/user?isAdminVerified`)
  .then(response => response.json())
  .then(data => {
    let tableBody = document.getElementById("requestBody");
    let requestMain = document.getElementById("requestMain");
    let index = 1;

    // Loop through the data and create table rows
    data.forEach((acc) => {
      let newRow = document.createElement("tr");
      newRow.id = acc["_id"];

      let id_detail = "#detail_" + acc["_id"];

      // Create table cells for each piece of data
      let noCol = document.createElement("td");
      noCol.textContent = index;

      let nameCol = document.createElement("td");
      nameCol.textContent = acc["name"];

      let birthCol = document.createElement("td");
      birthCol.textContent = acc["birth_date"];

      let emailCol = document.createElement("td");
      emailCol.textContent = acc["email"];

      let phoneCol = document.createElement("td");
      phoneCol.textContent = acc["phone"];

      let avatarCol = document.createElement("td");
      let imgCol = document.createElement("img");
      imgCol.classList.add("table-avatar");
      imgCol.src = "../../assets/img/profile.svg";
      avatarCol.appendChild(imgCol);

      let roleCol = document.createElement("td");
      roleCol.textContent = acc["role"];
      
      let actionCol = document.createElement("td");
      let actionDiv = document.createElement("div");
      actionDiv.classList.add("flex", "gap-[6px]");
  
      let imgAcc = document.createElement("img");
      let imgRej = document.createElement("img");
      imgAcc.src = "../../assets/icon/accept.svg";
      imgRej.src = "../../assets/icon/reject.svg";
  
      let modalAccBtn = document.createElement("button");
      modalAccBtn.setAttribute("data-toggle", "modal");
      let id_acc = "#Acc_" + acc["_id"];
      modalAccBtn.setAttribute("data-target", id_acc);
  
      let modalDenyBtn = document.createElement("button");
      modalDenyBtn.setAttribute("data-toggle", "modal");
      let id_deny = "#Deny_" + acc["_id"];
      modalDenyBtn.setAttribute("data-target", id_deny);
  
      modalAccBtn.appendChild(imgAcc);
      modalDenyBtn.appendChild(imgRej);
  
      actionDiv.appendChild(modalAccBtn);
      actionDiv.appendChild(modalDenyBtn);
      actionCol.appendChild(actionDiv);
  
      noCol.setAttribute("data-toggle", "modal");
      noCol.setAttribute("data-target", id_detail);
  
      nameCol.setAttribute("data-toggle", "modal");
      nameCol.setAttribute("data-target", id_detail);
  
      birthCol.setAttribute("data-toggle", "modal");
      birthCol.setAttribute("data-target", id_detail);
  
      emailCol.setAttribute("data-toggle", "modal");
      emailCol.setAttribute("data-target", id_detail);
  
      phoneCol.setAttribute("data-toggle", "modal");
      phoneCol.setAttribute("data-target", id_detail);
  
      avatarCol.setAttribute("data-toggle", "modal");
      avatarCol.setAttribute("data-target", id_detail);
  
      roleCol.setAttribute("data-toggle", "modal");
      roleCol.setAttribute("data-target", id_detail);

      // Append cells to the row
      newRow.appendChild(noCol);
      newRow.appendChild(nameCol);
      newRow.appendChild(birthCol);
      newRow.appendChild(emailCol);
      newRow.appendChild(phoneCol);
      newRow.appendChild(avatarCol);
      newRow.appendChild(roleCol);
      newRow.appendChild(actionCol);

      // Append the row to the table body
      tableBody.appendChild(newRow);

      index += 1;

      // Modal
    let modalDenyDiv = document.createElement("div");
    modalDenyDiv.innerHTML = `
    <div class="modal fade" id="Deny_${acc["_id"]}"" tabindex="-1" role="dialog" aria-labelledby="Label_deny_${acc["_id"]}" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
             <div class="modal-header">
               
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form method="POST"
                onsubmit="deleteFormSubmit(event, '${acc["_id"]}')"
                id="deleteForm"
            >
                <div class="modal-body">
                    <p class="font-bold">Are you sure you want to deny this request? </p>
                    <p>You won’t be able to undo this action</p>
                    <input type="text" class="form-control" name="userId" id="delete_userId_${acc["_id"]}" value="${acc["_id"]}" hidden>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-deny-no" data-dismiss="modal">No</button>
                    <button type="submit" class="btn btn-deny-yes">Yes</button>
                </div>
            </form>
            </div>
        </div>
    </div>
    `;

    let modalApproveDiv = document.createElement("div");
    modalApproveDiv.innerHTML = `
    <div class="modal fade" id="Acc_${acc["_id"]}"" tabindex="-1" role="dialog" aria-labelledby="Label_${acc["_id"]}" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
               
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form method="POST"
                    onsubmit="requestFormSubmit(event, '${acc["_id"]}')"
                    id="requestForm"
                >
                <div class="modal-body">
                    <p class="font-bold">Are you sure you want to approve this request? </p>
                    <p>You won’t be able to undo this action</p>
                    <input type="text" class="form-control" name="userId" id="userId_${acc["_id"]}" value="${acc["_id"]}" hidden>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-acc-no" data-dismiss="modal">No</button>
                    <button type="submit" class="btn btn-acc-yes">Yes</button>
                </div>
            </form>
            </div>
        </div>
    </div>
    `;

    let detailModal = document.createElement("div");
    detailModal.innerHTML = `
    <div class="modal fade" id="detail_${acc["_id"]}"" tabindex="-1" role="dialog" aria-labelledby="Label_${acc["_id"]}" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="font-bold">Detail </p>
                <div class= "my-4">
                    <p>Faculty</p>
                    <p class="font-bold">${acc["faculty"]} </p>
                </div>
                <div class= "my-4">
                    <p>Direction</p>
                    <p class="font-bold">${acc["direction"]} </p>
                </div>

                
                <p>Grade</p>
                <p class="font-bold mb-2">${acc["grade"]} </p>
            </div>
            
            </div>
        </div>
    </div>
    `;
    requestMain.appendChild(detailModal);
    requestMain.appendChild(modalDenyDiv);
    requestMain.appendChild(modalApproveDiv);
      
    });
  })
  .catch(error => console.error('Error fetching data:', error));


// Submit Request
function requestFormSubmit(event,acc) {
    event.preventDefault();
    
    const userId = document.getElementById(`userId_${acc}`).value;

    fetch(`${appUrl}/api/acceptuser`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${savedData}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "userId": userId
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Profile Update failed: ${response.statusText}`);
        }
    })
    .then(data => {
        console.log('Profile Update successful:', data);
        window.location.reload();
    })
    .catch(error => {
        console.error('Error during Profile Update:', error.message);
    });
}

// Deny Request
function deleteFormSubmit(event,acc) {
    event.preventDefault();
    
    const userId = document.getElementById(`delete_userId_${acc}`).value;

    fetch(`${appUrl}/api/delete-user`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${savedData}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "userId": userId
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Profile Deny failed: ${response.statusText}`);
        }
    })
    .then(data => {
        console.log('Profile Deny successful:', data);
        window.location.reload();
    })
    .catch(error => {
        console.error('Error during Profile Deny:', error.message);
    });
}