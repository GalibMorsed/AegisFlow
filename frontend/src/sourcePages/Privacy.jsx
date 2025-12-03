import React from "react";
import Nav from "../homeComponents/Nav";
import Footer from "../homeComponents/homeFooter";

const PrivacyPage = () => {
  return (
    <>
      {/* NAVBAR HERE */}
      <Nav />

      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 p-6">
        {/* HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-sm">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* CONTENT */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Card 1 */}
          <div className="backdrop-blur-md bg-white/60 shadow-lg rounded-2xl p-6 border">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              🔐 Data We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our Crowd Management System collects essential information such as
              camera details, staff assignments, event updates, and user login
              credentials. This data is used strictly for monitoring and
              operational management.
            </p>
          </div>

          {/* Card 2 */}
          <div className="backdrop-blur-md bg-white/60 shadow-lg rounded-2xl p-6 border">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              🔍 How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use the collected data to enhance safety, improve situational
              awareness, support staff coordination, and streamline event
              monitoring. Your information helps us ensure efficient and secure
              crowd management activities.
            </p>
          </div>

          {/* Card 3 */}
          <div className="backdrop-blur-md bg-white/60 shadow-lg rounded-2xl p-6 border">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              🛡️ Data Protection
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All data is securely stored in encrypted databases. We implement
              strict access control, ensuring only authorized personnel can view
              or modify sensitive information.
            </p>
          </div>

          {/* Card 4 */}
          <div className="backdrop-blur-md bg-white/60 shadow-lg rounded-2xl p-6 border">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              👥 Third-Party Access
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We do not share, sell, or transfer your data to any third-party
              services. Data access is strictly limited to the Crowd Management
              team for operational purposes only.
            </p>
          </div>

          {/* Card 5 */}
          <div className="backdrop-blur-md bg-white/60 shadow-lg rounded-2xl p-6 border">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              📩 Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy or need
              clarification, you can reach out to our support team at:
              <span className="block mt-2 font-semibold text-purple-600"></span>
            </p>
          </div>
        </div>

        <div className="text-center mt-10 text-gray-600 text-sm">
          © {new Date().getFullYear()} Crowd Management System. All rights
          reserved.
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPage;
