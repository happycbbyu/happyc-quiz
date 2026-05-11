const state = {
  current: 0,
  answers: Array(QUESTIONS.length).fill(null),
};

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.style.display = 'none';
  });
  const el = document.getElementById(id);
  el.style.display = id === 'screen-loading' ? 'flex' : 'block';
  window.scrollTo(0, 0);
}

function renderQuestion() {
  const q = QUESTIONS[state.current];
  const total = QUESTIONS.length;
  const progress = (state.current / total) * 100;

  document.getElementById('areaBadge').textContent = q.badge;
  document.getElementById('qNum').textContent = `문항 ${state.current + 1}/${total}`;

  // 진행바
  document.getElementById('progressFill').style.width = progress + '%';
  updateCharacterPosition(progress);

  // 질문
  document.getElementById('questionText').textContent = q.text;

  // 보기
  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';
  const nums = ['①','②','③','④','⑤','⑥'];
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn' + (state.answers[state.current] === i ? ' selected' : '');
    btn.innerHTML = `<span class="opt-num">${nums[i]}</span><span class="opt-text">${opt.text}</span>`;
    btn.addEventListener('click', () => selectOption(i));
    container.appendChild(btn);
  });

  document.getElementById('prevBtn').disabled = state.current === 0;
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.disabled = state.answers[state.current] === null;
  nextBtn.textContent = state.current === total - 1 ? '결과 보기 →' : '다음 →';
}

function updateCharacterPosition(progress) {
  const track = document.getElementById('progressTrack');
  const character = document.getElementById('husbandChar');
  const fallback = document.getElementById('husbandFallback');
  if (!track) return;
  const trackWidth = track.offsetWidth;
  const charLeft = (trackWidth * progress / 100) - 18;
  const left = Math.max(0, Math.min(charLeft, trackWidth - 36)) + 'px';
  if (character) character.style.left = left;
  if (fallback) fallback.style.left = left;
}

function selectOption(idx) {
  state.answers[state.current] = idx;
  document.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.classList.toggle('selected', i === idx);
  });
  document.getElementById('nextBtn').disabled = false;
}

function goNext() {
  if (state.answers[state.current] === null) return;
  if (state.current < QUESTIONS.length - 1) {
    state.current++;
    renderQuestion();
  } else {
    startLoading();
  }
}

function goPrev() {
  if (state.current > 0) {
    state.current--;
    renderQuestion();
  }
}

function startLoading() {
  showScreen('screen-loading');
  let w = 0;
  const fill = document.getElementById('loadingFill');
  const timer = setInterval(() => {
    w += 2;
    fill.style.width = w + '%';
    if (w >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        const levelIdx = calcLevel(state.answers);
        const areaScores = calcAreaScores(state.answers);
        renderResult(levelIdx, areaScores);
        submitResult(state.answers, levelIdx, areaScores);
        showScreen('screen-result');
      }, 300);
    }
  }, 30);
}

function restartQuiz() {
  state.current = 0;
  state.answers = Array(QUESTIONS.length).fill(null);
  showScreen('screen-intro');
}

document.addEventListener('DOMContentLoaded', () => {
  // 초기 상태: intro만 표시
  document.querySelectorAll('.screen').forEach(s => { s.style.display = 'none'; });
  document.getElementById('screen-intro').style.display = 'block';

  document.getElementById('startBtn').addEventListener('click', () => {
    showScreen('screen-quiz');
    renderQuestion();
  });
  document.getElementById('nextBtn').addEventListener('click', goNext);
  document.getElementById('prevBtn').addEventListener('click', goPrev);
  document.getElementById('restartBtn').addEventListener('click', restartQuiz);

  document.getElementById('shareBtn').addEventListener('click', () => {
    const url = location.href;
    if (navigator.share) {
      navigator.share({ title: '신혼부부 자산 레벨 진단 — 해피씨쀼', url });
    } else {
      navigator.clipboard.writeText(url).then(() => alert('링크가 복사됐어요!'));
    }
  });
});
