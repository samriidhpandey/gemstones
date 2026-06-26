import TrackClient from './TrackClient';

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Track Your Acquisition</h1>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          Enter your reference code and email to track the secure delivery of your Antigravity pieces.
        </p>
        
        <TrackClient />
      </div>
    </div>
  );
}
