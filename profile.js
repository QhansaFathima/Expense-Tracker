window.onload = function () {
  const profile = JSON.parse(sessionStorage.getItem('userProfile')) || {};
  const pic = sessionStorage.getItem('profilePic');

  // Set profile pic
  if (pic) {
    document.getElementById('profilePicPreview').src = pic;
  }

  // If profile exists, load it into fields
  if (profile.name) {
    document.getElementById('welcomeMessage').textContent = `Welcome, ${profile.name}!`;
    document.getElementById('name').value = profile.name || "";
    document.getElementById('dob').value = profile.dob || "";
    document.getElementById('email').value = profile.email || "";
    document.getElementById('phone').value = profile.phone || "";
    document.getElementById('occupation').value = profile.occupation || "";
    document.getElementById('income').value = profile.income || "";
    displayProfile(profile);
  }

  // Disable all inputs initially
  setFormDisabled(true);
};

document.getElementById('profilePicInput').addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const imgData = reader.result;
      document.getElementById('profilePicPreview').src = imgData;
      sessionStorage.setItem('profilePic', imgData);
    };
    reader.readAsDataURL(file);
  }
});

function saveProfile() {
  const profile = {
    name: document.getElementById('name').value.trim(),
    dob: document.getElementById('dob').value,
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    occupation: document.getElementById('occupation').value.trim(),
    income: document.getElementById('income').value.trim()
  };

  if (!profile.name || !profile.email || !profile.income) {
    alert("Please fill in required fields (Name, Email, Income).");
    return;
  }

  // Save to sessionStorage
  sessionStorage.setItem('userProfile', JSON.stringify(profile));

  // Update welcome text
  document.getElementById('welcomeMessage').textContent = `Welcome, ${profile.name}!`;

  // Show summary
  displayProfile(profile);

  // Lock inputs again
  setFormDisabled(true);

  alert("Profile saved successfully!");
}

function displayProfile(profile) {
  document.getElementById('profileData').innerHTML = `
    <p><strong>Name:</strong> ${profile.name}</p>
    <p><strong>Email:</strong> ${profile.email}</p>
    <p><strong>Phone:</strong> ${profile.phone || "-"}</p>
    <p><strong>Date of Birth:</strong> ${profile.dob || "-"}</p>
    <p><strong>Occupation:</strong> ${profile.occupation || "-"}</p>
    <p><strong>Monthly Income:</strong> ₹${profile.income}</p>
  `;
}

function setFormDisabled(disabled) {
  document.querySelectorAll('.profile-form input').forEach(input => {
    input.disabled = disabled;
  });
}

// Button Listeners
document.getElementById('saveBtn').addEventListener('click', saveProfile);

document.getElementById('editBtn').addEventListener('click', function () {
  setFormDisabled(false);
  alert("You can now edit your profile.");
});
