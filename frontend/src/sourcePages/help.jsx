import React from "react";
import { Link } from "react-router-dom";
import Nav from "../homeComponents/Nav";

const HelpPage = () => {
  const currentYear = new Date().getFullYear();

  const faqs = [
    {
      q: "How do I add a new camera?",
      a:
        "Go to the camera section of the dashboard, use the 'Add camera' option, and fill in details such as name and location. Once saved, the camera will be available when creating tasks or assigning staff.",
    },
    {
      q: "How do I assign staff to a camera?",
      a:
        "Open the Staff area on the dashboard and click the add button. Select a camera, confirm the auto-filled location, then enter the staff ID and name before saving.",
    },
    {
      q: "How do I create and track tasks?",
      a:
        "From the Tasks panel on your profile dashboard, click the + button to create a new task. Select a camera, choose a task type, and set start/end times. You can mark tasks as finished and remove completed tasks when no longer needed.",
    },
    {
      q: "What should I do if my account details are wrong?",
      a:
        "Open your profile panel and use the 'Edit profile' option to update your name or password. For email changes or account issues, contact your system administrator.",
    },
  ];

  return (
    <>
      <Nav />

      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          {/* Header */}
          <header className="mb-6">
            <p className="text-[11px] text-slate-500 mb-1">
              Support &gt; Help center
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">
              Help & documentation
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Learn how to use the Crowd Management System and find answers to
              common questions.
            </p>
          </header>

          {/* Content card */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
            {/* Quick start */}
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-slate-900">
                Getting started
              </h2>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                The dashboard is organized around your daily work:
                <span className="block mt-1">
                  • Left side: your profile and task management.
                </span>
                <span className="block">
                  • Right side: events and staff assignments.
                </span>
              </p>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed mt-1">
                Use the navigation bar to move between home, profile, privacy
                policy, contact, and other pages depending on your role.
              </p>
            </div>

            {/* FAQ section */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-900">
                Frequently asked questions
              </h2>

              <div className="space-y-3">
                {faqs.map((item, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-xl p-3.5 md:p-4 bg-slate-50/70"
                  >
                    <p className="text-xs md:text-sm font-medium text-slate-900 mb-1.5">
                      {item.q}
                    </p>
                    <p className="text-[11px] md:text-xs text-slate-700 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips / best practices */}
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-slate-900">
                Tips for effective use
              </h2>
              <ul className="list-disc list-inside text-[11px] md:text-xs text-slate-700 space-y-1">
                <li>
                  Keep camera names and locations clear so staff can easily
                  identify them.
                </li>
                <li>
                  Close or delete completed tasks regularly to keep your
                  dashboard tidy and focused.
                </li>
                <li>
                  Use events to log important incidents or notes that others may
                  need to review later.
                </li>
                <li>
                  Review staff assignments to ensure each active camera has
                  coverage where required.
                </li>
              </ul>
            </div>

            {/* Need more help */}
            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 mb-1">
                  Still need help?
                </h2>
                <p className="text-[11px] text-slate-600">
                  If you can&apos;t find what you&apos;re looking for here,
                  reach out using the contact page.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition"
              >
                Go to contact page
              </Link>
            </div>
          </section>

          <div className="text-center mt-8 text-[11px] text-slate-500">
            © {currentYear} Crowd Management System. All rights reserved.
          </div>
        </main>
      </div>
    </>
  );
};

export default HelpPage;
