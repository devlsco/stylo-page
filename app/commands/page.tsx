import type { Command } from '@/lib/types';
import CommandListWithDetails from '@/components/command-list-with-details';

export const dynamic = 'force-dynamic';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

async function getCommands(): Promise<Command[]> {
  const commandsUrl = 'https://twitch.styloo.dev/twitch/commands';

  try {
    const res = await fetch(commandsUrl, {
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to fetch commands: ${res.status} - ${errorText}`);
      throw new Error(`Failed to fetch commands: ${res.status}`);
    }

    const data = await res.json();
    // API liefert Array; ggf. Normalisierung auf unser Command-Format (PascalCase)
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export default async function CommandsPage() {
  try {
    const commands = await getCommands();

    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col items-center justify-center mb-8 relative mx-auto">
          <Link href="/" passHref>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0"
              title="Home"
            >
              <ArrowLeft />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-primary">Commands</span>
          </h1>
        </div>

        <CommandListWithDetails commands={commands} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching commands:', error);

    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        <h1 className="text-2xl font-bold mb-4">Fehler</h1>
        <p>Error Commands: {error instanceof Error ? error.message : 'Unknown Error'}</p>
        <Link href="/" className="mt-4 inline-block">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }
}