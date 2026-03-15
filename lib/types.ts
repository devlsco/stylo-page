export interface Command {
  Type: string;
  Name: string;
  Aliases: string[];
  Description: string;
  Enabled: boolean;
  Access: { Global: number; Channel: number };
  Cooldown: { Global: number; Channel: number; User: number; Delay: number };
  Response: number;
  CommandUsage?: { CommandName: string; CommandResponse: string }[];
}
