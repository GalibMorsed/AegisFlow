import React from "react";
import Footer from "../homeComponents/homeFooter";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-6">
          <p className="text-[11px] text-slate-500 mb-1">
            Settings &gt; Legal &gt; Privacy policy
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Privacy policy
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Learn how AegisFlow collects, uses, and protects your information.
          </p>

          <p className="mt-3 text-[11px] text-slate-500">
            Last updated: <span className="font-medium">December 2025</span>
          </p>
        </header>

        {/* Main card */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
          {/* Intro */}
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              This Privacy Policy describes how AegisFlow (&quot;we&quot;,
              &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects
              your information when you use our platform for camera, crowd, and
              event management.
            </p>
            <p>
              By using AegisFlow, you agree to the collection and use of
              information in accordance with this policy.
            </p>
          </div>

          {/* 1. Information we collect */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">
              1. Information we collect
            </h2>
            <ul className="list-disc list-inside text-xs md:text-sm text-slate-700 space-y-1">
              <li>
                <span className="font-medium">Account information:</span> name,
                email address, and credentials you provide when creating or
                managing your account.
              </li>
              <li>
                <span className="font-medium">Usage data:</span> actions you
                perform in the app, such as creating tasks, events, or staff
                assignments.
              </li>
              <li>
                <span className="font-medium">Device & technical data:</span>{" "}
                basic information like browser type, approximate location, and
                log data used to keep the platform secure and improve
                performance.
              </li>
            </ul>
          </div>

          {/* 2. How we use your information */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">
              2. How we use your information
            </h2>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-xs md:text-sm text-slate-700 space-y-1">
              <li>Provide and maintain your AegisFlow account.</li>
              <li>Manage tasks, events, cameras, and staff assignments.</li>
              <li>
                Improve the reliability, security, and usability of the app.
              </li>
              <li>
                Communicate with you about important updates, support, or
                security-related notifications.
              </li>
            </ul>
          </div>

          {/* 3. Data protection */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">
              3. Data protection & security
            </h2>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              We use reasonable technical and organizational measures to protect
              your personal data against unauthorized access, loss, or misuse.
              However, no method of transmission or storage is 100% secure, and
              we cannot guarantee absolute security.
            </p>
          </div>

          {/* 4. Your rights */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">
              4. Your rights & controls
            </h2>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc list-inside text-xs md:text-sm text-slate-700 space-y-1">
              <li>Access the personal information we hold about you.</li>
              <li>Update or correct your account details.</li>
              <li>
                Request deletion of your account and associated data from within
                the app (e.g. using the delete account option in settings).
              </li>
              <li>
                Contact us if you have questions or concerns about your privacy.
              </li>
            </ul>
          </div>

          {/* 5. Data sharing */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">
              5. Data sharing & third parties
            </h2>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              We do not sell your personal information. We may share information
              only when:
            </p>
            <ul className="list-disc list-inside text-xs md:text-sm text-slate-700 space-y-1">
              <li>Required by law, regulation, or legal process.</li>
              <li>
                Needed to protect the rights, property, or safety of AegisFlow,
                our users, or others.
              </li>
              <li>
                Working with trusted service providers who support our platform
                and are bound by confidentiality obligations.
              </li>
            </ul>
          </div>

          {/* 6. Retention */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">
              6. Data retention
            </h2>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              We keep your information for as long as your account is active or
              as needed to provide our services. When you delete your account,
              we remove or anonymize your personal data, subject to technical,
              legal, or security-related limitations.
            </p>
          </div>

          {/* 7. Changes */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">
              7. Changes to this policy
            </h2>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              We may update this Privacy Policy from time to time. When we do,
              we will update the &quot;Last updated&quot; date at the top of
              this page. If the changes are significant, we may also notify you
              inside the app.
            </p>
          </div>

          {/* 8. Contact */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">
              8. Contact us
            </h2>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              If you have questions about this Privacy Policy or how we handle
              your data, please reach out to your AegisFlow administrator or
              project contact.
            </p>
          </div>

          {/* Footer action */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-100 mt-4">
            <p className="text-[11px] text-slate-500">
              By continuing to use AegisFlow, you agree to this Privacy Policy.
            </p>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition"
            >
              Go back
            </button>
          </div>
        </section>
      </main>
      {/* Footer from your home components */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
