/* global Office */

Office.onReady(() => {
  // Office is ready
});

/**
 * Shows the task pane
 */
function showTaskpane(event: Office.AddinCommands.Event) {
  const url = 'https://localhost:3000/taskpane.html';
  Office.addin.showAsTaskpane(url);
  event.completed();
}

/**
 * Optimizes the formula in the selected cell
 */
async function optimizeFormula(event: Office.AddinCommands.Event) {
  try {
    // This function is triggered from ribbon button
    // Show the taskpane and trigger optimization
    const url = 'https://localhost:3000/taskpane.html';
    await Office.addin.showAsTaskpane(url);

    // The actual optimization is handled in the taskpane
    event.completed();
  } catch (error) {
    console.error('Error optimizing formula:', error);
    event.completed();
  }
}

// Register functions
(global as any).showTaskpane = showTaskpane;
(global as any).optimizeFormula = optimizeFormula;
