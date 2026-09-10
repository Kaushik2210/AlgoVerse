import MissionMap from "@/components/navigation/MissionMap";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 mx-auto w-full max-w-[1600px]">
      <MissionMap />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
