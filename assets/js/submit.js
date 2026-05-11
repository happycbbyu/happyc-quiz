const GAS_URL = 'https://script.google.com/macros/s/AKfycbxHjgYIVKr5XvZLbVs35xSfdDpBXi6543nxmI1oE6rL8yk5V1XNroTV3PuhJwolmCUf/exec';

async function submitResult(answers, levelIdx, areaScores) {
  const payload = {
    timestamp: new Date().toISOString(),
    level: 'Lv' + (levelIdx + 1),
    q1: answers[0], q2: answers[1], q3: answers[2],
    q4: answers[3], q5: answers[4], q6: answers[5],
    q7: answers[6], q8: answers[7], q9: answers[8],
    q10: answers[9], q11: answers[10], q12: answers[11],
    q13: answers[12], q14: answers[13], q15: answers[14],
    q16: answers[15], q17: answers[16], q18: answers[17],
    q19: answers[18], q20: answers[19],
    area1: areaScores[0], area2: areaScores[1], area3: areaScores[2],
    area4: areaScores[3], area5: areaScores[4], area6: areaScores[5],
    area7: areaScores[6],
    ua: navigator.userAgent,
  };

  try {
    await fetch(GAS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    // 저장 실패해도 결과 페이지는 정상 표시
  }
}
