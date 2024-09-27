const input = document.getElementById("formula");
const output = document.getElementById("output");
const submit = document.getElementById("submit");
const clear = document.getElementById("clear");

function formatEq(equation) {
  const fInput = input.value.split("\n").filter(n => n != "");
  fInput.forEach((equation, i) => {
    const subscriptRegex = /([A-Z][a-z]?)(\d+)/g; // Matches elements followed by numbers (e.g., H2, O3)
    const superscriptRegex = /(\^)(-?\d*[+-]?)/g; // Matches superscripts with optional number and sign (e.g., ^2+, ^-2, ^+, ^-)
    const parenthesisSubscriptRegex = /(\))(\d+)/g; // Matches numbers after parentheses (e.g., (NO3)2)

    // Format subscripts for elements and polyatomic ions
    let formattedEquation = equation
      .replace(subscriptRegex, (match, element, number) => {
        return `${element}<sub>${number}</sub>`;
      })
      // Format superscripts
      .replace(superscriptRegex, (match, caret, number) => {
        return `<sup>${number || ''}</sup>`; // Handle cases where number is empty (for ^+ or ^-)
      })
      // Format subscripts for numbers after parentheses
      .replace(parenthesisSubscriptRegex, (match, closingParen, number) => {
        return `)<sub>${number}</sub>`;
      });

    output.insertRow(0 + i).innerHTML = formattedEquation;
  });
  // return formattedEquation;
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
  output.innerHTML = "";
}

// resize textarea
input.oninput = () => {
  input.style.height = 'auto';
  input.style.height = input.scrollHeight + 'px';
};