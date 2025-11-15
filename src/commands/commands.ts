/* global Office */

Office.onReady(() => {
  // Office is ready
});

/**
 * Shows the task pane
 */
function showTaskpane(event: Office.AddinCommands.Event) {
  // Task pane will be shown automatically by Office when this function is called
  // Just signal that the command execution is complete
  event.completed();
}

/**
 * Optimizes the formula in the selected cell
 */
async function optimizeFormula(event: Office.AddinCommands.Event) {
  try {
    // This function is triggered from ribbon button
    // The taskpane should already be open, and it will handle the optimization
    // If you need to trigger optimization programmatically, you could use:
    // - localStorage to set a flag
    // - postMessage to communicate with the taskpane
    // For now, just complete the event
    event.completed();
  } catch (error) {
    console.error('Error optimizing formula:', error);
    event.completed();
  }
}

// Register functions globally for Office to call
(global as any).showTaskpane = showTaskpane;
(global as any).optimizeFormula = optimizeFormula;
