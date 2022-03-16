const paging = (page, totalPost) => {
  const maxPost = 2; // 한 페이지에 표시 하고자하는 최대 게시물의 수
  const maxPage = 5; // 한 페이지에 표시 하고자하는 최대 페이지의 수
  let currentPage = page ? parseInt(page) : 1; // 쿼리스트링으로 페이지를 받아왔을 경우 정수화, 아니면 1
  const hidePost = (currentPage - 1) * maxPost;
  const totalPage = Math.ceil(totalPost / maxPost); // 총 페이지 개수

  if (currentPage > totalPage) {
    currentPage = totalPage; // 쿼리스트링으로 받아온 페이지가 totalPage 보다 크면 현재 페이지를 마지막 페이지로 변경
  }

  const startPage = Math.floor((currentPage - 1) / maxPage) * maxPage + 1; // 보여줄 첫번쩨 페이지 -> 7이면 6, 5이면 1
  let endPage = startPage + maxPage - 1; // 보여줄 마지막 페이지

  if (endPage > totalPage) {
    endPage = totalPage;
  }

  return { maxPost, hidePost, currentPage, totalPage, startPage, endPage };
};

export default paging;
