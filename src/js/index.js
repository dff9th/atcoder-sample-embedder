main();

function main() {
    const samplePairs = getSamplePairs();
    if (samplePairs.length < 1) {
        return;
    }
    // 日本語と英語それぞれに同じサンプル要素があるので半分だけ使う
    const halfSamplePairs = samplePairs.slice(0, samplePairs.length / 2);
    const testCodeText = toCodeFromSamplePairs(halfSamplePairs);
    console.log(testCodeText);
    generateElements(testCodeText);
}

// 入出力サンプルペア要素を [[inputElement, outputElement], ...] の形で取得
function getSamplePairs() {
    let samplePairs = [];
    let num = 0;
    let input;
    let output;
    while ((input = document.getElementById(`pre-sample${num++}`))) {
        output = document.getElementById(`pre-sample${num++}`);
        samplePairs.push([input, output]);
    }
    return samplePairs;
}

// 入出力サンプルペアをテストコードに変換
function toCodeFromSamplePair(samplePair) {
    const [input, output] = samplePair;
    return `r"${input.innerText}" => r"${output.innerText.trim()}"`;
}

// 入出力サンプルペアのリストからテストコードに変換
function toCodeFromSamplePairs(samplePairs) {
    return samplePairs.map(toCodeFromSamplePair).join(',\n\n');
}

// コピーボタンとコピー内容(テストコード)の要素を生成する
function generateElements(testCodeText) {
    const button = document.createElement('button');
    button.innerText = 'Copy sample test code';
    button.addEventListener('click', () => {
        document.getSelection().selectAllChildren(testCodeElement);
        document.execCommand('copy');
    });

    const testCodeElement = document.createElement('pre');
    testCodeElement.innerText = testCodeText;

    const wrapper = document.createElement('div');
    wrapper.appendChild(button);
    wrapper.appendChild(testCodeElement);

    const root = document.getElementById('task-statement');
    root.appendChild(wrapper);
}
