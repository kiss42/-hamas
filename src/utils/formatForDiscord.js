import { formatTime } from './timeUtils';  // Import the formatTime function

export function formatForDiscord(metrics, suggestions, timeIn, timeOut) {
  // Apply formatTime to convert 24-hour format to 12-hour format
  const formattedTimeIn = formatTime(timeIn);    // Convert 24-hour to 12-hour format
  const formattedTimeOut = formatTime(timeOut);  // Convert 24-hour to 12-hour format

  let discordText = `**Daily Report for ${metrics.name || 'User'}**\n`;
  discordText += `Time In: ${formattedTimeIn}\n`;  // Display formatted time
  discordText += `Time Out: ${formattedTimeOut}\n\n`;  // Display formatted time

  // Existing logic to display metrics and suggestions
  discordText += `- People Talked To: ${metrics.peopleTalkedTo}\n`;
  discordText += `- Zips Collected: ${metrics.zipsCollected}\n`;
  discordText += `- Phones Taken Out: ${metrics.phonesTakenOut}\n`;
  discordText += `- Customer Numbers: ${metrics.customerNumbers}\n`;
  discordText += `- Texts Sent: ${metrics.textsSent}\n`;
  discordText += `- Gas Sales: ${metrics.gasSales}\n`;
  discordText += `- Electric Sales: ${metrics.electricSales}\n\n`;

  discordText += `**Suggestions:**\n`;
  suggestions.forEach(suggestion => {
    discordText += `- ${suggestion}\n`;
  });

  return discordText;  // Return the formatted text for Discord
}
