import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';

const HeroSection = () => (
  <section className="w-full px-4 md:px-8 lg:px-16 xl:px-32 py-20 md:py-32 bg-background">
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
      <div className="flex-1 text-center lg:text-left space-y-6">
        <main>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight gif-text">
            stylo
          </h1>
        </main>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
          Twitch-Bot für Commands, Notifications und mehr.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start gap-4 pt-2">
          <Button size="lg" variant="outline" asChild>
            <Link href="/commands">Explore Commands</Link>
          </Button>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center z-10">
        <div className="w-[260px] sm:w-[300px] md:w-[400px] lg:w-[450px] aspect-square rounded-xl overflow-hidden shadow-lg">
          <iframe
            src={`https://www.twitch.tv/embed/7stylo/chat?parent=bot.styloo.dev&darkpopout=true`}
            title="Twitch Chat"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen={false}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <Header />
      <HeroSection />
    </div>
  );
}
