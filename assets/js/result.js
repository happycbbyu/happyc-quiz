function renderResult(levelIdx, areaScores) {
  const lv = LEVELS[levelIdx];

  document.getElementById('resultTableLv').textContent = `Lv${lv.lv}`;
  document.getElementById('lvImageFallbackText').textContent = `${lv.emoji} Lv${lv.lv}`;

  const lvImg = document.getElementById('lvImage');
  lvImg.src = `assets/images/02_Lv${lv.lv}.png`;
  lvImg.alt = `레벨 ${lv.lv} 이미지`;
  lvImg.onerror = function () {
    this.style.display = 'none';
    document.getElementById('lvImageFallback').style.display = 'flex';
  };

  document.getElementById('lvTitle').textContent = `${lv.emoji} ${lv.title}`;
  document.getElementById('lvOneliner').textContent = lv.oneliner;
  document.getElementById('lvRange').textContent = lv.range;
  document.getElementById('lvQuote').textContent = lv.quote;
  document.getElementById('lvTitleWrap').style.borderLeftColor = lv.color;

  document.getElementById('trapText').textContent = lv.trap;

  const actionContainer = document.getElementById('actionList');
  actionContainer.innerHTML = '';
  lv.actions.forEach((a, i) => {
    actionContainer.innerHTML += `
      <div class="action-item reveal">
        <div class="action-num">${String(i + 1).padStart(2, '0')}</div>
        <div class="action-body">
          <div class="action-title">${a.title}</div>
          <div class="action-desc">${a.desc}</div>
        </div>
      </div>`;
  });

  // 레이더 차트
  drawRadarChart(areaScores, 'radarChart');

  // 차트 코멘트 (3줄)
  const comments = generateCommentary(areaScores);
  const commentEl = document.getElementById('chartComments');
  commentEl.innerHTML = comments.map(c => `<p class="chart-comment">${c}</p>`).join('');

  // 약점 바 차트
  drawBarChart(areaScores, 'barChart');

  document.getElementById('levelupCondition').textContent = lv.levelup;

  const ctaStudy = document.getElementById('ctaStudy');
  const ctaMaster = document.getElementById('ctaMaster');
  if (lv.cta === 'study') {
    ctaStudy.style.display = 'block';
    ctaMaster.style.display = 'none';
  } else {
    ctaStudy.style.display = 'none';
    ctaMaster.style.display = 'block';
  }

  // 스크롤 reveal 옵저버 등록
  setupScrollReveal();
}

function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // 차트 래퍼 → 레이더 애니메이션
        if (entry.target.classList.contains('chart-reveal')) {
          const fill = entry.target.querySelector('.radar-fill');
          const dots = entry.target.querySelectorAll('.radar-dot');
          if (fill) fill.classList.add('animate');
          dots.forEach(d => d.classList.add('animate'));
          // 바 차트 애니메이션
          setTimeout(animateBars, 400);
        }

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .chart-reveal').forEach(el => observer.observe(el));
}

// 이미지 저장 (html2canvas)
async function saveResultImage() {
  const btn = document.getElementById('saveBtn');
  btn.textContent = '저장 중...';
  btn.disabled = true;

  try {
    const target = document.getElementById('resultCard');
    const canvas = await html2canvas(target, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#F5F0EB',
      logging: false,
    });
    const link = document.createElement('a');
    link.download = '해피씨쀼_자산레벨진단.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (e) {
    alert('이미지 저장에 실패했어요. 스크린샷을 이용해주세요!');
  } finally {
    btn.textContent = '이미지 저장하기';
    btn.disabled = false;
  }
}
