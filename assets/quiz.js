// ITSS Ôn tập — quiz engine
// Trang trắc nghiệm khai báo:  window.QUIZ = { id, title, back, questions:[...] }
//   question = { type:'single'|'multi', q, options:[...], answer:[chỉ số đúng], explain }
// - Kết quả lưu ở localStorage theo id -> giữ nguyên kể cả rời trang / sang trang khác.
// - Thứ tự đáp án được XÁO TRỘN và lưu kèm; xáo mới khi bài còn "trắng" (chưa làm câu nào)
//   hoặc khi bấm "Làm lại toàn bộ". Lựa chọn được lưu theo CHỈ SỐ GỐC nên xáo không phá logic chấm.
(function () {
  const Q = window.QUIZ;
  if (!Q) return;
  const KEY = 'itss-quiz-' + Q.id;
  const ORDER_KEY = 'itss-quiz-order-' + Q.id;

  // ---- state (kết quả) ----
  let state = {};
  try { state = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { state = {}; }
  const save = () => localStorage.setItem(KEY, JSON.stringify(state));
  const st = i => (state[i] || (state[i] = { sel: [], sub: false }));

  const arrEq = (a, b) => a.length === b.length && a.every(x => b.includes(x));
  const isCorrect = i => arrEq(st(i).sel, Q.questions[i].answer);

  // ---- thứ tự hiển thị đáp án (permutation của chỉ số gốc) ----
  let orderMap = {};
  try { orderMap = JSON.parse(localStorage.getItem(ORDER_KEY)) || {}; } catch (e) { orderMap = {}; }
  const saveOrder = () => localStorage.setItem(ORDER_KEY, JSON.stringify(orderMap));

  function shuffle(n) {                        // trả về mảng chỉ số 0..n-1 đã xáo (Fisher–Yates)
    const a = Array.from({ length: n }, (_, k) => k);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  // regen=true: xáo lại tất cả. regen=false: chỉ tạo cho câu chưa có thứ tự hợp lệ.
  function ensureOrder(regen) {
    Q.questions.forEach((q, i) => {
      if (regen || !Array.isArray(orderMap[i]) || orderMap[i].length !== q.options.length)
        orderMap[i] = shuffle(q.options.length);
    });
    saveOrder();
  }
  // bài "trắng" = chưa có câu nào được chọn hay nộp
  const isPristine = () => Q.questions.every((q, i) => {
    const s = state[i];
    return !s || (!s.sub && (!s.sel || s.sel.length === 0));
  });

  document.addEventListener('DOMContentLoaded', function () {
    const root = document.getElementById('quizRoot');
    const nav = document.getElementById('qnavGrid');
    const stat = document.getElementById('qnavStat');
    if (!root) return;

    // Xáo mới nếu bài còn trắng (mỗi lần vào trang khi chưa làm gì) hoặc chưa có thứ tự lưu.
    ensureOrder(isPristine());

    const rebuilders = [];   // rebuilders[i]() -> dựng lại danh sách đáp án theo orderMap hiện tại

    // ---------- render các câu hỏi ----------
    Q.questions.forEach((q, i) => {
      const multi = q.type === 'multi';
      const card = document.createElement('section');
      card.className = 'qcard';
      card.id = 'q' + (i + 1);

      const need = multi ? `Chọn ${q.answer.length} đáp án đúng` : 'Chọn 1 đáp án đúng';
      const badge = multi ? 'multi' : 'single';

      card.innerHTML = `
        <div class="q-head">
          <span class="q-num">Câu ${i + 1}</span>
          <span class="q-badge ${badge}">${need}</span>
          <span class="q-verdict" hidden></span>
        </div>
        <div class="q-text">${q.q}</div>
        <div class="opts"></div>
        <div class="q-actions">
          <button class="btn-submit" type="button" disabled>Nộp đáp án</button>
          <button class="btn-redo" type="button">Làm lại câu này</button>
        </div>
        <div class="q-explain" hidden><span class="tt">Giải thích</span><div class="ex-body">${q.explain || ''}</div></div>`;
      root.appendChild(card);

      const optsWrap = card.querySelector('.opts');
      const submitBtn = card.querySelector('.btn-submit');
      const redoBtn = card.querySelector('.btn-redo');

      // dựng lại các lựa chọn theo thứ tự đã xáo; value = CHỈ SỐ GỐC
      function buildOpts() {
        optsWrap.innerHTML = orderMap[i].map(k => `
          <label class="opt" data-k="${k}">
            <input type="${multi ? 'checkbox' : 'radio'}" name="${Q.id}-q${i}" value="${k}">
            <span class="otext">${q.options[k]}</span>
            <span class="omark"></span>
          </label>`).join('');
        const inputs = Array.from(optsWrap.querySelectorAll('input'));
        inputs.forEach(inp => inp.addEventListener('change', () => {
          const s = st(i);
          s.sel = inputs.filter(x => x.checked).map(x => +x.value);
          save();
          submitBtn.disabled = s.sel.length === 0;
          paintNav(i);
        }));
      }
      rebuilders[i] = buildOpts;
      buildOpts();

      submitBtn.addEventListener('click', () => {
        const s = st(i);
        if (s.sel.length === 0) return;
        s.sub = true; save();
        applyQuestion(i, card);
        paintNav(i);
        updateStat();
      });

      redoBtn.addEventListener('click', () => {
        state[i] = { sel: [], sub: false }; save();
        applyQuestion(i, card);
        paintNav(i);
        updateStat();
      });

      applyQuestion(i, card);   // khôi phục trạng thái đã lưu
    });

    // ---------- render navigator ----------
    Q.questions.forEach((q, i) => {
      const cell = document.createElement('div');
      cell.className = 'qnav-cell';
      cell.id = 'nav-' + i;
      cell.textContent = i + 1;
      cell.addEventListener('click', () => {
        document.getElementById('q' + (i + 1)).scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelectorAll('.qnav-cell.current').forEach(c => c.classList.remove('current'));
        cell.classList.add('current');
      });
      nav.appendChild(cell);
      paintNav(i);
    });

    // ---------- làm lại toàn bộ (kèm xáo lại đáp án) ----------
    const resetAll = document.getElementById('btnResetAll');
    if (resetAll) resetAll.addEventListener('click', () => {
      if (!confirm('Xóa toàn bộ kết quả, xáo lại đáp án và làm lại từ đầu?')) return;
      state = {}; localStorage.removeItem(KEY);
      ensureOrder(true);                                   // xáo mới toàn bộ
      Q.questions.forEach((q, i) => {
        rebuilders[i]();                                   // dựng lại đáp án theo thứ tự mới
        applyQuestion(i, document.getElementById('q' + (i + 1)));
        paintNav(i);
      });
      updateStat();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    updateStat();

    // ---------- helpers phụ thuộc DOM ----------
    function applyQuestion(i, card) {
      const q = Q.questions[i];
      const s = st(i);
      const inputs = Array.from(card.querySelectorAll('input'));
      const submitBtn = card.querySelector('.btn-submit');
      const verdict = card.querySelector('.q-verdict');
      const explain = card.querySelector('.q-explain');
      const optEls = Array.from(card.querySelectorAll('.opt'));

      // đồng bộ ô chọn (theo chỉ số gốc)
      inputs.forEach(inp => inp.checked = s.sel.includes(+inp.value));
      // xóa mọi trạng thái màu cũ
      optEls.forEach(o => { o.classList.remove('pick-correct', 'pick-wrong', 'missed'); o.querySelector('.omark').textContent = ''; });
      card.classList.remove('submitted', 'done-ok', 'done-no');
      verdict.hidden = true; explain.hidden = true;

      if (!s.sub) {
        submitBtn.disabled = s.sel.length === 0;
        submitBtn.style.display = '';
        return;
      }

      // đã nộp -> khóa & tô màu
      card.classList.add('submitted');
      submitBtn.style.display = 'none';
      const ok = isCorrect(i);
      card.classList.add(ok ? 'done-ok' : 'done-no');

      optEls.forEach(o => {
        const k = +o.dataset.k;
        const correct = q.answer.includes(k);
        const picked = s.sel.includes(k);
        const mark = o.querySelector('.omark');
        if (picked && correct) { o.classList.add('pick-correct'); mark.textContent = '✔'; }
        else if (picked && !correct) { o.classList.add('pick-wrong'); mark.textContent = '✘'; }
        else if (!picked && correct) { o.classList.add('missed'); mark.textContent = '✔'; }
      });

      verdict.hidden = false;
      verdict.className = 'q-verdict ' + (ok ? 'ok' : 'no');
      verdict.textContent = ok ? '✔ Chính xác' : '✘ Chưa đúng';
      explain.hidden = false;
    }

    function paintNav(i) {
      const cell = document.getElementById('nav-' + i);
      if (!cell) return;
      const s = st(i);
      cell.classList.remove('answered', 'correct', 'wrong');
      if (s.sub) cell.classList.add(isCorrect(i) ? 'correct' : 'wrong');
      else if (s.sel.length) cell.classList.add('answered');
    }

    function updateStat() {
      if (!stat) return;
      let done = 0, right = 0;
      Q.questions.forEach((q, i) => { if (st(i).sub) { done++; if (isCorrect(i)) right++; } });
      stat.innerHTML = `Đã nộp <b>${done}/${Q.questions.length}</b> · Đúng <b>${right}</b>`;
    }
  });
})();
