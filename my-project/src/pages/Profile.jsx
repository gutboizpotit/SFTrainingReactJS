import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { updateUser } from "../api/userAPI";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, login } = useAuth();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone_number: user?.phone_number || "",
    bio: user?.bio || "",
    location: user?.location || "",
    role: user?.role || "USER",
    cover_image: user?.cover_image || "",
    profile_image: user?.profile_image || ""
  });

  // Update editedUser when user data changes
  useEffect(() => {
    if (user) {
      setEditedUser({
        name: user.name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        bio: user.bio || "",
        location: user.location || "",
        role: user.role || "USER",
        cover_image: user.cover_image || "",
        profile_image: user.profile_image || ""
      });
    }
  }, [user]);

  // Theme styles
  const containerBg = theme === "dark" ? "bg-slate-900" : "bg-slate-50";
  const cardBg = theme === "dark" ? "bg-slate-800" : "bg-white";
  const textPrimary = theme === "dark" ? "text-slate-100" : "text-slate-900";
  const textSecondary = theme === "dark" ? "text-slate-400" : "text-slate-600";
  const borderColor = theme === "dark" ? "border-slate-700" : "border-slate-200";
  const inputBg = theme === "dark" ? "bg-slate-700 text-slate-100" : "bg-slate-50 text-slate-900";
  const buttonPrimary = theme === "dark" 
    ? "bg-purple-600 hover:bg-purple-700 text-white" 
    : "bg-purple-600 hover:bg-purple-700 text-white";
  const buttonSecondary = theme === "dark"
    ? "bg-slate-700 hover:bg-slate-600 text-slate-200"
    : "bg-slate-200 hover:bg-slate-300 text-slate-700";

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updatedUserData = await updateUser(user.id, editedUser);
      const newUserData = { ...user, ...updatedUserData };
      login(newUserData);
      
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user data:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedUser({
      name: user?.name || "",
      email: user?.email || "",
      phone_number: user?.phone_number || "",
      bio: user?.bio || "",
      location: user?.location || "",
      role: user?.role || "USER",
      cover_image: user?.cover_image || "",
      profile_image: user?.profile_image || ""
    });
    setIsEditing(false);
  };

  const handleImageChange = (type, value) => {
    setEditedUser(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^.{3,}@.+\..+$/;
    return emailRegex.test(email);
  };

  const canSave = () => {
    if (!editedUser.name.trim()) return false;
    if (!validateEmail(editedUser.email)) return false;
    if (editedUser.phone_number && !validatePhoneNumber(editedUser.phone_number)) return false;
    return true;
  };

  return (
    <div className={`min-h-screen ${containerBg} transition-colors duration-300`}>
      {/* Cover Image Section */}
      <div className="relative">
        <div className="h-64 md:h-80 relative overflow-hidden">
          {/* Cover Image */}
          <img
            className="w-full h-full object-cover"
            src={user?.cover_image || editedUser.cover_image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"}
            alt="Cover"
          />
          {/* Light overlay for text readability - only when no custom image */}
          {(!user?.cover_image && !editedUser.cover_image) && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/60 via-purple-600/60 to-violet-600/60"></div>
          )}
          {/* Subtle dark overlay for text readability when custom image exists */}
          {(user?.cover_image || editedUser.cover_image) && (
            <div className="absolute inset-0 bg-black/30"></div>
          )}
          
          {/* Edit Cover Image Button */}
          {isEditing && (
            <div className="absolute top-4 right-4">
              <label className="cursor-pointer bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center gap-2">
                📷 Change Cover
                <input
                  type="url"
                  placeholder="Enter cover image URL"
                  value={editedUser.cover_image}
                  onChange={(e) => handleImageChange('cover_image', e.target.value)}
                  className="hidden"
                />
              </label>
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">Profile</h1>
            <p className="text-white/90 mt-2 drop-shadow-md">Manage your account information</p>
          </div>
        </div>

        {/* Profile Image */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <img
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
              src={user?.profile_image || editedUser.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=8b5cf6&color=fff&size=128`}
              alt="profile"
            />
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
            
            {/* Edit Profile Image Button */}
            {isEditing && (
              <div className="absolute -bottom-2 -right-2">
                <label className="cursor-pointer bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-all duration-200 shadow-lg flex items-center justify-center">
                  ✏️
                  <input
                    type="url"
                    placeholder="Enter profile image URL"
                    value={editedUser.profile_image}
                    onChange={(e) => handleImageChange('profile_image', e.target.value)}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className={`${cardBg} rounded-2xl shadow-xl border ${borderColor} overflow-hidden transition-colors duration-300`}>
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-center md:text-left">
                <h2 className={`text-2xl font-bold ${textPrimary}`}>
                  {user?.name || "User Name"}
                </h2>
                <p className={`${textSecondary} mt-1`}>
                  {user?.email || "user@example.com"}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.role === "ADMIN" 
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                  }`}>
                    {user?.role || "USER"}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isEditing ? buttonSecondary : buttonPrimary
                }`}
              >
                {isEditing ? "Cancel" : "✏️ Edit Profile"}
              </button>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div>
                <h3 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                  👤 Personal Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                      Full Name
                    </label>
                    {isEditing ? (
                      <div>
                        <input
                          type="text"
                          value={editedUser.name}
                          onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${inputBg} ${borderColor} ${
                            !editedUser.name.trim() ? 'border-red-500' : ''
                          }`}
                          required
                        />
                        {!editedUser.name.trim() && (
                          <p className="text-red-500 text-xs mt-1">Name is required</p>
                        )}
                      </div>
                    ) : (
                      <p className={`${textPrimary} p-2`}>{user?.name || "Not provided"}</p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                      Email Address
                    </label>
                    {isEditing ? (
                      <div>
                        <input
                          type="email"
                          value={editedUser.email}
                          onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${inputBg} ${borderColor} ${
                            !validateEmail(editedUser.email) ? 'border-red-500' : ''
                          }`}
                          required
                        />
                        {!validateEmail(editedUser.email) && (
                          <p className="text-red-500 text-xs mt-1">Email must have at least 3 characters before @</p>
                        )}
                      </div>
                    ) : (
                      <p className={`${textPrimary} p-2`}>{user?.email || "Not provided"}</p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                      Phone Number
                    </label>
                    {isEditing ? (
                      <div>
                        <input
                          type="tel"
                          value={editedUser.phone_number}
                          onChange={(e) => setEditedUser({...editedUser, phone_number: e.target.value})}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${inputBg} ${borderColor} ${
                            editedUser.phone_number && !validatePhoneNumber(editedUser.phone_number) ? 'border-red-500' : ''
                          }`}
                          placeholder="0123456789"
                        />
                        {editedUser.phone_number && !validatePhoneNumber(editedUser.phone_number) && (
                          <p className="text-red-500 text-xs mt-1">Phone number must be 10 digits and start with 0</p>
                        )}
                      </div>
                    ) : (
                      <p className={`${textPrimary} p-2`}>{user?.phone_number || "Not provided"}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                  📍 Additional Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.location}
                        onChange={(e) => setEditedUser({...editedUser, location: e.target.value})}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${inputBg} ${borderColor}`}
                        placeholder="City, Country"
                      />
                    ) : (
                      <p className={`${textPrimary} p-2`}>{user?.location || "Not provided"}</p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editedUser.bio}
                        onChange={(e) => setEditedUser({...editedUser, bio: e.target.value})}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${inputBg} ${borderColor}`}
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <p className={`${textPrimary} p-2`}>{user?.bio || "No bio provided"}</p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                      Account Type
                    </label>
                    <p className={`${textPrimary} p-2`}>{user?.role || "USER"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Save/Cancel Buttons */}
            {isEditing && (
              <div className="flex gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={handleSave}
                  disabled={!canSave() || isLoading}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    canSave() && !isLoading ? buttonPrimary : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? "⏳ Saving..." : "💾 Save Changes"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${buttonSecondary} ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Image URL Inputs */}
            {isEditing && (
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h3 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                  🖼️ Image URLs
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                      Profile Image URL
                    </label>
                    <input
                      type="url"
                      value={editedUser.profile_image}
                      onChange={(e) => handleImageChange('profile_image', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${inputBg} ${borderColor}`}
                      placeholder="https://example.com/profile-image.jpg"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                      Cover Image URL
                    </label>
                    <input
                      type="url"
                      value={editedUser.cover_image}
                      onChange={(e) => handleImageChange('cover_image', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${inputBg} ${borderColor}`}
                      placeholder="https://example.com/cover-image.jpg"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;