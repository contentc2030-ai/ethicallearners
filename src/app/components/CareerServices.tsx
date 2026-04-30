import { Trophy, Users, FileText, Briefcase } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

const services = [
  {
    icon: FileText,
    title: "Resume Building",
    description: "Get MAANG-ready resumes and nail your skills pitch",
  },
  {
    icon: Users,
    title: "Mock Interviews",
    description: "Crush interview fear with mock interviews",
  },
  {
    icon: FaLinkedin,
    title: "LinkedIn Profile",
    description: "Get noticed by top companies through LinkedIn",
    isReactIcon: true,
  },
  {
    icon: Briefcase,
    title: "Company Assignments",
    description: "Bridging theory to practice with hands-on industry projects",
  },
  {
    icon: Trophy,
    title: "Referrals to 800+ Hiring partners",
    description: "Unlocking pathways to diverse career opportunities",
  },
];

export default function CareerServices() {
  return (
    <section className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Dedicated Career Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <Icon className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
