import ProfileUpdateForm from "@/components/forms/ProfileUpdateForm";
import SettingsNav from "@/components/nav/SettingsNav";
import Divider from "@/components/ui/divider";
import { Metadata } from "next/types";

export default function Profile() {
  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings.</p>
      </div>
      <Divider className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <SettingsNav />
        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Profile</h3>
              <p className="text-sm text-muted-foreground">
                Your account information
              </p>
            </div>
            <Divider />

            <ProfileUpdateForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Markaz | Profile",
  description: "Account settings",
};
