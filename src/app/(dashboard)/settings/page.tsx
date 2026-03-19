export default function SettingsPage() {
  return (
    <div className="flex flex-col flex-1 h-full w-full max-w-5xl mx-auto px-8 pb-20 pt-10 gap-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-[#FFFFFF]">Settings</h1>
      
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-[#1F1F1F] pb-4">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-[#A1A1A1]">Always enabled for maximum focus.</p>
            </div>
            <div className="w-10 h-6 bg-[#00FF94] rounded-full relative shadow-[0_0_10px_rgba(0,255,148,0.3)]">
              <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
            </div>
          </div>
          
          <div className="flex justify-between items-center border-b border-[#1F1F1F] pb-4">
            <div>
              <p className="font-medium">AI Coaching Mode</p>
              <p className="text-sm text-[#A1A1A1]">Receive unsolicited hints while solving.</p>
            </div>
            <div className="w-10 h-6 bg-[#00FF94] rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
