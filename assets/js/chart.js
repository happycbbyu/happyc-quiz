// 영역별 코멘트 텍스트
const AREA_COMMENTS = {
  '순자산·재무': {
    good: '자산과 부채의 균형을 잘 이해하고 있어요',
    bad: '순자산 파악이 먼저예요. 재무현황표 작성부터 시작해봐요',
  },
  '돈관리': {
    good: '돈관리 시스템이 잘 갖춰져 있어요',
    bad: '통장 분리와 비상금 세팅이 급선무예요',
  },
  '경제공부': {
    good: '경제 공부 습관이 잘 잡혀 있어요',
    bad: '경제신문 읽기 + EBS 자본주의 다큐부터 시작해봐요',
  },
  '투자': {
    good: '투자 원칙과 계좌 전략이 체계적이에요',
    bad: 'ETF로 첫 투자를 시작하고 계좌 구조를 이해해봐요',
  },
  '내집마련': {
    good: '내집마련 로드맵이 명확하게 그려져 있어요',
    bad: '대출 공부와 임장이 먼저예요. 직접 발품을 팔아봐요',
  },
  '부부대화': {
    good: '부부가 함께 재무를 이끌어가고 있어요',
    bad: '부부 재무 대화 루틴이 가장 먼저 필요해요',
  },
  '소비·마인드셋': {
    good: '소비 통제가 잘 되고 있어요',
    bad: '소비 습관 점검과 물건 비우기부터 시작해봐요',
  },
};

function generateCommentary(areaScores) {
  const items = AREAS.map((a, i) => ({ label: a.label, score: areaScores[i] }));
  const sorted = [...items].sort((a, b) => b.score - a.score);
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];
  const secondWorst = sorted[sorted.length - 2];

  const avgScore = areaScores.reduce((s, v) => s + v, 0) / areaScores.length;

  return [
    `✅ <strong>${best.label}</strong> 영역이 가장 잘 되어 있어요. ${AREA_COMMENTS[best.label]?.good || '이 부분은 계속 유지해요!'}`,
    `📌 전체 평균 ${(avgScore / 4 * 100).toFixed(0)}% 수준이에요. ${avgScore >= 2.5 ? '전반적으로 균형 잡힌 편이에요!' : '아직 시작 단계지만 지금부터 하면 충분해요!'}`,
    `⚠️ <strong>${worst.label}</strong>${secondWorst.score < 2 ? ` · ${secondWorst.label}` : ''} 영역을 집중 공략하면 레벨업이 훨씬 빨라져요!`,
  ];
}

function drawRadarChart(scores, containerId) {
  const labels = AREAS.map(a => a.label);
  const N = labels.length;
  const cx = 155, cy = 155, r = 100;
  const levels = 4;

  const getPoint = (i, ratio) => {
    const angle = (Math.PI * 2 * i / N) - Math.PI / 2;
    return {
      x: cx + r * ratio * Math.cos(angle),
      y: cy + r * ratio * Math.sin(angle),
    };
  };

  // 320×320 viewBox, SVG는 overflow:visible로 레이블 잘림 방지
  let svg = `<svg viewBox="0 0 310 310" xmlns="http://www.w3.org/2000/svg"
    style="width:100%;max-width:340px;overflow:visible;">`;

  // 배경 격자 + % 레이블
  const pctLabels = ['25%', '50%', '75%', '100%'];
  for (let l = 1; l <= levels; l++) {
    const ratio = l / levels;
    const pts = Array.from({ length: N }, (_, i) => getPoint(i, ratio));
    const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';
    const fillOpacity = l === levels ? '0.05' : '0';
    svg += `<path d="${d}" fill="rgba(212,196,176,${fillOpacity})" stroke="#D4C4B0" stroke-width="1"/>`;

    // 상단 축(첫번째 꼭짓점 방향)에 % 표시
    const labelPt = getPoint(0, ratio);
    svg += `<text x="${(labelPt.x + 4).toFixed(1)}" y="${(labelPt.y).toFixed(1)}"
      text-anchor="start" dominant-baseline="middle"
      font-size="9" fill="#C4B49A" font-family="'Noto Sans KR', sans-serif">${pctLabels[l - 1]}</text>`;
  }

  // 축 선
  for (let i = 0; i < N; i++) {
    const p = getPoint(i, 1);
    svg += `<line x1="${cx}" y1="${cy}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}" stroke="#D4C4B0" stroke-width="1"/>`;
  }

  // 데이터 영역 (애니메이션 클래스 포함)
  const dataPts = scores.map((s, i) => getPoint(i, Math.max(0.04, s / 4)));
  const dataD = dataPts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';
  svg += `<path class="radar-fill" d="${dataD}" fill="rgba(255,107,77,0.18)" stroke="#FF6B4D" stroke-width="2.5"
    style="transform-origin:${cx}px ${cy}px"/>`;

  // 데이터 점
  dataPts.forEach(p => {
    svg += `<circle class="radar-dot" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.5" fill="#FF6B4D"
      style="transform-origin:${cx}px ${cy}px"/>`;
  });

  // 레이블 — 방향에 따라 text-anchor 조정
  labels.forEach((label, i) => {
    const p = getPoint(i, 1.32);
    const angle = (360 * i / N - 90 + 360) % 360;
    let anchor = 'middle';
    if (angle > 15 && angle < 165) anchor = 'start';
    else if (angle > 195 && angle < 345) anchor = 'end';

    // 줄바꿈 처리 (·로 나뉜 텍스트)
    const parts = label.split('·');
    if (parts.length > 1) {
      svg += `<text x="${p.x.toFixed(1)}" y="${(p.y - 7).toFixed(1)}" text-anchor="${anchor}"
        font-size="11" font-weight="700" fill="#8B7355" font-family="'Noto Sans KR', sans-serif">
        <tspan x="${p.x.toFixed(1)}" dy="0">${parts[0]}·</tspan>
        <tspan x="${p.x.toFixed(1)}" dy="14">${parts[1]}</tspan>
      </text>`;
    } else {
      svg += `<text x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" text-anchor="${anchor}"
        dominant-baseline="middle"
        font-size="11" font-weight="700" fill="#8B7355" font-family="'Noto Sans KR', sans-serif">${label}</text>`;
    }
  });

  svg += `</svg>`;
  document.getElementById(containerId).innerHTML = svg;
}

function drawBarChart(areaScores, containerId) {
  const sorted = AREAS.map((a, i) => ({ label: a.label, score: areaScores[i] }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  let html = '';
  sorted.forEach(item => {
    const pct = (item.score / 4 * 100).toFixed(0);
    html += `
      <div class="bar-item">
        <div class="bar-label">${item.label}</div>
        <div class="bar-track">
          <div class="bar-fill" style="width:0%" data-width="${pct}%"></div>
        </div>
        <div class="bar-value">${pct}%</div>
      </div>`;
  });
  document.getElementById(containerId).innerHTML = html;
}

// 스크롤 진입 시 바 애니메이션 실행
function animateBars() {
  document.querySelectorAll('.bar-fill[data-width]').forEach(bar => {
    const w = bar.getAttribute('data-width');
    setTimeout(() => { bar.style.width = w; }, 100);
  });
}
