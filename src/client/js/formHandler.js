/**
 * Add an element to a Document root element
 */
function DOMRoot(selector) {
  try {
    let entry = document.querySelector(selector);
    function render(element) {
      if (entry && element) {
        entry.innerHTML = '';
        entry.append(element);
      }
    }
    return { render };
  } catch (e) {
    console.error(e);
  }
}

function SentenceListItem ({ agreement, confidence, text }) {
    const details = document.createElement('details');
    details.classList.add('sentence-list-item');
    const summary = document.createElement('summary');
    summary.append(`${text} (${confidence}%)`)
    details.appendChild(summary);
    const d = document.createElement('div');
    d.classList.add('sentence-summary-container');
    details.appendChild(d);
    const p = document.createElement('p');
    p.innerHTML = text;
    d.appendChild(p);
    const span = document.createElement('div');
    span.append(agreement);
    d.appendChild(span);
    const label = document.createElement('label');
    label.append('Confidence: ');
    d.appendChild(label);

    const conf = document.createElement('code');
    conf.append(`${confidence}%`);
    d.appendChild(conf)

    return details;
}

function ResultOverview({ agreement, confidence, irony, subjectivity, count }) {
  const d = document.createElement('div');
  d.classList.add('result-container');
  d.innerHTML = `
    <h4 class="result-summary-heading">${count} Sentences Processed</h4>
    <table class="result-summary-table">
      <thead>
        <tr>
          <th>Subjectivity</th>
          <th>Irony</th>
          <th>Confidence(%)</th>
          <th>Agreement</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${subjectivity}</td>
          <td>${irony}</td>
          <td>${confidence}</td>
          <td>${agreement}</td>
        </tr>
      </tbody>
    </table>
  `;
  return d;
}


async function handleSubmit(event) {
    event.preventDefault();
    // check what url was put into the form
    let url = document.querySelector('#website_url').value;
    try {
      DOMRoot('#results').render('Loading...');
      const res = await fetch(`http://localhost:8081/sentiment?url=${url}`, { headers: { 'Content-Type': 'application/json' }})
      .then(async res => await res.json());
      const fragment = document.createDocumentFragment();
      if (res?.status?.msg?.toLowerCase() === 'ok') {
        const { agreement, irony, subjectivity, confidence, sentence_list } = res;
        fragment.appendChild(ResultOverview({ agreement, irony, subjectivity, confidence, count: sentence_list?.length || 0 }));
        if (sentence_list?.length > 0) {
          for (let item of sentence_list) {
            fragment.appendChild(SentenceListItem({
              agreement: item?.agreement,
              confidence: item?.confidence,
              text: item?.text
            }));
          }
        }
        DOMRoot('#results').render(fragment);
      }
    } catch(error) {
      const errorMsg = document.createElement('p');
      errorMsg.style.color = 'red';
      errorMsg.append(error?.message ?? 'Network Fetch error');
      DOMRoot('#results').render(errorMsg);
    }
    
}

function onBlur() {

}
export { handleSubmit, onBlur }
