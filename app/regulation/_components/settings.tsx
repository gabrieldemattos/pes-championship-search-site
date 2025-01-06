import { ReactNode } from "react";

interface SettingsProps {
  icon: ReactNode;
  label: string;
  setting: string;
}

const Settings = ({ icon, label, setting }: SettingsProps) => {
  return (
    <div className="mb-4 text-lg text-gray-300">
      <div className="flex items-center space-x-3">
        <span className="text-xl">{icon}</span>
        <span className="font-semibold">{label}:</span>
      </div>
      <div className="ml-8">
        <span className="font-bold text-red-500">{setting}</span>
      </div>
    </div>
  );
};

export default Settings;
