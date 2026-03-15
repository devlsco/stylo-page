import { Command } from '@/lib/types';
import { NextResponse } from 'next/server';

const commands: Command[] = [
  {
    Type: '7TV',
    Name: 'add',
    Aliases: [],
    Description: 'Add 7TV emotes to your channel',
    Enabled: true,
    Access: { Global: 0, Channel: 2 },
    Cooldown: { Global: 0, Channel: 2.5, User: 5, Delay: 0 },
    Response: 1,
  },
  {
    Type: 'Admin',
    Name: 'bot',
    Aliases: [],
    Description: 'Bot Management (Dev only)',
    Enabled: true,
    Access: { Global: 2, Channel: 0 },
    Cooldown: { Global: 0, Channel: 2.5, User: 5, Delay: 0 },
    Response: 1,
    CommandUsage: [
      { CommandName: '-bot join <channel>', CommandResponse: 'Joined #lsco' },
      { CommandName: '-bot leave <channel>', CommandResponse: 'Left #lsco' },
      { CommandName: '-bot channels', CommandResponse: 'Currently in: #lsco, #styloo' },
    ],
  },
  {
    Type: 'General',
    Name: 'cmds',
    Aliases: ['commands', 'botcmds'],
    Description: 'List all commands available Bot commands.',
    Enabled: true,
    Access: { Global: 0, Channel: 0 },
    Cooldown: { Global: 0, Channel: 2.5, User: 5, Delay: 0 },
    Response: 1,
  },
  {
    Type: 'General',
    Name: 'join',
    Aliases: [],
    Description: 'Joining your channel.',
    Enabled: true,
    Access: { Global: 0, Channel: 0 },
    Cooldown: { Global: 0, Channel: 0, User: 30, Delay: 0 },
    Response: 1,
    CommandUsage: [{ CommandName: '-join', CommandResponse: 'Joined your channel!' }],
  },
  {
    Type: 'General',
    Name: 'leave',
    Aliases: ['part'],
    Description: 'Leaves your channel.',
    Enabled: true,
    Access: { Global: 0, Channel: 0 },
    Cooldown: { Global: 0, Channel: 0, User: 30, Delay: 0 },
    Response: 1,
    CommandUsage: [
      { CommandName: '-leave', CommandResponse: 'Left your channel, @TestUser FeelsBadMan' },
      { CommandName: '-part', CommandResponse: 'Left your channel, @TestUser FeelsBadMan' },
    ],
  },
  {
    Type: 'Notifications',
    Name: 'notification',
    Aliases: ['notifications', 'notify'],
    Description:
      'Manage channel event notifications. Types: online, offline, title, game. Multiple types comma-separated.',
    Enabled: true,
    Access: { Global: 0, Channel: 1 },
    Cooldown: { Global: 0, Channel: 0, User: 2.5, Delay: 0 },
    Response: 1,
    CommandUsage: [
      { CommandName: '-notify add online,title <channel>', CommandResponse: "Notifications for forsen updated 'online' added and 'title' added" },
      { CommandName: '-notify remove game <channel>', CommandResponse: "Notifications for forsen updated 'game' removed" },
      { CommandName: '-notify ping online <channel>', CommandResponse: "Your ping settings for forsen updated added you to pings for 'online'" },
      { CommandName: '-notify unping title <channel>', CommandResponse: "Your ping settings for forsen updated removed you from pings for 'title'" },
      { CommandName: '-notify list', CommandResponse: 'Active notifications in this channel: forsen: online, title (Pings: 1) and nymn: online' },
    ],
  },
  {
    Type: 'Utility',
    Name: 'ping',
    Aliases: [],
    Description: 'Checks bot latency and status info.',
    Enabled: true,
    Access: { Global: 0, Channel: 0 },
    Cooldown: { Global: 0, Channel: 0, User: 5, Delay: 0 },
    Response: 1,
    CommandUsage: [
      {
        CommandName: '-ping',
        CommandResponse:
          'Pong! Active Channels: 150 | EventSub: 320 | Uptime: 30 minutes, 14 seconds | Latency: 45ms | Memory used: 128MB',
      },
    ],
  },
  {
    Type: 'Info',
    Name: 'commands',
    Aliases: [],
    Description: 'List of available commands.',
    Enabled: true,
    Access: { Global: 0, Channel: 0 },
    Cooldown: { Global: 0, Channel: 5, User: 0, Delay: 0 },
    Response: 1,
    CommandUsage: [
      { CommandName: '-commands', CommandResponse: 'The commands are available at: https://twitch.styloo.dev/commands' },
    ],
  },
];

export async function GET() {
  return NextResponse.json(commands);
}
