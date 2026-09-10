import MissionMap from "@/components/navigation/MissionMap";
import MobileNavStrip from "@/components/navigation/MobileNavStrip";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1">
      <MobileNavStrip />
      <div className="flex flex-1 mx-auto w-full max-w-[1600px]">
        <MissionMap />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
