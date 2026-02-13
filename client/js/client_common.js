// ======== 조회한 유저 데이터를 전역 상태로 저장? ==========
window.userState = {
  point: 0,
};

// ========= 유저 보유 포인트 불러오기 ==========
async function loadUserPoint() {
  try {
    const response = await fetch(`/users/`);

    if (!response.ok) {
      throw new Error("유저 조회 실패");
    }

    const data = await response.json();

    // 서버에서 { point : 150000 } 형태로 온다고 가정
    window.userState.point = data.POINT;

    //숫자 콤마 처리
    const formatted = window.userState.point.toLocaleString();

    // 여러 요소에 동시에 값 전달
    const elements = document.querySelectorAll(".point-value");

    elements.forEach((el) => {
      el.innerText = `${formatted}원`;
    });
  } catch (err) {
    console.error(err);
    document.querySelectorAll(".point-value").forEach((el) => {
      innerText = `💰 조회 실패`;
    });
  }
}

// ===== 헤더 로드 =====
async function loadHeader() {
  const headerContainer = document.getElementById("header");
  if (!headerContainer) return;

  const response = await fetch("/components/header.html");
  const html = await response.text();
  headerContainer.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader();
  await loadUserPoint();
});
