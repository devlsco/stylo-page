'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Command } from '@/lib/types';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CommandDetailsDialog from '@/components/command-details-dialog';
import { COMMAND_PREFIX } from '@/lib/constants';
import { Command as CommandIcon } from 'lucide-react';
import Fuse from 'fuse.js';

interface CommandListProps {
  commands: Command[];
}

const CommandListWithDetails = ({ commands }: CommandListProps) => {
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [filteredCommands, setFilteredCommands] = useState<Command[]>(commands);

  const commandTypes = useMemo(() => {
    const types = new Set<string>();
    commands.forEach((command) => {
      if (command.Type) {
        types.add(command.Type);
      }
    });
    const sortedTypes = Array.from(types).sort();
    return ['all', ...sortedTypes];
  }, [commands]);

  const fuse = useMemo(() => {
    return new Fuse(commands, {
      keys: ['Name', 'Description', 'Aliases', 'Type'],
      threshold: 0.4,
      ignoreLocation: true,
    });
  }, [commands]);

  useEffect(() => {
    let result = commands;

    if (selectedType !== 'all') {
      result = result.filter((command) => command.Type === selectedType);
    }

    if (searchQuery) {
      const searchResults = fuse.search(searchQuery);
      const searchedItems = searchResults.map((item) => item.item);
      result = result.filter((command) =>
        searchedItems.some(
          (searchedCommand) => searchedCommand.Name === command.Name
        )
      );
    }

    setFilteredCommands(result);
  }, [searchQuery, selectedType, commands, fuse]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-3/4">
          <Input
            placeholder="Search commands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-primary/30 focus-visible:ring-primary"
          />
        </div>
        <div className="w-full md:w-1/3">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full border-primary/30 focus:ring-primary">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {commandTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type === 'all'
                    ? 'All Types'
                    : type.charAt(0).toUpperCase() + type.slice(1)}{' '}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredCommands.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No commands found matching your criteria.
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredCommands.map((command) => (
            <Card
              key={command.Name}
              className="flex flex-col md:flex-row items-start md:items-center p-5 cursor-pointer hover:shadow-md hover:border-primary/40 bg-card border-border transition-all duration-200"
              onClick={() => setSelectedCommand(command)}
              role="button"
              aria-label={`Show details for command ${command.Name}`}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3 md:mb-0 md:mr-4">
                <CommandIcon className="w-6 h-6" />
              </div>

              <div className="flex-grow w-full md:w-auto flex flex-col md:flex-row md:items-center min-w-0 gap-1">
                <div className="flex-grow min-w-0 w-full md:w-auto">
                  <div className="font-semibold text-lg break-words">
                    <span className="text-foreground">{COMMAND_PREFIX}{command.Name}</span>
                    {command.Aliases && command.Aliases.length > 0 && (
                      <span className="text-sm font-normal text-muted-foreground ml-2 break-words">
                        ({command.Aliases.join(', ')})
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground break-words">
                    {command.Description}
                  </div>
                </div>
                <div className="flex-shrink-0 ml-0 md:ml-4 mt-2 md:mt-0 self-start md:self-center">
                  {command.Type && (
                    <Badge
                      variant="outline"
                      className="capitalize rounded-full px-3 py-0.5 text-xs font-medium bg-muted/50 text-muted-foreground border-border"
                    >
                      {command.Type}
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CommandDetailsDialog
        command={selectedCommand}
        onClose={() => setSelectedCommand(null)}
      />
    </div>
  );
};

export default CommandListWithDetails;
