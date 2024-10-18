import { formatTime } from './timeUtils';  // Import the formatTime function

export function analyzeMetrics(metrics, timeIn, timeOut) {
  const suggestions = [];

  const userName = metrics.name || 'Salesperson'; // Default to 'Salesperson' if no name is provided

  // Ensure all metrics are numbers and handle missing/undefined values
  const zipsCollected = parseFloat(metrics.zipsCollected) || 0;
  const phonesTakenOut = parseFloat(metrics.phonesTakenOut) || 0;
  const customerNumbers = parseFloat(metrics.customerNumbers) || 0;
  const gasSales = parseFloat(metrics.gasSales) || 0;
  const electricSales = parseFloat(metrics.electricSales) || 0;
  const totalEngagements = Math.max(metrics.peopleTalkedTo, metrics.textsSent);  // Use the higher of the two

  // Gas sales count as 0.5, electric sales as 1
  const totalSales = (gasSales * 0.5) + electricSales;

  // Use totalEngagements to add a suggestion based on engagement
  if (totalEngagements < 10) {
    suggestions.push(`You have a total of ${totalEngagements} engagements. Consider increasing your interactions to reach more people or send more texts to improve your reach.`);
  }

  // 1. Check if Phones Taken Out is 50% of Zips Collected
  const expectedPhonesOut = zipsCollected * 0.5;
  if (phonesTakenOut < expectedPhonesOut) {
    suggestions.push(`Fantastic work collecting ${zipsCollected} zips! To make the most of these, aim to reach out to ${expectedPhonesOut.toFixed(1)} people and start turning those connections into opportunities.`);
  }

  // 2. Check if Customer Numbers is 40% of Phones Taken Out
  const expectedCustomerNumbers = phonesTakenOut * 0.4;
  if (customerNumbers < expectedCustomerNumbers) {
    suggestions.push(`You’re gaining traction with ${phonesTakenOut} phone contacts! To convert more of these into customer numbers, focus on guiding the conversation and confidently addressing any objections.`);
  }

  // 3. No Sales: Provide improvement tips if no sales
  if (totalSales === 0) {
    suggestions.push(`${userName}, you're laying the foundation, and the sales will come with persistence. Here's how you can refine your approach to boost your chances:
      - Focus on building rapport with the people you're talking to.
      - Identify and address any objections early. Acknowledge concerns and provide clear, confident solutions.
      - Follow up persistently but respectfully. Most sales require multiple touchpoints, so don’t hesitate to reconnect and nurture those relationships.`);
  }

  // 4. Check if Total Sales is 50% of Customer Numbers
  const expectedClosings = customerNumbers * 0.5;
  if (totalSales > 0 && totalSales < expectedClosings) {
    suggestions.push(`You’re on a great track with ${customerNumbers} customers and ${totalSales.toFixed(1)} sales! Let’s set our sights on ${expectedClosings.toFixed(1)} sales to keep the momentum going strong.`);
  }

  // 5. Check if they've reached the 5 sales minimum
  const salesToTarget = (5 - totalSales).toFixed(1);
  if (totalSales > 0 && totalSales < 5) {
    suggestions.push(`You're on your way with ${totalSales.toFixed(1)} sale(s)! To hit that magic number of 5, keep pushing forward and aim for ${salesToTarget} more sale(s).`);

    // 6. Calculate how many more zips, phones, or customer numbers are needed to achieve sales
    const requiredSales = 5 - totalSales;
    const requiredCustomers = requiredSales * 2;
    const requiredPhones = requiredCustomers / 0.4;  // Customer Numbers → Phones (40% conversion rate)
    const requiredZips = requiredPhones / 0.5;       // Phones → Zips (50% conversion rate)

    suggestions.push(`To achieve your target of ${requiredSales.toFixed(1)} more sale(s), aim to generate ${requiredCustomers.toFixed(1)} more customer number(s), take out ${requiredPhones.toFixed(1)} more phones, and collect ${requiredZips.toFixed(1)} more zips.`);
  } else if (totalSales >= 5 && totalSales < 10) {
    // Encourage the user to hit the 10-sale goal
    const salesToNextGoal = (10 - totalSales).toFixed(1);
    suggestions.push(`Amazing job hitting 5 sales! Now, let’s push for the next milestone—10 sales. You’re just ${salesToNextGoal} sale(s) away from reaching that goal!`);
  } else if (totalSales >= 10) {
    // Reflect on success if more than 10 sales
    suggestions.push(`Incredible! You've exceeded the 10 sales goal with ${totalSales.toFixed(1)} sale(s)!`);

    const reflectionMessages = [];

    // Phones performance
    if (phonesTakenOut >= expectedPhonesOut) {
      reflectionMessages.push(`You took out ${phonesTakenOut} phones, exceeding the 50% target from zips collected. Keep that energy up and continue engaging with more people!`);
    } else {
      reflectionMessages.push(`You could increase your outreach by aiming to take out at least ${expectedPhonesOut.toFixed(1)} phones. Expanding your reach can open up even more opportunities.`);
    }

    // Customer conversion
    if (customerNumbers >= expectedCustomerNumbers) {
      reflectionMessages.push(`You converted ${customerNumbers} customer number(s), reaching the 40% target from phones taken out. Keep converting those opportunities into sales by continuing to build strong relationships!`);
    } else {
      reflectionMessages.push(`You can increase customer conversions by aiming for ${expectedCustomerNumbers.toFixed(1)} customers. Focus on taking control of your conversations—ask open-ended questions, confidently guide the discussion, and address objections early.`);
    }

    // Closing rate
    if (totalSales >= expectedClosings) {
      reflectionMessages.push(`You closed ${totalSales.toFixed(1)} sale(s), which is an impressive 50% or higher of your customer numbers. Keep nurturing these relationships to maintain your closing streak!`);
    } else {
      reflectionMessages.push(`You can increase your closing rate by focusing on following up with your existing customers. Aim for ${expectedClosings.toFixed(1)} sales to maximize your efforts.`);
    }

    suggestions.push(`Here's what worked for you:\n- ${reflectionMessages.join('\n- ')}\n\nYou're doing amazing—keep applying what worked and continue your successful run!`);
  }

  // 7. Calculate time worked and suggest improvements
  const calculateTimeWorked = (timeIn, timeOut) => {
    if (!timeIn || !timeOut) return 0;
    const [hoursIn, minutesIn] = timeIn.split(':').map(Number);
    const [hoursOut, minutesOut] = timeOut.split(':').map(Number);
    
    const start = new Date();
    start.setHours(hoursIn, minutesIn);
    
    const end = new Date();
    end.setHours(hoursOut, minutesOut);

    const diffMs = end - start;
    return diffMs / (1000 * 60 * 60); // Convert milliseconds to hours
  };

  const hoursWorked = calculateTimeWorked(timeIn, timeOut);
  
  if (hoursWorked > 0) {
    const avgTimePerPerson = 15 / 60; // Assume 15 minutes per conversation
    const avgTimePerZip = 10 / 60; // Assume 10 minutes per zip

    const additionalPeople = Math.floor(hoursWorked / avgTimePerPerson);
    const additionalZips = Math.floor(hoursWorked / avgTimePerZip);

    const formattedTimeIn = formatTime(timeIn);   // Convert to 12-hour format
    const formattedTimeOut = formatTime(timeOut); // Convert to 12-hour format

    suggestions.push(`${userName}, you worked for a total of ${hoursWorked.toFixed(2)} hours from ${formattedTimeIn} to ${formattedTimeOut}. With that time, you could have talked to ${additionalPeople} more people and collected ${additionalZips} more zips.`);
  }

  return suggestions;
}
