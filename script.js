// todo: equation balance checker, name to formula translation

const input = document.getElementById('formula');
const outputTable = document.getElementById('output');
const submit = document.getElementById('submit');
const clear = document.getElementById('clear');

function formatEq() {
  const subscriptRegex = /([A-Z][a-z]?)(\d+)/g; // Matches elements followed by numbers (e.g., H2, O3)
  const superscriptRegex = /(\^)(-?\d*[+-]?)/g; // Matches superscripts with optional number and sign (e.g., ^2+, ^-2, ^+, ^-)
  const parenthesisSubscriptRegex = /(\))(\d+)/g; // Matches numbers after parentheses (e.g., (NO3)2)

  input.value.split('\n').filter(n => n != '').forEach((equation, i) => {
    // Format subscripts for elements and polyatomic ions
    outputTable.insertRow(0 + i).innerHTML = equation
      .replace(subscriptRegex, (match, element, number) => {
        return `${element}<sub>${number}</sub>`;
      })
      // Format superscripts
      .replace(superscriptRegex, (match, caret, number) => {
        return `<sup>${number || ''}</sup>`; // Handle cases where number is empty (for ^+ or ^-)
      })
      // Format subscripts for numbers after parentheses
      .replace(parenthesisSubscriptRegex, (match, closeP, number) => {
        return `)<sub>${number}</sub>`;
      })
      // replace arrows
      .replace(/-+>/g, '⟶') + "<br>";
  });
}

submit.onclick = () => formatEq();

input.onkeydown = (event) => {
  // Check if Ctrl (or Meta on macOS) is pressed and the Enter key is pressed
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    // Prevent the default action (if any)
    event.preventDefault();
    formatEq();
  }
};

clear.onclick = () => {
  outputTable.innerHTML = '';
}

// resize textarea
input.oninput = () => {
  input.style.height = 'auto';
  input.style.height = input.scrollHeight + 'px';
};