'use client';

import type { Command } from '@/lib/types';
import { COMMAND_PREFIX } from '@/lib/constants';

import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CommandDetailsDialogProps {
  command: Command | null;
  onClose: () => void;
}

const CommandDetailsDialog = ({
  command,
  onClose,
}: CommandDetailsDialogProps) => {
  const isOpen = !!command;

  if (!command) {
    return null;
  }

  const formatCooldown = (cooldown: number) => `${cooldown}s`;

  const badgeBase = 'rounded-full px-2.5 py-0.5 text-xs font-medium border-0';

  const formatPermissionBadge = (label: string, level: number, type: 'global' | 'channel') => {
    let badge;

    if (type === 'global') {
        switch (level) {
          case 0:
            badge = <Badge className={`${badgeBase} bg-muted text-muted-foreground`}>Everyone</Badge>;
            break;
          case 1:
            badge = <Badge className={`${badgeBase} bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700`}>Admin</Badge>;
            break;
          case 2:
            badge = <Badge className={`${badgeBase} bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600`}>Owner</Badge>;
            break;
          default:
            badge = <Badge variant="outline" className={badgeBase}>{level}</Badge>;
            break;
        }
      } else if (type === 'channel') {
        switch (level) {
          case 0:
            badge = <Badge className={`${badgeBase} bg-muted text-muted-foreground`}>Everyone</Badge>;
            break;
          case 1:
            badge = <Badge className={`${badgeBase} bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600`}>VIP</Badge>;
            break;
          case 2:
            badge = <Badge className={`${badgeBase} bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600`}>Moderator</Badge>;
            break;
          case 3:
            badge = <Badge className={`${badgeBase} bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600`}>Broadcaster</Badge>;
            break;
          default:
            badge = <Badge variant="outline" className={badgeBase}>{level}</Badge>;
            break;
        }
      }

    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">{label}:</span> {badge}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-card border-border shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">{COMMAND_PREFIX}{command.Name}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{command.Description}</DialogDescription>
        </DialogHeader>

        <Separator className="bg-border" />

        <ScrollArea className="max-h-[60vh] p-4">
          <div className="grid gap-6">
            {command.Enabled !== undefined && (
              <div>
                <h3 className="text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">Enabled</h3>
                <Badge
                  variant="outline"
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${command.Enabled ? 'bg-primary/15 text-primary border-primary/30' : 'bg-muted/60 text-muted-foreground border-border'}`}
                >
                  {command.Enabled ? 'Yes' : 'No'}
                </Badge>
              </div>
            )}

            {command.Access && (
              <div>
                <h3 className="text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">Access</h3>
                <div className="grid grid-cols-2 gap-4">
                  {formatPermissionBadge('Global', command.Access.Global, 'global')}
                  {formatPermissionBadge('Channel', command.Access.Channel, 'channel')}
                </div>
              </div>
            )}

            {command.Cooldown && (
              <div>
                <h3 className="text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">Cooldowns</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Global:</span>
                    <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-xs bg-muted/40 border-border">
                      {formatCooldown(command.Cooldown.Global)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Channel:</span>
                    <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-xs bg-muted/40 border-border">
                      {formatCooldown(command.Cooldown.Channel)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">User:</span>
                    <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-xs bg-muted/40 border-border">
                      {formatCooldown(command.Cooldown.User)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Delay:</span>
                    <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-xs bg-muted/40 border-border">
                      {formatCooldown(command.Cooldown.Delay)}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {command.Aliases && command.Aliases.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">Aliases</h3>
                <div className="flex flex-wrap gap-2">
                  {command.Aliases.map((alias) => (
                    <Badge
                      key={alias}
                      variant="outline"
                      className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted/50 text-muted-foreground border-border"
                    >
                      {alias}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {command.Response !== undefined && (
              <div>
                <h3 className="text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">Response</h3>
                <Badge
                  variant="outline"
                  className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted/50 text-muted-foreground border-border"
                >
                  {command.Response === 1 ? 'Reply in chat' : `Type ${command.Response}`}
                </Badge>
              </div>
            )}

            {command.CommandUsage && command.CommandUsage.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">Usage</h3>
                <div className="space-y-3">
                  {command.CommandUsage.map((usage, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30 border border-border">
                      <p className="font-mono text-sm text-foreground">
                        {COMMAND_PREFIX + usage.CommandName.replace(/^[-$]/, '')}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{usage.CommandResponse}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CommandDetailsDialog;
