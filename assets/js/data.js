// 7개 영역 정의 (Q19, Q20은 레이더 차트 미포함 — 참고용)
const AREAS = [
  { id: 'finance',   label: '순자산·재무',  questions: [0, 1, 2] },
  { id: 'money',     label: '돈관리',       questions: [3, 4, 5] },
  { id: 'study',     label: '경제공부',     questions: [6, 7] },
  { id: 'invest',    label: '투자',         questions: [8, 9, 10] },
  { id: 'house',     label: '내집마련',     questions: [11, 12, 13] },
  { id: 'couple',    label: '부부대화',     questions: [14, 15] },
  { id: 'consume',   label: '소비·마인드셋',questions: [16, 17] },
];

// 20문항 (opts: {text, score 0~4})
const QUESTIONS = [
  // ── 순자산·재무 ──────────────────────────────
  {
    area: 0,
    badge: '순자산·재무',
    text: '지금 부부 합산 순자산이 얼마예요?\n(순자산 = 총자산 − 총부채)',
    opts: [
      { text: '마이너스이거나 0에 가까워요', score: 0 },
      { text: '0 ~ 5,000만원이에요', score: 1 },
      { text: '5,000만 ~ 1억원이에요', score: 2 },
      { text: '1억 ~ 3억원이에요', score: 3 },
      { text: '3억원 이상이에요', score: 4 },
      { text: '잘 모르겠어요', score: 5 },
    ],
  },
  {
    area: 0,
    badge: '순자산·재무',
    text: '혹시 부부가 가지고 있는 대출이 있나요?',
    opts: [
      { text: '1억 이상이에요', score: 0 },
      { text: '5,000만 ~ 1억이에요', score: 1 },
      { text: '1,000만 ~ 5,000만이에요', score: 2 },
      { text: '1,000만원 미만이에요', score: 3 },
      { text: '대출이 없어요', score: 4 },
    ],
  },
  {
    area: 0,
    badge: '순자산·재무',
    text: '부부가 함께 받는 월급 중에 얼마를 저축·투자하고 있어요?\n(예적금, 주식, 코인, 금 등 모두 포함)',
    opts: [
      { text: '10% 미만이에요', score: 0 },
      { text: '10~20% 정도예요', score: 1 },
      { text: '20~30% 저축해요', score: 2 },
      { text: '30~40% 저축해요', score: 3 },
      { text: '40% 이상 저축해요', score: 4 },
    ],
  },

  // ── 돈관리 시스템 ─────────────────────────────
  {
    area: 1,
    badge: '돈관리',
    text: '결혼 전후 통장 관리는 어떻게 하고 있어요?\n(목적통장: 비상금/경조사 등 1년을 대비하는 돈관리 시스템)',
    opts: [
      { text: '완전히 각자 관리해요', score: 0 },
      { text: '공동 생활비 통장 + 각자 관리해요', score: 1 },
      { text: '공동 생활비 통장 + 한 명이 관리해요', score: 2 },
      { text: '공동 생활비 + 목적통장까지 있어요', score: 3 },
      { text: '공동 생활비 + 목적통장 + 투자까지 공유해요', score: 4 },
    ],
  },
  {
    area: 1,
    badge: '돈관리',
    text: '비상금이 얼마나 모여 있어요?',
    opts: [
      { text: '없어요', score: 0 },
      { text: '300만원 미만이에요', score: 1 },
      { text: '300만 ~ 800만원이에요', score: 2 },
      { text: '800만 ~ 1,000만원이에요', score: 3 },
      { text: '1,000만원 이상이에요', score: 4 },
    ],
  },
  {
    area: 1,
    badge: '돈관리',
    text: '가계부 or 지출 기록을 하고 있어요?',
    opts: [
      { text: '전혀 안 해요', score: 0 },
      { text: '가끔 하거나 한 명이 포기했어요', score: 1 },
      { text: '어플로 기록 중이에요', score: 2 },
      { text: '매달 점검하고 있어요', score: 3 },
      { text: '부부가 함께 매달 점검해요', score: 4 },
    ],
  },

  // ── 경제공부 ──────────────────────────────────
  {
    area: 2,
    badge: '경제공부',
    text: '경제 공부를 얼마나 하고 있어요?',
    opts: [
      { text: '그게 뭔지 잘 모르겠어요', score: 0 },
      { text: '방법을 모르지만 해보고 싶어요', score: 1 },
      { text: '유튜브만 가끔 봐요', score: 2 },
      { text: '경제신문, 책, 유튜브를 읽고 있어요', score: 3 },
      { text: '매일 2~3번 루틴처럼 해요', score: 4 },
    ],
  },
  {
    area: 2,
    badge: '경제공부',
    text: '금융 기초 개념을 얼마나 알고 있어요?\n(금리, ETF, ISA, LTV, DSR 등)',
    opts: [
      { text: '거의 몰라요', score: 0 },
      { text: '단어는 아는데 뜻은 잘 모르겠어요', score: 1 },
      { text: '기본 개념은 설명할 수 있어요', score: 2 },
      { text: '잘 이해하고 있는데 헷갈릴 때가 있어요', score: 3 },
      { text: '완벽하게 설명할 수 있어요', score: 4 },
    ],
  },

  // ── 투자 ─────────────────────────────────────
  {
    area: 3,
    badge: '투자',
    text: '부부의 현재 투자 계좌 상황은요?',
    opts: [
      { text: '예적금만 해봤어요, 투자 경험이 없어요', score: 0 },
      { text: '일반계좌로만 하고 있어요', score: 1 },
      { text: 'ISA 계좌만 있어요', score: 2 },
      { text: 'ISA + IRP + ETF 적립 중이에요', score: 3 },
      { text: '세제혜택 풀 활용 + 생애주기 전략이 있어요', score: 4 },
    ],
  },
  {
    area: 3,
    badge: '투자',
    text: '투자 원칙이 있어요?',
    opts: [
      { text: '투자를 안 해봤어요', score: 0 },
      { text: '투자 원칙은 따로 없어요', score: 1 },
      { text: '뉴스 보고 기업을 찾아봐요', score: 2 },
      { text: '한 명만 원칙이 있고 한 명은 관심이 없어요', score: 3 },
      { text: '우리만의 기준이 있고 부부가 함께 공유해요', score: 4 },
    ],
  },
  {
    area: 3,
    badge: '투자',
    text: '지금까지 가장 후회되는 투자 행동은요?',
    opts: [
      { text: '투자를 안 해봤어요', score: 0 },
      { text: '남의 말 듣고 묻지마 투자를 했어요', score: 1 },
      { text: '남들이 사서 따라 샀다가 손실에 팔았어요', score: 2 },
      { text: '잃고 있었지만 존버로 성공했어요', score: 3 },
      { text: '적립식으로 원칙대로 꾸준히 해왔어요', score: 4 },
    ],
  },

  // ── 내집마련 ──────────────────────────────────
  {
    area: 4,
    badge: '내집마련',
    text: '내집마련 전략이 얼마나 구체화됐어요?',
    opts: [
      { text: '생각해본 적 없어요', score: 0 },
      { text: '막연하게 살고 싶다는 생각만 있어요', score: 1 },
      { text: '목표 지역이랑 예산을 설정했어요', score: 2 },
      { text: '임장도 해보고 대출 계획도 있어요', score: 3 },
      { text: '1주택 보유 or 갈아타기를 준비 중이에요', score: 4 },
    ],
  },
  {
    area: 4,
    badge: '내집마련',
    text: '대출에 대해 얼마나 이해하고 있어요?',
    opts: [
      { text: '대출은 나쁜 것 같아요', score: 0 },
      { text: '대출을 받아본 적은 있어요', score: 1 },
      { text: '대출 종류와 금리가 정해지는 원리를 알아요', score: 2 },
      { text: '주담대 LTV, DSR, 정책 상품을 알고 있어요', score: 3 },
      { text: '대출이 무섭지 않고 레버리지로 활용하고 있어요', score: 4 },
    ],
  },
  {
    area: 4,
    badge: '내집마련',
    text: '지금 주거 형태는요?',
    opts: [
      { text: '부모님 댁이에요', score: 0 },
      { text: '각자 따로 살고 있어요', score: 1 },
      { text: '월세예요', score: 2 },
      { text: '전세예요', score: 3 },
      { text: '내 집(매매)이에요', score: 4 },
    ],
  },

  // ── 부부 돈 대화 ──────────────────────────────
  {
    area: 5,
    badge: '부부대화',
    text: '부부끼리 돈 얘기를 얼마나 편하게 해요?',
    opts: [
      { text: '돈 얘기 꺼내면 싸우거나 피해요', score: 0 },
      { text: '가끔 하긴 하는데 체계가 없어요', score: 1 },
      { text: '월 1회 이상 정기적으로 해요', score: 2 },
      { text: '목표·투자 방향까지 같이 결정해요', score: 3 },
      { text: '부부총회 + 연간 재무 리뷰까지 해요', score: 4 },
    ],
  },
  {
    area: 5,
    badge: '부부대화',
    text: '서로의 월급·자산을 완전히 공유하고 있어요?',
    opts: [
      { text: '서로 잘 몰라요', score: 0 },
      { text: '대충은 알지만 정확히는 몰라요', score: 1 },
      { text: '주요 항목은 공유해요', score: 2 },
      { text: '전체 자산을 정기적으로 공유해요', score: 3 },
      { text: '공동 순자산표를 만들어서 함께 관리해요', score: 4 },
    ],
  },

  // ── 소비·마인드셋 ─────────────────────────────
  {
    area: 6,
    badge: '소비·마인드셋',
    text: '충동구매 or 불필요한 소비가 얼마나 있어요?',
    opts: [
      { text: '자주 있어요, 통제가 안 돼요', score: 0 },
      { text: '가끔 후회하는 소비를 해요', score: 1 },
      { text: '가끔 있지만 금액이 크지 않아요', score: 2 },
      { text: '거의 없어요', score: 3 },
      { text: '소비 기준이 명확해서 없어요', score: 4 },
    ],
  },
  {
    area: 6,
    badge: '소비·마인드셋',
    text: '물건 비우기·미니멀 라이프를 실천하고 있어요?',
    opts: [
      { text: '물건이 너무 많아서 힘들어요', score: 0 },
      { text: '버려야 하는 건 알지만 못 하고 있어요', score: 1 },
      { text: '가끔 정리는 해요', score: 2 },
      { text: '어느 정도 정리됐어요', score: 3 },
      { text: '필요한 것만 남겨서 쾌적해요', score: 4 },
    ],
  },

  // ── 소득·N잡 (참고용 — 레이더 차트 미포함) ──────
  {
    area: -1,
    badge: '소득·N잡',
    text: '현재 월급 외 수입원이 있어요?\n(부업, 블로그, 배당, 임대 등 모두 포함)',
    opts: [
      { text: '없어요, 생각해본 적도 없어요', score: 0 },
      { text: '생각만 하고 있어요', score: 1 },
      { text: '시작은 했는데 수입은 없어요', score: 2 },
      { text: '월 10만원 이상 부수입이 있어요', score: 3 },
      { text: '월 50만원 이상 안정적으로 있어요', score: 4 },
    ],
  },
  {
    area: -1,
    badge: '재무 목표',
    text: '5년 후 우리 부부의 재무 목표가 구체적으로 있어요?',
    opts: [
      { text: '없어요', score: 0 },
      { text: '막연하게 있어요', score: 1 },
      { text: '목표는 있는데 계획이 없어요', score: 2 },
      { text: '목표 + 대략적인 계획이 있어요', score: 3 },
      { text: '숫자로 구체화하고 부부가 공유해요', score: 4 },
    ],
  },
];

// 레벨 정의
const LEVELS = [
  {
    lv: 1,
    emoji: '🌱',
    title: 'LEVEL 1 · 출발선',
    range: '순자산 마이너스 ~ 0원',
    oneliner: '지금이 딱 시작할 때예요',
    quote: '"늦지 않았어요! 지금 우리 위치를 정확하게 아는 것부터 시작해요."',
    color: '#E85A4F',
    trap: '투자보다 마인드셋이 먼저예요. 기초 없는 투자는 돈을 잃는 가장 빠른 방법이에요.',
    actions: [
      { title: '우리 부부 재무현황표 작성', desc: '총자산·총부채·월수입·월지출을 종이나 엑셀에 꺼내놓아요. 숫자를 아는 게 시작이에요.' },
      { title: '부부 돈 대화 5원칙 세우기', desc: '매일 1회 돈·관계 대화를 시작해요. 사랑의 언어 테스트로 다정한 대화법을 찾아요.' },
      { title: '물건 비우기', desc: '1년간 안 쓴 것들을 정리해요. 물건은 일시적인 행복이에요. 진짜 행복은 자산에서 와요.' },
    ],
    levelup: '재무현황표 완성 + 부부 돈 대화 루틴 시작 + 물건 정리 완료',
    cta: 'study',
  },
  {
    lv: 2,
    emoji: '🌿',
    title: 'LEVEL 2 · 종잣돈',
    range: '순자산 0 ~ 5,000만원',
    oneliner: '시스템이 습관을 만들어요',
    quote: '"따로 하는 돈관리는 배우자를 경제적으로 버리는 거예요. 시스템이 습관을 만들어요."',
    color: '#E89B4F',
    trap: '"남으면 저축" — 영원히 저축이 없어요. 라이프스타일 인플레이션이 최대 적이에요.',
    actions: [
      { title: '경제공부 루틴 만들기', desc: '경제신문 매일 읽기 + EBS 자본주의 다큐는 필수예요. 읽은 걸 내 언어로 말해보는 게 핵심이에요.' },
      { title: '통장결혼식', desc: '자산합치기 → 통장쪼개기 → 부부총회 3단계를 완성해요. 쀼머니트리로 구조를 눈에 보이게 만들어요.' },
      { title: '저축 고도화 — 예적금 졸업', desc: '비상금·목적통장은 CMA·파킹통장으로 옮겨요. 여유자금은 RP·발행어음·채권을 활용해요.' },
    ],
    levelup: '통장결혼식 완료 + 경제신문 30일 루틴 + CMA 세팅 + 시드 5,000만원',
    cta: 'study',
  },
  {
    lv: 3,
    emoji: '🚀',
    title: 'LEVEL 3 · 투자 입문',
    range: '순자산 5,000만 ~ 1억원',
    oneliner: '돈이 일하기 시작해요',
    quote: '"시장을 이기려 하지 말고, 시장에 올라타요. 우리 부부만의 투자 기준을 만드는 단계예요."',
    color: '#4FA8E8',
    trap: '5,000만원 생기면 개별종목 몰빵이에요. 5,000만원 모으는 데 3년 걸렸는데 3개월에 반 날리는 구간이에요.',
    actions: [
      { title: '경제사이클 이해 후 ETF 시작', desc: 'ETF → 계좌구조 → 미국주식 순서로 시작해요. 국내 ETF는 일반계좌, 해외 ETF는 ISA·연저펀·IRP에서 해요.' },
      { title: '생애주기별 계좌 전략', desc: '내집마련 3년 이후엔 ISA 위주로, 3년 이내엔 달러ETF·채권으로 돈을 지켜요.' },
      { title: '부부 투자 역할분담', desc: '안정형 vs 공격형 성향을 파악하고 역할을 나눠요. 투자 가치관이 다른 게 오히려 강점이에요.' },
    ],
    levelup: 'ETF 실제 매수 + 계좌 구조 이해 + 부부 역할 정하기 + 순자산 1억',
    cta: 'master',
  },
  {
    lv: 4,
    emoji: '💫',
    title: 'LEVEL 4 · 자산 가속',
    range: '순자산 1억 ~ 3억원',
    oneliner: '내집마련을 결정할 때예요',
    quote: '"완벽한 집을 찾으려다 아무것도 못 사요. 닿을 수 있는 최고 입지의 1주택으로 인플레이션을 방어해요."',
    color: '#7E4FE8',
    trap: '대출 최소화로 낮은 집 사기예요. DSR 40% 한도 안에서 최대한 좋은 입지를 사야 해요.',
    actions: [
      { title: '주거 전략 결정', desc: '전세보다 월세를 추천해요. 전세는 기회비용이 너무 크고 인플레이션 방어가 안 돼요.' },
      { title: '대출력 파악 + 레버리지 이해', desc: '주담대는 착한 대출이에요. LTV·DSR을 이해하고 상환 시뮬레이션을 해봐요.' },
      { title: '우리만의 강남 찾기', desc: '입지 우선순위를 부부가 함께 정하고 임장을 시작해요. 직접 가보지 않으면 반드시 후회해요.' },
    ],
    levelup: '1주택 매수 완료 + 대출 구조 확정 + 월 상환 계획 세팅',
    cta: 'master',
  },
  {
    lv: 5,
    emoji: '✨',
    title: 'LEVEL 5 · 자산 최적화',
    range: '순자산 3억원 이상',
    oneliner: '소득 레버리지를 당길 때예요',
    quote: '"소비자가 아닌 생산자가 되는 단계예요. 돈이 천장에 닿은 느낌이 들 때 소득을 늘려야 해요."',
    color: '#4FBE8A',
    trap: '부동산에만 집중하다 N잡·투자를 놓쳐요. 갈아타기 + 투자 + N잡 세 가지를 동시에 굴려야 해요.',
    actions: [
      { title: '갈아타기 전략', desc: '현재 집 대비 1.2~1.5배 상급지를 목표로 해요. 최소 2년 거주 후 양도세를 절감해요.' },
      { title: '투자 지속 + 성장주 비중', desc: '신혼부부 최대 자산은 시간이에요. 성장주·기술주 비중을 높이고 복리를 절대 멈추지 않아요.' },
      { title: 'N잡 → 사업으로', desc: '블로그 → 인스타 → 스레드 → 유튜브 순서로 시작해요. 나로부터 시작하는 게 핵심이에요.' },
    ],
    levelup: '갈아타기 완료 + N잡 수익화 시작 + 투자 지속 + 사업 방향 확정',
    cta: 'master',
  },
];

// Q1 답변 → 레벨 인덱스 (0~4)
// Q1 score: 0→Lv1, 1→Lv2, 2→Lv3, 3→Lv4, 4→Lv5, 5→잘모름(나머지 분석)
function calcLevel(answers) {
  const q1 = answers[0];
  if (q1 === null) return 0;
  if (q1 <= 4) return q1; // 직접 결정

  // "잘 모르겠어요" → 나머지 Q2~Q18 평균으로 Lv1 or Lv2
  const others = answers.slice(1, 18).filter(a => a !== null);
  if (others.length === 0) return 0;
  const scores = others.map((a, i) => {
    const qi = i + 1;
    return qi < QUESTIONS.length && a !== null ? QUESTIONS[qi].opts[a].score : 0;
  });
  const avg = scores.reduce((s, v) => s + v, 0) / scores.length;
  return avg < 2 ? 0 : 1;
}

// 영역별 점수 계산 (0~4 스케일 정규화)
function calcAreaScores(answers) {
  return AREAS.map(area => {
    const scores = area.questions.map(qi => {
      const a = answers[qi];
      if (a === null) return 0;
      const opt = QUESTIONS[qi].opts[a];
      // Q1의 score:5 ("잘 모르겠어요")는 0점 처리
      return opt.score <= 4 ? opt.score : 0;
    });
    const raw = scores.reduce((s, v) => s + v, 0);
    const max = area.questions.length * 4;
    return parseFloat((raw / max * 4).toFixed(2));
  });
}
