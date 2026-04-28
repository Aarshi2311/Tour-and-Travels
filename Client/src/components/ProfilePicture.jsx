import { useContext, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { uploadProfilePic, removeProfilePic } from "../services/api";
import "../css/ProfilePicture.css";

function ProfilePicture() {
  const { user, updateUser } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const backendURL = "http://localhost:3000";

  // Default avatar SVG
  const defaultAvatar = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="profile-default-icon"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const handleProfilePicClick = () => {
    setShowMenu(!showMenu);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!["image/jpeg", "image/png", "image/gif", "image/jpg"].includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, or GIF)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      setUploading(true);
      const response = await uploadProfilePic(formData);
      
      // Update AuthContext with new profile picture
      updateUser({
        profilePic: response.data.user.profilePic,
      });

      setShowMenu(false);
      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.response?.data?.message || "Failed to upload profile picture");
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveProfilePic = async () => {
    if (window.confirm("Are you sure you want to remove your profile picture?")) {
      try {
        setUploading(true);
        await removeProfilePic();
        
        // Update AuthContext to remove profile picture
        updateUser({
          profilePic: null,
        });

        setShowMenu(false);
        alert("Profile picture removed successfully!");
      } catch (error) {
        console.error("Remove error:", error);
        alert(error.response?.data?.message || "Failed to remove profile picture");
      } finally {
        setUploading(false);
      }
    }
  };

  if (!user) {
    return null;
  }

  const profilePicUrl = user.profilePic
    ? user.profilePic.startsWith("http")
      ? user.profilePic
      : `${backendURL}${user.profilePic}`
    : null;

  return (
    <div className="profile-picture-container">
      <div
        className="profile-picture-wrapper"
        onClick={handleProfilePicClick}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => e.key === "Enter" && handleProfilePicClick()}
      >
        {profilePicUrl ? (
          <img
            src={profilePicUrl}
            alt="Profile"
            className="profile-picture-image"
          />
        ) : (
          <div className="profile-picture-default">{defaultAvatar}</div>
        )}
      </div>

      {showMenu && (
        <div className="profile-picture-menu">
          <button
            onClick={handleUploadClick}
            disabled={uploading}
            className="menu-item"
          >
            {user.profilePic ? "Change Picture" : "Upload Picture"}
          </button>

          {user.profilePic && (
            <button
              onClick={handleRemoveProfilePic}
              disabled={uploading}
              className="menu-item menu-item-danger"
            >
              Remove Picture
            </button>
          )}

          <button
            onClick={() => setShowMenu(false)}
            disabled={uploading}
            className="menu-item menu-item-cancel"
          >
            Cancel
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        disabled={uploading}
      />

      {uploading && <div className="profile-picture-loading">Uploading...</div>}
    </div>
  );
}

export default ProfilePicture;
