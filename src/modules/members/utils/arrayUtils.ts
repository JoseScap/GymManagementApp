export const generatePaginationItems =(
  currentPage: number,
  totalPages: number,
  distance: number = 2
): string[] => {
  const paginationItems: string[] = [];

  const leftEdge = 1;
  const rightEdge = totalPages;

  // Calculate the start and end page indexes based on distance
  const startPage = Math.max(leftEdge, currentPage - distance);
  const endPage = Math.min(rightEdge, currentPage + distance);

  // Add the left edge
  paginationItems.push(leftEdge.toString());

  // Add dots if there's a gap between the left edge and the start page
  if (startPage > leftEdge + 1) {
    paginationItems.push('...');
  }

  // Add pages in the range [startPage, endPage]
  for (let i = startPage; i <= endPage; i++) {
    if (i !== leftEdge && i !== rightEdge) {
      paginationItems.push(i.toString());
    }
  }

  // Add dots if there's a gap between the end page and the right edge
  if (endPage < rightEdge - 1) {
    paginationItems.push('...');
  }

  // Add the right edge
  if (rightEdge !== leftEdge) {
    paginationItems.push(rightEdge.toString());
  }

  return paginationItems;
}
